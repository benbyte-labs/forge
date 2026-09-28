import type { Day } from '../../types';

/** FIZIKA trek, 2–5. nap. */
export const physicsHuB: Day[] = [
  {
    day: 2,
    title: 'Sebesség és gyorsulás',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A **sebesség** azt mondja meg, milyen gyorsan változik a hely. A **gyorsulás** azt, milyen gyorsan változik a sebesség. A kettő összekeverése a leggyakoribb fizikai félreértés.' },
      { k: 'formula', tex: 'v = \\frac{\\Delta s}{\\Delta t}, \\qquad a = \\frac{\\Delta v}{\\Delta t}', explain: 'Mindkettő ugyanaz a szerkezet: valami változása osztva az eltelt idővel. A gyorsulás egysége ezért m/s², nem m/s.' },
      { k: 'callout', tone: 'key', md: 'Nagy sebesség nem jelent gyorsulást. Az autópályán 130-cal haladó autó gyorsulása **nulla**, ha nem változik a sebessége. A robotod is akkor gyorsul, amikor indul vagy fékez — nem akkor, amikor gyorsan megy.' },
      { k: 'formula', tex: 's = v_0 t + \\frac{1}{2}at^2', explain: 'Az egyenletesen gyorsuló mozgás útja. Ha nulláról indulsz (v₀ = 0), marad a fél a t négyzet — ez az a képlet, amit a leggyakrabban fogsz használni.' },
      { k: 'sim', sim: 'incline' },
      { k: 'text', md: 'A lejtőn a gravitáció egy része gyorsít. Csúszkázd a szöget: laposan alig gyorsul, meredeken egyre jobban. A súrlódás pedig ellene dolgozik — erről a 8. napon lesz szó.' },
    ],
    quiz: [
      { k: 'numeric', q: 'A robot 3 s alatt gyorsul 0-ról 6 m/s-ra. Mekkora a gyorsulása? (m/s²)', answer: 2, tol: 0.05, unit: 'm/s²', why: 'a = Δv/Δt = 6/3 = 2 m/s². Minden másodpercben 2 m/s-mal nő a sebessége.' },
      { k: 'single', q: 'Mekkora egy állandó 100 km/h-val haladó autó gyorsulása?', opts: ['100 m/s²', 'Nulla', 'Nem meghatározható'], answer: 1, why: 'A gyorsulás a sebesség **változása**. Ha a sebesség nem változik, a gyorsulás nulla, akármilyen gyorsan megy.' },
      { k: 'single', q: 'Mi a gyorsulás mértékegysége?', opts: ['m/s', 'm/s²', 'm²/s'], answer: 1, why: 'A sebesség (m/s) változása osztva idővel (s): m/s² — „méter per másodperc, másodpercenként".' },
      { k: 'numeric', q: '2 m/s² gyorsulással, állóhelyzetből indulva mennyit tesz meg 3 s alatt? (m)', answer: 9, tol: 0.2, unit: 'm', why: 's = ½at² = 0,5 · 2 · 9 = 9 m. Figyeld meg, hogy az idő négyzetesen számít: kétszer annyi idő négyszer akkora út.' },
    ],
    note: {
      summary: ['A sebesség a hely változása időegység alatt: v = Δs/Δt.', 'A gyorsulás a sebesség változása időegység alatt: a = Δv/Δt.', 'A gyorsulás egysége m/s², nem m/s.', 'Nagy sebesség nem jelent gyorsulást — állandó sebességnél a gyorsulás nulla.', 'Egyenletesen gyorsuló mozgás: s = v₀t + ½at². Az idő négyzetesen számít.'],
      terms: [{ term: 'sebesség', def: 'A hely változása időegység alatt, vektormennyiség.' }, { term: 'gyorsulás', def: 'A sebesség változása időegység alatt.' }, { term: 'egyenletesen gyorsuló mozgás', def: 'Mozgás állandó gyorsulással, ahol az út az idő négyzetével nő.' }],
    },
  },
  {
    day: 3,
    title: 'Newton törvényei',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Három mondat, amiből az egész klasszikus mechanika következik. Nem kell megjegyezni őket szó szerint — érteni kell, mit jelentenek.' },
      { k: 'text', md: '**Első (tehetetlenség):** ami mozog, mozgásban marad, ha nem hat rá erő. Ami áll, áll marad. A Földön azért nem így látszik, mert mindig hat súrlódás.\n\n**Második:** F = m · a. Az erő gyorsulást okoz, és ugyanaz az erő a nehezebb testet kevésbé gyorsítja.\n\n**Harmadik:** minden erőnek van ellenereje, ugyanakkora, ellentétes irányú. A robot azért halad előre, mert a kereke hátrafelé tolja a talajt.' },
      { k: 'formula', tex: 'F = m \\cdot a', explain: 'A fizika legfontosabb képlete. Ha ismersz kettőt a háromból, a harmadik kijön. Egységek: N = kg · m/s².' },
      { k: 'callout', tone: 'key', md: 'A harmadik törvény nélkül egy robot sem tudna elindulni. A kerék hátrafelé súrlódik a padlón, a padló előrefelé tolja a robotot. Jégen ez nem működik — ezért pörög ott a kerék a helyben.' },
      { k: 'sim', sim: 'projectile' },
      { k: 'callout', tone: 'tip', md: 'Amikor egy feladatnál elakadsz, rajzold fel a testre ható **összes** erőt nyilakkal. A legtöbb mechanikai hiba abból jön, hogy egy erőt kifelejtettél.' },
    ],
    quiz: [
      { k: 'numeric', q: 'Mekkora erő kell egy 2 kg-os robot 3 m/s²-tel való gyorsításához? (N)', answer: 6, tol: 0.1, unit: 'N', why: 'F = m·a = 2 · 3 = 6 N. Ez a második törvény közvetlen alkalmazása.' },
      { k: 'single', q: 'Miért tud a robot előrehaladni?', opts: ['Mert a motor tolja a levegőt', 'Mert a kerék hátratolja a talajt, a talaj pedig előre a robotot', 'Mert könnyebb a levegőnél'], answer: 1, why: 'Ez a harmadik törvény. A talaj reakcióereje hajtja a robotot; jégen, ahol nincs elég súrlódás, ez elmarad.' },
      { k: 'single', q: 'Mit mond ki az első törvény?', opts: ['Minden test lelassul magától', 'Erő nélkül a mozgásállapot nem változik', 'A nehezebb test gyorsabban esik'], answer: 1, why: 'Erő nélkül nincs gyorsulás: ami mozgott, ugyanúgy mozog tovább. A Földön a súrlódás miatt látszik másnak.' },
      { k: 'single', q: 'Ugyanakkora erő hat egy 1 kg-os és egy 4 kg-os testre. Melyik gyorsul jobban?', opts: ['Az 1 kg-os, négyszer jobban', 'A 4 kg-os', 'Ugyanannyira'], answer: 0, why: 'a = F/m. Négyszer nagyobb tömeg negyedakkora gyorsulást jelent ugyanakkora erőnél.' },
    ],
    note: {
      summary: ['Első törvény: erő nélkül a mozgásállapot nem változik.', 'Második törvény: F = m·a — az erő gyorsulást okoz, a tömeg ellenáll neki.', 'Harmadik törvény: minden erőnek van ugyanakkora ellenereje.', 'A robot azért halad, mert a kerék hátratolja a talajt, és a talaj visszatolja őt.', 'Ugyanakkora erő a nehezebb testet arányosan kevésbé gyorsítja.', 'Ha elakadsz: rajzold fel az összes erőt nyilakkal.'],
      terms: [{ term: 'tehetetlenség', def: 'A test ellenállása a mozgásállapot megváltozásával szemben.' }, { term: 'erő', def: 'Kölcsönhatás, ami gyorsulást okoz; egysége a newton.' }, { term: 'reakcióerő', def: 'Az az ugyanakkora, ellentétes irányú erő, amivel a test visszahat.' }],
    },
  },
  {
    day: 4,
    title: 'Munka és energia',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A **munka** akkor történik, ha egy erő elmozdulást okoz. Ha tartasz egy dobozt, de nem mozdulsz, fizikai értelemben nem végzel munkát — bármennyire fáradsz is.' },
      { k: 'formula', tex: 'W = F \\cdot s \\cdot \\cos\\alpha', explain: 'A munka az erő és az elmozdulás szorzata, de csak az erő elmozdulás irányú összetevője számít. Merőleges erő (α = 90°) nulla munkát végez.' },
      { k: 'text', md: 'Az **energia** a munkavégző képesség. Két fajtájával fogsz dolgozni:\n\n- **Mozgási energia:** E = ½mv²\n- **Helyzeti energia:** E = mgh' },
      { k: 'callout', tone: 'key', md: 'A mozgási energia a sebesség **négyzetével** nő. Kétszeres sebesség négyszeres energia — ezért lesz a kétszer gyorsabb ütközés négyszer súlyosabb, és ezért fogy az akkumulátorod aránytalanul gyorsan, ha a robotot felpörgeted.' },
      { k: 'sim', sim: 'spring' },
      { k: 'text', md: 'A rugó a két energiafajta közti oda-vissza alakulást mutatja. Csillapítás nélkül (c = 0) az összenergia állandó marad. Told fel a c-t: az energia hővé alakul, és a rezgés elhal.' },
    ],
    quiz: [
      { k: 'numeric', q: 'Mekkora egy 2 kg-os, 3 m/s-mal mozgó robot mozgási energiája? (J)', answer: 9, tol: 0.2, unit: 'J', why: 'E = ½mv² = 0,5 · 2 · 9 = 9 J. Figyeld meg a sebesség négyzetét.' },
      { k: 'single', q: 'Végzel-e munkát, ha mozdulatlanul tartasz egy dobozt?', opts: ['Igen, sokat', 'Fizikai értelemben nem, mert nincs elmozdulás', 'Csak ha nehéz'], answer: 1, why: 'A munkához elmozdulás kell. Az izmod energiát éget, de a dobozon nem végez munkát — ez a fizikai és a hétköznapi jelentés különbsége.' },
      { k: 'single', q: 'Hányszorosára nő a mozgási energia, ha a sebesség megkétszereződik?', opts: ['Kétszeresére', 'Négyszeresére', 'Nem változik'], answer: 1, why: 'Az energia a sebesség négyzetével arányos: 2² = 4. Ezért olyan veszélyes a sebesség növelése.' },
      { k: 'numeric', q: 'Mekkora egy 1 kg-os test helyzeti energiája 2 m magasan? (J, g = 9,81)', answer: 19.62, tol: 0.3, unit: 'J', why: 'E = mgh = 1 · 9,81 · 2 = 19,62 J. Ennyi munkát végzett a gravitáció ellenében, aki felemelte.' },
    ],
    note: {
      summary: ['Munka: erő × elmozdulás, csak az elmozdulás irányú összetevő számít.', 'Elmozdulás nélkül nincs munka, akkor sem, ha fáradsz.', 'Mozgási energia: E = ½mv² — a sebesség négyzetével nő.', 'Helyzeti energia: E = mgh.', 'Kétszeres sebesség négyszeres energiát jelent — ezért fogy az akku aránytalanul.', 'Csillapítás nélkül az összenergia megmarad; csillapítással hővé alakul.'],
      terms: [{ term: 'munka', def: 'Erő és az általa okozott elmozdulás szorzata.' }, { term: 'mozgási energia', def: 'A mozgásból származó energia: ½mv².' }, { term: 'energiamegmaradás', def: 'Zárt rendszerben az összenergia állandó, csak alakot vált.' }],
    },
  },
  {
    day: 5,
    title: 'Nyomaték',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A **nyomaték** a forgatás „ereje". Nem az számít, mekkora erővel nyomsz, hanem az is, milyen messze a forgástengelytől.' },
      { k: 'formula', tex: 'M = F \\cdot r', explain: 'Erő szorozva a tengelytől mért merőleges távolsággal. Egysége Nm. Ezért könnyebb az ajtót a kilincsnél nyitni, mint a zsanérnál.' },
      { k: 'sim', sim: 'torque' },
      { k: 'text', md: 'A mérleg akkor van egyensúlyban, ha a két oldal nyomatéka egyenlő: m₁·r₁ = m₂·r₂. Kisebb tömeg is egyensúlyt tarthat, ha messzebb ül.' },
      { k: 'callout', tone: 'key', md: 'A robotkarnál ez élet-halál kérdés. A tőben lévő szervónak a **teljes kar** súlyát kell tartania, a kinyújtott kar teljes hosszán. Egy 100 g-os megfogó 30 cm-en 0,3 Nm nyomatékot jelent — sok hobbiszervó ennyit nem bír.' },
      { k: 'callout', tone: 'tip', md: 'Karnál mindig a legrosszabb esettel számolj: teljesen kinyújtott kar, maximális terhelés. Ha úgy is bírja, minden más helyzetben is bírni fogja.' },
    ],
    quiz: [
      { k: 'numeric', q: 'Mekkora nyomatékot ad 5 N erő 0,4 m karon? (Nm)', answer: 2, tol: 0.05, unit: 'Nm', why: 'M = F·r = 5 · 0,4 = 2 Nm. A kar hossza ugyanolyan fontos, mint az erő nagysága.' },
      { k: 'single', q: 'Miért könnyebb az ajtót a kilincsnél nyitni?', opts: ['Mert ott erősebb a kéz', 'Mert nagyobb a kar, így ugyanaz az erő nagyobb nyomatékot ad', 'Mert ott kisebb a súrlódás'], answer: 1, why: 'M = F·r. A zsanértól távolabb ugyanaz az erő sokszoros nyomatékot jelent.' },
      { k: 'single', q: 'Mikor van egyensúlyban egy mérleg?', opts: ['Ha a két tömeg egyenlő', 'Ha a két oldal nyomatéka egyenlő', 'Ha a két kar egyenlő'], answer: 1, why: 'A nyomatékok egyenlősége a feltétel: m₁·r₁ = m₂·r₂. A tömegek lehetnek különbözőek, ha a karok ezt kiegyenlítik.' },
      { k: 'numeric', q: 'Egy 100 g-os megfogó 30 cm-es karon. Mekkora nyomaték a tőben? (Nm, g = 9,81)', answer: 0.29, tol: 0.03, unit: 'Nm', why: 'F = mg = 0,1 · 9,81 = 0,98 N, M = F·r = 0,98 · 0,3 ≈ 0,29 Nm. Ennyit kell a tőszervónak tartania — és ez még csak a megfogó.' },
    ],
    note: {
      summary: ['Nyomaték = erő × a tengelytől mért merőleges távolság, egysége Nm.', 'Ugyanaz az erő hosszabb karon nagyobb nyomatékot ad.', 'Egyensúly: a két oldal nyomatéka egyenlő, nem a tömege.', 'Robotkarnál a tőszervónak a teljes kar terhelését kell tartania.', '100 g 30 cm-en már 0,3 Nm — sok hobbiszervó ennyit nem bír.', 'Mindig a legrosszabb esettel számolj: kinyújtott kar, teljes terhelés.'],
      terms: [{ term: 'nyomaték', def: 'Forgatóhatás: erő szorozva a tengelytől mért távolsággal.' }, { term: 'erőkar', def: 'A forgástengely és az erő hatásvonala közti merőleges távolság.' }, { term: 'egyensúly', def: 'Az az állapot, amikor a testre ható nyomatékok összege nulla.' }],
    },
  },
];
