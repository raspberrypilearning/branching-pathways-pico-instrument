# Pico Musical Instrument

A branching pathway for making a playable musical instrument with Raspberry Pi
Pico, MicroPython and picozero. This is a separate project from Build Lab.

**[Open the pathway](https://raspberrypilearning.github.io/branching-pathways-pico-instrument/)**

## Learner journey

Everyone opens and saves the starter, connects a Pico and runs the onboard LED
and Shell-message check first. The learner confirms the result; the website does
not connect to or inspect hardware.

After that, the parts hub is open in any order:

- Make the body: Mark's foil-pick guitar, conductive-thread violin or an original design.
- Choose a sound maker: active buzzer or passive piezo buzzer.
- Make some sounds: short beeps, editable rhythms and passive-buzzer pitch slides.
- Make the controls: all 12 Pico Detect cards from Skills Bricks.
- Bring it together: one input controlling one sound maker, with editable examples.
- Play and change it: a performance, an optional note and a saved version.

Prerequisites are warnings with links, not locks after the Pico check. Following
one keeps a return link to the originating part. Controls can be tested using
printed readings without a buzzer. Code can be explored before wiring, and a
body can be crafted before either. Completed test ticks are self-reported.

Each hardware option includes the original Skills Bricks wiring and code snippet
on the page, alongside a runnable adaptation and the relevant kit/pin guidance.
Body and sound exploration pages retain a component reference area. Setup uses
Build Lab's instructions, troubleshooting dialogs and six original screenshots.

## Instrument examples

The guitar uses fret buttons and a homemade pick switch: foil on the pick is
connected to GND, and foil on the body to GP2. Contact plays the selected note.
The violin uses three separated conductive threads as note contacts and a
conductive bow connected to GND. Contact with a thread plays its note.

Both examples retain the Skills Bricks button on GP10 and passive buzzer on GP9.
Additional contacts use GP0, GP1 and (for the pick) GP2, the free pins in the
Skills Bricks Pico pin map. A table explicitly describes the extra connections;
the unchanged button diagram illustrates the repeated contact-to-GND circuit.
Examples use one note at a time. The first held contact wins if several close.

## Run locally

Node.js 20.11 or newer and Python 3 are sufficient for the application and core
checks. There are no application dependencies or build step.

```sh
node server.mjs
# Open http://127.0.0.1:4174/
node --test tests/core.test.mjs
```

Use a local server rather than opening `index.html` directly: the app loads its
local JSON source catalogue. Set `PORT` to select another port.

For browser checks, install Playwright and Chromium:

```sh
npm install --no-save playwright
npx playwright install chromium
node tests/browser.mjs
```

Set `PLAYWRIGHT_MODULE` to an installed Playwright module if needed; set
`TEST_URL` to check a deployed copy. Set `PYTHON` to choose a Python executable.
The browser checks use an isolated context and save screenshots in ignored
`outputs/`. They never change anyone's existing browser project.

## State and saving

Pathway notes, choices, test records and an optional code draft are saved in
browser local storage under `branching-pathways-pico-instrument-v1`, independently
of Build Lab. Save a copy downloads a JSON file; Open a copy validates it and
backs up the current project before replacement. Work is also downloadable
before the first test or before any instrument is complete.

A program saved only in Thonny must be saved separately. Pasting it into Bring it
together includes it in the JSON export. The website stores Python as text and
does not execute it. No accounts, analytics or project uploads are used.

Changing a selected component or behaviour clears the combined/assembled test
records while preserving notes and the learner's code. Each component's own
record remains with that component. Reflection never gates saving or progress.

## Source material

See [SOURCES.md](SOURCES.md) and [data/sources.json](data/sources.json) for
attribution, source URLs and checksums. The original PNG diagrams are kept;
matching Build Lab WebP copies serve as smaller previews. Original Skills Bricks
snippets are labelled separately from longer project examples.

To refresh the references from the maintained local sources:

```sh
python3 scripts/import-sources.py /path/to/skills-bricks /path/to/pick-a-path
```

This reads Skills Bricks `dist/` and Build Lab assets; it never edits either
source project. Review source and pin changes before republishing. The import
also refreshes setup-help.js, adapting only project/page names.

## Checks and boundaries

- Core tests verify source-asset checksums, project persistence, invalidation,
  escaping, compatibility and pin choices.
- 74 Python programs pass syntax parsing.
- 55 complete input/sound and instrument programs pass simulation tests for
  readings, pitch changes, missing distance echoes, contact notes and shutdown.
- Browser checks cover the setup gate, a body-first route, prerequisite returns,
  help dialogs, local persistence, export/import, all diagrams and 52 page/viewport
  combinations at desktop and mobile sizes. Rendered pages were visually checked.
- These checks do **not** establish physical electrical performance, timing,
  sensor calibration, reliability of conductive materials or accessibility of a
  particular physical build. Real Pico and circuit testing remains outstanding.
- The generic combined example uses one input and one sound maker. The guitar and
  violin have their own multi-contact programs; learners can extend their own code.
- PIR variants share GP16 and sound makers share GP9: choose one of each.
- The site is static. GitHub Pages publishes the root of `main`.
