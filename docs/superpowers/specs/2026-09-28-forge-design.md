# FORGE — Design Spec

**Dátum:** 2026-09-28
**Státusz:** jóváhagyásra vár
**Nyelv:** a spec magyarul, a kód és a kódbeli azonosítók angolul

---

## 1. Cél

Beni egyetlen asztali alkalmazásból akar megtanulni **kódolni, robotot építeni,
fizikát érteni és CAD-et használni**. Az app nem referenciakönyv és nem videótár:
vezetett napi adagokban tanít, minden anyagot gyakorlással zár le, és
motivációs rendszerrel tartja bent a felhasználót.

**Sikerkritérium:** Beni 30 egymást követő napon ki tudja nyitni az appot, 15–30
perc alatt le tud tolni egy napi adagot (lecke → gyakorlás → kvíz → jegyzet), és
a 30. nap végén tud olyat, amit az elején nem — konkrétan: kódot ír, ami egy
szimulált robotot végigvezet egy pályán.

**Nem cél:**
- Valódi CAD-kernel írása (a CAD Lab tanít és gyakoroltat, nem vált ki egy FreeCAD-et).
- Felhő, fiók, szerver, szinkron. Minden helyben fut és helyben tárol.
- AI-generált tananyag. A tartalom megírt és verziózott.
- Bármilyen kapcsolat a meglévő N.E.X.O. rendszerrel.
- Valódi hardver (mikrokontroller) vezérlése. Későbbi bővítés lehet, most nincs benne.

---

## 2. Technológia

| Réteg | Választás | Indok |
|---|---|---|
| Asztali héj | **Tauri 2** (Rust) | A gépen már megvan a `rustc 1.98`, `webkit2gtk-4.1`, `libsoup-3.0`. ~10 MB bundle Electron ~200 MB-ja helyett. |
| UI | **React 19 + TypeScript + Vite** | Gyors dev-loop, típusos tartalommodell. |
| 3D | **Three.js** | Robot Lab, CAD-nézegető. |
| Kódszerkesztő | **CodeMirror 6** | Könnyű, jól témázható, offline. |
| Python futtatás | **Pyodide** (npm csomagból, lokálisan bundle-ölve) | Böngészőben futó CPython, internet nélkül. |
| Állapot | **Zustand** | Kicsi, boilerplate-mentes. |
| Stílus | **Natív CSS + CSS custom properties** | A futurisztikus látvány (glow, scanline, üvegpanel) egyedi CSS-t igényel; a témaváltás CSS-változó-cserével triviális. |
| Teszt | **Vitest** | Vite-tal egy konfig. |

**Offline követelmény:** semmilyen futásidejű CDN-hívás. Minden asset (fontok,
Pyodide wasm, modellek) a bundle-ben.

---

## 3. Fő architektúra

```
FORGE/
├── src-tauri/               # Rust héj: ablak, fájl-IO parancsok
│   └── src/lib.rs           #   load_state / save_state / export_notes
├── src/
│   ├── app/                 # shell, routing, layout
│   ├── engine/              # TISZTA LOGIKA, UI nélkül, tesztelve
│   │   ├── progress.ts      #   XP, szint, napi teljesítés
│   │   ├── streak.ts        #   streak számítás, freeze, mérföldkövek
│   │   ├── rewards.ts       #   jutalom-katalógus + feloldás
│   │   ├── quiz.ts          #   pontozás, kiértékelés
│   │   ├── srs.ts           #   ismétlés-ütemező
│   │   ├── notebook.ts      #   jegyzet-összeállítás, keresés, export
│   │   └── storage.ts       #   perzisztencia adapter (Tauri fs | localStorage)
│   ├── i18n/                # nyelvi motor + ui/hu.ts, ui/en.ts
│   ├── content/             # TANANYAG (típusos TS modulok)
│   │   ├── types.ts
│   │   ├── hu/tracks/{code,robotics,physics,cad}.ts
│   │   └── en/tracks/{code,robotics,physics,cad}.ts
│   ├── features/
│   │   ├── dashboard/  track/  lesson/  quiz/  notebook/  rewards/
│   │   ├── codelab/    # szerkesztő + JS worker runner + Pyodide runner
│   │   ├── robotlab/   # Three.js szimulátor
│   │   ├── physicslab/ # canvas szimulációk
│   │   └── cadlab/     # STL/3MF nézegető + mini parametrikus modellező
│   └── ui/                  # újrahasznált komponensek (Panel, Button, Meter…)
└── docs/superpowers/specs/
```

