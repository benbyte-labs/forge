# FORGE

An offline desktop app for learning to program, build robots, and work with
physics, CAD and Blender. Eight 30-day tracks, hand-written in Hungarian and
English, with a note generated after every lesson so you can revise later.

*[Magyar leírás](README.hu.md)*

---

## What it is

FORGE is a single desktop window with no account, no telemetry and no network
access at all. Everything — including the Python runtime — ships inside the
app and runs on your machine.

**Eight tracks, 30 days each.** Every day is one lesson: read → practise →
quiz → note.

| Group | Tracks |
|---|---|
| Programming | Python, Java, C, C++ |
| Making | Robotics, CAD, Blender |
| Science | Physics |

That is 240 days per language, 480 lessons in total, all written by hand
rather than generated.

## Features

- **Code Lab** — a built-in editor. Python runs locally through
  [Pyodide](https://pyodide.org/); JavaScript runs in a sandboxed worker.
  Exercises are checked by running your code, not by matching text.
  Runaway loops are terminated rather than freezing the app.
- **Robot Lab** — a 3D rover and a six-axis arm. Drive them with sliders, with
  the keyboard (W/S/A/D), or **with your own code**. Missions are judged on
  what the robot actually did.
- **Physics Lab** — six interactive simulations (projectile, spring, incline,
  torque, circuit, DC motor), each verified against an analytic solution.
- **CAD Lab** — an STL and 3MF viewer with rotation, wireframe, section view,
  dimensions and volume. It opens your own files too.
- **Notebook** — every finished lesson writes a note: a summary, the key terms,
  and a "watch out" block built from the quiz questions you got wrong.
  Searchable (accent-insensitive), extendable with your own remarks, and
  exportable to Markdown.
- **Streaks and rewards** — a daily goal, a streak counter with freezes, XP and
  levels. Milestones unlock real content: themes, robot skins, new arenas.
- **Four interface languages** — Hungarian, English, German and Spanish.
  Lessons exist in Hungarian and English; the other two fall back to English
  until translated.

## Download

Prebuilt Linux packages are published on the
[Releases](../../releases) page.

### AppImage (any Linux distribution)

```bash
chmod +x FORGE_0.1.0_amd64.AppImage
./FORGE_0.1.0_amd64.AppImage
```

No installation and no root needed. To get a menu entry, move it somewhere
permanent first — `~/Applications/` is a good spot — because the launcher
points at wherever the file lives.

### Debian and Ubuntu

```bash
sudo dpkg -i FORGE_0.1.0_amd64.deb
```

### Other platforms

Only Linux builds are published at the moment. The project is a standard
Tauri 2 app, so Windows and macOS builds should work from source — they have
simply not been tested.

## Build from source

You need [Node.js](https://nodejs.org/) 20 or newer and the
[Tauri prerequisites](https://tauri.app/start/prerequisites/) for your system
(Rust, plus WebKitGTK and a few build tools on Linux).

```bash
git clone https://github.com/<user>/forge.git
cd forge
npm install
```

Run it in a desktop window:

```bash
npm run tauri dev
```

Build installable packages:

```bash
npm run tauri build
```

The `.AppImage` and `.deb` land in `src-tauri/target/release/bundle/`.

To work on the interface in a browser instead, `npm run dev` serves it at
`http://localhost:1420`. The labs all work there; only the file dialogs need
the desktop shell.

## Where your data lives

Everything stays on your machine, in a single file:

```
~/.local/share/hu.forge.app/state.json
```

Nothing leaves the computer, and the app never opens a network connection.

Back it up or restore it from **Settings → Backup**, or just copy that file.
Deleting it resets the app to a clean state.

## Tests

```bash
npm test
npm run typecheck
```

The rules — XP, streaks, rewards, quiz scoring, spaced repetition, note
building — are pure functions under `src/engine/` with no UI, and they are
tested directly. An architecture test keeps that layer free of React, Three.js
and Tauri imports, so the logic stays portable and fast to test.

The curriculum has its own validation suite: if a day is missing its note, if
the Hungarian and English versions disagree about which days or questions
exist, if two days in a track share a title, or if a day's title has drifted
from the planned 30-day arc, the tests fail. A content mistake breaks the
build rather than reaching a learner as an empty screen.

## Project layout

```
src/engine/     pure rules, no UI — the tested core
src/content/    the curriculum, as typed modules (hu/ and en/)
src/features/   one folder per screen: lesson, quiz, labs, notebook
src/i18n/       interface translations, with fallback to English
src-tauri/      the Rust shell: window, file dialogs, atomic saves
```

Lessons are TypeScript modules rather than runtime JSON on purpose: a missing
day or a malformed block is a compile error, not a crash in front of a learner.

## What it deliberately does not do

It is not a CAD kernel — the CAD Lab teaches and drills, it does not replace
FreeCAD. It does not drive real hardware. The Java, C and C++ lessons are for
reading and quizzing; only Python and JavaScript execute inside the app. And
it uses no AI: the curriculum is written and version-controlled.

## Contributing

Adding a lesson day means writing it in both `src/content/hu/tracks/` and
`src/content/en/tracks/`, then running `npm test` — the validation suite will
tell you what is missing. Longer tracks are split across several files
(`cad.ts`, `cad-b.ts`, `cad-c.ts`, …) that the main file stitches together.

Adding an interface language needs only one dictionary: copy
`src/i18n/ui/hu.ts`, translate what you can, and register it in
`src/engine/types.ts` and `src/i18n/index.tsx`. Missing keys fall back to
English, so a partial translation is still useful.
