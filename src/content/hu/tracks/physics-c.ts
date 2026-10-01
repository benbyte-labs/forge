import type { Day } from '../../types';

/** FIZIKA trek, 6–12. nap. */
export const physicsHuC: Day[] = [
  {
    day: 6,
    title: 'Forgómozgás',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A forgómozgásnak ugyanaz a szerkezete, mint az egyenes vonalúnak — csak minden mennyiségnek van egy forgó párja.' },
      { k: 'text', md: '| egyenes | forgó |\n| --- | --- |\n| út (s) | szög (φ) |\n| sebesség (v) | szögsebesség (ω) |\n| gyorsulás (a) | szöggyorsulás (α) |\n| tömeg (m) | tehetetlenségi nyomaték (I) |\n| erő (F) | nyomaték (M) |' },
      { k: 'formula', tex: 'M = I \\cdot \\alpha', explain: 'Ez a forgó megfelelője az F = m·a képletnek. A tehetetlenségi nyomaték a forgó „tömeg": megmondja, mennyire nehéz felpörgetni valamit.' },
      { k: 'callout', tone: 'key', md: 'A tehetetlenségi nyomaték nemcsak a tömegtől függ, hanem attól is, **hol van az a tömeg**. Egy tengelytől távol lévő tömeg sokkal jobban ellenáll a forgásnak. Ezért van a lendkeréken kívül az anyag, és ezért húzza be a karját a piruettező korcsolyázó.' },
      { k: 'formula', tex: '\\omega = \\frac{2\\pi n}{60}', explain: 'Fordulatszámból (rpm) szögsebesség radián per másodpercben. 600 rpm ≈ 62,8 rad/s. A motoros számításoknál állandóan kell.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a tömeg forgó megfelelője?', opts: ['A nyomaték', 'A tehetetlenségi nyomaték', 'A szögsebesség'], answer: 1, why: 'Ahogy a tömeg ellenáll a gyorsításnak, úgy a tehetetlenségi nyomaték a felpörgetésnek.' },
      { k: 'single', q: 'Mitől függ a tehetetlenségi nyomaték a tömegen kívül?', opts: ['A színtől', 'Attól, milyen messze van a tömeg a tengelytől', 'A hőmérséklettől'], answer: 1, why: 'A távolság négyzetesen számít. Ezért pörög fel könnyebben egy tömör korong, mint egy ugyanolyan tömegű gyűrű.' },
      { k: 'numeric', q: 'Mekkora 600 rpm szögsebességben? (rad/s, egy tizedes)', answer: 62.8, tol: 1, unit: 'rad/s', why: 'ω = 2π·600/60 = 2π·10 ≈ 62,8 rad/s.' },
      { k: 'single', q: 'Miért húzza be a karját a piruettező korcsolyázó?', opts: ['Hogy szebb legyen', 'Mert így csökken a tehetetlenségi nyomatéka, és gyorsabban pörög', 'Hogy ne szédüljön'], answer: 1, why: 'A perdület megmarad. Kisebb tehetetlenségi nyomaték mellett ugyanaz a perdület nagyobb szögsebességet jelent.' },
    ],
    note: {
      summary: ['A forgómozgás minden mennyiségének van egyenes vonalú párja.', 'M = I·α a forgó megfelelője az F = m·a képletnek.', 'A tehetetlenségi nyomaték a forgó „tömeg": mennyire nehéz felpörgetni.', 'Nemcsak a tömeg számít, hanem a tengelytől mért távolság is, négyzetesen.', 'ω = 2πn/60 alakítja a fordulatszámot szögsebességgé.'],
      terms: [{ term: 'szögsebesség', def: 'A szög változása időegység alatt, rad/s-ban.' }, { term: 'tehetetlenségi nyomaték', def: 'A forgatással szembeni ellenállás; a tömeg forgó megfelelője.' }, { term: 'perdület', def: 'A forgómozgás „lendülete", ami külső nyomaték nélkül megmarad.' }],
    },
  },
  {
    day: 7,
    title: 'Impulzus és ütközés',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Az **impulzus** (lendület) a tömeg és a sebesség szorzata. Zárt rendszerben az összege mindig megmarad — ütközésnél is.' },
      { k: 'formula', tex: 'p = m \\cdot v', explain: 'Egy 2 kg-os, 3 m/s-mal haladó robot impulzusa 6 kg·m/s. Vektormennyiség: az iránya is számít.' },
      { k: 'callout', tone: 'key', md: 'Az **impulzusmegmaradás** azt mondja: ütközés előtt és után az összimpulzus ugyanannyi. Ez akkor is igaz, ha a testek összetapadnak, és akkor is, ha visszapattannak — pedig az energia közben nem feltétlenül marad meg.' },
      { k: 'text', md: 'Kétféle ütközés:\n\n- **Rugalmas** — az energia is megmarad. Biliárdgolyók, acélgolyók.\n- **Rugalmatlan** — az energia egy része hővé és alakváltozássá válik. Két autó, két összetapadó test.' },
      { k: 'formula', tex: 'F \\cdot \\Delta t = \\Delta p', explain: 'Az erőlökés egyenlő az impulzusváltozással. Ezért véd a légzsák: nem az impulzusváltozást csökkenti, hanem az időt nyújtja meg — így kisebb az erő.' },
    ],
    quiz: [
      { k: 'numeric', q: 'Mekkora egy 2 kg-os, 3 m/s-mal haladó test impulzusa? (kg·m/s)', answer: 6, tol: 0.1, unit: 'kg·m/s', why: 'p = m·v = 2 · 3 = 6 kg·m/s.' },
      { k: 'single', q: 'Mi marad meg minden ütközésnél?', opts: ['Az energia', 'Az impulzus', 'A sebesség'], answer: 1, why: 'Az impulzus mindig megmarad. Az energia csak rugalmas ütközésnél — egyébként hővé alakul egy része.' },
      { k: 'single', q: 'Miért véd a légzsák?', opts: ['Felfogja az ütést', 'Megnyújtja az ütközés idejét, ezért kisebb az erő', 'Csökkenti a sebességet'], answer: 1, why: 'Az impulzusváltozás ugyanannyi. Ha hosszabb idő alatt történik, az erő arányosan kisebb.' },
      { k: 'single', q: 'Mi a különbség a rugalmas és a rugalmatlan ütközés közt?', opts: ['A sebességben', 'Rugalmasnál az energia is megmarad, rugalmatlannál hővé alakul', 'A tömegben'], answer: 1, why: 'Mindkettőnél megmarad az impulzus. Csak az energia sorsa más.' },
    ],
    note: {
      summary: ['Az impulzus p = m·v, vektormennyiség.', 'Az impulzus minden ütközésnél megmarad.', 'Rugalmas ütközésnél az energia is megmarad; rugalmatlannál hővé válik.', 'Erőlökés: F·Δt = Δp.', 'A légzsák az időt nyújtja meg, ezért csökken az erő.'],
      terms: [{ term: 'impulzus', def: 'A tömeg és a sebesség szorzata; a mozgás „mennyisége".' }, { term: 'impulzusmegmaradás', def: 'Zárt rendszerben az összimpulzus állandó.' }, { term: 'erőlökés', def: 'Erő és hatásidő szorzata, ami az impulzusváltozással egyenlő.' }],
    },
  },
  {
    day: 8,
    title: 'Súrlódás',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A súrlódás nélkül a robotod nem tudna elindulni, megállni és kanyarodni sem. Nem ellenség — eszköz.' },
      { k: 'formula', tex: 'F_s = \\mu \\cdot F_n', explain: 'A súrlódási erő a nyomóerő és a súrlódási együttható szorzata. A felület **nagysága nem szerepel** benne — ez meglepő, de így van.' },
      { k: 'text', md: 'Két fajtája van:\n\n- **Tapadási súrlódás** — amíg nem mozdul. Nagyobb, és ezt kell legyőzni az induláshoz.\n- **Csúszási súrlódás** — amikor már csúszik. Kisebb.\n\nEzért nehezebb elindítani egy szekrényt, mint tolni, ha már megindult.' },
      { k: 'sim', sim: 'incline' },
      { k: 'callout', tone: 'key', md: 'A robotod gyorsulását a tapadás korlátozza, nem a motor. Hiába erősebb a motor, ha a kerék megcsúszik: a maximális gyorsulás **a = μg**. Egy μ = 0,7-es gumi-beton páros legfeljebb 6,9 m/s²-et enged.' },
      { k: 'callout', tone: 'tip', md: 'Ha a robot kereke pörög induláskor, nem több nyomaték kell, hanem **több tapadás**: lágyabb gumi, nagyobb felületi nyomás, vagy lassabb felfutás.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi NEM szerepel a súrlódási erő képletében?', opts: ['A nyomóerő', 'Az érintkező felület nagysága', 'A súrlódási együttható'], answer: 1, why: 'Fs = μ·Fn. A felület nagysága nem számít — a nagyobb felületen arányosan kisebb a nyomás.' },
      { k: 'single', q: 'Melyik nagyobb: a tapadási vagy a csúszási súrlódás?', opts: ['A tapadási', 'A csúszási', 'Egyformák'], answer: 0, why: 'Ezért nehezebb megindítani valamit, mint utána tolni. A tapadást először le kell győzni.' },
      { k: 'numeric', q: 'Mekkora a maximális gyorsulás μ = 0,7 esetén? (m/s², g = 9,81)', answer: 6.9, tol: 0.3, unit: 'm/s²', why: 'a = μg = 0,7 · 9,81 ≈ 6,9 m/s². Ennél jobban nem lehet gyorsítani, akármilyen erős a motor.' },
      { k: 'single', q: 'Mit tegyél, ha pörög a kerék induláskor?', opts: ['Erősebb motor', 'Több tapadást adj: lágyabb gumi vagy lassabb felfutás', 'Nagyobb akku'], answer: 1, why: 'A motor már most több nyomatékot ad, mint amennyit a tapadás át tud vinni. Több nyomaték csak több pörgést jelentene.' },
    ],
    note: {
      summary: ['Fs = μ·Fn — a súrlódási erő a nyomóerőtől és az együtthatótól függ.', 'Az érintkező felület nagysága nem szerepel a képletben.', 'A tapadási súrlódás nagyobb a csúszásinál: nehezebb megindítani, mint tolni.', 'A robot maximális gyorsulása a = μg, nem a motor ereje szabja meg.', 'Pörgő keréknél nem több nyomaték kell, hanem több tapadás.'],
      terms: [{ term: 'súrlódási együttható', def: 'A felületpárra jellemző szám, ami a súrlódási erőt meghatározza.' }, { term: 'tapadási súrlódás', def: 'A megmozdulás előtti, nagyobb súrlódás.' }, { term: 'nyomóerő', def: 'A felületre merőleges erő, ami a súrlódást meghatározza.' }],
    },
  },
  {
    day: 9,
    title: 'Rugók és rezgés',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A rugó a legegyszerűbb rendszer, ami **magától rezeg**. És ami ennél fontosabb: majdnem minden rezgő rendszer úgy viselkedik, mint egy rugó.' },
      { k: 'formula', tex: 'F = -k \\cdot x', explain: 'Hooke törvénye. A mínusz azt jelenti: az erő mindig az egyensúly felé mutat. Minél jobban kitéríted, annál erősebben húz vissza.' },
      { k: 'formula', tex: 'T = 2\\pi\\sqrt{\\frac{m}{k}}', explain: 'A rezgésidő. Figyeld meg, mi **nincs** benne: a kitérés. Egy rugó ugyanannyi idő alatt leng ki kicsit és nagyot is.' },
      { k: 'sim', sim: 'spring' },
      { k: 'callout', tone: 'key', md: 'A nehezebb test lassabban rezeg, a merevebb rugó gyorsabban. Négyszeres tömeg kétszeres rezgésidőt jelent — a gyök miatt, nem lineárisan.' },
      { k: 'callout', tone: 'tip', md: 'Ez nem csak rugókról szól. A robotkar hajlásra visszalengő vége, a futómű, a mérlegcella — mind ugyanezzel a képlettel írható le. Ha valami rezeg, keresd meg benne a „k"-t és az „m"-et.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit jelent a mínusz a Hooke-törvényben?', opts: ['Az erő negatív', 'Az erő mindig az egyensúly felé mutat', 'A rugó megnyúlik'], answer: 1, why: 'A visszatérítő erő ellentétes a kitéréssel. Ettől lesz a mozgás rezgés, nem elszállás.' },
      { k: 'single', q: 'Mi NEM befolyásolja a rezgésidőt?', opts: ['A tömeg', 'A rugóállandó', 'A kitérés nagysága'], answer: 2, why: 'A T = 2π√(m/k) képletben nincs benne a kitérés. Kis és nagy lengés ideje azonos.' },
      { k: 'single', q: 'Mi történik a rezgésidővel, ha négyszerezed a tömeget?', opts: ['Négyszereződik', 'Kétszereződik', 'Nem változik'], answer: 1, why: 'A tömeg gyök alatt van: √4 = 2. A négyszeres tömeg kétszeres rezgésidőt ad.' },
      { k: 'single', q: 'Mi történik, ha merevebb rugót használsz?', opts: ['Lassabban rezeg', 'Gyorsabban rezeg', 'Nem változik'], answer: 1, why: 'A k a nevezőben van: nagyobb k kisebb T-t, vagyis gyorsabb rezgést ad.' },
    ],
    note: {
      summary: ['Hooke törvénye: F = -k·x, a visszatérítő erő az egyensúly felé mutat.', 'Rezgésidő: T = 2π√(m/k).', 'A rezgésidő nem függ a kitérés nagyságától.', 'Nehezebb test lassabban, merevebb rugó gyorsabban rezeg.', 'Négyszeres tömeg kétszeres rezgésidő — a négyzetgyök miatt.', 'Minden rezgő rendszer leírható így: keresd meg a k-t és az m-et.'],
      terms: [{ term: 'rugóállandó (k)', def: 'A rugó merevsége: mekkora erő kell egységnyi kitéréshez.' }, { term: 'rezgésidő', def: 'Egy teljes rezgés ideje.' }, { term: 'visszatérítő erő', def: 'Az egyensúly felé mutató erő, ami a rezgést fenntartja.' }],
    },
  },
  {
    day: 10,
    title: 'Csillapítás',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A valódi rezgés előbb-utóbb elhal: a **csillapítás** energiát von ki a rendszerből. Ez nem hiba, hanem gyakran pont az, amit akarsz.' },
      { k: 'formula', tex: 'm\\ddot{x} + c\\dot{x} + kx = 0', explain: 'A csillapított rezgés egyenlete. A `c` a csillapítási tényező: a sebességgel arányos fékező erőt ad.' },
      { k: 'text', md: 'Három eset van, és a mérnöki munka nagy része arról szól, melyiket akarod:\n\n- **Alulcsillapított** — lengve áll be. Gyors, de túllő.\n- **Kritikusan csillapított** — a leggyorsabb beállás túllövés nélkül. Ez a cél.\n- **Túlcsillapított** — lomhán, lengés nélkül kúszik be. Biztonságos, de lassú.' },
      { k: 'sim', sim: 'spring' },
      { k: 'callout', tone: 'key', md: 'Ez pontosan ugyanaz a három eset, amivel a PID-szabályozónál fogsz találkozni. Egy rosszul hangolt robotkar leng az új pozíció körül — ez alulcsillapított viselkedés, és a megoldás ugyanaz: több csillapítás, azaz nagyobb D-tag.' },
      { k: 'callout', tone: 'tip', md: 'A csillapítás a sebességgel arányos, nem a kitéréssel. Ezért nem lassítja a lassú mozgást, csak a hirtelen lengést fékezi — pont ezt akarjuk.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a kritikus csillapítás?', opts: ['Amikor nem rezeg', 'A leggyorsabb beállás túllövés nélkül', 'Amikor a leglassabb'], answer: 1, why: 'Ez a határeset: ennél kevesebb csillapításnál leng, ennél többnél lomha lesz.' },
      { k: 'single', q: 'Mitől arányos a csillapító erő?', opts: ['A kitéréstől', 'A sebességtől', 'A tömegtől'], answer: 1, why: 'Ezért nem zavarja a lassú mozgást, és ezért fékezi hatékonyan a gyors lengést.' },
      { k: 'single', q: 'Mi történik alulcsillapított rendszerben?', opts: ['Lengve áll be, túllőve a célt', 'Lassan kúszik be', 'Nem mozdul'], answer: 0, why: 'Kevés csillapításnál a rendszer átlendül a célon, és körülötte leng, amíg el nem hal.' },
      { k: 'single', q: 'Hol találkozol ugyanezzel a három esettel?', opts: ['A PID-szabályozónál', 'A fordulatszám-mérésnél', 'Az akkuknál'], answer: 0, why: 'A rosszul hangolt szabályozó pontosan így viselkedik: leng, kritikusan áll be, vagy lomha.' },
    ],
    note: {
      summary: ['A csillapítás energiát von ki: a rezgés elhal.', 'Az egyenlet: m·ẍ + c·ẋ + k·x = 0, ahol c a csillapítási tényező.', 'Három eset: alulcsillapított (leng), kritikus (leggyorsabb túllövés nélkül), túlcsillapított (lomha).', 'A csillapító erő a sebességgel arányos, nem a kitéréssel.', 'Ugyanez a három eset jelenik meg a PID-szabályozó hangolásánál.'],
      terms: [{ term: 'csillapítás', def: 'Sebességgel arányos fékezés, ami energiát von ki a rendszerből.' }, { term: 'kritikus csillapítás', def: 'A leggyorsabb beállás túllövés nélkül.' }, { term: 'túllövés', def: 'A célérték átlépése beállás közben.' }],
    },
  },
  {
    day: 11,
    title: 'Lejtő és gépek',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'Az **egyszerű gép** nem csökkenti a munkát — csak elosztja. Kisebb erővel, hosszabb úton végzed el ugyanazt.' },
      { k: 'formula', tex: 'W = F \\cdot s = \\text{állandó}', explain: 'Ez az „aranyszabály": amennyit nyersz erőben, annyit veszítesz úton. Egy gép sem ad energiát ingyen.' },
      { k: 'text', md: 'A klasszikus gépek:\n\n- **Lejtő** — a magasságot hosszabb úton éred el, kisebb erővel.\n- **Emelő** — a hosszabb kar oldalán kisebb erő kell (ez a nyomaték).\n- **Csiga** — minden mozgó csiga felezi az erőt és duplázza az utat.\n- **Csavar** — egy körbetekert lejtő; nagyon nagy erőátvitelt ad.\n- **Fogaskerék** — fordulatot cserél nyomatékra.' },
      { k: 'sim', sim: 'incline' },
      { k: 'callout', tone: 'key', md: 'A robotod hajtóműve ugyanez: tízszeres áttétel tizedannyi fordulat és (veszteség nélkül) tízszeres nyomaték. Az „aranyszabály" itt is pontosan érvényes.' },
      { k: 'callout', tone: 'warn', md: 'A valóságban a súrlódás miatt mindig kevesebbet kapsz. Egy hajtómű hatásfoka tipikusan 70–95% — a többi hővé válik. Ezért melegszik egy terhelt szervó.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit csökkent egy egyszerű gép?', opts: ['A munkát', 'A szükséges erőt, hosszabb út árán', 'Az energiát'], answer: 1, why: 'A munka ugyanannyi marad. Csak máshogy oszlik el erő és út között.' },
      { k: 'single', q: 'Mit ad egy tízszeres áttételű hajtómű?', opts: ['Tízszeres fordulatot', 'Tízszeres nyomatékot, tizedannyi fordulatot', 'Tízszeres teljesítményt'], answer: 1, why: 'Fordulatot cserél nyomatékra. A teljesítmény (veszteség nélkül) ugyanannyi marad.' },
      { k: 'single', q: 'Miért melegszik egy terhelt szervó?', opts: ['Túl gyors', 'Mert a veszteség hővé alakul', 'Mert nagy a feszültség'], answer: 1, why: 'A hajtómű hatásfoka 70–95%. Ami nem alakul mozgássá, az hő lesz.' },
      { k: 'single', q: 'Mi a csavar lényege fizikailag?', opts: ['Egy emelő', 'Egy körbetekert lejtő', 'Egy csiga'], answer: 1, why: 'A menet egy hosszú, enyhe lejtő, ami a tengely körül csavarodik. Ezért ad akkora erőátvitelt.' },
    ],
    note: {
      summary: ['Az egyszerű gép nem csökkenti a munkát, csak elosztja erő és út közt.', 'Aranyszabály: W = F·s állandó.', 'Lejtő, emelő, csiga, csavar, fogaskerék — mind ugyanazt teszi.', 'A hajtómű fordulatot cserél nyomatékra, tízszeres áttétel tízszeres nyomaték.', 'A valóságban a hatásfok 70–95%; a többi hővé válik.'],
      terms: [{ term: 'egyszerű gép', def: 'Eszköz, ami az erőt és az utat cseréli el egymással.' }, { term: 'aranyszabály', def: 'Amennyit nyersz erőben, annyit veszítesz úton.' }, { term: 'hatásfok', def: 'A hasznos és a befektetett energia aránya.' }],
    },
  },
  {
    day: 12,
    title: 'Nyomás és folyadékok',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A **nyomás** az erő és a felület hányadosa. Ugyanaz az erő kis felületen óriási nyomást ad — ezért vág a kés és ezért nem süllyed el a hótalpas ember.' },
      { k: 'formula', tex: 'p = \\frac{F}{A}', explain: 'Egysége a pascal: 1 Pa = 1 N/m². A légköri nyomás kb. 101 325 Pa, azaz 1 bar.' },
      { k: 'formula', tex: 'p = \\rho g h', explain: 'A folyadékoszlop nyomása csak a **magasságtól** függ, az edény alakjától nem. Tíz méter víz kb. 1 bar — ezért nő a nyomás a mélyben ilyen gyorsan.' },
      { k: 'callout', tone: 'key', md: 'Pascal törvénye: zárt folyadékban a nyomás **minden irányban egyformán** terjed. Ezért működik a hidraulika: a kis dugattyún kifejtett erő a nagy dugattyún felnagyítva jelenik meg — a felületek arányában.' },
      { k: 'callout', tone: 'tip', md: 'A robotikában ez a pneumatika és a hidraulika alapja. Egy ipari robotkar, ami száz kilót emel, szinte biztosan hidraulikus — mert az ad a legnagyobb erőt a legkisebb helyen.' },
    ],
    quiz: [
      { k: 'numeric', q: 'Mekkora nyomást ad 100 N erő 0,01 m² felületen? (Pa)', answer: 10000, tol: 100, unit: 'Pa', why: 'p = F/A = 100 / 0,01 = 10 000 Pa, azaz 0,1 bar.' },
      { k: 'single', q: 'Mitől függ a folyadékoszlop nyomása?', opts: ['Az edény alakjától', 'Csak a magasságtól (és a sűrűségtől)', 'Az edény térfogatától'], answer: 1, why: 'Egy vékony cső és egy széles tartály ugyanolyan magas vízoszlopa ugyanakkora nyomást ad az alján.' },
      { k: 'single', q: 'Mit mond ki Pascal törvénye?', opts: ['A nyomás lefelé nagyobb', 'Zárt folyadékban a nyomás minden irányban egyformán terjed', 'A folyadék összenyomhatatlan'], answer: 1, why: 'Ezért tudja egy hidraulikus rendszer a kis dugattyú erejét a nagy dugattyún felnagyítva kiadni.' },
      { k: 'single', q: 'Miért vág a kés?', opts: ['Mert kemény', 'Mert kis felületen nagy nyomást ad ugyanaz az erő', 'Mert éles a szöge'], answer: 1, why: 'p = F/A. A pengeél felülete nagyon kicsi, ezért a nyomás óriási.' },
    ],
    note: {
      summary: ['A nyomás p = F/A; egysége a pascal (N/m²).', 'Kis felületen ugyanaz az erő óriási nyomást ad.', 'A folyadékoszlop nyomása p = ρgh — csak a magasságtól függ, az alaktól nem.', 'Pascal törvénye: zárt folyadékban a nyomás minden irányban egyenlő.', 'Ezen alapul a hidraulika: a felületarány nagyítja fel az erőt.'],
      terms: [{ term: 'nyomás', def: 'Erő osztva a felülettel; egysége a pascal.' }, { term: 'hidrosztatikai nyomás', def: 'A folyadékoszlop magasságából származó nyomás.' }, { term: 'Pascal törvénye', def: 'Zárt folyadékban a nyomás minden irányban egyformán terjed.' }],
    },
  },
];