**Elv:** az `engine/` réteg tiszta függvényekből áll, nem ismer Reactet és nem
ismer DOM-ot. Minden motivációs és pontozási szabály itt él, és unit tesztelt.
A `features/` réteg csak megjeleníti.

---

## 4. Tartalommodell

A tananyag **típusos TypeScript modul**, nem futásidőben parse-olt JSON — így a
fordító jelzi, ha egy leckéből hiányzik a jegyzet vagy az egyik nyelv.

```ts
type Domain = 'code' | 'robotics' | 'physics' | 'cad';

interface Track  { id: Domain; title: string; blurb: string; days: Day[]; }

interface Day {
  day: number;              // 1..30
  title: string;
  minutes: number;          // becsült idő
  lesson: Block[];          // az anyag
  lab?: LabTask;            // gyakorlat (opcionális)
  quiz: Question[];         // 3–6 kérdés
  note: NoteSource;         // a jegyzet (lásd 6.)
}

type Block =
  | { k: 'text';    md: string }
  | { k: 'code';    lang: 'py'|'js'; src: string; explain?: string }
  | { k: 'formula'; tex: string; explain: string }
  | { k: 'callout'; tone: 'tip'|'warn'|'key'; md: string }
  | { k: 'sim';     sim: SimId; params?: Record<string, number> }   // Physics Lab beágyazás
  | { k: 'robot';   scene: SceneId }                                 // Robot Lab beágyazás
  | { k: 'model';   src: string };                                   // 3D modell beágyazás

type Question =
  | { k: 'single';  q: string; opts: string[]; answer: number; why: string }
  | { k: 'multi';   q: string; opts: string[]; answers: number[]; why: string }
  | { k: 'numeric'; q: string; answer: number; tol: number; unit?: string; why: string }
  | { k: 'output';  q: string; code: string; opts: string[]; answer: number; why: string }
  | { k: 'order';   q: string; items: string[]; correct: number[]; why: string };

interface LabTask {
  lab: 'code' | 'robot' | 'physics' | 'cad';
  brief: string;
  starter?: string;          // előre betöltött kód
  checks: Check[];           // automatikus ellenőrzés
  hints: string[];
}
```

**Nyelvek.** A `content/hu/` és `content/en/` ugyanazt a struktúrát adja vissza.
Egy `assertParity()` teszt végigmegy mindkettőn, és elbukik, ha eltér a napok
száma, egy nap kérdéseinek száma, vagy hiányzik egy jegyzet. A UI-szövegek külön
`i18n/ui/{hu,en}.ts` kulcstáblában; egy teszt ellenőrzi, hogy a két kulcshalmaz
azonos.

---

## 5. Négy trek, 30-30 nap

| Trek | Út |
|---|---|
| **KÓD** | változó → elágazás → ciklus → függvény → lista/dict → fájl → osztály → hibakezelés → modul → **robotvezérlő kód** |
| **ROBOTIKA** | mi az a robot → szenzorok → motorok/szervók → H-híd, PWM → hajtáslánc → odometria → egyenes/inverz kinematika → PID → akadálykerülés → útvonaltervezés |
| **FIZIKA** | mértékegység, vektor → kinematika → Newton → energia, munka → forgómozgás, nyomaték → súrlódás → áram, feszültség, Ohm → mágnesesség, motor → hő, hatásfok |
| **CAD** | nézetek, koordináták → vázlat, kényszerek → extrude/revolve → fillet/chamfer → szerelvény → tűrés, illesztés → nyomtatásra tervezés (falvastagság, támasz, orientáció) → STL/3MF export |

**1. körben teljesen megírva: a KÓD trek mind a 30 napja.** A másik három trek
váza + első 5-5 napja. A 2. kör tölti fel a maradékot. Ezt az app is jelzi: a
még nem megírt napok „Hamarosan" állapotban látszanak, nem üres képernyőként.

---

## 6. Jegyzet-rendszer (Notebook)

Minden lecke lezárásakor a jegyzet **automatikusan** bekerül a Jegyzetfüzetbe.

A jegyzet forrása három részből áll össze:

1. **Megírt összefoglaló** (`note.summary`) — 5–12 pontban a lecke lényege,
   plusz a képletek és a kódminták. Ez a tartalom része, kézzel írt.
