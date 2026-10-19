# Sources and attribution

Checked 19 October 2026.

## Skills Bricks — Raspberry Pi Foundation

[Current catalogue](https://raspberrypifoundation.github.io/skills-bricks/?platform=pico).
The 12 Pico Detect cards and active/passive buzzer cards supply the original
code snippets, component images and wiring diagrams. Each page links to its
exact card. `data/bricks.json` records the source-page URL and SHA-256 hash;
`data/sources.json` records original and preview asset URLs and hashes.

The maintained local authoring bundle was read at `skills-bricks/`; cards and
assets were copied from its generated `dist/` folder. No source card, diagram,
pin assignment or authoring file was changed. Original PNGs are retained, with
matching, unchanged Build Lab WebP derivatives used for preview where available.

Original snippets are reproduced separately from new runnable tests. The latter
add repetition, timing, sound-off cleanup, interaction logic and the instrument
examples. Source material retains its existing ownership and licence terms;
this repository does not grant additional rights to copied artwork.

## Build Lab — Raspberry Pi Foundation / raspberrypilearning

[Build Lab](https://raspberrypilearning.github.io/pick-a-part/) supplied
`pico-setup.js`, six setup images and existing web-optimised component/wiring
previews. The checked local source commit was
`212cb0bfdb66f613a505ce7731e3a46001f8fd27` in
[raspberrypilearning/pick-a-part](https://github.com/raspberrypilearning/pick-a-part).

`setup-help.js` retains its connection, MicroPython, package-installation and
troubleshooting guidance, with project/page names adapted. Its original source
checksum is recorded in the manifest. The consuming page supplies its own Pico
test and interactions.

See [assets/setup/README.md](assets/setup/README.md) for the original image
provenance. LED firefly images retain CC BY-SA 4.0 attribution. The picozero
interpreter image retains its MIT copyright and permission notice in
[assets/setup/picozero-LICENSE.txt](assets/setup/picozero-LICENSE.txt).

## Pathway and examples

The parts/approaches structure follows the
[Platformer branching-pathway prototype](https://raspberrypifoundation.github.io/ccp-branching-pathways-testing/).
The shared-start and freely ordered parts, prerequisite warnings, guitar and
violin descriptions come from Mark Calleja's brief. The single-control,
two-control and multi-contact code is new; it is not a claim that Mark's original instruments used these exact pins
or programs.

The palette follows the existing Build Lab Code Club theme. The decorative materials
illustration is new inline SVG and is not a wiring diagram.

API behaviour was checked against the maintained
[picozero source](https://picozero.readthedocs.io/en/latest/_modules/picozero/picozero.html).
