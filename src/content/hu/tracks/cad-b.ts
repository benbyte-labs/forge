import type { Day } from '../../types';

/** CAD trek, 2–5. nap. */
export const cadHuB: Day[] = [
  {
    day: 2,
    title: 'A vázlat',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'Minden CAD-alkatrész **vázlattal** kezdődik: egy síkra rajzolt kétdimenziós körvonallal. Ebből lesz később a test.' },
      { k: 'text', md: 'A vázlat elemei: vonal, ív, kör, téglalap, spline. Kevés kell belőlük — a legtöbb alkatrész vonalakból és körökből áll.' },
      { k: 'callout', tone: 'key', md: 'A vázlatnak **zártnak** kell lennie, ha testet akarsz belőle. Egyetlen 0,01 mm-es rés, és a program nem tudja, mi van belül és mi kívül. Ez a leggyakoribb kezdő hibaüzenet oka.' },
      { k: 'text', md: 'Három szabály, ami rengeteg szenvedéstől megkímél:\n\n1. **Kezdd az origóból.** Legalább egy pont legyen az origóhoz kötve, különben a vázlat elúszik.\n2. **Egyszerű maradjon.** Inkább két egyszerű vázlat, mint egy bonyolult.\n3. **Ne rajzolj ismétlődést.** Ami négyszer van, azt egyszer rajzold, és mintázd — a 8. napon megnézzük hogyan.' },
      { k: 'callout', tone: 'tip', md: 'Rajzolj először hozzávetőlegesen, és csak utána méretezz. A CAD-vázlat nem műszaki rajz: a kényszerek és a méretek fogják a helyére tenni, nem a gondos rajzolás.' },
    ],
    quiz: [
      { k: 'single', q: 'Miért kell a vázlatnak zártnak lennie?', opts: ['Hogy szebb legyen', 'Mert különben nem tudja a program, mi van belül és mi kívül', 'Hogy kevesebb helyet foglaljon'], answer: 1, why: 'Az extrudáláshoz egyértelmű belső területre van szükség. Egy pici rés esetén a kontúr nem határol területet, ezért nem lesz belőle test.' },
      { k: 'single', q: 'Miért érdemes az origóból indulni?', opts: ['Gyorsabb a program', 'Mert különben a vázlat nincs rögzítve, és elmozdulhat', 'Mert kötelező'], answer: 1, why: 'Ha semmi nem köti a koordinátarendszerhez, a vázlat „lebeg". Egy későbbi módosítás átrendezheti az egészet.' },
      { k: 'single', q: 'Mi a vázlat?', opts: ['A kész alkatrész', 'Egy síkra rajzolt 2D körvonal, amiből test lesz', 'A műszaki rajz'], answer: 1, why: 'A vázlat kétdimenziós. Az extrude vagy a revolve emeli ki belőle a háromdimenziós testet.' },
      { k: 'single', q: 'Mi a jobb: egy bonyolult vagy két egyszerű vázlat?', opts: ['Egy bonyolult', 'Két egyszerű', 'Mindegy'], answer: 1, why: 'Az egyszerű vázlatokat könnyebb kényszerezni, módosítani és hibakeresni. A bonyolult vázlat egy idő után kezelhetetlenné válik.' },
    ],
    note: {
      summary: ['Minden alkatrész vázlattal kezdődik: síkra rajzolt 2D körvonallal.', 'A vázlatnak zártnak kell lennie, különben nem lesz belőle test.', 'Kösd legalább egy pontját az origóhoz, hogy ne úszhasson el.', 'Inkább két egyszerű vázlat, mint egy bonyolult.', 'Rajzolj hozzávetőlegesen, aztán méretezz — a kényszerek teszik pontossá.'],
      terms: [{ term: 'vázlat', def: 'Síkra rajzolt kétdimenziós körvonal, amiből test készül.' }, { term: 'zárt kontúr', def: 'Hézag nélküli körvonal, ami egyértelműen határol területet.' }, { term: 'origó', def: 'A koordinátarendszer kezdőpontja, amihez a vázlat rögzül.' }],
    },
  },
  {
    day: 3,
    title: 'Kényszerek',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A **kényszer** egy szabály, amit a vázlatra teszel: „ez a két vonal párhuzamos", „ez a kör átmérője 10 mm". A program betartja őket, akkor is, ha később módosítasz.' },
      { k: 'text', md: 'Két fajtájuk van:\n\n**Geometriai:** párhuzamos, merőleges, egybeeső, érintő, egyenlő, vízszintes, függőleges, koncentrikus.\n\n**Méret:** hossz, átmérő, sugár, szög, távolság.' },
      { k: 'callout', tone: 'key', md: 'Egy vázlat akkor **teljesen meghatározott**, ha egyetlen pontja sem mozdítható el. A legtöbb CAD program ezt színnel jelzi. Erre törekedj: a félig meghatározott vázlat egy későbbi módosításnál váratlanul átalakul.' },
      { k: 'callout', tone: 'warn', md: 'Ne kényszerezz **túl**. Ha egy téglalap szélességét és mindkét oldalvonalának hosszát is megadod, ellentmondást hozol létre. A program szól, de az ilyen vázlatot utólag nehéz kibogozni.' },
      { k: 'text', md: 'A jó sorrend: rajzolj → geometriai kényszerek → méretek. Fordítva sokkal több munka, mert a méretek folyton „elugranak", amíg a geometria nincs rögzítve.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit jelent a teljesen meghatározott vázlat?', opts: ['Minden vonala fekete', 'Egyetlen pontja sem mozdítható el', 'Nincs benne kör'], answer: 1, why: 'Ha minden szabadságfokot elvettél kényszerekkel, a vázlat geometriája egyértelmű, és későbbi módosításnál sem ugrik el.' },
      { k: 'single', q: 'Mi a jó sorrend vázlatkészítésnél?', opts: ['Méretek, aztán geometriai kényszerek', 'Rajzolás, geometriai kényszerek, méretek', 'Csak méretek'], answer: 1, why: 'A geometriai kényszerek rögzítik a viszonyokat. Ha előbb méretezel, a méretek folyton elmozdulnak, amíg a geometria szabad.' },
      { k: 'single', q: 'Mi történik, ha túlkényszerezel?', opts: ['Pontosabb lesz', 'Ellentmondás keletkezik, amit a program kifogásol', 'Semmi'], answer: 1, why: 'Ugyanazt a szabadságfokot kétszer veszed el. Egymásnak ellentmondó szabályok esetén a program nem tudja, melyiket tartsa be.' },
      { k: 'multi', q: 'Melyik kettő geometriai kényszer?', opts: ['Párhuzamos', 'Átmérő 10 mm', 'Merőleges', 'Hossz 25 mm'], answers: [0, 2], why: 'A párhuzamosság és a merőlegesség viszonyt ír le. Az átmérő és a hossz méretkényszer: konkrét számot rögzít.' },
    ],
    note: {
      summary: ['A kényszer szabály, amit a program a módosítások során is betart.', 'Geometriai kényszer: párhuzamos, merőleges, érintő, egyenlő, koncentrikus.', 'Méretkényszer: hossz, átmérő, sugár, szög.', 'Teljesen meghatározott a vázlat, ha egyetlen pontja sem mozdítható.', 'Jó sorrend: rajzolás → geometriai kényszerek → méretek.', 'A túlkényszerezés ellentmondást okoz, és nehéz kibogozni.'],
      terms: [{ term: 'kényszer', def: 'A vázlatra kirótt szabály, amit a program mindig betart.' }, { term: 'teljesen meghatározott', def: 'Olyan vázlat, aminek egyetlen pontja sem mozdítható el.' }, { term: 'túlkényszerezés', def: 'Ugyanannak a szabadságfoknak a kétszeri elvétele, ami ellentmondást okoz.' }],
    },
  },
  {
    day: 4,
    title: 'Extrude és revolve',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A vázlatból két alapművelettel lesz test. Ez a kettő az alkatrészek nagy részét lefedi.' },
      { k: 'text', md: '**Extrude (kihúzás):** a vázlatot merőlegesen kihúzod, és testté válik. Egy 20 mm-es kör 5 mm-re kihúzva egy korong.\n\n**Revolve (forgatás):** a vázlatot egy tengely körül megforgatod. Egy félkör 360 fokban forgatva gömb lesz. Minden forgástest — csavar, tengely, csésze — ezzel készül.' },
      { k: 'callout', tone: 'key', md: 'Mindkét művelet **anyagot adhat és el is vehet**. A „cut extrude" ugyanazt csinálja, csak kilyukaszt. Egy furat nem külön eszköz: egy kör, cut extrude-dal.' },
      { k: 'text', md: 'Az extrude további lehetőségei, amiket használni fogsz:\n\n- **Szimmetrikus** — a síktól mindkét irányba egyformán\n- **Ferdeszög (draft)** — a fal kissé dőlt; öntésnél kötelező, nyomtatásnál segít a kiemelésnél\n- **Ütközésig** — addig húz, amíg egy másik felületet el nem ér' },
      { k: 'model', src: 'LIFT500_szegmens.stl' },
      { k: 'callout', tone: 'tip', md: 'Egy alkatrészt sokféleképpen fel lehet építeni. A jó felépítés az, amit **később könnyű módosítani**. Kérdezd meg magadtól: ha holnap 5 mm-rel hosszabb kell, hány dolgot kell átírnom? Ha egyet, jó úton jársz.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit csinál az extrude?', opts: ['Elforgatja a vázlatot egy tengely körül', 'Merőlegesen kihúzza a vázlatot testté', 'Lekerekíti az éleket'], answer: 1, why: 'Az extrude a vázlat síkjára merőlegesen adja hozzá a mélységet. A forgatás a revolve.' },
      { k: 'single', q: 'Melyik művelettel készítenél egy csavart?', opts: ['Extrude', 'Revolve', 'Fillet'], answer: 1, why: 'A csavar forgástest: a profilját egy tengely körül forgatva kapod meg. A menet ezen felül külön művelet.' },
      { k: 'single', q: 'Hogyan készítesz furatot?', opts: ['Külön furat-eszközzel, más nincs', 'Egy kört rajzolsz, és cut extrude-dal kivágod', 'Törléssel'], answer: 1, why: 'A furat egy anyagelvevő extrude. A legtöbb program kínál kényelmi „hole" eszközt is, de mögötte ugyanez történik.' },
      { k: 'single', q: 'Mi a jó felépítés ismérve?', opts: ['Kevés művelet', 'Később könnyű módosítani', 'Szép a fanézet'], answer: 1, why: 'Egy alkatrész élete a módosításokról szól. Ha egy méretváltozás egyetlen szám átírása, jól építetted fel.' },
    ],
    note: {
      summary: ['Extrude: a vázlatot merőlegesen kihúzva testet kapsz.', 'Revolve: a vázlatot tengely körül forgatva forgástestet kapsz.', 'Mindkettő anyagot adhat és el is vehet — a furat egy cut extrude.', 'Extrude opciók: szimmetrikus, ferdeszög (draft), ütközésig.', 'A jó felépítés az, amit később egyetlen szám átírásával lehet módosítani.'],
      terms: [{ term: 'extrude', def: 'Vázlat kihúzása a síkjára merőlegesen, testet képezve.' }, { term: 'revolve', def: 'Vázlat forgatása egy tengely körül, forgástestet képezve.' }, { term: 'cut extrude', def: 'Anyagelvevő kihúzás, amivel furatot vagy horonyt készítesz.' }],
    },
  },
  {
    day: 5,
    title: 'Falvastagság és nyomtathatóság',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Egy modell a képernyőn mindig tökéletes. A nyomtató viszont fizikai gép, és van pár szabály, amit nem hagy figyelmen kívül.' },
      { k: 'text', md: '**Falvastagság.** A minimum a fúvóka átmérőjének kétszerese: 0,4 mm-es fúvókánál **0,8 mm**. Ennél vékonyabb falat a szeletelő vagy kihagy, vagy egyetlen szálból próbál megcsinálni — az pedig eltörik.\n\n**Kinyúlás (overhang).** 45 foknál meredekebb kinyúlás támasz nélkül lekonyul. A 45 fok azért a határ, mert ott minden réteg az előző felére támaszkodik.\n\n**Hidak.** Két pont közt a nyomtató át tud hidalni kb. 5–10 mm-t. Ennél hosszabb belóg.' },
      { k: 'callout', tone: 'key', md: 'A Z tengely mentén — a rétegek közt — az alkatrész lényegesen gyengébb, mint a rétegeken belül. Ha tudod, melyik irányból jön a terhelés, forgasd el úgy a darabot, hogy a rétegek merőlegesek legyenek rá.' },
      { k: 'model', src: 'LIFT500_gyuru_teljes.stl' },
      { k: 'callout', tone: 'tip', md: 'Tervezéskor tedd fel a kérdést: „hogyan fog ez a nyomtatóasztalon állni?" Ha a válasz nem nyilvánvaló, vagy sok támaszt igényel, változtass a geometrián — az sokkal olcsóbb, mint a támaszok utólagos lecsipkedése.' },
      { k: 'text', md: 'A CAD Laborban nyisd meg a saját STL-jeidet: a metszet-csúszkával belenézhetsz, és megnézheted, hol vékonyodik el a fal.' },
    ],
    quiz: [
      { k: 'numeric', q: 'Mekkora a minimális falvastagság 0,4 mm-es fúvókánál? (mm)', answer: 0.8, tol: 0.05, unit: 'mm', why: 'A fúvóka átmérőjének kétszerese. Egyetlen szálvastag fal nem elég erős, és a szeletelő gyakran ki is hagyja.' },
      { k: 'numeric', q: 'Hány foknál kezd támasz kelleni a kinyúláshoz? (fok)', answer: 45, tol: 5, unit: '°', why: '45 fok a szokásos határ: ott még minden réteg az előző felére támaszkodik. Meredekebben már a levegőbe nyomna.' },
      { k: 'single', q: 'Melyik irányban gyengébb egy nyomtatott alkatrész?', opts: ['A rétegeken belül', 'A rétegek közt, a Z tengely mentén', 'Mindkét irányban egyforma'], answer: 1, why: 'A rétegek összeolvadása gyengébb, mint a folytonos anyag. A Z irányú húzás a nyomtatott alkatrész tipikus törési módja.' },
      { k: 'single', q: 'Mit érdemes tenni, ha egy geometria sok támaszt igényelne?', opts: ['Kinyomtatni és letörni a támaszokat', 'Megváltoztatni a geometriát vagy az orientációt', 'Vastagítani a falat'], answer: 1, why: 'A támasz nyomot hagy, időt és anyagot visz. Egy kis geometriai változtatás a tervezőasztalnál sokkal olcsóbb.' },
    ],
    note: {
      summary: ['Minimális falvastagság: a fúvóka átmérőjének kétszerese (0,4 mm → 0,8 mm).', '45 foknál meredekebb kinyúlás támasz nélkül lekonyul.', 'A nyomtató 5–10 mm-t tud áthidalni, annál többet nem.', 'Az alkatrész a rétegek közt (Z irányban) lényegesen gyengébb.', 'Forgasd a darabot úgy, hogy a rétegek merőlegesek legyenek a terhelésre.', 'Tervezéskor kérdezd meg: hogyan fog ez az asztalon állni?'],
      terms: [{ term: 'falvastagság', def: 'A modell falának vastagsága; minimuma a fúvóka átmérőjének kétszerese.' }, { term: 'kinyúlás', def: 'Alátámasztás nélküli, lefelé néző felület, ami 45 fok felett támaszt igényel.' }, { term: 'rétegtapadás', def: 'A nyomtatott rétegek közti kötés, ami gyengébb a folytonos anyagnál.' }],
    },
  },
];
