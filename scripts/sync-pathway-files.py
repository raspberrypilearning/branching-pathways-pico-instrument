#!/usr/bin/env python3
"""Keep Platformer-style step_N.md files in sync with named route sources.

Run without arguments to copy canonical route files. Use --check in CI or review.
Only Python's standard library is needed.
"""

from __future__ import annotations

import argparse
import ast
import json
import re
import sys
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
EN = ROOT / "en"
FLOW_START = "<!-- BEGIN GENERATED FLOWCHART -->"
FLOW_END = "<!-- END GENERATED FLOWCHART -->"


def manifest_routes() -> list[tuple[str, Path]]:
    manifest = (EN / "pathways.yml").read_text()
    ids = re.findall(r"^      - id: ([0-9]+[A-Z])$", manifest, re.M)
    files = re.findall(r"^        file: (.+\.md)$", manifest, re.M)
    declared = re.search(r"^canonical_step_count: (\d+)$", manifest, re.M)
    assert declared and len(ids) == len(files) == int(declared.group(1)), "Route count mismatch"
    assert len(ids) == len(set(ids)), "Repeated route ID"
    assert len(files) == len(set(files)), "Repeated route file"
    assert all(Path(name).stem.startswith(route + " - ") for route, name in zip(ids, files)), "Route ID/file mismatch"
    return list(zip(ids, (EN / name for name in files)))


def check_content(routes: list[tuple[str, Path]]) -> None:
    meta = (EN / "meta.yml").read_text()
    titles = re.findall(r"^  - title: '([^']+)'$", meta, re.M)
    expected = [path.stem for _, path in routes]
    assert titles == expected, "meta.yml steps must match pathways.yml order and titles"
    assert (EN / "images/banner.png").is_file(), "Missing hero image"
    assert (EN / "landing.md").is_file(), "Missing landing page"
    diagram = (EN / "step-dependencies.mermaid").read_text()
    assert diagram.startswith("flowchart "), "Missing page-level flowchart"
    for route, _ in routes:
        assert len(re.findall(rf"\bP{route}\[", diagram)) == 1, f"Flowchart needs one node for {route}"
    assert (EN / "pathway-map.md").is_file(), "Missing pathway map"
    assert (EN / "step-prerequisites.md").is_file(), "Missing prerequisite guidance"
    assert (EN / "resources/instrument.py").read_bytes() == (ROOT / "starters/instrument.py").read_bytes(), "Starter copies differ"
    assert (EN / "code/pico-musical-instrument-starter/main.py").read_bytes() == (ROOT / "starters/instrument.py").read_bytes(), "Code starter differs"

    for page in [EN / "landing.md", *(path for _, path in routes)]:
        text = page.read_text()
        assert text.startswith("## "), f"Missing project heading: {page.name}"
        assert "## Test" in text or page.name == "landing.md", f"Missing learner test: {page.name}"
        for target in re.findall(r"(?<!!)\[[^\]]+\]\(([^)]+)\)|!\[[^\]]*\]\(([^)]+)\)", text):
            link = next(part for part in target if part)
            if link.startswith(("https://", "http://", "mailto:")):
                continue
            local = EN / unquote(link.split("#", 1)[0])
            assert local.is_file(), f"Broken link in {page.name}: {link}"

    cards = {c["id"]: c for c in json.loads((ROOT / "data/bricks.json").read_text())}
    control_ids = ["button", "capacitive-touch", "potentiometer", "ldr", "distance", "tilt-switch", "line-sensor", "toggle-switch", "temperature-sensor", "temperature-probe"]
    route_files = dict(routes)
    for route, id in zip((f"5{letter}" for letter in "ABCDEFGHIJ"), control_ids):
        page = route_files[route]
        body = "\n".join(line[2:] if line.startswith("> ") else "" if line == ">" else line for line in page.read_text().splitlines())
        assert cards[id]["code"].strip() in body, f"Skills Bricks code changed in {page.name}"
        assert (EN / "images" / f"{id}-wiring.png").is_file(), f"Missing wiring diagram: {id}"
    for route, id in (("3A", "buzzer"), ("3B", "passive-buzzer")):
        page = next(path for page_id, path in routes if page_id == route)
        body = "\n".join(line[2:] if line.startswith("> ") else "" if line == ">" else line for line in page.read_text().splitlines())
        assert cards[id]["code"].strip() in body, f"Skills Bricks code changed in {page.name}"
    assert not list(EN.rglob("*pir*")), "PIR files are not part of this pathway"
    for code in EN.rglob("*.py"):
        ast.parse(code.read_text(), filename=str(code))


def sync_flowchart(check: bool) -> None:
    path = EN / "pathway-map.md"
    body = path.read_text()
    assert FLOW_START in body and FLOW_END in body, "Missing flowchart markers"
    diagram = (EN / "step-dependencies.mermaid").read_text().rstrip()
    before, rest = body.split(FLOW_START, 1)
    _, after = rest.split(FLOW_END, 1)
    wanted = before + FLOW_START + "\n```mermaid\n" + diagram + "\n```\n" + FLOW_END + after
    if check:
        assert body == wanted, "pathway-map.md flowchart is out of sync"
    else:
        path.write_text(wanted)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="verify generated steps instead of copying")
    args = parser.parse_args()
    routes = manifest_routes()
    sync_flowchart(args.check)
    for number, (_, source) in enumerate(routes, 1):
        assert source.is_file(), f"Missing route: {source.name}"
        copy = EN / f"step_{number}.md"
        if args.check:
            assert copy.is_file() and copy.read_bytes() == source.read_bytes(), f"Out-of-sync {copy.name}"
        else:
            copy.write_bytes(source.read_bytes())
    if args.check:
        check_content(routes)
    print(f"{'Checked' if args.check else 'Synced'} {len(routes)} Markdown routes")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except AssertionError as error:
        print(f"Pathway check failed: {error}", file=sys.stderr)
        sys.exit(1)
