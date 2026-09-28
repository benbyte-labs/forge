import type { Day } from '../../types';

/** ROBOTIKA trek, 2–5. nap. */
export const roboticsHuB: Day[] = [
  {
    day: 2,
    title: 'Szenzorok: hogyan lát a gép',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A robot nem „látja" a világot. Feszültségeket mér, és abból következtet. Minden szenzor ugyanazt csinálja: egy fizikai mennyiséget elektromos jellé alakít.' },
      { k: 'text', md: 'A leggyakoribbak, amikkel kezdeni fogsz:\n\n- **Ultrahangos távolságmérő (HC-SR04)** — hangot küld, méri a visszhang idejét. 2–400 cm, olcsó, de lágy felületen és ferdén hibázik.\n- **Infravörös távolság (Sharp)** — fényvisszaverődés. Gyorsabb, de a napfény zavarja.\n- **Ütközéskapcsoló** — egyszerű kapcsoló. Nulla intelligencia, nulla hiba.\n- **Enkóder** — a kerék elfordulását számolja. Ebből tudod, mennyit haladtál.\n- **IMU (giroszkóp + gyorsulásmérő)** — szögsebesség és dőlés.' },
      { k: 'formula', tex: 's = \\frac{v_{hang} \\cdot t}{2}', explain: 'Az ultrahangos mérés képlete. A hang kb. 343 m/s-mal megy, az idő oda-vissza telik el, ezért a kettes osztó. Ha ezt elfelejted, minden távolságod kétszeres lesz.' },
      { k: 'callout', tone: 'key', md: 'Minden szenzor **zajos** és minden szenzor **hazudik** néha. Az ultrahangos 400 cm-t mond, ha nem kap visszhangot — pedig lehet, hogy egy fal van előtte ferdén. Soha ne hozz visszafordíthatatlan döntést egyetlen mérésből.' },
      { k: 'callout', tone: 'tip', md: 'Egyszerű és hatékony védekezés: mérj háromszor, és vedd a középső értéket (medián). A kiugró hibás mérést ez kiszűri, és három sor kód.' },
    ],
    quiz: [
      { k: 'numeric', q: 'Az ultrahangos szenzor 20 ms-os visszhangidőt mér. Hány méter a tárgy? (v = 343 m/s)', answer: 3.43, tol: 0.1, unit: 'm', why: 's = v·t/2 = 343 · 0.020 / 2 = 3,43 m. A kettes osztó azért kell, mert a hang oda is és vissza is megtette az utat.' },
      { k: 'single', q: 'Mit ad az enkóder?', opts: ['A távolságot a faltól', 'A kerék elfordulását', 'A robot dőlését'], answer: 1, why: 'Az enkóder a tengely elfordulását számolja. Ebből és a kerék kerületéből számolod ki, mennyit haladt a robot — ez az odometria.' },
      { k: 'single', q: 'Miért veszélyes egyetlen mérésből dönteni?', opts: ['Lassú', 'Mert minden szenzor zajos, és néha teljesen hibás értéket ad', 'Mert több áramot fogyaszt'], answer: 1, why: 'Egy kiugró mérés miatt a robot fékezhet a semmi előtt, vagy nekimehet a falnak. A szűrés vagy a többszöri mérés nem luxus.' },
      { k: 'multi', q: 'Melyik két szenzor méri közvetlenül a távolságot?', opts: ['Ultrahangos', 'Giroszkóp', 'Infravörös', 'Enkóder'], answers: [0, 2], why: 'Az ultrahangos és az infravörös szenzor a robot előtti távolságot méri. A giroszkóp szögsebességet, az enkóder elfordulást ad.' },
    ],
    note: {
      summary: ['Minden szenzor fizikai mennyiséget alakít elektromos jellé.', 'Ultrahangos: s = v·t/2 — a kettes osztó az oda-vissza út miatt kell.', 'Enkóder: a kerék elfordulását számolja, ebből jön a megtett út.', 'Minden szenzor zajos, és néha teljesen hibás értéket ad.', 'Védekezés: mérj háromszor, vedd a mediánt — három sor kód, nagy nyereség.'],
      terms: [{ term: 'szenzor', def: 'Fizikai mennyiséget elektromos jellé alakító alkatrész.' }, { term: 'enkóder', def: 'A tengely elfordulását számláló érzékelő.' }, { term: 'medián szűrés', def: 'Több mérés középső értékének használata a kiugró hibák kiszűrésére.' }],
    },
  },
  {
    day: 3,
    title: 'Motorok és szervók',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Három motorfajtával fogsz találkozni, és a választás nem ízlés kérdése: mindegyik másra való.' },
      { k: 'text', md: '**Egyenáramú (DC) motor** — feszültséget adsz rá, forog. Gyors, olcsó, de nem tudod, hol áll. Kerékhez való.\n\n**Szervó** — belül DC motor + fogaskerekek + pozícióérzékelő + szabályozó. Szögre állítható (0–180°), és ott is marad. Karhoz, kormányhoz, megfogóhoz.\n\n**Léptetőmotor** — lépésenként fordul, pontosan. Lassú és melegszik, de nyílt hurokban is pontos. 3D nyomtatóban, CNC-ben.' },
      { k: 'robot', scene: 'arm-bench' },
      { k: 'text', md: 'A fenti karon minden tengelyt egy-egy szervó hajt. Mozgasd a csúszkákkal, és figyeld meg: minden szervó **szöget** kap parancsba, nem sebességet.' },
      { k: 'callout', tone: 'warn', md: 'A motort **soha** ne kösd közvetlenül a mikrokontroller lábára. Az Arduino kimenete 40 mA-t bír, egy kis motor 500 mA-t is elvesz indításkor. Meghajtó kell közé — holnap megnézzük, milyen.' },
      { k: 'callout', tone: 'key', md: 'A nyomaték és a fordulatszám egymás rovására megy: ami gyors, az gyenge. A **hajtómű** cseréli át az egyiket a másikra — tízszeres áttétel tizedannyi fordulat és tízszeres nyomaték.' },
    ],
    quiz: [
      { k: 'single', q: 'Melyik motorfajtát használnád egy robotkar könyökéhez?', opts: ['DC motor', 'Szervó', 'Egyik sem'], answer: 1, why: 'A szervó adott szögre áll és ott is marad. Egy karnál pontosan ez kell — a DC motor nem tudja, hol van.' },
      { k: 'single', q: 'Mi van egy szervó belsejében a motoron kívül?', opts: ['Csak fogaskerekek', 'Fogaskerekek, pozícióérzékelő és szabályozó', 'Akkumulátor'], answer: 1, why: 'A szervó egy komplett zárt hurok: méri a saját szögét, és addig hajt, amíg el nem éri a parancsolt értéket.' },
      { k: 'single', q: 'Mit nyersz egy tízszeres áttételű hajtóművel?', opts: ['Tízszeres fordulatszámot', 'Tízszeres nyomatékot, tizedannyi fordulatot', 'Tízszeres teljesítményt'], answer: 1, why: 'A hajtómű nem teremt energiát: fordulatot cserél nyomatékra. A teljesítmény (a veszteségtől eltekintve) ugyanannyi marad.' },
      { k: 'single', q: 'Miért nem köthető a motor közvetlenül a mikrokontrollerre?', opts: ['Mert lassú lenne', 'Mert a motor sokszorosát veszi fel annak az áramnak, amit a láb kibír', 'Mert rossz a feszültsége'], answer: 1, why: 'Egy Arduino-láb néhányszor tíz mA-t bír, a motor indításkor több százat. Meghajtó áramkör nélkül a láb elfüstöl.' },
    ],
    note: {
      summary: ['DC motor: gyors és olcsó, de nem tudja, hol áll — kerékhez való.', 'Szervó: motor + hajtómű + érzékelő + szabályozó; szögre áll és ott marad.', 'Léptetőmotor: lépésenként pontos, lassabb — nyomtatóhoz, CNC-hez.', 'A nyomaték és a fordulatszám egymás rovására megy; a hajtómű cseréli át őket.', 'A motort soha ne kösd közvetlenül a mikrokontroller lábára.'],
      terms: [{ term: 'szervó', def: 'Zárt hurkú motoregység, ami adott szögre áll be és ott marad.' }, { term: 'nyomaték', def: 'Forgatóhatás; a motor „ereje" a fordulatszámmal szemben.' }, { term: 'áttétel', def: 'A hajtómű aránya, ami fordulatszámot cserél nyomatékra.' }],
    },
  },
  {
    day: 4,
    title: 'H-híd és PWM',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Két gyakorlati kérdés maradt a motorról: hogyan fordítod meg az irányát, és hogyan szabályozod a sebességét?' },
      { k: 'text', md: 'Az irányhoz **H-híd** kell. Négy kapcsoló H alakban; attól függően, melyik kettő zár, a motoron egyik vagy másik irányba folyik az áram. Kész chipként kapható: L298N, TB6612, DRV8833.' },
      { k: 'callout', tone: 'warn', md: 'A H-híd egyik oldalán a felső és az alsó kapcsoló **soha** nem lehet egyszerre zárva — az rövidzár a tápon. A kész chipek ezt belül megakadályozzák; ez az egyik ok, amiért nem éri meg magadnak építeni.' },
      { k: 'text', md: 'A sebességhez **PWM** kell (pulzusszélesség-moduláció). Nem a feszültséget csökkented, hanem nagyon gyorsan ki-be kapcsolod. A **kitöltési tényező** (duty cycle) mondja meg, az idő hány százalékában van bekapcsolva.' },
      { k: 'formula', tex: 'U_{\\text{átlag}} = U_{\\text{táp}} \\cdot D', explain: 'D a kitöltési tényező 0 és 1 közt. 12 V-os tápon 50 % kitöltés átlagosan 6 V-ot jelent. A motor a tehetetlensége miatt ezt simán, folyamatos hajtásként érzékeli.' },
      { k: 'sim', sim: 'motor' },
      { k: 'callout', tone: 'tip', md: 'A PWM frekvencia legyen a hallható tartomány felett (>20 kHz), különben a motor sípol. Ez nem esztétikai kérdés: a sípolás azt jelenti, hogy a tekercs rezeg, ami hosszú távon tönkreteszi.' },
    ],
    quiz: [
      { k: 'numeric', q: '12 V-os tápon 25 % kitöltési tényezőnél mennyi az átlagfeszültség? (V)', answer: 3, tol: 0.1, unit: 'V', why: 'U = 12 · 0,25 = 3 V. A PWM nem csökkenti a feszültséget, csak az idő egy részében kapcsolja rá.' },
      { k: 'single', q: 'Mire való a H-híd?', opts: ['A motor sebességének szabályozására', 'A forgásirány megfordítására', 'A feszültség mérésére'], answer: 1, why: 'A H-híd az áram irányát fordítja meg a motoron. A sebesség a PWM dolga — a kettőt gyakran ugyanaz a chip csinálja.' },
      { k: 'single', q: 'Mit jelent a kitöltési tényező?', opts: ['A motor fordulatszámát', 'Az idő hány részében van bekapcsolva a jel', 'A tápfeszültséget'], answer: 1, why: 'A duty cycle az arány: 0 % végig ki, 100 % végig be, 50 % fele-fele. Ebből jön az átlagfeszültség.' },
      { k: 'single', q: 'Miért legyen a PWM frekvencia 20 kHz felett?', opts: ['Hogy gyorsabb legyen a motor', 'Hogy ne sípoljon a hallható tartományban', 'Hogy kevesebbet fogyasszon'], answer: 1, why: 'A hallható tartományban a tekercs rezgése sípolást ad, és ez a rezgés hosszú távon károsítja a motort.' },
    ],
    note: {
      summary: ['A H-híd négy kapcsolóval fordítja meg az áram irányát a motoron.', 'Kész chipek: L298N, TB6612, DRV8833 — belül védenek a rövidzár ellen.', 'A PWM gyors ki-be kapcsolással szabályozza a sebességet.', 'Átlagfeszültség = tápfeszültség × kitöltési tényező.', 'A PWM frekvencia legyen 20 kHz felett, különben a motor sípol és károsodik.'],
      terms: [{ term: 'H-híd', def: 'Négy kapcsolóból álló áramkör, ami megfordítja a motor áramirányát.' }, { term: 'PWM', def: 'Pulzusszélesség-moduláció: gyors ki-be kapcsolás a teljesítmény szabályozására.' }, { term: 'kitöltési tényező', def: 'A bekapcsolt idő aránya a teljes periódushoz képest.' }],
    },
  },
  {
    day: 5,
    title: 'Hajtáslánc és odometria',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'Az **odometria** azt jelenti: a kerekek elfordulásából kiszámolod, hol vagy. Térkép és GPS nélkül ez az egyetlen önálló helymeghatározásod.' },
      { k: 'formula', tex: 's = 2\\pi r \\cdot \\frac{N}{N_{ford}}', explain: 'A megtett út: a kerék kerülete szorozva a fordulatok számával. N a leszámolt enkóder-impulzus, N_ford az egy fordulatra eső impulzusszám.' },
      { k: 'code', lang: 'py', src: 'KERULET = 2 * 3.14159 * 3.5      # 3,5 cm sugarú kerék\nIMPULZUS_FORD = 360\n\ndef megtett_ut(impulzus):\n    return KERULET * impulzus / IMPULZUS_FORD\n\nprint(megtett_ut(720))     # két fordulat', explain: 'Ennyi az egész. A robotod pozíciókövetése ezzel a néhány sorral kezdődik.' },
      { k: 'text', md: 'Differenciálhajtásnál a két kerék útjából mindkettő kijön:\n\n- **elmozdulás** = (bal + jobb) / 2\n- **fordulás** = (jobb − bal) / tengelytáv' },
      { k: 'callout', tone: 'key', md: 'Az odometria **halmozza a hibát**. Minden megcsúszás, minden kerékkopás hozzáad, és soha nem javítja ki magát. Tíz méter után már több tíz centis lehet a tévedés. Ezért kell később külső referencia: fal, vonal, jelölő, kamera.' },
      { k: 'robot', scene: 'line' },
      { k: 'callout', tone: 'tip', md: 'A tengelytávot mérd meg pontosan, és utána kalibrálj: fordíttass a robottal 360 fokot, és nézd meg, hol áll meg. Ha túlfordul, a tengelytáv-értéked túl kicsi.' },
    ],
    quiz: [
      { k: 'numeric', q: 'A kerék sugara 3 cm. Mennyit halad egy teljes fordulat alatt? (cm, egy tizedes)', answer: 18.8, tol: 0.3, unit: 'cm', why: 'Kerület = 2πr = 2 · 3,14 · 3 = 18,85 cm. Egy fordulat pontosan egy kerületnyi utat tesz meg.' },
      { k: 'single', q: 'Mi az odometria?', opts: ['Távolságmérés ultrahanggal', 'Helymeghatározás a kerekek elfordulásából', 'A robot tömegének mérése'], answer: 1, why: 'Az odometria a hajtás adataiból számolja ki a pozíciót. Nem kell hozzá külső jel, de ezért cserébe halmozza a hibát.' },
      { k: 'single', q: 'Miért nem elég önmagában az odometria?', opts: ['Túl lassú', 'Halmozza a hibát, és soha nem javítja ki magát', 'Túl sok áramot fogyaszt'], answer: 1, why: 'Minden megcsúszás hozzáad a tévedéshez, és nincs semmi, ami visszaterelné. Külső referencia nélkül a becslés lassan elsodródik.' },
      { k: 'single', q: 'Hogyan számolod differenciálhajtásnál az elmozdulást?', opts: ['A két kerék útjának átlaga', 'A két kerék útjának összege', 'A nagyobbik érték'], answer: 0, why: 'A robot középpontja a két kerék útjának átlagát teszi meg. A különbségük adja a fordulást.' },
    ],
    note: {
      summary: ['Az odometria a kerekek elfordulásából számolja a pozíciót.', 'Megtett út = kerék kerülete × fordulatok száma.', 'Differenciálhajtás: elmozdulás = (bal+jobb)/2, fordulás = (jobb−bal)/tengelytáv.', 'Az odometria halmozza a hibát, és soha nem javítja ki magát.', 'Tíz méter után tíz centis nagyságrendű tévedés normális — külső referencia kell.', 'A tengelytávot kalibráld 360 fokos fordulással.'],
      terms: [{ term: 'odometria', def: 'Helymeghatározás a hajtás elfordulási adataiból.' }, { term: 'tengelytáv', def: 'A két hajtott kerék közti távolság, ami a fordulás számításához kell.' }, { term: 'hibahalmozódás', def: 'A becslési hiba folyamatos növekedése külső korrekció nélkül.' }],
    },
  },
];
