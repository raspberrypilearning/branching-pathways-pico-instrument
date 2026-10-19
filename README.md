# Pico Musical Instrument

A branching pathway for making a playable musical instrument with Raspberry Pi
Pico, MicroPython and picozero. This is a separate project from Build Lab.

**[Open the pathway](https://raspberrypilearning.github.io/branching-pathways-pico-instrument/)**

## Learner journey

Everyone opens and saves the starter, connects a Pico and runs the onboard LED
and Shell-message check first. The learner confirms the result; the website does
not connect to or inspect hardware.

After that, the parts hub is open in any order:

- Make the body: cut/fold/join, adapt an object, wrap/stitch/stuff, or follow an idea.
  Techniques can be combined; no named instrument or body type is selected.
- Choose a sound maker: active buzzer or passive piezo buzzer, with label clues
  and optional steady-signal/two-pitch listening tests to help identify the part.
- Make some sounds: named notes, sharps, octaves, rests and beat-based phrases
  using picozero `Speaker` on a passive buzzer; also beeps, rhythms and pitch slides.
- Make the controls: 10 Pico Detect cards from Skills Bricks, with several
  control ideas saved together rather than a single exclusive choice.
- Bring it together: invent a rule, then borrow optional code for one control,
  two independent actions, or repeated homemade contacts. Keep personal code too.
- Play and change it: a performance, an optional note and a saved version.

Prerequisites are warnings with links, not locks after the Pico check. Following
one keeps a return link to the originating part. Controls can be tested using
printed readings without a buzzer. Code can be explored before wiring, and a
body can be crafted before either. Completed test ticks are self-reported.

Each hardware option includes the original Skills Bricks wiring and code snippet
on the page, alongside a runnable adaptation and the relevant kit/pin guidance.
Body and sound exploration pages retain a component reference area. Setup uses
Build Lab's instructions, troubleshooting dialogs and six original screenshots.

## Optional inspiration

Pico guitar, Pico violin, Pico drumkit and Pico theremin are examples, not pathway choices. They live under “Ideas to
borrow”, separate from the parts hub and body techniques. Learners can borrow
a contact technique without inheriting a shape, instrument name or playing rule.

The guitar uses fret buttons and a homemade pick switch: foil on the pick is
connected to GND, and foil on the body to GP2. Contact plays the selected note.
The violin uses three separated conductive threads as note contacts and a
conductive bow connected to GND. Contact with a thread plays its note. The
drumkit uses metal pots or pans as separate switches: foil-covered chopsticks
or pencils connect to GND and a tap triggers a short electronic drum sound.
The theremin uses a 3.3 V-compatible HC-SR04P distance sensor to change pitch,
with optional dial-only, distance-plus-dial and two-distance-sensor programs.

The contact examples retain the Skills Bricks button on GP10 and passive buzzer on GP9.
Additional contacts use GP0, GP1 and (for the pick) GP2, the free pins in the
Skills Bricks Pico pin map. A table explicitly describes the extra connections;
the unchanged button diagram illustrates the repeated contact-to-GND circuit.
Contact examples use one note at a time. The first held contact wins if several close.
The theremin keeps the Skills Bricks distance sensor on GP20/GP21, potentiometer
on GP26 and passive buzzer on GP9; a second distance sensor uses GP18/GP19.

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
- 569 Python programs pass syntax parsing, including every compatible pair recipe.
- 52 input/sound and instrument programs and 10 two-control scenarios pass
  simulation tests for independent actions, pulse and pitch changes, missing
  echoes, slow temperature probes, contact notes and shutdown.
- Browser checks cover the setup gate, a body-first route, prerequisite returns,
  open body techniques, multiple kept controls, rule choices, pin conflicts,
  help dialogs, buzzer identification, named-note downloads, local persistence,
  export/import, all diagrams and 66 page/viewport
  combinations at desktop and mobile sizes. Rendered pages were visually checked.
- These checks do **not** establish physical electrical performance, timing,
  sensor calibration, reliability of conductive materials or accessibility of a
  particular physical build. Real Pico and circuit testing remains outstanding.
- Code recipes are explicitly scoped examples: one control, two different
  controls, or three repeated contacts. They do not overwrite a learner’s own
  code or imply that every kept control is included. More elaborate rules remain
  editable in MicroPython. Two-control recipes support either/both actions, or
  one action gating pitch/pulse speed from a changing-value second input.
- Old single-control saves migrate into the control-idea collection without
  losing notes or code. Old guitar/violin links still open the optional examples.
- Sound makers share GP9: choose one at a time.
- PIR and AM312 are excluded from the instrument component choices. Older saves
  drop those selections while keeping notes and personal code; old links return
  to the control chooser.
- The four new listening/named-note programs were also run against the actual
  picozero implementation with mocked GPIO/time: pitches, rest and note lengths,
  tempo, normal shutdown and interrupted playback passed. This checks the API,
  not the physical sound.
- The site is static. GitHub Pages publishes the root of `main`.