2. **Kulcsfogalmak** (`note.terms`) — fogalom → egymondatos definíció.
3. **Automatikus „Figyelj erre!" blokk** — a kvízben elrontott kérdések
   magyarázata (`why` mező), futásidőben hozzáfűzve. Ha mindent eltaláltál,
   ez a blokk nem jelenik meg.

Ezen felül minden jegyzethez a felhasználó **saját megjegyzést** írhat, ami
külön mezőben tárolódik és exportkor is megmarad.

**Jegyzetfüzet nézet:** lista trek és nap szerint csoportosítva, teljes szöveges
keresés, szűrés fogalomra/trekre, „csak amit elrontottam" szűrő.

**Export:** egyetlen Markdown fájl (teljes vagy trekenként) a Rust oldali
`export_notes` paranccsal fájlba írva, plusz nyomtatás→PDF a rendszer
nyomtatódialógusán át. Az export mindig az aktuális nyelven készül.

---

## 7. Laborok

### Code Lab
CodeMirror szerkesztő + kimeneti konzol. JavaScript egy **Web Workerben** fut
(időkorlát: 3 s, `terminate()` ha túllépi). Python **Pyodide**-ban, külön
workerben, lazán betöltve (első használatkor, utána cache-elve).
Feladat-ellenőrzés: a `checks` tömb futtat állításokat a kód kimenetén vagy a
definiált függvényein — tehát a feladat akkor pipa, ha a kód **tényleg**
megoldja, nem ha úgy néz ki.

### Robot Lab
Three.js jelenet, közös vezérlő API-val:

- **Rover** — differenciálhajtású mobil robot, távolságérzékelőkkel.
  API: `rover.forward(cm)`, `rover.turn(deg)`, `rover.distance()`, `rover.color()`.
- **Kar** — 6 tengelyes robotkar, megfogóval.
  API: `arm.joint(i, deg)`, `arm.moveTo(x,y,z)`, `arm.grip(open)`.

Három vezérlési mód ugyanarra a robotra: **csúszkák**, **billentyűzet (WASD)**,
és **kód** a Code Lab-motorral. A szimuláció egyszerűsített fizikát használ
(ütközés, súrlódás, szervó-sebességkorlát) — nem merev testes motor, hanem
kinematikai léptetés, mert tanításhoz ez olvashatóbb és determinisztikus.

Küldetések: haladj a célig · kerüld ki az akadályt · kövesd a vonalat ·
pakold át a kockát · parkolj be. Minden küldetés gépileg ellenőrzött
sikerfeltétellel.

### Physics Lab
Canvas 2D szimulációk, valós idejű csúszkákkal és kiírt képlettel:
ferde hajítás · rugó és csillapítás · lejtő és súrlódás · nyomaték és
egyensúly · soros/párhuzamos áramkör · egyenáramú motor és mágneses tér.
Minden szimuláció beágyazható leckébe (`{ k: 'sim' }` blokk).

### CAD Lab
- **Nézegető:** STL és 3MF betöltés (a saját fájljaid is), forgatás, metszet,
  méretek, falvastagság-jelzés.
- **Mini modellező:** parametrikus primitívek (kocka, henger, gömb), transzformáció,
  boolean művelet — a vázlat/extrude/fillet fogalmak *gyakorlására*, nem
  gyártásra.
- **Vezetett feladatok:** lépésről lépésre FreeCAD-ben/Fusionban, a beépített
  ellenőrzőlistával.

---

## 8. Motivációs rendszer

**Napi cél:** 1 lecke + 1 kvíz (a kvíz ≥60%-on számít teljesítettnek).
A nap akkor pipa, ha mindkettő megvan.

**Streak:** egymást követő teljesített napok. Helyi dátum szerint (éjfél a
váltás). Egy kihagyott nap nullázza — **kivéve**, ha van elérhető *streak
freeze*: minden 10. elért streak-napon kapsz egyet (10., 20., 30. …), maximum 2
áll készenlétben, és automatikusan elhasználódik egyetlen kihagyott napra. Ha
nincs freeze és kihagysz egy napot, a számláló nullázódik, de az addig megszerzett
XP, jelvények és jutalmak **soha nem vesznek el**.

**XP és szint:** lecke 20 XP, kvíz 10–30 XP (pontosság szerint), labor-feladat
40 XP, napi cél teljesítése +25 XP bónusz. Szintküszöb: `100 * szint^1.35`.

