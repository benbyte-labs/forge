import type { Day } from '../../types';

/** JAVA trek, 4–10. nap. */
export const javaHuB: Day[] = [
  {
    day: 4,
    title: 'Metódusok és paraméterek',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A metódus olyan, mint a Python függvénye, csak **típusokkal**: megmondod, mit vár be és mit ad vissza. A fordító ezt betartatja.' },
      { k: 'code', lang: 'java', src: 'public static int osszead(int a, int b) {\n    return a + b;\n}\n\npublic static void koszon(String nev) {\n    System.out.println("Szia, " + nev);\n}', explain: 'Az első szó a visszatérési típus. A `void` azt jelenti: nem ad vissza semmit. A `static` egyelőre azt, hogy példány nélkül hívható.' },
      { k: 'callout', tone: 'key', md: 'A Java engedi, hogy ugyanaz a név **többféle paraméterlistával** létezzen — ezt hívják túlterhelésnek. `osszead(int, int)` és `osszead(double, double)` békésen megfér egymás mellett; a fordító a paraméterek alapján választ.' },
      { k: 'code', lang: 'java', src: 'public static double atlag(int[] szamok) {\n    if (szamok.length == 0) return 0;\n    int osszeg = 0;\n    for (int sz : szamok) osszeg += sz;\n    return (double) osszeg / szamok.length;\n}', explain: 'A `(double)` típuskényszerítés nélkül egész osztás lenne, és elveszne a tört rész. Ez a Java egyik leggyakoribb néma hibája.' },
      { k: 'callout', tone: 'warn', md: 'A metódus **nem** módosíthatja a hívó primitív változóját: másolatot kap. Objektumnál viszont a hivatkozás másolatát kapja, így a mutatott objektumot igenis megváltoztathatja.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit jelent a `void` visszatérési típus?', opts: ['Nullát ad vissza', 'Nem ad vissza semmit', 'Hibát jelez'], answer: 1, why: 'A `void` metódus csak csinál valamit — például kiír —, de nincs értéke, amit el lehetne tenni.' },
      { k: 'single', q: 'Mi a metódus-túlterhelés?', opts: ['Túl sok paraméter', 'Ugyanaz a név több, eltérő paraméterlistájú metódussal', 'Egy hiba'], answer: 1, why: 'A fordító a paraméterek típusa és száma alapján dönti el, melyiket hívja. A visszatérési típus önmagában nem elég a megkülönböztetéshez.' },
      { k: 'output', q: 'Mit ír ki?', code: 'int a = 7, b = 2;\nSystem.out.println((double) a / b);', lang: 'java', opts: ['3', '3.5', '3.0'], answer: 1, why: 'A kényszerítés az `a`-t double-lé teszi, így az osztás már tizedes: 3.5.' },
      { k: 'single', q: 'Megváltoztathatja-e egy metódus a hívó `int` változóját?', opts: ['Igen', 'Nem, mert másolatot kap', 'Csak ha static'], answer: 1, why: 'A primitívek érték szerint adódnak át. A metódus a saját másolatát módosítja, a hívóé érintetlen marad.' },
    ],
    note: {
      summary: ['A metódus fejlécében a visszatérési típus áll elöl; a `void` nem ad vissza semmit.', 'A paramétereknek típusa van, és a fordító ellenőrzi őket.', 'Túlterhelés: ugyanaz a név több, eltérő paraméterlistával.', 'Egész osztásnál `(double)` kényszerítés kell a tört részhez.', 'Primitívet a metódus másolatként kap; a hívóét nem módosíthatja.'],
      terms: [{ term: 'visszatérési típus', def: 'Az az adattípus, amit a metódus visszaad; `void`, ha semmit.' }, { term: 'túlterhelés', def: 'Azonos nevű metódusok eltérő paraméterlistával.' }, { term: 'típuskényszerítés', def: 'Érték átalakítása másik típusra, például `(double) a`.' }],
    },
  },
  {
    day: 5,
    title: 'Elágazás és ciklus',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A vezérlési szerkezetek majdnem ugyanazok, mint Pythonban — a különbség a **kapcsos zárójel** és a kötelező pontosvessző. A behúzásnak itt nincs jelentése, csak olvashatósági szerepe.' },
      { k: 'code', lang: 'java', src: 'if (akku > 70) {\n    System.out.println("Teljes gőz");\n} else if (akku > 20) {\n    System.out.println("Takarékos");\n} else {\n    System.out.println("Töltés kell");\n}', explain: 'A feltétel **zárójelben** van, a blokk pedig kapcsos zárójelek közt. Egysoros blokknál elhagyható a kapocs, de ne tedd — ebből születnek a csendes hibák.' },
      { k: 'code', lang: 'java', src: 'for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}\n\nint n = 5;\nwhile (n > 0) {\n    n--;\n}\n\nint[] tavok = {12, 8, 30};\nfor (int t : tavok) {\n    System.out.println(t);\n}', explain: 'A klasszikus `for` három részből áll: kezdőérték, feltétel, léptetés. A `for-each` forma akkor jó, ha nem kell az index.' },
      { k: 'callout', tone: 'warn', md: 'A `switch` hagyományos formájában **átesik** a következő ágra, ha nincs `break`. Ez a nyelv egyik legrégebbi csapdája. Újabb Javában a `case X -> ...` nyíl alak ezt megszünteti — használd azt.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi határozza meg a blokkot Javában?', opts: ['A behúzás', 'A kapcsos zárójel', 'A pontosvessző'], answer: 1, why: 'Javában a behúzás csak olvashatóság. A blokkot a `{ }` jelöli — ezért lehet elcsúszott behúzású, mégis helyes kód.' },
      { k: 'output', q: 'Hányszor fut le a ciklusmag?', code: 'for (int i = 0; i < 3; i++) {\n    System.out.println(i);\n}', lang: 'java', opts: ['2', '3', '4'], answer: 1, why: 'i = 0, 1, 2 — háromszor. A feltétel `i < 3`, tehát a 3-at már nem éri el.' },
      { k: 'single', q: 'Mi történik a régi `switch`-ben, ha kimarad a `break`?', opts: ['Hiba', 'Átesik a következő ágra is', 'Semmi'], answer: 1, why: 'Ez a „fall-through". Néha hasznos, de a hibák nagy részét ez okozza. A nyilas forma (`case X ->`) nem esik át.' },
      { k: 'single', q: 'Mikor használd a `for-each` formát?', opts: ['Mindig', 'Amikor nincs szükséged az indexre', 'Csak tömbnél'], answer: 1, why: 'Olvashatóbb és nem lehet elrontani a határokat. Ha az index is kell, a klasszikus forma a helyes.' },
    ],
    note: {
      summary: ['A feltétel zárójelben, a blokk kapcsos zárójelek közt áll.', 'A behúzásnak Javában nincs jelentése, csak olvashatósági szerepe.', 'A klasszikus `for`: kezdőérték, feltétel, léptetés.', 'A `for-each` (`for (int t : tomb)`) index nélkül jár végig.', 'A régi `switch` `break` nélkül átesik a következő ágra; a nyilas forma nem.'],
      terms: [{ term: 'blokk', def: 'Kapcsos zárójelek közé zárt utasítássorozat.' }, { term: 'for-each', def: 'Index nélküli ciklusforma gyűjtemények bejárására.' }, { term: 'fall-through', def: 'A switch átesése a következő ágra break hiányában.' }],
    },
  },
  {
    day: 6,
    title: 'Tömbök',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A tömb **rögzített méretű**, azonos típusú elemek sorozata. Ez a legegyszerűbb gyűjtemény Javában, és a legmerevebb is.' },
      { k: 'code', lang: 'java', src: 'int[] tavok = new int[5];        // öt nulla\nint[] meresek = {12, 8, 30, 5};  // azonnali feltöltés\n\nSystem.out.println(meresek.length);   // 4 — nem length()!\nmeresek[0] = 99;', explain: 'A `length` **mező**, nem metódus — ezért nincs zárójel. A String-nél viszont `length()` metódus. Ez a kettősség mindenkit megzavar egyszer.' },
      { k: 'callout', tone: 'warn', md: 'A tömb mérete létrehozás után **nem változtatható**. Ha bővíteni akarsz, új tömböt kell készíteni és átmásolni — vagy inkább `ArrayList`-et használni, amiről a 17. napon lesz szó.' },
      { k: 'code', lang: 'java', src: 'int[][] racs = new int[3][4];    // 3 sor, 4 oszlop\nracs[1][2] = 7;\n\nfor (int[] sor : racs) {\n    for (int ertek : sor) {\n        System.out.print(ertek + " ");\n    }\n    System.out.println();\n}' },
      { k: 'callout', tone: 'key', md: 'Érvénytelen index esetén `ArrayIndexOutOfBoundsException` keletkezik — **futásidőben**, nem fordításkor. A Java itt nem véd meg: a határellenőrzés a te dolgod.' },
    ],
    quiz: [
      { k: 'single', q: 'Hogyan kérdezed le egy tömb hosszát?', opts: ['tomb.length()', 'tomb.length', 'tomb.size()'], answer: 1, why: 'A tömbnél a `length` mező, zárójel nélkül. A `length()` a String metódusa, a `size()` a gyűjteményeké.' },
      { k: 'single', q: 'Megváltoztatható-e egy tömb mérete létrehozás után?', opts: ['Igen', 'Nem, új tömböt kell készíteni', 'Csak ha üres'], answer: 1, why: 'A tömb mérete rögzített. Bővítéshez új tömb és másolás kell — vagy inkább ArrayList.' },
      { k: 'single', q: 'Mi történik érvénytelen indexnél?', opts: ['Fordítási hiba', 'ArrayIndexOutOfBoundsException futásidőben', 'Nullát ad vissza'], answer: 1, why: 'A fordító nem látja előre az indexet, ezért csak futásidőben derül ki. A határellenőrzés a programozó felelőssége.' },
      { k: 'output', q: 'Mit ír ki?', code: 'int[] a = {1, 2, 3};\nSystem.out.println(a.length);', lang: 'java', opts: ['2', '3', '4'], answer: 1, why: 'Három elem van benne, tehát a hossz 3. A legnagyobb érvényes index viszont 2.' },
    ],
    note: {
      summary: ['A tömb rögzített méretű, azonos típusú elemek sorozata.', 'Létrehozás: `new int[5]` vagy `{12, 8, 30}`.', 'A hossz a `length` **mező**, zárójel nélkül — Stringnél `length()` metódus.', 'A tömb mérete utólag nem változtatható.', 'Érvénytelen index futásidejű `ArrayIndexOutOfBoundsException`-t ad.'],
      terms: [{ term: 'tömb', def: 'Rögzített méretű, azonos típusú elemek sorozata.' }, { term: 'length', def: 'A tömb hosszát adó mező, zárójel nélkül.' }, { term: 'kétdimenziós tömb', def: 'Tömbök tömbje, például `int[3][4]`.' }],
    },
  },
  {
    day: 7,
    title: 'String kezelése',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A `String` Javában **objektum és megváltoztathatatlan**. Minden művelet új példányt készít — ez meglepő, amíg meg nem szokod, és teljesítménybeli következménye is van.' },
      { k: 'code', lang: 'java', src: 'String s = "Rover";\ns.toUpperCase();              // nem változtat semmit!\ns = s.toUpperCase();          // így már igen\n\nSystem.out.println(s.length());\nSystem.out.println(s.substring(0, 3));   // ROV\nSystem.out.println(s.contains("OV"));    // true' },
      { k: 'callout', tone: 'warn', md: 'Két szöveget **soha** ne `==`-szel hasonlíts össze. Az azonosságot nézi, nem a tartalmat, és néha véletlenül igazat ad (a fordító összevonja az azonos literálokat) — ettől a hiba csak néha jelentkezik. Mindig `equals()`.' },
      { k: 'code', lang: 'java', src: 'String a = "alma";\nString b = new String("alma");\n\nSystem.out.println(a == b);        // false\nSystem.out.println(a.equals(b));   // true' },
      { k: 'callout', tone: 'key', md: 'Ciklusban ne fűzz `+`-szal szöveget: minden lépésben új objektum készül, és ezer körnél ez már érezhetően lassú. Használj `StringBuilder`-t.' },
    ],
    quiz: [
      { k: 'single', q: 'Mivel hasonlítasz össze két szöveget?', opts: ['==', 'equals()', 'compare()'], answer: 1, why: 'A `==` az azonosságot nézi. Tartalmat az `equals()` hasonlít — ez a leggyakoribb Java-buktató.' },
      { k: 'output', q: 'Mit ír ki?', code: 'String s = "abc";\ns.toUpperCase();\nSystem.out.println(s);', lang: 'java', opts: ['ABC', 'abc', 'Hibát dob'], answer: 1, why: 'A String megváltoztathatatlan: a metódus új példányt ad vissza, amit itt senki nem tett el.' },
      { k: 'single', q: 'Miért rossz ciklusban `+`-szal fűzni?', opts: ['Nem fordul le', 'Minden lépésben új objektum készül, ezért lassú', 'Rossz eredményt ad'], answer: 1, why: 'A String megváltoztathatatlan, így minden összefűzés új példányt gyárt. Ezer körnél ez már ezer felesleges objektum.' },
      { k: 'single', q: 'Miért ad néha igazat a `==` két egyforma szövegre?', opts: ['Mert néha jól működik', 'Mert a fordító összevonja az azonos literálokat', 'Véletlen'], answer: 1, why: 'Az azonos szövegliterálok ugyanarra a példányra mutathatnak. Ettől lesz a hiba időszakos — és ezért különösen alattomos.' },
    ],
    note: {
      summary: ['A String objektum és megváltoztathatatlan; minden metódus új példányt ad.', 'Szöveget mindig `equals()`-szal hasonlíts, soha nem `==`-szel.', 'A `==` néha véletlenül igazat ad a literálok összevonása miatt.', 'Hasznos metódusok: `length()`, `substring()`, `contains()`, `split()`.', 'Ciklusban `StringBuilder`-rel fűzz, ne `+`-szal.'],
      terms: [{ term: 'megváltoztathatatlan', def: 'Olyan objektum, aminek az állapota létrehozás után nem módosul.' }, { term: 'equals()', def: 'Tartalom szerinti összehasonlítás objektumoknál.' }, { term: 'StringBuilder', def: 'Módosítható szövegépítő, ciklusbeli összefűzéshez.' }],
    },
  },
  {
    day: 8,
    title: 'Konstruktorok',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A konstruktor feladata, hogy az objektum **használható állapotban** szülessen meg. Ha ez sikerül, a többi metódus nyugodtan feltételezheti, hogy minden rendben van.' },
      { k: 'code', lang: 'java', src: 'public class Rover {\n    private final String nev;\n    private int akku;\n\n    public Rover(String nev) {\n        this(nev, 100);          // a másik konstruktort hívja\n    }\n\n    public Rover(String nev, int akku) {\n        if (nev == null || nev.isBlank())\n            throw new IllegalArgumentException("A névnek kell lennie");\n        this.nev = nev;\n        this.akku = Math.max(0, Math.min(100, akku));\n    }\n}', explain: 'A `this(...)` másik konstruktort hív — így nem kell kétszer leírni az ellenőrzést. A `final` mező csak a konstruktorban kaphat értéket.' },
      { k: 'callout', tone: 'key', md: 'Ha a konstruktor **kivételt dob**, az objektum nem jön létre. Ez jó: jobb hangosan elbukni a születésnél, mint egy félkész objektummal dolgozni, ami száz sorral később omlik össze.' },
      { k: 'callout', tone: 'warn', md: 'Ha **egyetlen** konstruktort sem írsz, a Java ad egy üreset. De amint írsz egyet, az alapértelmezett eltűnik — és a `new Rover()` többé nem fordul le.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit csinál a `this(...)` hívás a konstruktorban?', opts: ['Visszaadja az objektumot', 'Meghívja az osztály egy másik konstruktorát', 'Törli az objektumot'], answer: 1, why: 'Így lehet közös ellenőrzést egy helyen tartani, és a rövidebb konstruktorból a bővebbet hívni.' },
      { k: 'single', q: 'Mi történik, ha a konstruktor kivételt dob?', opts: ['Az objektum félkészen létrejön', 'Az objektum nem jön létre', 'A program leáll'], answer: 1, why: 'A `new` nem ad vissza hivatkozást. Jobb a születésnél elbukni, mint érvénytelen állapottal továbbmenni.' },
      { k: 'single', q: 'Mi történik az alapértelmezett konstruktorral, ha írsz egy sajátot?', opts: ['Megmarad', 'Eltűnik', 'Hibát ad'], answer: 1, why: 'A fordító csak akkor ad üres konstruktort, ha egyet sem írtál. Ha kell, írd meg magad is.' },
      { k: 'single', q: 'Mikor kaphat értéket egy `final` mező?', opts: ['Bármikor', 'A deklarációnál vagy a konstruktorban, egyszer', 'Soha'], answer: 1, why: 'A `final` mező pontosan egyszer kap értéket, és utána konstans. Ezzel jelzed, hogy ez az objektum élete során nem változik.' },
    ],
    note: {
      summary: ['A konstruktor feladata, hogy az objektum használható állapotban szülessen.', 'A `this(...)` másik konstruktort hív, így az ellenőrzés egy helyen marad.', 'Kivételt dobó konstruktor esetén az objektum nem jön létre — ez helyes viselkedés.', 'Saját konstruktor írásakor az alapértelmezett üres eltűnik.', 'A `final` mező a deklarációnál vagy a konstruktorban kap értéket, egyszer.'],
      terms: [{ term: 'konstruktorlánc', def: 'Egyik konstruktor hívja a másikat `this(...)`-szal.' }, { term: 'IllegalArgumentException', def: 'Érvénytelen paraméterre dobott szabványos kivétel.' }, { term: 'final mező', def: 'Egyszer beállítható mező, ami utána nem változhat.' }],
    },
  },
  {
    day: 9,
    title: 'Láthatóság: public és private',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A láthatósági módosító azt mondja meg, **honnan** érhető el egy tag. Ez nem biztonsági kérdés, hanem tervezési: azt jelöli ki, mi a nyilvános ígéret és mi a belső ügy.' },
      { k: 'text', md: '- `public` — bárhonnan\n- `protected` — ugyanabból a csomagból és a leszármazottakból\n- *(semmi)* — csak ugyanabból a csomagból (csomagszintű)\n- `private` — csak ugyanabból az osztályból' },
      { k: 'callout', tone: 'key', md: 'A jó alapértelmezés: **minden `private`**, és csak az legyen `public`, amire tényleg szükség van kívülről. Amit egyszer publikussá tettél, azt később nehéz visszavenni — mások már használják.' },
      { k: 'code', lang: 'java', src: 'public class Akku {\n    private int szint = 100;          // belső ügy\n\n    public int getSzint() {           // nyilvános ígéret\n        return szint;\n    }\n\n    public void fogyaszt(int mennyi) {\n        szint = Math.max(0, szint - mennyi);\n    }\n}', explain: 'A szint kívülről csak olvasható, és csak a `fogyaszt` metóduson át csökkenthető — így soha nem lehet negatív vagy 100 fölötti.' },
      { k: 'callout', tone: 'tip', md: 'Ha egy mezőhöz getter **és** setter is tartozik minden ellenőrzés nélkül, kérdezd meg: mi értelme volt privátnak tenni? A kapszulázás nem a szertartásról szól, hanem arról, hogy az osztály garantáljon valamit.' },
    ],
    quiz: [
      { k: 'single', q: 'Honnan érhető el egy `private` tag?', opts: ['Bárhonnan', 'Csak ugyanabból az osztályból', 'Csak a leszármazottakból'], answer: 1, why: 'A `private` a legszűkebb: még ugyanabból a csomagból sem látszik, csak az osztályon belülről.' },
      { k: 'single', q: 'Mi a jó alapértelmezés tervezéskor?', opts: ['Minden public', 'Minden private, és csak a szükséges public', 'Minden protected'], answer: 1, why: 'A publikus felület ígéret, amit később nehéz visszavonni. Kevesebb nyilvános tag, kevesebb kötöttség.' },
      { k: 'single', q: 'Mit jelent, ha nincs módosító egy tag előtt?', opts: ['Ugyanaz, mint a public', 'Csomagszintű: csak ugyanabból a csomagból látszik', 'Hiba'], answer: 1, why: 'Ez az alapértelmezett, csomagszintű láthatóság. Gyakran véletlenül keletkezik, amikor valaki lefelejti a módosítót.' },
      { k: 'single', q: 'Mi a baj egy ellenőrzés nélküli getter-setter párossal?', opts: ['Lassú', 'Ugyanazt adja, mint egy publikus mező, csak körülményesebben', 'Nem fordul le'], answer: 1, why: 'Ha bárki bármire állíthatja, az osztály nem garantál semmit. A kapszulázásnak akkor van értelme, ha van mit megvédeni.' },
    ],
    note: {
      summary: ['Láthatóság: public, protected, csomagszintű (nincs módosító), private.', 'A `private` csak az osztályon belülről látszik.', 'Jó alapértelmezés: minden private, és csak a szükséges public.', 'A publikus felület ígéret, amit később nehéz visszavonni.', 'Ellenőrzés nélküli getter-setter páros nem kapszuláz semmit.'],
      terms: [{ term: 'láthatóság', def: 'Azt szabályozza, honnan érhető el egy osztály tagja.' }, { term: 'csomagszintű', def: 'Módosító nélküli láthatóság: csak azonos csomagból érhető el.' }, { term: 'publikus felület', def: 'Az osztály kívülről használható tagjainak összessége.' }],
    },
  },
  {
    day: 10,
    title: 'Getter, setter, kapszulázás',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A kapszulázás nem arról szól, hogy minden mezőhöz getter-settert gyártunk. Arról szól, hogy az osztály **garantáljon** valamit, amit kívülről nem lehet elrontani.' },
      { k: 'code', lang: 'java', src: 'public class Homerseklet {\n    private double celsius;\n\n    public double getCelsius() { return celsius; }\n\n    public void setCelsius(double c) {\n        if (c < -273.15)\n            throw new IllegalArgumentException("Abszolút nulla alatt nincs hőmérséklet");\n        this.celsius = c;\n    }\n\n    public double getFahrenheit() {       // származtatott, nincs mezője\n        return celsius * 9 / 5 + 32;\n    }\n}', explain: 'A `getFahrenheit` mögött nincs mező: számolja. A hívó nem is tudja — és nem is kell tudnia. Ez a kapszulázás haszna.' },
      { k: 'callout', tone: 'key', md: 'A getter nem köteles mezőt visszaadni, a setter nem köteles csak értékadni. Ettől tudod később megváltoztatni a belső működést anélkül, hogy bárki kódja elromlana.' },
      { k: 'callout', tone: 'warn', md: 'Ha egy getter listát ad vissza, a hívó **módosíthatja** azt — és ezzel a te belső állapotodat. Adj vissza másolatot vagy módosíthatatlan nézetet: `List.copyOf(lista)`.' },
    ],
    quiz: [
      { k: 'single', q: 'Kell-e minden mezőhöz getter és setter?', opts: ['Igen, kötelező', 'Nem — csak amire tényleg szükség van kívülről', 'Csak getter kell'], answer: 1, why: 'A felesleges hozzáférés felesleges kötöttség. Minden publikus tag egy ígéret, amit meg kell tartanod.' },
      { k: 'single', q: 'Mi a `getFahrenheit` érdekessége a példában?', opts: ['Van mögötte mező', 'Számolja az értéket, nincs mögötte mező', 'Hibát dob'], answer: 1, why: 'A hívó ugyanúgy használja, mint bármelyik gettert, de az érték számításból jön. A belső szerkezet rejtve marad.' },
      { k: 'single', q: 'Mi a baj, ha egy getter a belső listát adja vissza?', opts: ['Lassú', 'A hívó módosíthatja vele a belső állapotot', 'Nem fordul le'], answer: 1, why: 'A hivatkozást adtad oda, nem másolatot. A hívó hozzáadhat vagy törölhet, megkerülve minden ellenőrzésedet.' },
      { k: 'single', q: 'Mi a kapszulázás valódi haszna?', opts: ['Kevesebb gépelés', 'A belső működés megváltoztatható anélkül, hogy a hívók kódja elromlana', 'Gyorsabb futás'], answer: 1, why: 'Amíg a publikus felület ugyanaz marad, a belsőt szabadon átírhatod. Ez teszi karbantarthatóvá a nagy rendszert.' },
    ],
    note: {
      summary: ['A kapszulázás célja a garancia, nem a getter-setter szertartás.', 'A setter ellenőrizhet, és érvénytelen értékre kivételt dobhat.', 'A getter számolhat is: nem kell mögötte mezőnek lennie.', 'Listát visszaadó getter adjon másolatot vagy módosíthatatlan nézetet.', 'Amíg a publikus felület állandó, a belső működés szabadon átírható.'],
      terms: [{ term: 'getter', def: 'Olvasó metódus, ami nem feltétlenül mezőt ad vissza.' }, { term: 'setter', def: 'Író metódus, ami ellenőrizhet, mielőtt értéket ad.' }, { term: 'védekező másolat', def: 'Másolat visszaadása, hogy a hívó ne módosíthassa a belső állapotot.' }],
    },
  },
];
