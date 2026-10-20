# Pico Musical Instrument pathway files

This directory follows the Markdown layout of [Branching Pathways Platformer](https://github.com/raspberrypilearning/branching-pathways-platformer). The learner pages are `landing.md` and the 28 named route files listed in `pathways.yml`. Group headings organise choices; they are not extra pages.

`meta.yml` lists the same pages in route order. `step_1.md` to `step_28.md` are copies for project-format consumers that expect numbered steps. **Edit the named route file**, then run `python3 scripts/sync-pathway-files.py` from the repository root. Run `python3 scripts/sync-pathway-files.py --check` to verify copies, links, images, Skills Bricks control snippets and Python syntax.

After `1A`, the learner may visit the body, buzzer, sound and control pages in any order. `8A`–`8D` are optional ideas, not fixed instrument pathways. See [pathway-map.md](pathway-map.md), [step-prerequisites.md](step-prerequisites.md) and [step-dependencies.mermaid](step-dependencies.mermaid). A warning sends a learner to a useful earlier test; it does not lock other pages.

`images/` contains the setup pictures and original Skills Bricks wiring diagrams. `resources/instrument.py` is the starting MicroPython program, also stored under `code/pico-musical-instrument-starter/`. `resources/examples/` contains complete optional example programs. There is no single completed solution because learners choose their own instrument, so `solutions/` is reserved for any future teacher material. See the repository's [SOURCES.md](../SOURCES.md) for attribution.

The existing root website is a separate interactive prototype. These Markdown files have been checked as files and links, but have not been verified in a live Raspberry Pi Projects renderer or on physical Pico hardware.
