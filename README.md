# 🔨 FORGE

**Learn to code, build robots and model in CAD — without ever going online.**

Eight tracks. Thirty days each. 480 hand-written lessons in Hungarian and
English, and an app that runs entirely on your own machine.

*[Magyar leírás](README.hu.md)*

---

## 🎯 What you will be able to do

| Track | Where you get to by day 30 |
|---|---|
| 🐍 **Python** | Write programs that read sensors and drive a robot |
| ☕ **Java** | Classes, generics, streams, threads — and a small finished app |
| ⚙️ **C** | Pointers, memory, and code running on a microcontroller |
| 🧩 **C++** | RAII, templates, the STL, and modern C++ habits |
| 🤖 **Robotics** | PID control, line following, mapping, A* path planning |
| 📐 **CAD** | A printable part, properly toleranced, and a full chassis |
| 🎨 **Blender** | Modelling, materials, lighting, rigging, a portfolio render |
| ⚡ **Physics** | Forces, circuits, motors, heat — the maths behind the robot |

## 📖 What a day looks like

**Read → practise → quiz → note.** Twenty minutes.

Lessons come one screen at a time, so there is nothing to scroll past. At the
end you get a **note written for you**: a summary, the key terms, and a
"watch out" block built from the quiz questions you actually got wrong. The
notebook is searchable and exports to Markdown, so six months later you still
have the thing you learned.

Finish a day and you keep your **streak**. Milestones unlock real things —
themes, robot skins, new arenas — not badges for the sake of badges.

## 🧪 Four labs you can play in

- **Code Lab** — Python runs locally through [Pyodide](https://pyodide.org/),
  JavaScript in a sandboxed worker. Exercises are checked by *running* your
  code. An infinite loop gets terminated instead of freezing the app.
- **Robot Lab** — a 3D rover and a six-axis arm. Drive them with sliders, with
  W/S/A/D, or **with your own code**. Missions are judged on what the robot
  actually did.
- **Physics Lab** — six simulations (projectile, spring, incline, torque,
  circuit, DC motor), each checked against the analytic solution.
- **CAD Lab** — an STL and 3MF viewer with section view, dimensions and
  volume. Opens your own files too.

## 🌍 Languages

The interface speaks **Hungarian, English, German and Spanish**. Lessons are
written in Hungarian and English; the other two fall back to English until
somebody translates them.

## ⬇️ Download

Linux builds live on the [Releases](../../releases) page.

**AppImage** — no installation, no root:

```bash
chmod +x FORGE_0.1.0_amd64.AppImage
./FORGE_0.1.0_amd64.AppImage
```

Move it somewhere permanent first (`~/Applications/` is a good spot) if you
want a menu entry, because the launcher points at wherever the file lives.

**Debian / Ubuntu:**

```bash
sudo dpkg -i FORGE_0.1.0_amd64.deb
```

Windows and macOS are not built yet. It is a standard Tauri 2 app, so they
should work from source — just untested.

## 🔒 Your data stays yours

Everything lives in one file on your machine:

```
~/.local/share/hu.forge.app/state.json
```

No account, no telemetry, **no network access at all** — the Python runtime
ships inside the app. Back it up from **Settings → Backup**, or copy that
file. Delete it and you are back to a clean slate.

## 🛠️ Build from source

Needs [Node.js](https://nodejs.org/) 20+ and the
[Tauri prerequisites](https://tauri.app/start/prerequisites/) (Rust, plus
WebKitGTK and friends on Linux).

```bash
git clone https://github.com/benbyte-labs/forge.git
cd forge
npm install
npm run tauri dev          # desktop window
npm run tauri build        # .AppImage and .deb into src-tauri/target/release/bundle/
```

`npm run dev` serves the interface in a browser at `http://localhost:1420` if
you would rather work there.

<details>
<summary>How the project is organised</summary>

```
src/engine/     pure rules, no UI — the tested core
src/content/    the curriculum, as typed modules (hu/ and en/)
src/features/   one folder per screen: lesson, quiz, labs, notebook
src/i18n/       interface translations, with fallback to English
src-tauri/      the Rust shell: window, file dialogs, atomic saves
```

Lessons are TypeScript modules rather than runtime JSON on purpose: a missing
day or a malformed block is a compile error, not a crash in front of a learner.

`npm test` runs 385 tests. The rules — XP, streaks, rewards, quiz scoring,
spaced repetition, note building — are pure functions tested directly, and an
architecture test keeps that layer free of React, Three.js and Tauri imports.
The curriculum has its own validation suite: a day missing its note, a
mismatch between the Hungarian and English versions, or two days in a track
sharing a title all break the build rather than reaching a learner.

Adding a lesson means writing it in both `src/content/hu/tracks/` and
`src/content/en/tracks/`, then running `npm test` — it will tell you what is
missing. Adding an interface language needs only one dictionary: copy
`src/i18n/ui/hu.ts` and translate what you can; missing keys fall back to
English.

</details>

## 🙋 How this got made

I am learning to program myself, and I wanted the app I wished existed: one
place that teaches coding, robots, physics and CAD together, offline, with
real notes at the end of every lesson.

I built it with **[Claude](https://claude.com/claude-code)** — the code, the
480 lessons, all of it, written together over a stretch of long sessions. If
you are also learning and that sounds like a strange way to build something:
it taught me more than any tutorial did, because I had to decide what the
thing should *be* at every step.

## 📄 Licence

[MIT](LICENSE) — use it, change it, build on it.
