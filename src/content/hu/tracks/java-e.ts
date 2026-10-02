import type { Day } from '../../types';

/** JAVA trek, 25–30. nap. */
export const javaHuE: Day[] = [
  {
    day: 25,
    title: 'Egységtesztelés JUnittal',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A **JUnit 5** a Java szabványos tesztkerete. Egy teszt egy metódus `@Test` annotációval — ennyi az egész belépési küszöb.' },
      { k: 'code', lang: 'java', src: 'import org.junit.jupiter.api.*;\nimport static org.junit.jupiter.api.Assertions.*;\n\nclass RoverTest {\n\n    private Rover rover;\n\n    @BeforeEach\n    void setUp() {\n        rover = new Rover("Alfa");      // minden teszt előtt friss példány\n    }\n\n    @Test\n    void ujRoverTeleAkkuvalIndul() {\n        assertEquals(100, rover.getAkku());\n    }\n\n    @Test\n    void uresNevreKiveteltDob() {\n        assertThrows(IllegalArgumentException.class,\n                     () -> new Rover(""));\n    }\n}', explain: 'A `@BeforeEach` minden teszt előtt lefut, tehát minden teszt friss állapotból indul. Enélkül a tesztek sorrendje számítana — ami a legrosszabb fajta törékenység.' },
      { k: 'callout', tone: 'key', md: 'A teszt neve **mondat legyen**, ne cím. Az `ujRoverTeleAkkuvalIndul` megmondja, mit vársz; a `test1` semmit. Hibánál a teszt neve az első, amit látsz — ez legyen önmagában érthető.' },
      { k: 'text', md: 'A leggyakrabban használt állítások:\n\n- `assertEquals(vart, tenyleges)` — a sorrend számít a hibaüzenetben\n- `assertTrue` / `assertFalse`\n- `assertThrows(Kivetel.class, () -> ...)` — hibaágak tesztelése\n- `assertAll(...)` — több állítás együtt, mind lefut akkor is, ha egy megbukik\n- `assertNotNull`' },
      { k: 'callout', tone: 'warn', md: 'Az **egymásra épülő tesztek** a leggyakoribb hiba. Ha az egyik teszt az előző által hagyott állapotra épít, akkor külön futtatva megbukik, és a hiba oka órákig kereshető. Minden teszt legyen **önmagában teljes**.' },
      { k: 'text', md: 'A **paraméteres teszt** sok eset ellenőrzését teszi rövidre:\n\n```java\n@ParameterizedTest\n@ValueSource(ints = {0, 1, 50, 99, 100})\nvoid ervenyesAkkuszintElfogadva(int szint) {\n    assertDoesNotThrow(() -> new Rover("A", szint));\n}\n```' },
    ],
    quiz: [
      { k: 'single', q: 'Mit csinál a `@BeforeEach`?', opts: ['Egyszer fut le', 'Minden teszt előtt lefut, friss állapotot adva', 'A teszt után fut'], answer: 1, why: 'Enélkül a tesztek sorrendje számítana, ami a legrosszabb fajta törékenység.' },
      { k: 'single', q: 'Milyen legyen egy teszt neve?', opts: ['Rövid, például `test1`', 'Mondat, ami megmondja, mit vársz', 'A metódus neve'], answer: 1, why: 'Hibánál a teszt neve az első, amit látsz; legyen önmagában érthető.' },
      { k: 'single', q: 'Hogyan tesztelsz kivételt?', opts: ['`try-catch` blokkal', '`assertThrows(Kivetel.class, () -> ...)`', 'Nem lehet'], answer: 1, why: 'Megbukik, ha nem dob kivételt, és akkor is, ha rossz típusút dob.' },
      { k: 'single', q: 'Mi a baj az egymásra épülő tesztekkel?', opts: ['Lassúak', 'Külön futtatva megbuknak, és a hiba oka órákig kereshető', 'Túl hosszúak'], answer: 1, why: 'Minden teszt legyen önmagában teljes.' },
      { k: 'single', q: 'Mire jó a `@ParameterizedTest`?', opts: ['Gyorsít', 'Egy tesztet sok bemenettel futtat le', 'Párhuzamosít'], answer: 1, why: 'A `@ValueSource` felsorolja az eseteket, és a teszt mindegyikre lefut.' },
    ],
    note: {
      summary: ['JUnit 5: egy teszt egy `@Test` annotációjú metódus.', '`@BeforeEach` minden teszt előtt friss állapotot ad.', 'A teszt neve mondat legyen, ne cím.', 'Állítások: assertEquals, assertTrue, assertThrows, assertAll.', 'Minden teszt legyen önmagában teljes, ne épüljön az előzőre.', '`@ParameterizedTest` sok bemenetet fed le egyetlen teszttel.'],
      terms: [{ term: 'JUnit', def: 'A Java szabványos egységtesztelő kerete.' }, { term: '@BeforeEach', def: 'Minden teszt előtt lefutó előkészítő metódus.' }, { term: 'paraméteres teszt', def: 'Ugyanaz a teszt több bemeneti értékkel.' }],
    },
  },
  {
    day: 26,
    title: 'Szálak alapjai',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'A **szál** (thread) párhuzamosan futó végrehajtási ág. Egy program több szálon egyszerre dolgozhat — és ettől lesz gyors, meg ettől lesz nehezen hibakereshető.' },
      { k: 'code', lang: 'java', src: '// Ne így: nyers szálkezelés\nThread t = new Thread(() -> System.out.println("fut"));\nt.start();\nt.join();\n\n// Hanem így: végrehajtó szolgáltatás\ntry (var pool = Executors.newFixedThreadPool(4)) {\n    Future<Integer> eredmeny = pool.submit(() -> szamol(42));\n    System.out.println(eredmeny.get());\n}', explain: 'A nyers `Thread` ritkán indokolt. Az `ExecutorService` kezeli a szálak életciklusát, és a `Future` adja vissza az eredményt — vagy dobja a hibát, ha a feladat elszállt.' },
      { k: 'callout', tone: 'key', md: 'A központi probléma a **versenyhelyzet** (race condition): két szál ugyanazt az adatot módosítja, és az eredmény attól függ, melyik ér oda előbb. A `szamlalo++` például **nem oszthatatlan**: olvasás, növelés, visszaírás — három lépés, amibe közbe lehet vágni.' },
      { k: 'text', md: 'Három megoldás, a legegyszerűbbtől:\n\n- **Ne osszatok meg állapotot** — a legjobb megoldás, ha megoldható\n- **Nem módosítható objektum** (immutable) — amit nem lehet megváltoztatni, azon nincs versenyhelyzet\n- **`AtomicInteger`, `ConcurrentHashMap`** — kész, szálbiztos osztályok\n- **`synchronized` vagy `ReentrantLock`** — csak ha a fentiek nem elegendők' },
      { k: 'callout', tone: 'warn', md: 'A **holtpont** (deadlock) akkor keletkezik, ha két szál egymás zárjára vár. Ellenszer: mindig **ugyanabban a sorrendben** vedd fel a zárakat, és tarts minél rövidebb ideig zárat. A holtpont nem dob kivételt — a program egyszerűen megáll, és ez a legnehezebben kereshető hiba.' },
      { k: 'callout', tone: 'tip', md: 'A legmegbízhatóbb szálkezelés az, amit **nem írsz meg**. A `parallelStream()`, az `ExecutorService` és a `CompletableFuture` lefedi a feladatok nagy részét. Kézzel írt `synchronized` blokk csak akkor, ha tényleg nincs más út.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit érdemes használni nyers `Thread` helyett?', opts: ['Semmit', '`ExecutorService` és `Future`', 'Csak `synchronized`-ot'], answer: 1, why: 'Kezeli a szálak életciklusát, és a `Future` visszaadja az eredményt vagy a hibát.' },
      { k: 'single', q: 'Miért nem szálbiztos a `szamlalo++`?', opts: ['Túl lassú', 'Mert három lépés: olvasás, növelés, visszaírás', 'Mert `int` típusú'], answer: 1, why: 'A három lépés közé be lehet vágni, és az egyik növelés elveszik.' },
      { k: 'single', q: 'Mi a legjobb megoldás a versenyhelyzetre?', opts: ['`synchronized` mindenhol', 'Ne osszatok meg állapotot', 'Lassítás'], answer: 1, why: 'Ha nincs közös módosítható állapot, nincs versenyhelyzet sem.' },
      { k: 'single', q: 'Mi a holtpont?', opts: ['Két szál egymás zárjára vár', 'Egy szál lefagy', 'Elfogy a memória'], answer: 0, why: 'Nem dob kivételt: a program egyszerűen megáll. Ez a legnehezebben kereshető hiba.' },
      { k: 'single', q: 'Hogyan előzhető meg a holtpont?', opts: ['Több szállal', 'Mindig ugyanabban a sorrendben venni fel a zárakat', 'Hosszabb zárakkal'], answer: 1, why: 'És tarts minél rövidebb ideig zárat.' },
    ],
    note: {
      summary: ['A szál párhuzamos végrehajtási ág.', 'Nyers `Thread` helyett `ExecutorService` és `Future`.', 'Versenyhelyzet: a `szamlalo++` három lépés, nem oszthatatlan.', 'Megoldás sorrendben: ne ossz állapotot, immutable, Atomic, csak végül zár.', 'Holtpont: két szál egymásra vár; azonos zársorrend az ellenszer.', 'A legjobb szálkezelés az, amit nem írsz meg magad.'],
      terms: [{ term: 'versenyhelyzet', def: 'Két szál ugyanazt az adatot módosítja, és az eredmény időzítésfüggő.' }, { term: 'holtpont', def: 'Két szál kölcsönösen egymás zárjára vár.' }, { term: 'ExecutorService', def: 'Szálak életciklusát kezelő szolgáltatás.' }],
    },
  },
  {
    day: 27,
    title: 'Memória és szemétgyűjtés',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A Java automatikusan felszabadítja a memóriát — de ez nem jelenti azt, hogy nem kell érteni, hogyan. A legtöbb teljesítményprobléma a memóriakezelésből jön.' },
      { k: 'callout', tone: 'key', md: 'A memória két része:\n\n- **Verem (stack)** — szálanként külön; itt vannak a helyi változók és a hivatkozások. Automatikusan ürül a metódusból kilépéskor.\n- **Kupac (heap)** — közös; itt vannak az objektumok. Ezt takarítja a szemétgyűjtő.' },
      { k: 'text', md: 'A **szemétgyűjtő** (GC) azt szabadítja fel, amire már **nincs elérhető hivatkozás**. Nem a „nem használt" objektumokat gyűjti be, hanem az **elérhetetleneket** — ez a kettő nem ugyanaz, és ebből fakad a Java-beli memóriaszivárgás.' },
      { k: 'code', lang: 'java', src: '// Klasszikus szivárgás: a lista örökké nő\npublic class Naplo {\n    private static final List<String> SOROK = new ArrayList<>();\n\n    public static void ir(String s) {\n        SOROK.add(s);          // soha semmi nem törlődik\n    }\n}\n\n// Megoldás: korlátos tároló vagy gyenge hivatkozás\nprivate static final int MAX = 1000;\npublic static void ir(String s) {\n    if (SOROK.size() >= MAX) SOROK.remove(0);\n    SOROK.add(s);\n}', explain: 'A statikus gyűjtemény sosem szabadul fel, mert az osztály a program végéig él. Ez a Java-beli memóriaszivárgás első számú forrása.' },
      { k: 'callout', tone: 'warn', md: 'A **generációs szemétgyűjtés** azon a megfigyelésen alapul, hogy az objektumok nagy része **nagyon hamar meghal**. Ezért van külön fiatal és öreg generáció: a fiatal gyakran és gyorsan takarítódik, az öreg ritkán és lassan. Ha sok objektum túléli a fiatal kort, a GC drágává válik.' },
      { k: 'callout', tone: 'tip', md: 'Ne próbáld „segíteni" a szemétgyűjtőt. A `System.gc()` hívás nem parancs, csak javaslat, és rendszerint ront a helyzeten. Ha a GC a szűk keresztmetszet, a megoldás **kevesebb objektumot létrehozni**, nem gyakrabban takarítani.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a különbség a verem és a kupac között?', opts: ['A verem szálanként külön, helyi változókkal; a kupac közös, objektumokkal', 'A verem nagyobb', 'Nincs különbség'], answer: 0, why: 'A verem automatikusan ürül; a kupacot a szemétgyűjtő takarítja.' },
      { k: 'single', q: 'Mit szabadít fel a szemétgyűjtő?', opts: ['A nem használt objektumokat', 'Az elérhetetlen objektumokat', 'A régi objektumokat'], answer: 1, why: 'Egy már nem használt, de még hivatkozott objektum nem szabadul fel — ez a szivárgás.' },
      { k: 'single', q: 'Mi a Java-beli memóriaszivárgás első számú forrása?', opts: ['Túl sok objektum', 'Statikus gyűjtemény, ami sosem ürül', 'Nagy tömbök'], answer: 1, why: 'A statikus mező az osztállyal együtt a program végéig él.' },
      { k: 'single', q: 'Min alapul a generációs szemétgyűjtés?', opts: ['Az objektumok méretén', 'Azon, hogy az objektumok nagy része nagyon hamar meghal', 'A szálak számán'], answer: 1, why: 'A fiatal generáció gyakran és gyorsan takarítódik, az öreg ritkán és lassan.' },
      { k: 'single', q: 'Mit tegyél, ha a GC a szűk keresztmetszet?', opts: ['Hívj `System.gc()`-t gyakrabban', 'Hozz létre kevesebb objektumot', 'Növeld a szálak számát'], answer: 1, why: 'A `System.gc()` csak javaslat, és rendszerint ront a helyzeten.' },
    ],
    note: {
      summary: ['Verem: szálankénti helyi változók. Kupac: közös objektumok.', 'A GC az elérhetetlen objektumokat szabadítja fel, nem a nem használtakat.', 'Statikus gyűjtemény a szivárgás első számú forrása.', 'Generációs GC: a fiatal generáció gyorsan, az öreg lassan takarítódik.', 'A `System.gc()` csak javaslat, és rendszerint ront.', 'GC-szűk keresztmetszetnél kevesebb objektumot hozz létre.'],
      terms: [{ term: 'kupac (heap)', def: 'A közös memóriaterület, ahol az objektumok élnek.' }, { term: 'elérhetőség', def: 'Van-e még hivatkozás az objektumra valamelyik élő gyökértől.' }, { term: 'generációs GC', def: 'Fiatal és öreg generációt külön kezelő szemétgyűjtés.' }],
    },
  },
  {
    day: 28,
    title: 'Hibakeresés IDE-ben',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A `System.out.println` egy darabig elég. A **hibakereső** viszont megállítja a programot ott, ahol akarod, és megmutat mindent, ami abban a pillanatban igaz.' },
      { k: 'callout', tone: 'key', md: 'A négy alapművelet minden IDE-ben ugyanaz:\n\n- **Step Over** (F8) — a következő sor, függvényhívás átugrásával\n- **Step Into** (F7) — belépés a hívott metódusba\n- **Step Out** (Shift+F8) — kilépés az aktuális metódusból\n- **Resume** (F9) — tovább a következő töréspontig' },
      { k: 'text', md: 'A **feltételes töréspont** a legjobban megtérülő eszköz. Kattints jobb gombbal a töréspontra, és adj meg feltételt: `rover.getAkku() < 10`. Így nem kell ezerszer továbbléptetni, amíg eléred a hibás esetet — a program magától akkor áll meg, amikor érdekes.' },
      { k: 'callout', tone: 'tip', md: 'A **kivételi töréspont** akkor hasznos, ha nem tudod, honnan jön a hiba: megállítja a programot abban a pillanatban, amikor a megadott kivétel keletkezik, még a verem lebontása előtt. Így látod a teljes állapotot, nem csak a vermet.' },
      { k: 'text', md: 'További eszközök, amiket érdemes ismerni:\n\n- **Evaluate Expression** — tetszőleges kifejezés kiértékelése futás közben\n- **Watches** — figyelt kifejezések, amik minden lépésnél frissülnek\n- **Drop Frame** — visszalépés a metódus elejére, hogy újra lefuttasd\n- **Hot Swap** — metódustörzs cseréje újraindítás nélkül' },
      { k: 'callout', tone: 'warn', md: 'Szálas kódnál a hibakereső **megváltoztatja az időzítést**: a töréspont megállítja az egyik szálat, és a versenyhelyzet eltűnik. Ezt hívják „heisenbug"-nak. Ilyenkor a naplózás jobb eszköz — vagy a töréspontot állítsd „csak ezt a szálat állítsa meg" módba.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a különbség a Step Over és a Step Into közt?', opts: ['A Step Into belép a hívott metódusba', 'A Step Over gyorsabb', 'Nincs különbség'], answer: 0, why: 'Ha nem a hívott metódusban keresed a hibát, Step Overrel gyorsabban haladsz.' },
      { k: 'single', q: 'Mire való a feltételes töréspont?', opts: ['Gyorsít', 'Csak akkor áll meg, ha a megadott feltétel teljesül', 'Naplóz'], answer: 1, why: 'Nem kell ezerszer továbbléptetni, amíg eléred a hibás esetet.' },
      { k: 'single', q: 'Mikor hasznos a kivételi töréspont?', opts: ['Mindig', 'Ha nem tudod, honnan jön a kivétel', 'Szálas kódnál'], answer: 1, why: 'Megállít abban a pillanatban, amikor a kivétel keletkezik, a verem lebontása előtt.' },
      { k: 'single', q: 'Mit csinál a Drop Frame?', opts: ['Törli a vermet', 'Visszalép a metódus elejére, hogy újra lefuttasd', 'Kilép a programból'], answer: 1, why: 'Hasznos, ha túlléptél azon a soron, amit meg akartál nézni.' },
      { k: 'single', q: 'Mi a heisenbug szálas kódnál?', opts: ['Egy memóriahiba', 'A töréspont megváltoztatja az időzítést, és a hiba eltűnik', 'Egy fordítási hiba'], answer: 1, why: 'Ilyenkor a naplózás jobb eszköz, vagy a töréspont csak egy szálat állítson meg.' },
    ],
    note: {
      summary: ['Alapműveletek: Step Over, Step Into, Step Out, Resume.', 'A feltételes töréspont a legjobban megtérülő eszköz.', 'Kivételi töréspont: megáll, amikor a kivétel keletkezik.', 'Evaluate Expression, Watches, Drop Frame, Hot Swap.', 'Szálas kódnál a hibakereső megváltoztatja az időzítést (heisenbug).', 'Ilyenkor naplózz, vagy állítsd a törésponton csak az egy szálat.'],
      terms: [{ term: 'feltételes töréspont', def: 'Töréspont, ami csak megadott feltétel mellett áll meg.' }, { term: 'kivételi töréspont', def: 'A kivétel keletkezésekor megálló töréspont.' }, { term: 'heisenbug', def: 'Hiba, ami eltűnik, amint vizsgálni kezded.' }],
    },
  },
  {
    day: 29,
    title: 'Egy kisebb alkalmazás',
    minutes: 26,
    lesson: [
      { k: 'text', md: 'Itt az ideje összerakni mindent egy működő programba. A példa: egy robotflotta-nyilvántartó, ami fájlból olvas, szűr, statisztikát ad és fájlba ír.' },
      { k: 'text', md: 'A rétegek, amiket érdemes szétválasztani:\n\n- **Modell** — `Rover` rekord: név, akkuszint, pozíció\n- **Tároló** — `RoverRepository`: betöltés és mentés fájlból\n- **Szolgáltatás** — `FlottaService`: szűrés, statisztika, üzleti szabályok\n- **Felület** — `Main`: parancssori argumentumok és kiírás' },
      { k: 'code', lang: 'java', src: 'public record Rover(String nev, int akku, int x, int y) {\n    public Rover {\n        if (nev == null || nev.isBlank())\n            throw new IllegalArgumentException("Név kötelező");\n        if (akku < 0 || akku > 100)\n            throw new IllegalArgumentException("Akku 0 és 100 közt: " + akku);\n    }\n\n    public boolean uzemkepes() { return akku > 5; }\n}', explain: 'A **rekord** (Java 16 óta) nem módosítható adatosztály: a konstruktor, a getterek, az `equals`, a `hashCode` és a `toString` magától elkészül. Az ellenőrzés a kompakt konstruktorba kerül.' },
      { k: 'callout', tone: 'key', md: 'A rétegek szétválasztásának gyakorlati haszna a **tesztelhetőség**. A `FlottaService` nem tud a fájlokról, ezért tesztelhető egy memóriabeli listával — nem kell fájlt írni minden teszthez. Ezért gyorsak és megbízhatók a tesztek.' },
      { k: 'code', lang: 'java', src: 'public class FlottaService {\n    private final List<Rover> roverek;\n\n    public FlottaService(List<Rover> roverek) {\n        this.roverek = List.copyOf(roverek);     // védő másolat\n    }\n\n    public List<Rover> gyengek(int kuszob) {\n        return roverek.stream()\n            .filter(r -> r.akku() < kuszob)\n            .sorted(Comparator.comparingInt(Rover::akku))\n            .toList();\n    }\n\n    public double atlagAkku() {\n        return roverek.stream().mapToInt(Rover::akku).average().orElse(0);\n    }\n}', explain: 'A `List.copyOf` **védő másolatot** készít: a hívó később nem tudja megváltoztatni a listát a hátad mögött. Ez egy sor, és sok rejtett hibát előz meg.' },
      { k: 'callout', tone: 'warn', md: 'A **`Main` osztály ne tartalmazzon üzleti logikát**. Olvassa be az argumentumokat, hívja a szolgáltatást, írja ki az eredményt — és semmi többet. Amint a `main` metódus hosszabb húsz sornál, valami rossz helyre került.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a rekord (record)?', opts: ['Egy fájltípus', 'Nem módosítható adatosztály, aminek a kódja magától elkészül', 'Egy gyűjtemény'], answer: 1, why: 'Konstruktor, getterek, equals, hashCode és toString automatikus.' },
      { k: 'single', q: 'Hova kerül a rekord ellenőrzése?', opts: ['Külön metódusba', 'A kompakt konstruktorba', 'A getterekbe'], answer: 1, why: 'Így az objektum sosem jöhet létre érvénytelen állapotban.' },
      { k: 'single', q: 'Mi a rétegek szétválasztásának fő haszna?', opts: ['Gyorsabb futás', 'Tesztelhetőség: a szolgáltatás fájl nélkül tesztelhető', 'Kevesebb kód'], answer: 1, why: 'Nem kell fájlt írni minden teszthez, ezért gyorsak és megbízhatók a tesztek.' },
      { k: 'single', q: 'Mire való a `List.copyOf`?', opts: ['Gyorsít', 'Védő másolat: a hívó nem tudja utólag megváltoztatni a listát', 'Rendezi'], answer: 1, why: 'Egy sor, és sok rejtett hibát előz meg.' },
      { k: 'single', q: 'Mi legyen a `Main` osztályban?', opts: ['Minden logika', 'Argumentumok beolvasása, szolgáltatáshívás, kiírás — semmi több', 'A tesztek'], answer: 1, why: 'Ha a `main` hosszabb húsz sornál, valami rossz helyre került.' },
    ],
    note: {
      summary: ['Rétegek: modell, tároló, szolgáltatás, felület.', 'A rekord nem módosítható adatosztály, automatikus kóddal.', 'Az ellenőrzés a kompakt konstruktorba kerül.', 'A rétegek szétválasztásának fő haszna a tesztelhetőség.', '`List.copyOf` védő másolatot ad.', 'A `Main` ne tartalmazzon üzleti logikát.'],
      terms: [{ term: 'rekord', def: 'Nem módosítható adatosztály generált kóddal.' }, { term: 'védő másolat', def: 'Másolat, ami megakadályozza a kívülről jövő módosítást.' }, { term: 'rétegzés', def: 'A felelősségek szétválasztása modellre, tárolóra, szolgáltatásra.' }],
    },
  },
  {
    day: 30,
    title: 'A teljes projekt',
    minutes: 30,
    lesson: [
      { k: 'text', md: 'Harminc nap alatt végigmentél a Java teljes alapkészletén. Most nézzük, hogyan áll össze mindez egy valódi, befejezett projektté — és mi következik.' },
      { k: 'callout', tone: 'key', md: 'Egy kész Java projekt összetevői:\n\n- **Forrás** `src/main/java`, tesztek `src/test/java` (24. nap)\n- **`pom.xml`** rögzített függőségverziókkal\n- **Tesztek** minden üzleti szabályra (25. nap)\n- **README** — mit csinál, hogyan kell fordítani, hogyan kell futtatni\n- **`.gitignore`** — `target/`, IDE fájlok\n- **Futtatható JAR** vagy indítószkript' },
      { k: 'text', md: 'A minőség három jele, ami a kódon látszik:\n\n1. **Kicsi, egy dolgot csináló metódusok** — ha egy metódus nem fér ki egy képernyőre, kettő kéne belőle\n2. **Beszédes nevek** — a jó név kiváltja a kommentet\n3. **Szűk publikus felület** — minden `private`, ami nem kell kívülről (9. nap)' },
      { k: 'callout', tone: 'warn', md: 'A **„majd később kijavítom"** a legdrágább mondat a programozásban. Amit ma öt perc, az három hónap múlva fél nap, mert addigra elfelejted, hogyan működik, és öt helyen használja valaki. Ha nem javítod ki most, legalább írj hozzá egy `// TODO` megjegyzést azzal, hogy **miért** maradt úgy.' },
      { k: 'text', md: 'Merre tovább, ha ez megvan:\n\n- **Spring Boot** — webes alkalmazásokhoz és REST API-khoz; a vállalati Java gerince\n- **JDBC és JPA** — adatbázis-kezelés\n- **Tervezési minták** — Factory, Strategy, Observer, Builder\n- **Profilozás** — JFR és VisualVM, ha a sebesség számít\n- **Kotlin** — ugyanazon a JVM-en, kevesebb szertartással' },
      { k: 'callout', tone: 'tip', md: 'A legjobb következő lépés nem egy újabb tanfolyam, hanem egy **saját projekt, amit tényleg használsz**. Egy eszköz, ami megold neked egy valódi problémát, többet tanít, mint tíz gyakorlófeladat — mert a valódi problémának nincs megoldókulcsa, és nem áll meg ott, ahol a tananyag.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi tartozik egy kész Java projekthez?', opts: ['Csak a forrás', 'Forrás, tesztek, pom.xml, README, .gitignore, futtatható JAR', 'Csak a JAR'], answer: 1, why: 'A README és a tesztek nélkül a projekt másnak használhatatlan.' },
      { k: 'single', q: 'Mekkora legyen egy metódus?', opts: ['Amekkora kell', 'Férjen ki egy képernyőre, és egy dolgot csináljon', 'Legfeljebb öt sor'], answer: 1, why: 'Ha nem fér ki, rendszerint két metódus van benne.' },
      { k: 'single', q: 'Mi váltja ki a kommentet?', opts: ['A rövidség', 'A beszédes név', 'A teszt'], answer: 1, why: 'A jó név elmondja, mit csinál a kód; a komment a miértre való.' },
      { k: 'single', q: 'Miért drága a „majd később kijavítom"?', opts: ['Mert elfelejtődik', 'Mert ami ma öt perc, három hónap múlva fél nap', 'Mert hibát okoz'], answer: 1, why: 'Addigra elfelejted, hogyan működik, és öt helyen használja valaki.' },
      { k: 'single', q: 'Mi a legjobb következő lépés a tanulás után?', opts: ['Egy újabb tanfolyam', 'Egy saját projekt, amit tényleg használsz', 'Több gyakorlófeladat'], answer: 1, why: 'A valódi problémának nincs megoldókulcsa, és nem áll meg ott, ahol a tananyag.' },
    ],
    note: {
      summary: ['Kész projekt: forrás, tesztek, pom.xml, README, .gitignore, JAR.', 'Minőség: kicsi metódusok, beszédes nevek, szűk publikus felület.', 'A jó név kiváltja a kommentet; a komment a miértre való.', 'A „majd később kijavítom" a legdrágább mondat.', 'Tovább: Spring Boot, JDBC/JPA, tervezési minták, profilozás, Kotlin.', 'A legjobb következő lépés egy saját, használt projekt.'],
      terms: [{ term: 'futtatható JAR', def: 'Önállóan indítható csomagolt Java alkalmazás.' }, { term: 'publikus felület', def: 'Az osztály kívülről elérhető tagjainak összessége.' }, { term: 'technikai adósság', def: 'Elhalasztott javítás, aminek később nagyobb az ára.' }],
    },
  },
];
