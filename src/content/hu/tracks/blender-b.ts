import type { Day } from '../../types';

/** BLENDER trek, 4–10. nap. */
export const blenderHuB: Day[] = [
  {
    day: 4,
    title: 'Szerkesztő mód: pont, él, lap',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Objektum módban a tárgy egyben van. **Szerkesztő módban** (Tab) szétszedheted: a felület pontokból, élekből és lapokból áll.' },
      { k: 'text', md: 'A három kijelölési mód a numerikus 1, 2, 3 billentyűn:\n\n- **1** — pont (vertex)\n- **2** — él (edge)\n- **3** — lap (face)\n\nUgyanazt a geometriát nézed, csak más szemmel. A G/R/S ugyanúgy működik, csak most a kijelölt részekre.' },
      { k: 'callout', tone: 'key', md: 'Egy lapot három pont határoz meg legalább. A Blender kezeli a négyszögeket (quad) és a soknál több szögűeket (n-gon) is, de a **négyszög** a jó választás: szépen simítható és könnyen osztható tovább.' },
      { k: 'text', md: 'Kijelölés gyorsan:\n\n- **A** — minden\n- **Alt + A** — semmi\n- **L** — a kurzor alatti összefüggő rész\n- **Alt + kattintás élre** — egy teljes élhurok\n- **Ctrl + kattintás** — a legrövidebb út két kijelölés közt' },
      { k: 'callout', tone: 'tip', md: 'Nyomd meg a **Z**-t, és válaszd a drótvázat vagy az átlátszó módot, ha a tárgy túloldalán lévő pontokat is ki akarod jelölni. Enélkül csak az eléd néző felületet éred el.' },
    ],
    quiz: [
      { k: 'single', q: 'Mivel váltasz pont-, él- és lapkijelölés közt?', opts: ['Tab', 'Az 1, 2, 3 billentyűvel', 'Shift'], answer: 1, why: 'Szerkesztő módban az 1 a pont, a 2 az él, a 3 a lap. A Tab a módváltó objektum és szerkesztő mód közt.' },
      { k: 'single', q: 'Miért jobb a négyszög a háromszögnél modellezéskor?', opts: ['Kevesebb helyet foglal', 'Szépen simítható és könnyen osztható tovább', 'Gyorsabban renderelődik'], answer: 1, why: 'A négyszög rácsa előre jelezhetően viselkedik simításkor és élhurkoknál. A háromszögek megtörik a hurkokat.' },
      { k: 'single', q: 'Mit csinál az Alt + kattintás egy élen?', opts: ['Törli az élt', 'Kijelöl egy teljes élhurkot', 'Kettévágja'], answer: 1, why: 'Az élhurok a modell körbefutó élsora. Ez a leggyakoribb kijelölési mozdulat a modellezésben.' },
      { k: 'single', q: 'Mire való a Z billentyű ebben az összefüggésben?', opts: ['Visszavonás', 'Megjelenítési mód váltása, például drótvázra', 'Nagyítás'], answer: 1, why: 'A Z előhozza a megjelenítési módok menüjét. Drótvázban a tárgy túloldalán lévő pontokat is kijelölheted.' },
    ],
    note: {
      summary: ['Szerkesztő módban a felület pontokból, élekből és lapokból áll.', 'Kijelölési mód: 1 pont, 2 él, 3 lap.', 'A négyszög a jó alapegység: simítható és osztható.', 'Kijelölés: A minden, Alt+A semmi, L összefüggő rész, Alt+kattintás élhurok.', 'A Z billentyűvel drótvázra váltva a túloldali pontokat is eléred.'],
      terms: [{ term: 'vertex', def: 'Pont a térben; a felület legkisebb építőeleme.' }, { term: 'élhurok', def: 'A modellen körbefutó összefüggő élsor.' }, { term: 'n-gon', def: 'Négynél több oldalú lap, amit érdemes kerülni.' }],
    },
  },
  {
    day: 5,
    title: 'Extrude és inset',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Két művelet, amivel a legtöbb forma felépül. Ha ezt a kettőt megszokod, már tudsz modellezni.' },
      { k: 'text', md: '**Extrude (E)** — a kijelölt lapból új geometriát húzol ki. Ugyanaz a gondolat, mint a CAD extrude, csak itt szabadon, bármelyik lapból.\n\n**Inset (I)** — a lapon belül húzol egy kisebb, azonos alakú lapot. Ezzel készül a keret, a gomb, a mélyedés pereme.' },
      { k: 'code', lang: 'js', src: '// A tipikus sorrend egy mélyedéshez:\n// 1. jelöld ki a lapot\n// 2. I  (inset)  → kisebb lap belül\n// 3. E  (extrude) → majd mozgasd befelé\n// 4. Esc vagy jobb gomb, ha csak a helyén akarod hagyni', explain: 'Az Escape nem vonja vissza az extrude-ot, csak a mozgatást! A lap létrejön a helyén — ez a leggyakoribb kezdő hiba, és duplán fedő geometriát hagy.' },
      { k: 'callout', tone: 'warn', md: 'Ha véletlenül extrude-oltál és Escape-pel „visszavontad", a Blender **ottmarad** egy duplán fedő lappal. Ilyenkor Ctrl+Z, vagy később M → Merge by Distance takarítja el.' },
      { k: 'callout', tone: 'key', md: 'Extrude után a Blender a kijelölést az **új** részre teszi. Ezért lehet E, mozgat, E, mozgat sorozattal láncot építeni — kart, csövet, lépcsőt.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit csinál az inset (I)?', opts: ['Kihúzza a lapot', 'A lapon belül egy kisebb, azonos alakú lapot hoz létre', 'Törli a lapot'], answer: 1, why: 'Az inset befelé szűkít a lap síkjában. Keret, perem, gombfelület készül vele.' },
      { k: 'single', q: 'Mi történik, ha extrude után Escape-et nyomsz?', opts: ['Visszavonódik az egész', 'Az új geometria a helyén marad, duplán fedve', 'Semmi'], answer: 1, why: 'Az Escape csak a mozgatást szakítja meg. Az új lapok létrejöttek, és pontosan a régieken állnak — ebből lesznek a furcsa árnyékhibák.' },
      { k: 'single', q: 'Hova kerül a kijelölés extrude után?', opts: ['Az eredeti lapra', 'Az újonnan létrehozott részre', 'Semmire'], answer: 1, why: 'Ezért lehet egymás után többször E-t nyomni, és láncot építeni belőle.' },
      { k: 'order', q: 'Milyen sorrendben készítesz egy mélyedést egy lapon?', items: ['Extrude befelé', 'A lap kijelölése', 'Inset'], correct: [1, 2, 0], why: 'Előbb kijelölöd a lapot, insettel szűkítesz egy belső lapot, és azt nyomod befelé extrude-dal.' },
    ],
    note: {
      summary: ['Extrude (E): új geometriát húz ki a kijelölt lapból.', 'Inset (I): a lapon belül kisebb, azonos alakú lapot hoz létre.', 'Mélyedés receptje: kijelölés → inset → extrude befelé.', 'Extrude után Escape nem von vissza: a lap ottmarad duplán fedve.', 'Extrude után a kijelölés az új részre kerül, ezért lehet láncot építeni.'],
      terms: [{ term: 'extrude', def: 'Új geometria kihúzása a kijelölt lapból vagy élből.' }, { term: 'inset', def: 'Kisebb, azonos alakú lap létrehozása a lap síkjában.' }, { term: 'dupla geometria', def: 'Egymáson fekvő lapok, amik árnyékhibát okoznak.' }],
    },
  },
  {
    day: 6,
    title: 'Loop cut és felosztás',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A modellezés nagy része arról szól, hogy **ott legyen geometria, ahol kell** — és sehol máshol. A loop cut ennek a fő eszköze.' },
      { k: 'text', md: '**Ctrl + R** (loop cut): mozgasd az egeret egy felület fölé, és egy sárga körbefutó vonal jelenik meg. Kattints, és egy új élhurok keletkezik. Mozgasd, majd kattints újra a helyére — vagy jobb gombbal pontosan középre ejtsd.' },
      { k: 'callout', tone: 'tip', md: 'A loop cut előtt **görgethetsz**, hogy több hurkot egyszerre tegyél be. Hat egyenletes osztás egy mozdulattal — sokkal pontosabb, mint hatszor vágni.' },
      { k: 'text', md: 'A **subdivide** (jobb gomb → Subdivide) a kijelölt éleket osztja fel. Ez kevésbé irányított, mint a loop cut: könnyen hoz létre háromszögeket és rendetlen topológiát. Használd ritkán.' },
      { k: 'callout', tone: 'key', md: 'A felesleges geometria ugyanolyan baj, mint a hiányzó. Minden él, amit nem használsz formálásra, lassítja a munkát és rontja a simítást. Kérdezd meg: ez az élhurok csinál valamit?' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a loop cut billentyűje?', opts: ['Ctrl + R', 'Ctrl + L', 'Shift + D'], answer: 0, why: 'A Ctrl + R indítja a loop cutot; a sárga előnézeti vonal mutatja, hova kerül a hurok.' },
      { k: 'single', q: 'Mit csinál a görgetés loop cut közben?', opts: ['Nagyít', 'Növeli az egyszerre behelyezett hurkok számát', 'Elforgatja'], answer: 1, why: 'A görgetéssel több párhuzamos hurkot teszel be egyenletes elosztásban, egyetlen művelettel.' },
      { k: 'single', q: 'Miért érdemes kerülni a subdivide-ot?', opts: ['Lassú', 'Könnyen rendetlen topológiát és háromszögeket hoz létre', 'Nem működik quadokon'], answer: 1, why: 'A subdivide mindent feloszt, irányítás nélkül. A loop cut pontosan oda tesz élt, ahova kell.' },
      { k: 'single', q: 'Miért baj a felesleges geometria?', opts: ['Nem baj', 'Lassítja a munkát és rontja a simítást', 'Nagyobb lesz a fájl, más gond nincs'], answer: 1, why: 'Minden él, ami nem formál, csak zavar: nehezebb kijelölni, nehezebb módosítani, és a simítás is rosszabb lesz tőle.' },
    ],
    note: {
      summary: ['Ctrl + R a loop cut: körbefutó új élhurkot tesz be.', 'Loop cut közben a görgetés több hurkot helyez be egyenletesen.', 'Jobb gomb a loop cut mozgatása közben pontosan középre ejti.', 'A subdivide irányítatlan: rendetlen topológiát okozhat.', 'A felesleges él ugyanolyan baj, mint a hiányzó — minden hurok csináljon valamit.'],
      terms: [{ term: 'loop cut', def: 'Körbefutó új élhurok behelyezése Ctrl + R-rel.' }, { term: 'subdivide', def: 'A kijelölt élek felosztása, irányítás nélkül.' }, { term: 'topológia', def: 'A felület élhálójának elrendezése.' }],
    },
  },
  {
    day: 7,
    title: 'Módosítók: Mirror és Subdivision',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'A **módosító** olyan művelet, ami nem írja át a geometriát, hanem rárakódik. Bármikor módosítható vagy törölhető — ezért sokkal biztonságosabb, mint kézzel átalakítani.' },
      { k: 'text', md: '**Mirror:** modellezd meg a tárgy felét, és a módosító tükrözi a másik felét. Egy robotkar, egy autó, egy arc — a felét kell megcsinálnod. Ha módosítasz, a másik fél is követi.' },
      { k: 'callout', tone: 'warn', md: 'A Mirror a tárgy **origójára** tükröz. Ha az origó nincs a szimmetriasíkon, a két fél elcsúszik. Ezért a Mirrorral dolgozó modellt mindig az origóból indítsd.' },
      { k: 'text', md: '**Subdivision Surface** (Ctrl + 1, 2, 3): simítja a felületet úgy, hogy felosztja. Egy kocka Subdivision 2-vel gömbszerű lesz. A `Levels Viewport` a szerkesztés közbeni, a `Render` a végleges finomság.' },
      { k: 'callout', tone: 'key', md: 'A Subdivision a **négyszög alapú** topológiát szereti. Háromszögeken és n-gonokon ránc és csomó keletkezik. Ez a legfőbb ok, amiért érdemes quadokkal modellezni.' },
      { k: 'callout', tone: 'tip', md: 'A módosítók sorrendje számít: a Mirror legyen a Subdivision **előtt**, különben a két fél találkozásánál varrat keletkezik.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a módosító legnagyobb előnye?', opts: ['Gyorsabb', 'Nem írja át a geometriát, bármikor módosítható vagy törölhető', 'Kisebb fájl'], answer: 1, why: 'A módosító réteg a geometria fölött. A nyers adat érintetlen marad, így a döntés visszavonható.' },
      { k: 'single', q: 'Mire tükröz a Mirror módosító?', opts: ['A világ középpontjára', 'Az objektum origójára', 'A kamerára'], answer: 1, why: 'Az origó a tükörsík. Rossz helyen lévő origónál a két fél elcsúszik vagy egymásba lóg.' },
      { k: 'single', q: 'Miért rossz a Subdivision háromszögeken?', opts: ['Nem működik', 'Ránc és csomó keletkezik a felületen', 'Lassabb'], answer: 1, why: 'A felosztási algoritmus négyszögekre van tervezve. Háromszögnél és n-gonnál a simítás egyenetlen lesz.' },
      { k: 'single', q: 'Milyen sorrendben legyen a Mirror és a Subdivision?', opts: ['Mirror előbb', 'Subdivision előbb', 'Mindegy'], answer: 0, why: 'Ha a Subdivision fut előbb, a két fél külön simul, és a találkozásnál varrat marad.' },
    ],
    note: {
      summary: ['A módosító réteg a geometria fölött: nem írja át, bármikor törölhető.', 'A Mirror a tárgy origójára tükröz — az origó legyen a szimmetriasíkon.', 'Mirrorral elég a tárgy felét megmodellezni.', 'A Subdivision Surface simít felosztással; Ctrl + 1/2/3 állítja a szintet.', 'A Subdivision négyszögeket szeret; háromszögön ránc keletkezik.', 'A módosítók sorrendje számít: Mirror a Subdivision előtt.'],
      terms: [{ term: 'módosító', def: 'Nem destruktív művelet, ami a geometria fölé rakódik.' }, { term: 'Mirror', def: 'Módosító, ami az origóra tükrözve egészíti ki a modellt.' }, { term: 'Subdivision Surface', def: 'Simító módosító, ami felosztással finomítja a felületet.' }],
    },
  },
  {
    day: 8,
    title: 'Bevel és élsimítás',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A valóságban **nincs tökéletesen éles él**. Minden gyártott tárgynak van egy apró lekerekítése, és ez az, ami megcsillan a fényben. Enélkül a render „számítógépesnek" néz ki.' },
      { k: 'text', md: '**Ctrl + B** (bevel): jelöld ki az élt, nyomd meg, és húzd az egeret. **Görgetéssel** növelheted a szegmensek számát: 1 szegmens letörés, 3 már lekerekítés.' },
      { k: 'callout', tone: 'key', md: 'Egy-két tized milliméteres bevel is elég. Nem a méret számít, hanem hogy **legyen** egy keskeny felület, ami visszaveri a fényt. Ettől lesz a tárgy valódi.' },
      { k: 'text', md: 'Az **árnyékolás** külön kérdés: jobb gomb → Shade Smooth simára teszi a felületet, Shade Flat szögletesre. A Shade Smooth önmagában viszont a éles éleket is elkeni.' },
      { k: 'callout', tone: 'tip', md: 'A megoldás: Shade Smooth **plusz** Auto Smooth (újabb Blenderben a Smooth by Angle módosító). Ez a megadott szögnél élesebb éleket élesen hagyja, a laposabbakat simítja. 30 fok jó kiindulás.' },
    ],
    quiz: [
      { k: 'single', q: 'Miért kell bevel a modellre?', opts: ['Hogy kisebb legyen', 'Mert a valóságban nincs tökéletesen éles él, és a lekerekítés veri vissza a fényt', 'Mert a Blender megköveteli'], answer: 1, why: 'A keskeny lekerekített felület csillan meg. Nélküle a tárgy élei természetellenesen élesek maradnak a renderen.' },
      { k: 'single', q: 'Mit csinál a görgetés bevel közben?', opts: ['Nagyít', 'Növeli a szegmensek számát, azaz a lekerekítés finomságát', 'Elforgatja'], answer: 1, why: 'Egy szegmens egyszerű letörés, több szegmens már sima lekerekítés.' },
      { k: 'single', q: 'Mi a baj a sima Shade Smooth-szal önmagában?', opts: ['Lassú', 'Az éles éleket is elkeni', 'Nem működik quadon'], answer: 1, why: 'Mindent simít, az élesen szándékolt éleket is. Ezért kell az Auto Smooth, ami szög szerint dönt.' },
      { k: 'single', q: 'Mit csinál az Auto Smooth / Smooth by Angle?', opts: ['Mindent simít', 'A megadott szögnél élesebb éleket élesen hagyja', 'Lekerekíti az éleket'], answer: 1, why: 'Szög alapján dönti el élenként, hogy simítson-e. Így a lapos felületek simák, a valódi élek élesek maradnak.' },
    ],
    note: {
      summary: ['A valóságban nincs tökéletesen éles él — a bevel adja a fénycsillanást.', 'Ctrl + B a bevel; görgetéssel nő a szegmensek száma.', 'Pár tized milliméter is elég: a lényeg, hogy legyen visszaverő felület.', 'A Shade Smooth mindent simít, az éles éleket is.', 'Auto Smooth / Smooth by Angle szög szerint dönt; 30 fok jó kiindulás.'],
      terms: [{ term: 'bevel', def: 'Él letörése vagy lekerekítése keskeny felületté.' }, { term: 'szegmens', def: 'A bevel felosztásainak száma; több szegmens simább lekerekítés.' }, { term: 'Auto Smooth', def: 'Szög alapján döntő árnyékolás, ami az éles éleket meghagyja.' }],
    },
  },
  {
    day: 9,
    title: 'Egy egyszerű tárgy megmodellezése',
    minutes: 26,
    lesson: [
      { k: 'text', md: 'Ma összerakjuk az eddigieket, és megcsinálunk egy **motorrögzítőt** — olyat, amilyet a robotodhoz is nyomtatnál.' },
      { k: 'text', md: '**1.** Shift + A → Mesh → Cube. S majd írd be a méretet.\n**2.** Tab szerkesztő módba, és egy loop cuttal (Ctrl + R) oszd ketté.\n**3.** Jelöld ki az elülső lapot, I (inset), majd E befelé — ez a motor fészke.\n**4.** A furatokhoz: inset egy kis kört… vagy egyszerűbben Boolean, amiről holnap lesz szó.\n**5.** Ctrl + B az éleken, 2 szegmenssel.\n**6.** Shade Smooth + Auto Smooth.' },
      { k: 'callout', tone: 'key', md: 'Modellezéskor **mérj**. Nyomd meg az N-t, és a jobb oldali panelen látod a kijelölés méretét. Ha a motorod 25 mm széles, a fészek legyen 25,4 — a nyomtatási tűrés miatt.' },
      { k: 'callout', tone: 'tip', md: 'Egy egységet (1 m a Blenderben) célszerű 1 méternek venni, és milliméterben gondolkodni a Scene Properties → Units → Millimeters beállítással. Nyomtatáshoz ez elengedhetetlen.' },
      { k: 'text', md: 'Ha elakadsz: **Ctrl + Z** korlátlanul visszafelé, és a bal alsó sarokban az utolsó művelet panelje átállítható anélkül, hogy újra kellene csinálni.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit mutat az N panel?', opts: ['A render beállításait', 'A kijelölés méretét és helyzetét', 'Az anyagokat'], answer: 1, why: 'Az N panel az átalakítási adatokat mutatja. Modellezéskor itt ellenőrzöd, hogy tényleg 25 mm-es-e, amit csinálsz.' },
      { k: 'single', q: 'Miért legyen a fészek valamivel nagyobb a motornál?', opts: ['Szebb', 'A nyomtatási tűrés miatt, hogy be lehessen tenni', 'Hogy kevesebb anyag legyen'], answer: 1, why: 'A nyomtató pár tized milliméterrel eltérhet a tervtől. Pontosan 25 mm-es fészekbe a 25 mm-es motor nem megy be.' },
      { k: 'single', q: 'Mit tehetsz, ha egy művelet paraméterét utólag akarod állítani?', opts: ['Újra kell csinálni', 'A bal alsó sarokban lévő művelet-panelen átállíthatod', 'Nem lehet'], answer: 1, why: 'Az utolsó művelet panelje nyitva marad. Amíg nem csinálsz mást, szabadon hangolhatod az értékeket.' },
      { k: 'order', q: 'Milyen sorrendben épül fel a rögzítő?', items: ['Bevel az éleken', 'Alapforma és méret', 'Fészek insettel és extrude-dal'], correct: [1, 2, 0], why: 'Előbb a tömb és a méret, aztán a funkcionális mélyedés, és a bevel mindig a végén — különben a további műveletek tönkretennék.' },
    ],
    note: {
      summary: ['Modellezési sorrend: alapforma → méret → funkcionális részletek → bevel → árnyékolás.', 'Az N panel mutatja a kijelölés méretét és helyzetét.', 'Állítsd a mértékegységet milliméterre nyomtatáshoz.', 'Illesztésnél hagyj tűrést: a fészek legyen pár tized milliméterrel nagyobb.', 'Az utolsó művelet panelje a bal alsó sarokban utólag is átállítható.', 'A bevel mindig a legvégén jöjjön.'],
      terms: [{ term: 'N panel', def: 'Oldalpanel, ami a kijelölés méretét és helyzetét mutatja.' }, { term: 'tűrés', def: 'Szándékos méretkülönbség, hogy két alkatrész összeilleszthető legyen.' }, { term: 'művelet-panel', def: 'A bal alsó sarokban megjelenő, utólag állítható paraméterdoboz.' }],
    },
  },
  {
    day: 10,
    title: 'Topológia: miért számít?',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A **topológia** az élháló elrendezése. Két modell nézhet ki ugyanúgy, miközben az egyik használható, a másik pedig minden további lépésnél gondot okoz.' },
      { k: 'text', md: 'Mitől jó a topológia?\n\n- **Négyszögek**, nem háromszögek és n-gonok.\n- **Folyamatos élhurkok**, amik körbefutnak a formán.\n- **Sűrűség ott, ahol kell**: a görbülő részeken több él, a lapos részeken kevesebb.\n- **A hurkok követik a forma logikáját** — egy arcnál a szem és a száj körül, egy robotkarnál a csukló körül.' },
      { k: 'callout', tone: 'key', md: 'A topológia három dolognál válik kritikussá: **simításnál** (Subdivision), **deformálásnál** (animáció, hajlítás) és **UV-kicsomagolásnál**. Statikus, sima tárgynál kevésbé számít — de ezt előre nem mindig tudod.' },
      { k: 'text', md: 'A tipikus bajok: egy ponton összefutó öt-hat él (pólus), hosszú vékony háromszögek, egymáson fekvő dupla pontok, és befelé néző lapnormálisok.' },
      { k: 'callout', tone: 'tip', md: 'Takarítás: **M → Merge by Distance** összevonja az egymáson fekvő pontokat, **Shift + N** pedig kifelé fordítja a normálisokat. Mindkettőt érdemes lefuttatni, mielőtt exportálsz.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a topológia?', opts: ['A modell színe', 'Az élháló elrendezése a felületen', 'A render minősége'], answer: 1, why: 'Két azonos külsejű modell topológiája gyökeresen eltérhet, és ettől függ, hogy később lehet-e vele dolgozni.' },
      { k: 'multi', q: 'Melyik két dolognál kritikus a jó topológia?', opts: ['Simítás (Subdivision)', 'A fájl mérete', 'Deformálás animációnál', 'A render színe'], answers: [0, 2], why: 'A simítás és a hajlítás az élháló mentén történik. Rossz hurkoknál mindkettő ráncot és töréseket ad.' },
      { k: 'single', q: 'Mit csinál a Merge by Distance?', opts: ['Egyesíti a közeli, egymáson fekvő pontokat', 'Simítja a felületet', 'Lekerekíti az éleket'], answer: 0, why: 'A dupla pontok láthatatlanok, de megtörik a felületet és az árnyékolást. Ez a parancs takarítja el őket.' },
      { k: 'single', q: 'Mit jelent a Shift + N?', opts: ['Új objektum', 'Kifelé fordítja a lapnormálisokat', 'Törli a kijelölést'], answer: 1, why: 'A befelé néző normálisok fekete foltot vagy hibás árnyékolást adnak. A Shift + N egységesen kifelé fordítja őket.' },
    ],
    note: {
      summary: ['A topológia az élháló elrendezése; azonos külső mellett is gyökeresen eltérhet.', 'Jó topológia: négyszögek, folyamatos hurkok, sűrűség ott, ahol görbül.', 'Kritikus simításnál, deformálásnál és UV-kicsomagolásnál.', 'Tipikus bajok: pólusok, vékony háromszögek, dupla pontok, befelé néző normálisok.', 'M → Merge by Distance összevonja a dupla pontokat.', 'Shift + N kifelé fordítja a normálisokat; export előtt futtasd le.'],
      terms: [{ term: 'topológia', def: 'A felület élhálójának elrendezése.' }, { term: 'pólus', def: 'Pont, ahol a szokásos négy helyett öt vagy több él fut össze.' }, { term: 'normális', def: 'A lap kifelé mutató iránya, ami az árnyékolást meghatározza.' }],
    },
  },
];
