import type { Day } from '../../types';

/** FIZIKA trek, 27–30. nap. */
export const physicsHuF: Day[] = [
  {
    day: 27,
    title: 'Feszültség és alakváltozás',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'Az előző nap megvolt a `sigma = E · epsilon` összefüggés. Most nézzük meg, mi történik, ha egyre jobban terhelsz — mert az anyag nem egyformán viselkedik végig.' },
      { k: 'callout', tone: 'key', md: 'A szakítódiagram négy szakasza:\n\n1. **Rugalmas** — a terhelés megszűntével visszaáll. Itt érvényes Hooke törvénye.\n2. **Folyáshatár** — innentől maradandó az alakváltozás.\n3. **Keményedés** — az anyag még bír többet, de már deformálódva.\n4. **Szakadás** — eltörik.' },
      { k: 'text', md: 'A tervezésben a **folyáshatár** a mérvadó, nem a szakítószilárdság. Egy alkatrész, ami maradandóan elgörbült, már akkor is tönkrement, ha nem tört el: a tengely nem áll egy vonalban, a furat elcsúszott.' },
      { k: 'code', lang: 'py', src: '# Biztonsági tényező\nfolyashatar = 250e6      # Pa, szerkezeti acél\nF = 1200                 # N terhelés\nA = 20e-6                # m2, 20 mm2 keresztmetszet\n\nsigma = F / A\nn = folyashatar / sigma\nprint(f"Feszültség: {sigma/1e6:.0f} MPa")\nprint(f"Biztonsági tényező: {n:.2f}")\n# 60 MPa, n = 4.17 -> bőven elég', explain: 'A **biztonsági tényező** a folyáshatár és a tényleges feszültség hányadosa. Statikus terhelésnél 2 körül elfogadható; ember közelében vagy ismeretlen terhelésnél 4-5.' },
      { k: 'callout', tone: 'warn', md: 'A **kifáradás** külön jelenség: az ismételt terhelés akkor is eltöri az anyagot, ha egyetlen alkalommal messze a folyáshatár alatt marad. Egy milliószor hajlított rugó eltörik a névleges terhelés harmadánál is. Mozgó alkatrésznél a kifáradási határral kell számolni, nem a folyáshatárral.' },
      { k: 'callout', tone: 'tip', md: 'A **feszültséggyűjtő hely** (stress concentration) a törések fő oka: éles belső sarok, hirtelen keresztmetszet-váltás, furat széle. Egy lekerekítés a belső sarokban a helyi feszültséget akár a felére csökkenti — ezért van minden jól tervezett alkatrészen rádiusz.' },
    ],
    quiz: [
      { k: 'single', q: 'Meddig érvényes Hooke törvénye?', opts: ['A szakadásig', 'A rugalmas szakaszon, a folyáshatárig', 'Mindig'], answer: 1, why: 'A folyáshatár fölött az alakváltozás maradandó, és a lineáris összefüggés megszűnik.' },
      { k: 'single', q: 'Melyik érték mérvadó a tervezésben?', opts: ['A szakítószilárdság', 'A folyáshatár', 'A rugalmassági modulus'], answer: 1, why: 'A maradandóan elgörbült alkatrész akkor is tönkrement, ha nem tört el.' },
      { k: 'single', q: 'Mi a biztonsági tényező?', opts: ['A folyáshatár és a tényleges feszültség hányadosa', 'A tömeg és az erő aránya', 'A hatásfok'], answer: 0, why: 'Statikus terhelésnél 2 körül elfogadható; ember közelében 4-5.' },
      { k: 'single', q: 'Mi a kifáradás?', opts: ['Az anyag melegedése', 'Ismételt terhelés hatására bekövetkező törés a folyáshatár alatt is', 'A rugalmasság elvesztése'], answer: 1, why: 'Mozgó alkatrésznél a kifáradási határral kell számolni, nem a folyáshatárral.' },
      { k: 'single', q: 'Mi a feszültséggyűjtő hely?', opts: ['A legvastagabb pont', 'Éles belső sarok vagy hirtelen keresztmetszet-váltás', 'A felület közepe'], answer: 1, why: 'Egy lekerekítés a belső sarokban a helyi feszültséget akár a felére csökkenti.' },
    ],
    note: {
      summary: ['A szakítódiagram négy szakasza: rugalmas, folyás, keményedés, szakadás.', 'Hooke törvénye csak a rugalmas szakaszon érvényes.', 'A tervezés a folyáshatárra megy, nem a szakítószilárdságra.', 'Biztonsági tényező: statikusan 2, ember közelében 4-5.', 'Kifáradás: ismételt terhelés a folyáshatár alatt is eltör.', 'Feszültséggyűjtő hely ellen lekerekítés a belső sarkokba.'],
      terms: [{ term: 'folyáshatár', def: 'Az a feszültség, ami fölött maradandó az alakváltozás.' }, { term: 'biztonsági tényező', def: 'A folyáshatár és a tényleges feszültség hányadosa.' }, { term: 'kifáradás', def: 'Ismételt terhelés okozta törés a folyáshatár alatt.' }],
    },
  },
  {
    day: 28,
    title: 'Hullámok és hang',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A hullám **energiát szállít anyagáramlás nélkül**. A víz nem megy sehova a hullámmal; csak fel-le mozog. Ez a hang, a fény és a rádió közös alapja.' },
      { k: 'callout', tone: 'key', md: 'Az alapösszefüggés minden hullámra:\n\n`c = f · lambda`\n\nterjedési sebesség = frekvencia × hullámhossz. A sebességet a **közeg** szabja meg, a frekvenciát a **forrás** — a hullámhossz pedig ebből adódik.' },
      { k: 'code', lang: 'py', src: 'c_levego = 343.0      # m/s, 20 fokon\n\nfor f in (40000, 1000, 100):\n    lam = c_levego / f\n    print(f"{f:6} Hz -> {lam*1000:7.2f} mm hullámhossz")\n# 40000 Hz -> 8.58 mm   (ultrahangos érzékelő)\n#  1000 Hz -> 343.00 mm\n#   100 Hz -> 3430.00 mm', explain: 'Az ultrahangos távolságérzékelő 40 kHz-en dolgozik, mert a 8,6 mm-es hullámhossz már elég kicsi ahhoz, hogy a hétköznapi tárgyakról visszaverődjön ahelyett, hogy megkerülné őket.' },
      { k: 'text', md: 'Három jelenség, ami minden hullámnál ugyanúgy működik:\n\n- **Visszaverődés** — ezen alapul minden távolságmérés\n- **Törés** — a sebesség megváltozik a közeghatáron, és a hullám elfordul\n- **Elhajlás (diffrakció)** — az akadály mögé is bejut, ha a hullámhossz az akadály méretéhez hasonló' },
      { k: 'callout', tone: 'warn', md: 'Az **elhajlás** magyarázza az ultrahangos érzékelő legfontosabb korlátját: a 8,6 mm-es hullámhossz megkerüli a nála kisebb tárgyakat. Egy asztallábat vagy egy kifeszített kábelt az ultrahang **nem lát meg** — egyszerűen elhalad mellette.' },
      { k: 'text', md: 'A **Doppler-hatás**: ha a forrás vagy a megfigyelő mozog, a frekvencia eltolódik. Közeledő forrás magasabb, távolodó mélyebb. Ebből működik a sebességmérő radar és a tolatóradar mozgásérzékelése.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit szállít a hullám?', opts: ['Anyagot', 'Energiát anyagáramlás nélkül', 'Töltést'], answer: 1, why: 'A víz nem megy sehova a hullámmal; csak fel-le mozog.' },
      { k: 'single', q: 'Mi az alapösszefüggés?', opts: ['`c = f · lambda`', '`F = m · a`', '`U = I · R`'], answer: 0, why: 'A sebességet a közeg, a frekvenciát a forrás adja; a hullámhossz ebből következik.' },
      { k: 'single', q: 'Miért 40 kHz-en dolgozik az ultrahangos érzékelő?', opts: ['Olcsóbb', 'Mert a 8,6 mm-es hullámhossz visszaverődik a hétköznapi tárgyakról', 'Mert hallható'], answer: 1, why: 'Nagyobb hullámhossz megkerülné a tárgyakat elhajlással.' },
      { k: 'single', q: 'Mit nem lát meg az ultrahangos érzékelő?', opts: ['A falat', 'A hullámhossznál kisebb tárgyat, például egy kifeszített kábelt', 'A padlót'], answer: 1, why: 'Az elhajlás miatt a hullám egyszerűen megkerüli a kis tárgyat.' },
      { k: 'single', q: 'Mi a Doppler-hatás?', opts: ['A hullám gyengülése', 'Mozgó forrásnál a frekvencia eltolódása', 'A visszaverődés'], answer: 1, why: 'Közeledő forrás magasabb, távolodó mélyebb. Ezen alapul a sebességmérő radar.' },
    ],
    note: {
      summary: ['A hullám energiát szállít anyagáramlás nélkül.', '`c = f · lambda`: a közeg adja a sebességet, a forrás a frekvenciát.', 'Az ultrahangos érzékelő 40 kHz-en, 8,6 mm hullámhosszal dolgozik.', 'Három jelenség: visszaverődés, törés, elhajlás.', 'Az elhajlás miatt a kis tárgyakat az ultrahang nem látja meg.', 'Doppler-hatás: mozgó forrásnál eltolódik a frekvencia.'],
      terms: [{ term: 'hullámhossz', def: 'Két azonos fázisú pont távolsága a hullámban.' }, { term: 'elhajlás', def: 'A hullám behatolása az akadály mögé.' }, { term: 'Doppler-hatás', def: 'Frekvenciaeltolódás a forrás vagy a megfigyelő mozgása miatt.' }],
    },
  },
  {
    day: 29,
    title: 'Fény és optika',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A fény elektromágneses hullám, ami ugyanazokat a szabályokat követi, mint a hang — csak sokkal gyorsabb, és a hullámhossza mikrométerben mérhető.' },
      { k: 'callout', tone: 'key', md: 'A robotikában használt hullámhossztartományok:\n\n- **Látható fény** — 380–750 nm, ezt látja a kamera\n- **Közeli infravörös** — 850–950 nm, a legtöbb távolságérzékelő és vonalkövető\n- **Távoli infravörös** — 8–14 μm, a hőkamera tartománya' },
      { k: 'text', md: 'A **törésmutató** (n) mondja meg, mennyivel lassabb a fény az anyagban: `n = c_vákuum / c_anyag`. A közeghatáron a sugár elfordul, és ez a **Snellius-törvény** szerint történik. Ez a lencsék működésének alapja.' },
      { k: 'code', lang: 'py', src: '# Egyszerű lencseegyenlet: hol lesz a kép?\n# 1/f = 1/t + 1/k\nf = 25.0            # mm, gyújtótávolság\n\nfor t in (50, 100, 1000):\n    k = 1 / (1/f - 1/t)\n    nagyitas = k / t\n    print(f"tárgytáv {t:5} mm -> képtáv {k:6.1f} mm, nagyítás {nagyitas:.2f}x")\n# 50 -> 50.0 mm, 1.00x    100 -> 33.3 mm, 0.33x    1000 -> 25.6 mm, 0.03x', explain: 'Nagy tárgytávolságnál a képtáv a gyújtótávolsághoz tart. Ezért van a kamera érzékelője körülbelül egy gyújtótávolságnyira a lencsétől, ha távoli dolgokat néz.' },
      { k: 'callout', tone: 'warn', md: 'A gépi látás legnagyobb buktatója nem az algoritmus, hanem a **megvilágítás**. Egy változó fényben működő felismerés a nap minden órájában mást lát. Ellenszer: **saját, állandó fényforrás** és lehetőleg zárt, árnyékolt tér — ez többet ér, mint bármilyen szűrőalgoritmus.' },
      { k: 'callout', tone: 'tip', md: 'Az **infravörös sávszűrő** a legolcsóbb megbízhatóság-növelő eszköz: egy 850 nm-es LED-del világítasz, és a kamerára teszel egy szűrőt, ami csak ezt engedi át. A terem lámpája és a napfény ettől gyakorlatilag eltűnik a képről.' },
    ],
    quiz: [
      { k: 'single', q: 'Milyen hullámhosszon dolgoznak a vonalkövető érzékelők?', opts: ['380-750 nm', '850-950 nm, közeli infravörös', '8-14 mikrométer'], answer: 1, why: 'A távoli infravörös a hőkamera tartománya, a látható fény pedig a szokásos kameráé.' },
      { k: 'single', q: 'Mit mond meg a törésmutató?', opts: ['A fény színét', 'Mennyivel lassabb a fény az anyagban', 'Mennyi fény nyelődik el'], answer: 1, why: '`n = c_vákuum / c_anyag`. Ebből következik a Snellius-törvény és a lencse működése.' },
      { k: 'single', q: 'Hol van a kép, ha a tárgy nagyon messze van?', opts: ['A lencsénél', 'Körülbelül egy gyújtótávolságnyira', 'Végtelen távol'], answer: 1, why: 'Ezért van a kamera érzékelője körülbelül egy gyújtótávolságnyira a lencsétől.' },
      { k: 'single', q: 'Mi a gépi látás legnagyobb buktatója?', opts: ['Az algoritmus', 'A megvilágítás', 'A felbontás'], answer: 1, why: 'Változó fényben a felismerés a nap minden órájában mást lát.' },
      { k: 'single', q: 'Mire jó az infravörös sávszűrő?', opts: ['Élesít', 'Kiszűri a terem fényét, és csak a saját IR megvilágításodat engedi át', 'Növeli a felbontást'], answer: 1, why: 'A legolcsóbb megbízhatóság-növelő eszköz a gépi látásban.' },
    ],
    note: {
      summary: ['A fény elektromágneses hullám, ugyanazokkal a szabályokkal, mint a hang.', 'Tartományok: látható 380-750 nm, közeli IR 850-950 nm, hő 8-14 μm.', 'Törésmutató `n = c_vákuum / c_anyag`; ebből jön a Snellius-törvény.', 'Lencseegyenlet `1/f = 1/t + 1/k`; távoli tárgynál a képtáv a gyújtótávolság.', 'A gépi látás fő buktatója a megvilágítás, nem az algoritmus.', 'Saját IR fény plusz sávszűrő kiszűri a környezeti fényt.'],
      terms: [{ term: 'törésmutató', def: 'Megadja, mennyivel lassabb a fény az anyagban.' }, { term: 'gyújtótávolság', def: 'A lencse és a párhuzamos sugarak találkozási pontja közti távolság.' }, { term: 'sávszűrő', def: 'Csak egy adott hullámhossztartományt áteresztő optikai szűrő.' }],
    },
  },
  {
    day: 30,
    title: 'A fizika a robotodban',
    minutes: 30,
    lesson: [
      { k: 'text', md: 'Harminc nap fizikája nem különálló fejezetek halmaza. Egy robotban mindegyik egyszerre, egymásra hatva jelenik meg. Nézzük végig egy valódi gépen.' },
      { k: 'callout', tone: 'key', md: 'Egy egyszerű roveren ennyi fizika dolgozik egyszerre:\n\n- **Newton törvényei** — mekkora erő kell a gyorsításhoz\n- **Súrlódás** — tapad-e a kerék, vagy megcsúszik\n- **Közegellenállás** — csak nagy sebességnél számít\n- **Forgatónyomaték** — a motor és a kerék kapcsolata\n- **Elektromosság** — Ohm törvénye, teljesítmény, hatásfok\n- **Mágnesesség** — a motor működése\n- **Hőtan** — mennyi hő keletkezik és hogyan távozik\n- **Szilárdságtan** — eltörik-e a tartó' },
      { k: 'code', lang: 'py', src: '# Végigszámolás: mennyi ideig megy egy akkutöltéssel?\nm, r, v = 3.0, 0.04, 0.5        # kg, m, m/s\nmu_gordulo = 0.02               # gördülési ellenállás\ng = 9.81\n\nF = mu_gordulo * m * g          # N, a haladáshoz kellő erő\nP_mech = F * v                  # W, mechanikai teljesítmény\neta = 0.52                      # a 23. napi hatásfoklánc\nP_elektromos = P_mech / eta\n\nWh_akku = 36.0                  # 3 Ah 12 V\nora = Wh_akku / P_elektromos\nprint(f"Mechanikai: {P_mech:.2f} W, elektromos: {P_elektromos:.2f} W")\nprint(f"Üzemidő: {ora:.1f} óra (a vezérlés fogyasztása nélkül)")', explain: 'Ez a számítás három nap anyagát köti össze: súrlódás, teljesítmény, hatásfok és energia. Így néz ki a fizika a gyakorlatban — nem egy képlet, hanem egy lánc.' },
      { k: 'text', md: 'A gyakorlati becslés módszere, amit érdemes megtartani:\n\n1. **Nagyságrend először.** Watt vagy kilowatt? Newton vagy kilonewton? A nagyságrendi hiba kiderül, a tizedesjegy nem számít.\n2. **Egyszerűsíts bátran.** A közegellenállás 0,5 m/s-nál elhanyagolható. Mondd ki, és hagyd el.\n3. **Számolj tartalékkal.** Kétszeres mindenhol, ahol bizonytalan vagy.\n4. **Mérd meg.** A számítás megmondja, mit várj; a mérés megmondja, mi van.' },
      { k: 'callout', tone: 'warn', md: 'A **mértékegységek** ellenőrzése a leggyorsabb hibakeresés. Ha egy képlet végén nem a várt mértékegység jön ki, a képlet rossz — függetlenül attól, milyen szépen néz ki. Centiméter és méter keverése a leggyakoribb, és a legdrágább.' },
      { k: 'callout', tone: 'tip', md: 'A fizika itt nem öncél: azért tanultad, hogy **előre tudd**, mi fog történni, mielőtt megépíted. Egy fél óra számolás a tervezőasztalnál megspórol egy leégett motorvezérlőt és két hét várakozást az alkatrészre.' },
    ],
    quiz: [
      { k: 'single', q: 'Hány fizikai terület dolgozik egyszerre egy egyszerű roveren?', opts: ['Egy-kettő', 'Mind: mechanika, elektromosság, mágnesesség, hőtan, szilárdságtan', 'Csak a mechanika'], answer: 1, why: 'Ezért nem lehet a fejezeteket külön kezelni: egymásra hatnak.' },
      { k: 'single', q: 'Mi az első lépés egy gyakorlati becslésnél?', opts: ['Pontos számítás', 'A nagyságrend meghatározása', 'Szimuláció'], answer: 1, why: 'A nagyságrendi hiba kiderül, a tizedesjegy nem számít.' },
      { k: 'single', q: 'Mikor hagyhatod el a közegellenállást?', opts: ['Soha', 'Kis sebességnél, például 0,5 m/s-nál', 'Mindig'], answer: 1, why: 'Egyszerűsíts bátran, de mondd ki, mit hagytál el és miért.' },
      { k: 'single', q: 'Mi a leggyorsabb hibakeresés egy számításban?', opts: ['Újraszámolás', 'A mértékegységek ellenőrzése', 'Szimuláció'], answer: 1, why: 'Ha nem a várt mértékegység jön ki, a képlet rossz. A cm és m keverése a leggyakoribb.' },
      { k: 'single', q: 'Mire való a fizika a robotépítésben?', opts: ['Vizsgához', 'Hogy előre tudd, mi fog történni, mielőtt megépíted', 'Dokumentációhoz'], answer: 1, why: 'Fél óra számolás megspórol egy leégett vezérlőt és két hét várakozást.' },
    ],
    note: {
      summary: ['Egy roveren egyszerre dolgozik mechanika, elektromosság, mágnesesség, hőtan és szilárdságtan.', 'A fizika a gyakorlatban nem egy képlet, hanem egy lánc.', 'Becslés: nagyságrend először, bátor egyszerűsítés, tartalék, aztán mérés.', 'A mértékegységek ellenőrzése a leggyorsabb hibakeresés.', 'A cm és m keverése a leggyakoribb és a legdrágább hiba.', 'A cél: előre tudni, mi fog történni, mielőtt megépíted.'],
      terms: [{ term: 'nagyságrendi becslés', def: 'Durva számítás a helyes nagyságrend megállapítására.' }, { term: 'mértékegység-ellenőrzés', def: 'A képlet helyességének vizsgálata a kijövő mértékegységen át.' }, { term: 'tartalék', def: 'Ráhagyás a bizonytalan paraméterek miatt.' }],
    },
  },
];
