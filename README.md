# FORGE

Asztali tanulóapp programozáshoz, robotikához, fizikához, CAD-hez és
Blenderhez. Offline fut, négy nyelven, és minden lecke után jegyzetet ad,
amiből később tanulhatsz.

## Mit tud

- **Nyolc trek, 30-30 nap** — négy programozási nyelv (Python, Java, C, C++),
  Robotika, Fizika, CAD és Blender. Összesen 240 nap nyelvenként, kézzel
  megírva. Minden nap: lecke → gyakorlat → kvíz → jegyzet.
- **Kód Labor** — beépített szerkesztő. A Python a gépeden fut (Pyodide),
  internet nélkül. A feladatot futtatás ellenőrzi, nem a kód kinézete.
- **Robot Labor** — 3D rover és hattengelyes robotkar. Irányítható csúszkával,
  billentyűzettel (W/S/A/D) és **a saját kódoddal**. A küldetéseket a gép
  ellenőrzi abból, amit a robot ténylegesen csinált.
- **Fizika Labor** — hat interaktív szimuláció: ferde hajítás, rugó, lejtő,
  nyomaték, áramkör, egyenáramú motor. Mindegyik analitikus megoldáshoz van
  hitelesítve.
- **CAD Labor** — STL és 3MF nézegető: forgatás, drótváz, metszet, méretek,
  térfogat. A saját fájljaidat is megnyitja.
- **Jegyzetfüzet** — minden lecke után automatikus jegyzet: összefoglaló,
  fogalmak, és egy „Figyelj erre!" blokk abból, amit a kvízben elrontottál.
  Kereshető (ékezet nélkül is), saját megjegyzéssel bővíthető, Markdownba
  exportálható.
- **Streak és jutalmak** — napi cél, sorozatszámláló, streak freeze, XP és
  szintek. A mérföldkövek valódi tartalmat oldanak fel: témát, robot-festést,
  új pályát.

## Futtatás

Fejlesztés böngészőben:

```bash
npm install && npm run dev
```

Asztali ablakban:

```bash
npm run tauri dev
```

Telepíthető csomag készítése:

```bash
npm run tauri build
```

Az eredmény a `src-tauri/target/release/bundle/` alatt található `.AppImage`
és `.deb` fájl.

## Hol vannak az adataid

Minden helyben marad, `~/.local/share/hu.forge.app/state.json`. Semmi nem megy
ki a gépről, és az app soha nem hív hálózatot.

Mentés készítése és visszatöltése: **Beállítások → Mentés**.

## Tesztek

```bash
npm test
npm run typecheck
```

A szabályok (XP, streak, jutalmak, kvízpontozás, ismétlés, jegyzet) tiszta
függvények a `src/engine/` alatt, UI nélkül, végigtesztelve. A tananyagot egy
validációs teszt őrzi: ha egy napból hiányzik a jegyzet, vagy a magyar és az
angol változat eltér, a teszt elbukik, nem a felhasználó lát üres képernyőt.

## Új tanulónap hozzáadása

1. Írd meg a napot `src/content/hu/tracks/<trek>*.ts`-ben és ugyanazt
   `src/content/en/tracks/<trek>*.ts`-ben. A hosszabb treket több fájlra bontjuk
   (`cad.ts`, `cad-b.ts`, `cad-c.ts`, ...), és a `cad.ts` fűzi össze őket.
2. `npm test` — a validációs teszt megmondja, ha valami hiányzik. Ellenőrzi azt
   is, hogy a nap címe egyezik a `plannedTitles` megfelelő elemével, és hogy
   egy treken belül nincs két azonos című nap.

## Nyelvek

A felület magyarul, angolul, németül és spanyolul van meg. A tananyag magyarul
és angolul teljes; a másik két nyelven a leckék angolul jelennek meg, amíg nincs
fordítás — ezt a `CONTENT_FALLBACK` intézi a `src/content/index.ts`-ben.

Új nyelv hozzáadása:

1. Másold `src/i18n/ui/hu.ts`-t egy új fájlba, és fordítsd le. Elég a
   `Partial<Record<UiKey, string>>`: ami hiányzik, az angolra esik vissza.
2. Vedd fel a `Locale` típusba (`src/engine/types.ts`) és a `DICTS` táblába
   (`src/i18n/index.tsx`).
3. A tananyag fordítása külön lépés: hozd létre a `src/content/<nyelv>/tracks/`
   mappát, és vedd fel a `TRACKS` táblába.

## Amit szándékosan nem tud

Nem valódi CAD-kernel: a CAD Labor tanít és gyakoroltat, nem vált ki egy
FreeCAD-et. Nem vezérel valódi hardvert. A Java, C és C++ leckék kódja olvasásra
és kvízre való — ezek a nyelvek nem futnak az appon belül, csak a Python és a
JavaScript. Nem használ AI-t: a tananyag megírt és verziózott.