**Jutalmak streak-mérföldköveknél:**

| Nap | Jutalom |
|---|---|
| 3 | **Amber Core** színtéma |
| 7 | **Mk-II robot skin** a Robot Labhoz |
| 10 | +1 streak freeze |
| 14 | **Új pálya:** Raktár (dobozpakolós küldetések) |
| 21 | **Hologram UI mód** (scanline + parallax felület) |
| 30 | **Trek-jelvény** + a következő trek feloldása + **Void színtéma** |

Ezen felül teljesítmény-jelvények (első hibátlan kvíz, első saját kóddal
megoldott robotküldetés, 10 jegyzet, minden fizika-szimuláció kipróbálva).
A jutalmak **valódi, használható tartalmat oldanak fel** — nem csak ikont —,
mert különben nem motiválnak.

**Ismétlés (SRS):** minden elrontott kérdés bekerül egy sorba, és 1 / 3 / 7 /
16 nap múlva visszajön a napi adag elején, rövid „Ismétlés" blokként.

---

## 9. Perzisztencia

Egyetlen JSON állapot a Tauri app-data könyvtárban
(`~/.local/share/forge/state.json`), atomikus írással (temp fájl + rename).
Séma-verzió mező, és migrációs függvény, ha később változik a szerkezet.
Böngészős dev módban ugyanaz az interfész `localStorage` fölött, hogy a
fejlesztés ne igényeljen Tauri-buildet.

Mentett adat: nyelv, téma, aktív trek, napi haladás, XP/szint, streak-állapot,
feloldott jutalmak, kvíz-eredmények, SRS-sor, jegyzetek + saját megjegyzések,
Code Lab mentett kódjai.

**Backup:** a Beállításokban „Mentés exportálása / importálása" — egy JSON fájl.

---

## 10. Megjelenés

Sötét alap (`#05070d`), neon cián (`#22e6ff`) és magenta (`#ff3ea5`) kiemelés,
üvegpanelek finom kerettel, halk glow, monospace számok. Animált oldalváltás,
de **beállításban kikapcsolható** (`prefers-reduced-motion` is tiszteletben
tartva). Legalább 16px alapszöveg, WCAG AA kontraszt a szövegen — a látvány
nem mehet az olvashatóság rovására, mert az app fő tevékenysége az olvasás.

Témák: **Cyan Core** (alap), **Amber Core** (3 nap), **Void** (30 nap),
plusz egy **világos** téma alapból, ha nappal zavaró a sötét.

---

## 11. Tesztelés

TDD az `engine/` rétegre — ott van a szabályok súlya:

- `streak.test.ts` — folytatás, nullázás, freeze elhasználása, időzóna-váltás, visszafelé állított óra
- `progress.test.ts` — XP, szintlépés, napi cél teljesülés
- `rewards.test.ts` — mérföldkövek pontosan egyszer oldódnak fel
- `quiz.test.ts` — mind az 5 kérdéstípus pontozása, numerikus tűrés
- `srs.test.ts` — ütemezés, sorrend
- `notebook.test.ts` — jegyzet-összeállítás, a „Figyelj erre" blokk csak hibánál
- `content.test.ts` — HU/EN paritás, minden napnak van jegyzete és kvíze, minden `sim`/`scene` hivatkozás létezik
- `storage.test.ts` — mentés/visszatöltés, séma-migráció

A labor-futtatókra (worker, Pyodide, Three.js) füstteszt: elindul, lefut egy
minta-feladat, az ellenőrzés helyesen mond igazat és hamisat.

---

## 12. Szállítás

**1. kör:** minden fenti modul működik; KÓD trek 30 napja kész; robotika/fizika/
CAD trek 5-5 nap. Futtatás: `npm run dev` (böngésző) és `npm run tauri dev`
(asztali ablak). Csomagolás: `npm run tauri build` → `.AppImage` és `.deb`,
plusz `.desktop` bejegyzés.

**2. kör:** a maradék 75 nap tartalma.

---

## 13. Nyitott kérdés, amit menet közben döntök el

A TeX-képletek megjelenítéséhez KaTeX kell (~150 KB). Ha a bundle-méret gond
lenne, a képletek egyszerű HTML/unicode formában is megoldhatók. **Döntés:**
KaTeX-szel indulok, mert a fizika trek végig képletekkel dolgozik, és a méret
asztali appnál nem számít.
