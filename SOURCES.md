# Sources and attribution

Checked 19 October 2026.

## Skills Bricks — Raspberry Pi Foundation

[Current catalogue](https://raspberrypifoundation.github.io/skills-bricks/?platform=pico).
The 10 selected Pico Detect cards and active/passive buzzer cards supply the original
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
The `en/` Markdown layout, including named options, `step_N.md` copies,
`pathways.yml`, `meta.yml` and a maintainer pathway map, was checked against
[raspberrypilearning/branching-pathways-platformer](https://github.com/raspberrypilearning/branching-pathways-platformer)
at commit `e3b7e77b18933e58ccb1a15f051ad793a6c8de41`. The instrument's
learner text, route rules and MicroPython examples are written for this project.
`en/images/` copies the credited setup images and Skills Bricks wiring PNGs
already present in this repository; it adds no new upstream artwork.
The shared start and freely ordered parts, prerequisite warnings, guitar,
violin, drumkit and theremin ideas come from Mark Calleja's brief. The
single-control, two-control, multi-contact and optional example programs are
new; they do not claim that any earlier instrument used these exact pins or code.

The palette follows the existing Build Lab Code Club theme. The decorative instrument
illustration in `assets/instrument-maker.svg` is new SVG, matching the Pico Alarm
hero's visual style. It is an imagined musical gadget, not a wiring diagram.

API behaviour was checked against the maintained
[picozero source](https://picozero.readthedocs.io/en/latest/_modules/picozero/picozero.html).

The buzzer distinction and named-note route were checked against picozero's
[Buzzer and Speaker recipes](https://picozero.readthedocs.io/en/latest/recipes.html#buzzer)
and [Speaker API](https://picozero.readthedocs.io/en/latest/api.html#speaker).
The maintained implementation confirms lowercase sharp note names, empty-string
rests and note lengths in seconds. The new phrase is an editable project example;
the original Skills Bricks snippets and wiring remain unchanged.

## Musical starting points

The note groups use standard major/minor triads, major pentatonic, blues and
whole-tone scales, written with picozero-compatible sharp note names.
Scale structures were checked against Open Music Theory's
[pentatonic collection](https://viva.pressbooks.pub/openmusictheory/chapter/intro-to-diatonic-modes-and-the-chromatic-scale/)
and [blues scale](https://viva.pressbooks.pub/openmusictheory/chapter/blues-melodies-and-the-blues-scale/),
and the University of Puget Sound's
[table of scales](https://musictheory.pugetsound.edu/mt21c/JazzScales.html).
The style and mood descriptions are original creative prompts, not fixed meanings
or promises about how a listener will hear a phrase. The examples describe
successive notes on one buzzer, not simultaneous chords.
