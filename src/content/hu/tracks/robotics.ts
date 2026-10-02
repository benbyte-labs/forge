import type { Track } from '../../types';
import { roboticsHuB } from './robotics-b';
import { roboticsHuC } from './robotics-c';
import { roboticsHuD } from './robotics-d';
import { roboticsHuE } from './robotics-e';
import { roboticsHuF } from './robotics-f';

export const roboticsHu: Track = {
  id: 'robotics',
  title: 'Robotika',
  blurb: 'Szenzorok, motorok, kinematika, PID, útvonaltervezés.',
  plannedTitles: [
    'Mi az a robot?',
    'Szenzorok: hogyan lát a gép',
    'Motorok és szervók',
    'H-híd és PWM',
    'Hajtáslánc és odometria',
    'Áramellátás és akkumulátor',
    'Mikrokontroller alapok',
    'Digitális és analóg jelek',
    'I2C, SPI, UART',
    'Zaj és szűrés',
    'Egyenes kinematika',
    'Inverz kinematika',
    'Robotkar felépítése',
    'Megfogók és végberendezések',
    'Szabályozás: nyílt és zárt hurok',
    'P szabályozó',
    'PID hangolása',
    'Vonalkövetés',
    'Akadálykerülés',
    'Térképezés alapjai',
    'Lokalizáció',
    'Útvonaltervezés rácson',
    'A* algoritmus',
    'Állapotgépek',
    'Viselkedésfák',
    'Biztonság és vészleállítás',
    'Tesztelés szimulációban',
    'Alkatrészválasztás',
    'Összeszerelés és kábelezés',
    'Az első saját robotod',
  ],
  days: [
    {
      day: 1,
      title: 'Mi az a robot?',
      minutes: 18,
      lesson: [
        {
          k: 'text',
          md: 'A robot nem attól robot, hogy karja van vagy hogy fémből készült. Attól robot, hogy három dolgot megcsinál egymás után, újra és újra: **érzékel — dönt — cselekszik**. Ezt hívjuk vezérlési huroknak.',
        },
        {
          k: 'callout',
          tone: 'key',
          md: 'Érzékel → dönt → cselekszik → érzékel → … Ez a hurok másodpercenként akár százszor is lefut. Minden robot, a robotporszívótól a Mars-járóig, ezt csinálja.',
        },
        {
          k: 'text',
          md: 'A három lépéshez három alkatrészcsoport tartozik:\n\n- **Szenzorok** — a robot érzékszervei: távolságmérő, kamera, giroszkóp, ütközéskapcsoló.\n- **Vezérlő** — az agy: általában egy mikrokontroller, ami a te kódodat futtatja.\n- **Aktuátorok** — az izmok: motorok, szervók, mágnesszelepek.',
        },
        {
          k: 'text',
          md: 'És van egy negyedik, amit a kezdők mindig alábecsülnek: a **tápellátás**. A legszebb kód is használhatatlan, ha a motor megrántja a feszültséget, és a vezérlő újraindul.',
        },
        { k: 'robot', scene: 'flat' },
        {
          k: 'text',
          md: 'A fenti szimulátorban egy differenciálhajtású rover van: két hajtott kerék, egymástól függetlenül. Ha mindkettő előre forog, egyenesen megy. Ha csak az egyik, fordul. Ez a legegyszerűbb hajtáslánc, és pont ezért ezzel kezdi mindenki.',
        },
        {
          k: 'callout',
          tone: 'tip',
          md: 'Mielőtt bármit megépítesz, rajzold le a hurkot: mit érzékelsz, milyen döntést hozol belőle, mit mozgatsz. Ha ez a három nincs meg, még nincs robotod — csak egy távirányítós autód.',
        },
      ],
      quiz: [
        {
          k: 'order',
          q: 'Milyen sorrendben fut a vezérlési hurok?',
          items: ['Cselekvés', 'Érzékelés', 'Döntés'],
          correct: [1, 2, 0],
          why: 'Előbb be kell gyűjteni az adatot, abból születik a döntés, és csak utána mozdul a gép. Utána kezdődik elölről.',
        },
        {
          k: 'single',
          q: 'Melyik alkatrész tartozik az érzékelés lépéséhez?',
          opts: ['Szervó', 'Ultrahangos távolságmérő', 'H-híd'],
          answer: 1,
          why: 'A távolságmérő szenzor: adatot gyűjt a környezetről. A szervó aktuátor, a H-híd pedig a motor hajtását végzi.',
        },
        {
          k: 'single',
          q: 'Mi a differenciálhajtás lényege?',
          opts: [
            'Egy motor hajt, egy kormányoz',
            'Két, egymástól függetlenül hajtott kerék',
            'Négy kerék, mind kormányozható',
          ],
          answer: 1,
          why: 'A differenciálhajtásnál a két hajtott kerék eltérő sebessége adja a fordulást — nincs külön kormányszerkezet. Ezért olyan egyszerű megépíteni.',
        },
        {
          k: 'multi',
          q: 'Melyik kettő nélkül nincs működő robot?',
          opts: ['Szenzor', 'Bluetooth', 'Aktuátor', 'Kijelző'],
          answers: [0, 2],
          why: 'Szenzor nélkül vak, aktuátor nélkül tehetetlen. A Bluetooth és a kijelző kényelmi kiegészítő — hasznos, de nem ettől robot a robot.',
        },
      ],
      note: {
        summary: [
          'A robot lényege a vezérlési hurok: érzékel → dönt → cselekszik, folyamatosan ismételve.',
          'Szenzor = érzékszerv, vezérlő = agy, aktuátor = izom. Mindhárom kell.',
          'A tápellátás a negyedik, gyakran alábecsült elem: motorindításkor beszakadó feszültség újraindítja a vezérlőt.',
          'A differenciálhajtás két független kerékkel kormányoz — nincs külön kormányszerkezet.',
          'Ha nincs meg mind a három lépés, akkor nem robot, hanem távirányítós jármű.',
        ],
        terms: [
          { term: 'vezérlési hurok', def: 'Az érzékelés-döntés-cselekvés ciklus, amit a robot folyamatosan ismétel.' },
          { term: 'szenzor', def: 'Alkatrész, ami a környezetről vagy a robot állapotáról ad adatot.' },
          { term: 'aktuátor', def: 'Alkatrész, ami mozgást vagy fizikai hatást hoz létre.' },
          { term: 'differenciálhajtás', def: 'Két, egymástól függetlenül hajtott kerékkel megvalósított kormányzás.' },
        ],
      },
    },
    ...roboticsHuB,
    ...roboticsHuC,
    ...roboticsHuD,
    ...roboticsHuE,
    ...roboticsHuF,
  ],
};
