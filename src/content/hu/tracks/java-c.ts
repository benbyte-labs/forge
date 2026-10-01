import type { Day } from '../../types';

/** JAVA trek, 11–17. nap. */
export const javaHuC: Day[] = [
  {
    day: 11,
    title: 'Statikus tagok',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A `static` tag az **osztályhoz** tartozik, nem egy példányhoz. Egy darab van belőle, akárhány objektumot hozol létre.' },
      { k: 'code', lang: 'java', src: 'public class Rover {\n    private static int darab = 0;        // közös az összes rover közt\n    private final int sorszam;\n\n    public Rover() {\n        darab++;\n        this.sorszam = darab;            // példányonként más\n    }\n\n    public static int getDarab() {\n        return darab;\n    }\n}', explain: 'A `darab` egy példány az egész programban. A `sorszam` minden objektumban külön. A statikus metódust az osztálynéven hívod: `Rover.getDarab()`.' },
      { k: 'callout', tone: 'key', md: 'Statikus metódusból **nem érhetsz el példánymezőt**, mert nincs `this`. Ezért nem fordul le, ha egy statikus metódusból a `sorszam`-ra hivatkozol — nem tudná, melyik roveréra.' },
      { k: 'text', md: 'Mire jó a `static` a gyakorlatban?\n\n- **Konstansok**: `public static final double G = 9.81;`\n- **Segédmetódusok**, amiknek nincs állapota: `Math.sqrt`, `Integer.parseInt`\n- **Gyártó metódusok**: `List.of(...)`, `Rover.ujAlapertelmezett()`' },
      { k: 'callout', tone: 'warn', md: 'A **változtatható statikus állapot** veszélyes: az egész program egyetlen közös változón osztozik, és szálak közt is. Statikus konstans igen, statikus `List` amibe mindenki beleír: kerülendő.' },
    ],
    quiz: [
      { k: 'single', q: 'Mihez tartozik egy `static` mező?', opts: ['Minden példányhoz külön', 'Az osztályhoz: egy darab van belőle', 'A metódushoz'], answer: 1, why: 'Egyetlen példány létezik belőle az egész programban, függetlenül attól, hány objektumot hoztál létre.' },
      { k: 'single', q: 'Miért nem érhetsz el példánymezőt statikus metódusból?', opts: ['Mert lassú', 'Mert nincs `this`: nem tudni, melyik objektumé lenne', 'Mert tiltott a Javában'], answer: 1, why: 'A statikus metódus objektum nélkül is hívható, tehát nincs példány, aminek a mezőjét olvashatná.' },
      { k: 'single', q: 'Melyik a `static` jó felhasználása?', opts: ['Egy közös, mindenki által módosított lista', 'Konstans, például `public static final double G = 9.81;`', 'Minden mező legyen static'], answer: 1, why: 'A konstans nem változik, tehát a megosztása ártalmatlan. A közös változtatható állapot viszont kiszámíthatatlan.' },
      { k: 'single', q: 'Hogyan hívsz egy statikus metódust?', opts: ['Az osztálynéven: `Rover.getDarab()`', 'Csak példányon át', 'Nem lehet hívni'], answer: 0, why: 'Az osztálynév a természetes hívás. Példányon át is lefordul, de félrevezető, ezért a fordító figyelmeztet.' },
    ],
    note: {
      summary: ['A `static` tag az osztályhoz tartozik, egy darab van belőle.', 'Statikus metódusból nincs `this`, ezért példánymező nem érhető el.', 'Jó használat: konstansok, állapot nélküli segédmetódusok, gyártó metódusok.', 'Hívás az osztálynéven: `Rover.getDarab()`.', 'A változtatható statikus állapot kerülendő, különösen szálak mellett.'],
      terms: [{ term: 'static', def: 'Osztályszintű tag, ami nem példányhoz kötődik.' }, { term: 'static final', def: 'Konstans: osztályszintű és nem változtatható.' }, { term: 'gyártó metódus', def: 'Statikus metódus, ami új példányt ad vissza.' }],
    },
  },
  {
    day: 12,
    title: 'Öröklődés',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Az **öröklődés** azt mondja ki: ez az osztály *egy fajtája* amannak. A leszármazott megkapja az ős mezőit és metódusait, és hozzátehet vagy felülírhat.' },
      { k: 'code', lang: 'java', src: 'public class Jarmu {\n    protected int sebesseg;\n\n    public void indit() {\n        System.out.println("Motor jár");\n    }\n}\n\npublic class Rover extends Jarmu {\n    private int kerekek = 6;\n\n    @Override\n    public void indit() {\n        super.indit();                   // az ős viselkedése\n        System.out.println("Hat kerék kész");\n    }\n}', explain: 'Az `extends` jelöli az öröklődést. A `@Override` nem kötelező, de kéri a fordítót, hogy ellenőrizze: tényleg van ilyen metódus az ősben. A `super.indit()` az eredeti változatot hívja.' },
      { k: 'callout', tone: 'key', md: 'A Javában egy osztály **egyetlen** ősből származhat. Interfészből viszont akárhányat megvalósíthat — ez a megoldás a többszörös öröklődés problémájára.' },
      { k: 'callout', tone: 'warn', md: 'Csak akkor örökölj, ha a **„X egy fajta Y"** mondat igaz. A `Rover egy fajta Jármű` rendben van. A `Rover egy fajta Akkumulátor` nem — ott a rovernek *van* akkuja, tehát mező kell, nem öröklődés. Ez a **kompozíció**, és a legtöbb esetben jobb választás.' },
      { k: 'text', md: 'A `protected` mező a leszármazottak számára látható. Óvatosan: ezzel az ős belső szerkezetét ígéred meg minden jövőbeli leszármazottnak. Sokszor jobb a `private` mező és a `protected` getter.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit jelent a `super.indit()` hívás?', opts: ['Újrahívja saját magát', 'Az ősosztály azonos nevű metódusát hívja', 'Törli a metódust'], answer: 1, why: 'Így tudod kiegészíteni az ős viselkedését ahelyett, hogy teljesen lecserélnéd.' },
      { k: 'single', q: 'Hány ősosztálya lehet egy Java osztálynak?', opts: ['Akárhány', 'Pontosan egy', 'Legfeljebb kettő'], answer: 1, why: 'Egyetlen `extends`. Több interfész viszont megvalósítható, és ez adja a hiányzó rugalmasságot.' },
      { k: 'single', q: 'Mikor NE használj öröklődést?', opts: ['Ha az „X egy fajta Y" mondat nem igaz', 'Ha sok metódus van', 'Ha a projekt nagy'], answer: 0, why: 'Ha a kapcsolat inkább „X-nek van Y-ja", akkor mező kell (kompozíció), nem öröklődés.' },
      { k: 'single', q: 'Mire jó a `@Override` annotáció?', opts: ['Gyorsabbá teszi a metódust', 'Megkéri a fordítót, hogy ellenőrizze: tényleg felülír-e', 'Kötelező minden metódusnál'], answer: 1, why: 'Elírt metódusnév esetén így fordítási hibát kapsz, nem pedig egy soha meg nem hívott új metódust.' },
      { k: 'order', q: 'Mi történik `new Rover()` híváskor?', items: ['A Rover konstruktora lefut', 'A Jarmu konstruktora lefut', 'A memóriafoglalás megtörténik'], correct: [2, 1, 0], why: 'Előbb a hely, aztán az ős konstruktora, végül a leszármazotté. Az ős mindig készen áll, mire a leszármazott dolgozni kezd.' },
    ],
    note: {
      summary: ['Az öröklődés az „X egy fajta Y" kapcsolatot fejezi ki, `extends` kulcsszóval.', 'A `super.metodus()` az ős eredeti változatát hívja.', 'Egy osztálynak egy őse lehet, de több interfészt megvalósíthat.', 'Ha a kapcsolat „X-nek van Y-ja", kompozíciót használj, ne öröklődést.', 'A `@Override` fordítási időben ellenőrzi a felülírást.', 'Konstruktorsorrend: ős először, leszármazott utána.'],
      terms: [{ term: 'extends', def: 'Öröklődést jelölő kulcsszó.' }, { term: 'super', def: 'Hivatkozás az ősosztály tagjaira.' }, { term: 'kompozíció', def: 'Mezőként tárolt másik objektum öröklődés helyett.' }],
    },
  },
  {
    day: 13,
    title: 'Absztrakt osztály és interfész',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Mindkettő arra való, hogy **szerződést** írj le: mit tud egy típus, anélkül hogy megmondanád, hogyan.' },
      { k: 'code', lang: 'java', src: 'public interface Mozgathato {\n    void mozog(int cm);              // nincs törzs: ezt mindenki megírja\n\n    default void megall() {          // alapértelmezett megvalósítás\n        mozog(0);\n    }\n}\n\npublic abstract class Jarmu implements Mozgathato {\n    protected int akku = 100;\n\n    public abstract int maxSebesseg();   // kötelező megírni\n\n    public boolean uzemkepes() {         // kész viselkedés\n        return akku > 5;\n    }\n}', explain: 'Az interfész csak szerződés (és `default` metódusok). Az absztrakt osztálynak lehet állapota és kész metódusa is, de példányosítani nem lehet.' },
      { k: 'callout', tone: 'key', md: 'A döntés egyszerű: **interfész, ha csak képességet írsz le**; **absztrakt osztály, ha közös állapotot és kész kódot is adsz**. Ha habozol, kezdd interfésszel — abból több is megvalósítható.' },
      { k: 'text', md: 'Egy osztály `implements`-szel akárhány interfészt megvalósíthat:\n\n`public class Rover extends Jarmu implements Mozgathato, Tolthető, Naplozhato { ... }`\n\nEz pótolja a hiányzó többszörös öröklődést, mert az interfészekben nincs ütköző állapot.' },
      { k: 'callout', tone: 'warn', md: 'Absztrakt osztályt és interfészt **nem lehet példányosítani**: a `new Jarmu()` nem fordul le. Csak olyan leszármazottat hozhatsz létre, ami minden absztrakt metódust megírt.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a fő különbség interfész és absztrakt osztály között?', opts: ['Az absztrakt osztálynak lehet állapota és kész metódusa, az interfész főleg szerződés', 'Semmi', 'Az interfész gyorsabb'], answer: 0, why: 'Az absztrakt osztály mezőket és megírt metódusokat hoz; az interfész képességet ír le, `default` metódussal kiegészítve.' },
      { k: 'single', q: 'Hány interfészt valósíthat meg egy osztály?', opts: ['Egyet', 'Akárhányat', 'Legfeljebb hármat'], answer: 1, why: 'Ez pótolja a többszörös öröklődést. Mivel az interfészekben nincs állapot, nincs ütközés sem.' },
      { k: 'single', q: 'Mit csinál egy `default` metódus az interfészben?', opts: ['Kötelezővé tesz valamit', 'Alapértelmezett megvalósítást ad, amit nem kötelező felülírni', 'Törli a metódust'], answer: 1, why: 'Így lehet egy létező interfészt új metódussal bővíteni anélkül, hogy minden megvalósító osztály elromlana.' },
      { k: 'single', q: 'Mi történik a `new Jarmu()` sorral, ha a Jarmu absztrakt?', opts: ['Lefut', 'Fordítási hibát ad', 'Null-t ad vissza'], answer: 1, why: 'Absztrakt típust nem lehet példányosítani, mert van olyan metódusa, aminek nincs törzse.' },
    ],
    note: {
      summary: ['Mindkettő szerződést ír le: mit tud a típus, nem azt, hogyan.', 'Interfész: képesség, `default` metódusokkal; nincs állapota.', 'Absztrakt osztály: lehet mezője és kész metódusa, de nem példányosítható.', 'Egy osztály egy ősből öröklődhet, de több interfészt valósíthat meg.', 'Ha habozol, kezdd interfésszel.'],
      terms: [{ term: 'interfész', def: 'Csak szerződést leíró típus, állapot nélkül.' }, { term: 'absztrakt osztály', def: 'Részben megírt osztály, amit példányosítani nem lehet.' }, { term: 'default metódus', def: 'Alapértelmezett megvalósítás egy interfészben.' }],
    },
  },
  {
    day: 14,
    title: 'Polimorfizmus a gyakorlatban',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A **polimorfizmus** azt jelenti: egy hivatkozáson keresztül több különböző viselkedés érhető el. A hívás helyén nem tudod, nem is érdekel, melyik megvalósítás fut le.' },
      { k: 'code', lang: 'java', src: 'List<Mozgathato> flotta = List.of(\n    new Rover(), new Drone(), new Kar()\n);\n\nfor (Mozgathato m : flotta) {\n    m.mozog(10);          // mindegyik a sajátját futtatja\n}', explain: 'A ciklus `Mozgathato`-t lát. Futásidőben mégis a Rover, a Drone, illetve a Kar metódusa hívódik — ez a dinamikus kötés.' },
      { k: 'callout', tone: 'key', md: 'Ez a legnagyobb nyeresége az objektumorientáltságnak: **új típus hozzáadásához nem kell a meglévő kódot átírni**. A ciklus akkor is változatlan marad, ha jövőre bekerül egy `Hajo` osztály.' },
      { k: 'text', md: 'A szabály: **mindig a legáltalánosabb típusra hivatkozz**, amivel még el tudod végezni a munkát.\n\n```\nList<String> nevek = new ArrayList<>();   // jó\nArrayList<String> nevek = new ArrayList<>(); // szükségtelenül szűk\n```\n\nÍgy később kicserélhető a megvalósítás anélkül, hogy bárhol máshol változna a kód.' },
      { k: 'callout', tone: 'warn', md: 'Ha `instanceof`-ot és hosszú `if`-láncot írsz a típusok szétválogatására, az rendszerint azt jelenti, hogy a viselkedésnek **a típusokban** lenne a helye. Egy metódus a közös interfészen rövidebb és bővíthetőbb.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a dinamikus kötés?', opts: ['A fordító dönti el, melyik metódus fut', 'Futásidőben a tényleges objektum típusa dönti el, melyik megvalósítás fut', 'A metódusok sorrendje'], answer: 1, why: 'A hivatkozás típusa szabja meg, mit hívhatsz; a tényleges objektum szabja meg, mi fut le.' },
      { k: 'single', q: 'Mi a polimorfizmus fő haszna?', opts: ['Gyorsabb futás', 'Új típus hozzáadásához nem kell a meglévő kódot átírni', 'Kevesebb memória'], answer: 1, why: 'A hívó oldal a közös típust ismeri, tehát érintetlen marad, amikor új megvalósítás érkezik.' },
      { k: 'single', q: 'Melyik a jobb deklaráció?', opts: ['`ArrayList<String> nevek = new ArrayList<>();`', '`List<String> nevek = new ArrayList<>();`', 'Mindegy'], answer: 1, why: 'A legáltalánosabb elegendő típusra hivatkozz. Így a megvalósítás később cserélhető.' },
      { k: 'single', q: 'Mire utal egy hosszú `instanceof` lánc?', opts: ['Jó tervezésre', 'Arra, hogy a viselkedés a típusokba kívánkozik', 'Sebességproblémára'], answer: 1, why: 'Ha minden ágban más a teendő típusonként, az egy felülírható metódus dolga a közös interfészen.' },
    ],
    note: {
      summary: ['A polimorfizmus: egy hivatkozás, több viselkedés.', 'Dinamikus kötés: futásidőben a tényleges objektum típusa dönt.', 'Fő haszon: új típus nem igényli a meglévő kód átírását.', 'Mindig a legáltalánosabb elegendő típusra hivatkozz.', 'Hosszú `instanceof` lánc jelzi, hogy a viselkedés a típusokba való.'],
      terms: [{ term: 'polimorfizmus', def: 'Egy felületen több megvalósítás elérése.' }, { term: 'dinamikus kötés', def: 'A futásidejű típus dönti el, melyik metódus fut.' }, { term: 'instanceof', def: 'Típusellenőrző operátor; sok használata tervezési szagot jelez.' }],
    },
  },
  {
    day: 15,
    title: 'Kivételkezelés',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A kivétel olyan hiba, amit a kód **nem tud a helyén megoldani**, ezért feljebb adja a hívónak. Ez nem a visszatérési érték helyettesítője: a hibás állapotot jelzi, nem egy lehetséges eredményt.' },
      { k: 'code', lang: 'java', src: 'try (BufferedReader r = Files.newBufferedReader(ut)) {\n    return Integer.parseInt(r.readLine());\n} catch (NumberFormatException e) {\n    return 0;                       // értelmes pótérték\n} catch (IOException e) {\n    throw new IllegalStateException("Nem olvasható: " + ut, e);\n}', explain: 'A `try`-with-resources magától bezárja az olvasót, hiba esetén is. A második `catch` nem nyeli el a hibát: újracsomagolja, és megőrzi az eredetit okként.' },
      { k: 'callout', tone: 'key', md: 'Két fajta: a **checked** kivételt (pl. `IOException`) a fordító számon kéri — vagy kapd el, vagy írd a metódus fejébe `throws`-szal. Az **unchecked** kivétel (`RuntimeException` leszármazottai) nincs kikényszerítve; ez jelzi a programozói hibát.' },
      { k: 'callout', tone: 'warn', md: 'Az **üres `catch` blokk** a legdrágább hiba a Javában. A program továbbmegy hibás állapotban, és a hiba száz sorral később, érthetetlen helyen bukik ki. Ha tényleg el akarsz nyelni valamit, írd oda egy sorban, miért.' },
      { k: 'text', md: 'A `finally` blokk mindig lefut, hibával is. Erőforrás-zárásra viszont a **try-with-resources** jobb: rövidebb, és nem lehet elfelejteni. Minden `AutoCloseable` használható benne.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a különbség checked és unchecked kivétel között?', opts: ['A checked-et a fordító számon kéri, az unchecked-et nem', 'A checked gyorsabb', 'Nincs különbség'], answer: 0, why: 'Checked kivételt el kell kapni vagy `throws`-szal továbbadni. Az unchecked jellemzően programozói hibát jelez.' },
      { k: 'single', q: 'Miért rossz az üres `catch` blokk?', opts: ['Lassú', 'A program hibás állapotban megy tovább, és a hiba máshol bukik ki', 'Nem fordul le'], answer: 1, why: 'A jel eltűnik, az ok megmarad. A hibakeresés ettől sokszorosára nő.' },
      { k: 'single', q: 'Mi az előnye a try-with-resources szerkezetnek?', opts: ['Magától bezárja az erőforrást, hiba esetén is', 'Gyorsabb I/O', 'Elnyeli a kivételeket'], answer: 0, why: 'Minden `AutoCloseable` bezárul a blokk végén, akkor is, ha kivétel repül.' },
      { k: 'single', q: 'Mit érdemes tenni, ha újracsomagolsz egy kivételt?', opts: ['Eldobni az eredetit', 'Átadni okként a konstruktornak', 'Kiírni a konzolra és továbbmenni'], answer: 1, why: 'A `new IllegalStateException(uzenet, e)` megőrzi az eredeti vermet. Enélkül elveszik, hol kezdődött a baj.' },
      { k: 'order', q: 'Milyen sorrendben fut le a kód hiba esetén?', items: ['finally blokk', 'try blokk a hibáig', 'megfelelő catch blokk'], correct: [1, 2, 0], why: 'A try fut a hiba pontjáig, aztán a hozzá illő catch, végül mindig a finally.' },
    ],
    note: {
      summary: ['A kivétel olyan hiba, amit a kód a helyén nem tud megoldani.', 'Checked: a fordító számon kéri. Unchecked: programozói hibát jelez.', 'Üres `catch` blokk a legdrágább hiba: elrejti a jelet, megtartja az okot.', 'Újracsomagoláskor add át az eredeti kivételt okként.', 'A try-with-resources magától zár minden `AutoCloseable`-t.', 'A `finally` mindig lefut.'],
      terms: [{ term: 'checked kivétel', def: 'Kivétel, amit a fordító kikényszerít kezelni vagy továbbadni.' }, { term: 'try-with-resources', def: 'Szerkezet, ami automatikusan bezárja az erőforrást.' }, { term: 'ok (cause)', def: 'Az eredeti kivétel, amit az újracsomagolt megőriz.' }],
    },
  },
  {
    day: 16,
    title: 'Saját kivétel',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'Saját kivételt akkor írj, amikor a hívó **másképp akar reagálni** erre a hibára, mint bármelyik másikra. Ha mindenki ugyanúgy kezelné, elég egy szabványos kivétel.' },
      { k: 'code', lang: 'java', src: 'public class AkkuLemerultException extends RuntimeException {\n    private final int szint;\n\n    public AkkuLemerultException(int szint) {\n        super("Az akku " + szint + "% — a mozgáshoz legalább 5% kell");\n        this.szint = szint;\n    }\n\n    public int getSzint() {\n        return szint;\n    }\n}', explain: 'A kivétel **adatot is hordoz**: a hívó kiolvashatja a szintet, és eldöntheti, töltsön vagy álljon le. Ettől lesz hasznos a saját típus.' },
      { k: 'callout', tone: 'key', md: 'A döntés: `RuntimeException` leszármazottja legyen, ha **programozói hiba vagy elkerülhető helyzet** (ezt ne kelljen mindenhol elkapni), és `Exception` leszármazottja, ha a hívótól **elvárod a kezelést** (például hálózat, fájl).' },
      { k: 'text', md: 'A jó kivételüzenet három dolgot mond el: **mi történt**, **milyen értékkel**, és **mi kellett volna**. A „Hiba történt" üzenet semmit nem ér hibakereséskor.' },
      { k: 'callout', tone: 'tip', md: 'Egy alkalmazáshoz jellemzően **két-három** saját kivétel elég. Ha húsz van, azok közül a legtöbbet senki nem kapja el külön — azokat össze lehet vonni egy típusba egy enum mezővel.' },
    ],
    quiz: [
      { k: 'single', q: 'Mikor érdemes saját kivételt írni?', opts: ['Minden hibához', 'Ha a hívó másképp akar reagálni erre a hibára, mint másra', 'Soha'], answer: 1, why: 'A saját típus csak akkor hasznos, ha külön `catch` ágat indokol. Egyébként elég egy szabványos kivétel.' },
      { k: 'single', q: 'Mi az előnye annak, ha a kivétel adatot is hordoz?', opts: ['Szebb a kód', 'A hívó kiolvashatja és döntést hozhat belőle', 'Gyorsabb'], answer: 1, why: 'A `getSzint()` alapján a hívó eldöntheti, hogy tölt-e vagy leáll. Üzenetből ezt nem lehet kiolvasni.' },
      { k: 'single', q: 'Mikor származtass `RuntimeException`-ből?', opts: ['Ha programozói hibát vagy elkerülhető helyzetet jelzel', 'Mindig', 'Soha'], answer: 0, why: 'Így nem kell mindenhol elkapni. Ha viszont a hívótól elvárod a kezelést, `Exception` a helyes ős.' },
      { k: 'single', q: 'Mit mondjon el egy jó kivételüzenet?', opts: ['Hogy hiba történt', 'Mi történt, milyen értékkel, és mi kellett volna', 'A metódus nevét'], answer: 1, why: 'Hibakereséskor a konkrét érték ér a legtöbbet. A `Hiba történt` üzenet nem segít senkin.' },
    ],
    note: {
      summary: ['Saját kivétel akkor kell, ha külön `catch` ágat indokol.', 'A kivétel hordozhat adatot, amit a hívó kiolvas és dönt belőle.', '`RuntimeException` leszármazott: programozói hiba, nem kell mindenhol elkapni.', '`Exception` leszármazott: a hívótól elvárt kezelés.', 'A jó üzenet: mi történt, milyen értékkel, mi kellett volna.'],
      terms: [{ term: 'RuntimeException', def: 'Unchecked kivételek közös őse.' }, { term: 'kivételüzenet', def: 'A hiba leírása; tartalmazza a konkrét értéket.' }, { term: 'kivételtípus', def: 'Saját osztály, ami egy megkülönböztetendő hibát jelöl.' }],
    },
  },
  {
    day: 17,
    title: 'Collections: List és Map',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'A tömb mérete rögzített. A **Collections** keretrendszer ad bővíthető, kereshető tárolókat — ez a Java mindennapi munkaeszköze.' },
      { k: 'code', lang: 'java', src: 'List<String> nevek = new ArrayList<>();\nnevek.add("Rover-1");\nnevek.add("Rover-2");\nSystem.out.println(nevek.size());        // 2\nSystem.out.println(nevek.contains("Rover-1"));  // true\n\nMap<String, Integer> akkuk = new HashMap<>();\nakkuk.put("Rover-1", 87);\nint szint = akkuk.getOrDefault("Rover-9", 0);   // 0, nem null', explain: 'A `List` sorrendet tart, a `Map` kulcs–érték párokat. A `getOrDefault` megspórolja a null-ellenőrzést.' },
      { k: 'callout', tone: 'key', md: 'A gyakorlati választás:\n\n- **ArrayList** — alapértelmezett lista; gyors indexelés\n- **HashMap** — alapértelmezett szótár; gyors kulcs szerinti keresés\n- **HashSet** — halmaz; ismétlés nélkül, gyors tartalmazás-vizsgálat\n- **LinkedList** — ritkán kell; csak ha sokat szúrsz be az elejére' },
      { k: 'text', md: 'A keresés sebessége a lényeg. Egy `List.contains` végigfut az egész listán. Egy `HashMap.get` vagy `HashSet.contains` közvetlenül odatalál. Tízezer elemnél ez már érezhető különbség.' },
      { k: 'callout', tone: 'warn', md: 'Ha saját osztályt teszel `HashMap` kulcsnak vagy `HashSet`-be, **írd meg az `equals` és a `hashCode` metódust is**, mindig párban. Enélkül két egyenlő tartalmú objektum két külön bejegyzés lesz, és a keresés rejtélyes módon nem talál semmit.' },
      { k: 'callout', tone: 'tip', md: 'Rögzített tartalomhoz használd a `List.of(...)` és `Map.of(...)` gyártó metódusokat: rövidebbek és nem módosíthatók, tehát nem romolhat el a tartalmuk véletlenül.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a különbség a List és a Map között?', opts: ['A List sorrendet tart, a Map kulcs–érték párokat tárol', 'Semmi', 'A Map gyorsabb mindenben'], answer: 0, why: 'Listából index szerint veszel elemet, Mapből kulcs szerint.' },
      { k: 'single', q: 'Melyik a gyorsabb tartalmazás-vizsgálatra tízezer elemnél?', opts: ['ArrayList.contains', 'HashSet.contains', 'Egyforma'], answer: 1, why: 'A HashSet hasítással közvetlenül odatalál. Az ArrayList végigfut az egész listán.' },
      { k: 'single', q: 'Mit kell megírni, ha saját osztályt teszel HashMap kulcsnak?', opts: ['Csak a toString-et', 'Az equals és a hashCode metódust, párban', 'Semmit'], answer: 1, why: 'A HashMap a hashCode alapján keresi a vödröt, az equals alapján a pontos egyezést. Egyik a másik nélkül hibás viselkedést ad.' },
      { k: 'single', q: 'Mit ad vissza a `getOrDefault("Rover-9", 0)` hiányzó kulcsra?', opts: ['null', '0', 'Kivételt dob'], answer: 1, why: 'A megadott pótértéket adja. Ettől elhagyható a null-ellenőrzés.' },
      { k: 'single', q: 'Mi a `List.of(...)` előnye?', opts: ['Gyorsabb futás', 'Rövid és nem módosítható, tehát nem romolhat el véletlenül', 'Több elemet bír'], answer: 1, why: 'A nem módosítható gyűjtemény biztonságosan átadható anélkül, hogy a hívó beleírhatna.' },
    ],
    note: {
      summary: ['A Collections keretrendszer bővíthető tárolókat ad a fix méretű tömb helyett.', 'ArrayList: alapértelmezett lista. HashMap: alapértelmezett szótár. HashSet: halmaz.', 'A HashMap és HashSet keresése közvetlen; a List.contains végigfut.', 'Saját kulcsosztályhoz equals és hashCode kell, mindig párban.', '`getOrDefault` megspórolja a null-ellenőrzést.', '`List.of(...)` rövid és nem módosítható.'],
      terms: [{ term: 'ArrayList', def: 'Tömb alapú, bővíthető lista.' }, { term: 'HashMap', def: 'Kulcs–érték tároló hasítással.' }, { term: 'hashCode', def: 'Szám, ami alapján a hasított tárolók csoportosítanak.' }],
    },
  },
];
