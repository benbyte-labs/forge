import type { Day } from '../../types';

/** C++ trek, 4–10. nap. */
export const cppHuB: Day[] = [
  {
    day: 4,
    title: 'Referencia és érték szerinti átadás',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A C++ a C mutatói mellé hoz egy kényelmesebb eszközt: a **referenciát**. Ugyanazt tudja, de nem lehet null, és nem kell csillagozni.' },
      { k: 'code', lang: 'cpp', src: 'void novelMutato(int *x) { (*x)++; }\nvoid novelRef(int &x)    { x++; }\n\nint n = 5;\nnovelMutato(&n);   // 6\nnovelRef(n);       // 7 — nincs & a híváskor', explain: 'A referencia a változó másik neve. A hívás helyén nem látszik, hogy módosítani fogja — ezért fontos a beszédes függvénynév.' },
      { k: 'callout', tone: 'key', md: 'Három választás van, és mindegyiknek megvan a helye:\n\n- **érték szerint** (`int x`) — kicsi adat, és nem módosítod\n- **const referencia** (`const std::string &s`) — nagy adat, és nem módosítod\n- **referencia** (`int &x`) — módosítani akarod' },
      { k: 'code', lang: 'cpp', src: 'void kiir(const std::vector<int> &v) {   // nincs másolás, nincs módosítás\n    for (int x : v) std::cout << x << " ";\n}' },
      { k: 'callout', tone: 'warn', md: 'Nagy objektumot soha ne adj át érték szerint. Egy tízezer elemű `vector` másolása minden hívásnál felesleges munka — `const &` ugyanazt adja ingyen.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a referencia?', opts: ['Egy mutató másik neve', 'Egy változó másik neve', 'Egy másolat'], answer: 1, why: 'A referencia álnév: ugyanarra a tárhelyre hivatkozik. Nem lehet null, és nem kell feloldani.' },
      { k: 'single', q: 'Mikor adj át `const &`-ként?', opts: ['Mindig', 'Nagy adatnál, amit nem módosítasz', 'Soha'], answer: 1, why: 'Elkerülöd a másolást, és a `const` garantálja, hogy a hívó adata érintetlen marad.' },
      { k: 'output', q: 'Mit ír ki?', code: 'void f(int &x) { x = 10; }\nint a = 5;\nf(a);\nstd::cout << a;', lang: 'cpp', opts: ['5', '10', '0'], answer: 1, why: 'A referencia magára az `a`-ra hivatkozik, így a függvény azt írja át.' },
      { k: 'single', q: 'Mi a referencia hátránya a mutatóhoz képest?', opts: ['Lassabb', 'A hívás helyén nem látszik, hogy módosítani fog', 'Nem lehet függvénynek átadni'], answer: 1, why: 'A `f(a)` hívásból nem derül ki, hogy az `a` megváltozik. Mutatónál a `&a` legalább figyelmeztet.' },
    ],
    note: {
      summary: ['A referencia egy változó másik neve: nem lehet null, nem kell feloldani.', 'Érték szerint kicsi, nem módosított adatot adj át.', '`const &` nagy adathoz, amit nem módosítasz: nincs másolás.', 'Sima `&` akkor, ha módosítani akarod a hívó változóját.', 'Nagy objektumot soha ne adj át érték szerint.'],
      terms: [{ term: 'referencia', def: 'Egy létező változó másik neve, ami nem lehet null.' }, { term: 'const referencia', def: 'Másolás nélküli átadás módosítás nélküli garanciával.' }, { term: 'érték szerinti átadás', def: 'A függvény a paraméter másolatát kapja.' }],
    },
  },
  {
    day: 5,
    title: 'Konstruktor és destruktor',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Tegnap láttad a RAII-t. Ma megnézzük, pontosan **mikor** fut le a konstruktor és a destruktor — mert ettől függ minden.' },
      { k: 'code', lang: 'cpp', src: 'class Naplo {\npublic:\n    Naplo(const std::string &nev) : nev_(nev) {\n        std::cout << nev_ << " megnyitva\\n";\n    }\n    ~Naplo() {\n        std::cout << nev_ << " lezárva\\n";\n    }\nprivate:\n    std::string nev_;\n};\n\nint main() {\n    Naplo a("A");\n    {\n        Naplo b("B");\n    }                  // itt zárul le B\n    std::cout << "vége\\n";\n}                      // itt zárul le A', explain: 'A sorrend: A megnyitva, B megnyitva, B lezárva, vége, A lezárva. A destruktorok **fordított** sorrendben futnak.' },
      { k: 'callout', tone: 'key', md: 'A destruktor akkor is lefut, ha a függvényből **kivétel** miatt lépsz ki. Ezért nem lehet elfelejteni a fájl lezárását vagy a zár feloldását — ez a RAII legnagyobb értéke.' },
      { k: 'text', md: 'Az **inicializáló lista** (`: nev_(nev)`) nem stílus kérdése: a mezők itt közvetlenül kapnak értéket. A konstruktor törzsében már értékadás történne, ami egy felesleges lépés — `const` és referencia mezőnél pedig nem is működne.' },
      { k: 'callout', tone: 'warn', md: 'A mezők **a deklaráció sorrendjében** inicializálódnak, nem az inicializáló lista sorrendjében. Ha ezek eltérnek, a fordító figyelmeztet — figyelj rá.' },
    ],
    quiz: [
      { k: 'single', q: 'Milyen sorrendben futnak le a destruktorok?', opts: ['Létrehozási sorrendben', 'Fordított sorrendben', 'Véletlenszerűen'], answer: 1, why: 'Ami utoljára jött létre, az szűnik meg először. Így a függőségek még élnek, amikor szükség van rájuk.' },
      { k: 'single', q: 'Lefut-e a destruktor kivétel esetén?', opts: ['Nem', 'Igen, a verem visszatekerésekor', 'Csak ha elkapod'], answer: 1, why: 'A kivétel terjedésekor minden hatókörből kilépő objektum destruktora lefut. Ezért nem szivárog el erőforrás.' },
      { k: 'single', q: 'Miért jobb az inicializáló lista a törzsbeli értékadásnál?', opts: ['Szebb', 'A mező közvetlenül kap értéket, nem előbb alapértéket, majd újat', 'Gyorsabban fordul'], answer: 1, why: 'A törzsben már létrejött a mező, és felülírod. `const` vagy referencia mezőnél ez nem is lenne lehetséges.' },
      { k: 'single', q: 'Milyen sorrendben inicializálódnak a mezők?', opts: ['Az inicializáló lista sorrendjében', 'A deklaráció sorrendjében', 'Ábécérendben'], answer: 1, why: 'Mindig a deklaráció sorrendje dönt. Ha a lista mást sugall, a fordító figyelmeztet — és ez valódi hibákat előz meg.' },
    ],
    note: {
      summary: ['A konstruktor a létrehozáskor, a destruktor a hatókör végén fut.', 'A destruktorok fordított sorrendben futnak le.', 'Kivétel esetén is lefutnak — ez a RAII legnagyobb értéke.', 'Az inicializáló lista közvetlenül adja a mezők kezdőértékét.', 'A mezők a deklaráció sorrendjében inicializálódnak, nem a listáéban.'],
      terms: [{ term: 'inicializáló lista', def: 'A konstruktor fejlécében megadott mező-kezdőértékek.' }, { term: 'verem visszatekerés', def: 'Kivétel terjedésekor a hatókörök lebontása, destruktorhívásokkal.' }, { term: 'élettartam', def: 'Az az idő, ameddig egy objektum létezik.' }],
    },
  },
  {
    day: 6,
    title: 'Másoló és mozgató szemantika',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'Amikor egy objektumot átadsz vagy visszaadsz, a C++ vagy **másol**, vagy **mozgat**. A különbség egy nagy vektornál a másodperc és az ezredmásodperc közti különbség.' },
      { k: 'code', lang: 'cpp', src: 'std::vector<int> a = {1, 2, 3};\nstd::vector<int> b = a;              // MÁSOLÁS — két külön vektor\nstd::vector<int> c = std::move(a);   // MOZGATÁS — c átveszi a tartalmát\n\n// a most üres, de érvényes állapotban van', explain: 'A mozgatás nem másol: átveszi a belső mutatót, és a régit üresen hagyja. Ezért olcsó, és ezért nem szabad a mozgatott objektumot tovább használni.' },
      { k: 'callout', tone: 'key', md: 'A visszatérő érték **automatikusan** mozog. Nyugodtan adj vissza nagy vektort függvényből — a fordító nem fog másolni. Ez az egyik legnagyobb különbség a modern és a régi C++ közt.' },
      { k: 'code', lang: 'cpp', src: 'std::vector<int> keszit() {\n    std::vector<int> v(1000000);\n    return v;            // nem másolás: mozgatás vagy közvetlen építés\n}', explain: 'Régen ilyenkor mutatót adtak vissza, hogy elkerüljék a másolást. Ma erre nincs szükség.' },
      { k: 'callout', tone: 'warn', md: 'A `std::move` **nem mozgat semmit** — csak megjelöli az objektumot mozgathatóként. A tényleges mozgatást a mozgató konstruktor végzi. És a mozgatott objektum ezután érvényes, de meghatározatlan állapotban van: ne olvasd.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a különbség a másolás és a mozgatás közt?', opts: ['Semmi', 'A mozgatás átveszi a tartalmat, nem duplikálja', 'A másolás gyorsabb'], answer: 1, why: 'A mozgatás a belső mutatót adja át, a másolás minden elemet lemásol. Nagy adatnál ez nagyságrendi különbség.' },
      { k: 'single', q: 'Mit csinál a `std::move`?', opts: ['Mozgatja az objektumot', 'Megjelöli mozgathatóként, de maga nem mozgat', 'Törli az objektumot'], answer: 1, why: 'Csak típuskonverzió. A tényleges munkát a mozgató konstruktor vagy értékadás végzi.' },
      { k: 'single', q: 'Másol-e a fordító, ha nagy vektort adsz vissza függvényből?', opts: ['Igen, mindig', 'Nem, mozgat vagy közvetlenül a helyére épít', 'Csak ha kicsi'], answer: 1, why: 'A visszatérő érték automatikusan mozog, és gyakran a fordító közvetlenül a cél helyére építi. Nyugodtan adj vissza értéket.' },
      { k: 'single', q: 'Mi a mozgatott objektum állapota?', opts: ['Használhatatlan', 'Érvényes, de meghatározatlan — ne olvasd', 'Változatlan'], answer: 1, why: 'Lehet rá értéket adni vagy megszüntetni, de a tartalmára nem támaszkodhatsz.' },
    ],
    note: {
      summary: ['A másolás duplikál, a mozgatás átveszi a tartalmat — nagy adatnál nagyságrendi különbség.', 'A `std::move` csak megjelöl; a munkát a mozgató konstruktor végzi.', 'A függvényből visszaadott érték automatikusan mozog.', 'Nyugodtan adj vissza nagy objektumot értékként.', 'A mozgatott objektum érvényes, de meghatározatlan: ne olvasd.'],
      terms: [{ term: 'mozgató szemantika', def: 'Az erőforrás átvétele másolás helyett.' }, { term: 'std::move', def: 'Megjelölés, ami lehetővé teszi a mozgatást; maga nem mozgat.' }, { term: 'visszatérési érték optimalizálás', def: 'A fordító közvetlenül a cél helyére építi a visszaadott objektumot.' }],
    },
  },
  {
    day: 7,
    title: 'Operátor-túlterhelés',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A C++-ban megmondhatod, mit jelentsen a `+` vagy a `==` a saját típusodon. Ez hatalmas kifejezőerő — és könnyen visszaélhető vele.' },
      { k: 'code', lang: 'cpp', src: 'struct Vec2 {\n    double x, y;\n\n    Vec2 operator+(const Vec2 &m) const {\n        return {x + m.x, y + m.y};\n    }\n    bool operator==(const Vec2 &m) const {\n        return x == m.x && y == m.y;\n    }\n};\n\nVec2 a{1, 2}, b{3, 4};\nVec2 c = a + b;      // {4, 6}', explain: 'A `const` a metódus után itt is azt ígéri: nem módosítom az objektumot. Operátornál ez szinte mindig igaz.' },
      { k: 'callout', tone: 'key', md: 'Az egyetlen jó szabály: **csak akkor terhelj túl operátort, ha a jelentés magától értetődő**. Két vektor összeadása igen. Két felhasználó „összeadása" nem — ott írj nevesített függvényt.' },
      { k: 'code', lang: 'cpp', src: 'std::ostream &operator<<(std::ostream &os, const Vec2 &v) {\n    return os << "(" << v.x << ", " << v.y << ")";\n}\n\nstd::cout << a << "\\n";    // (1, 2)', explain: 'A `<<` túlterhelése teszi a saját típusodat kiírhatóvá. Ez az egyik leghasznosabb túlterhelés — hibakeresésnél azonnal megtérül.' },
      { k: 'callout', tone: 'warn', md: 'Lebegőpontos számok `==`-összehasonlítása csalóka: a `0.1 + 0.2` nem pontosan `0.3`. Valódi kódban tűréssel hasonlíts: `std::abs(a - b) < 1e-9`.' },
    ],
    quiz: [
      { k: 'single', q: 'Mikor érdemes operátort túlterhelni?', opts: ['Mindig, ha lehet', 'Ha a jelentés magától értetődő', 'Soha'], answer: 1, why: 'Két vektor összeadása egyértelmű. Ha magyarázni kell, mit jelent a `+`, akkor nevesített függvény kell helyette.' },
      { k: 'single', q: 'Mire jó a `<<` túlterhelése?', opts: ['Bitléptetésre', 'Hogy a saját típusodat ki lehessen írni cout-tal', 'Összehasonlításra'], answer: 1, why: 'Hibakeresésnél azonnal megtérül: a saját típusod ugyanúgy kiírható lesz, mint bármelyik beépített.' },
      { k: 'single', q: 'Miért csalóka a lebegőpontos `==`?', opts: ['Lassú', 'Mert a kerekítés miatt két elvileg egyenlő érték eltérhet', 'Nem fordul le'], answer: 1, why: 'A `0.1 + 0.2` nem pontosan `0.3` kettes számrendszerben. Tűréssel kell összehasonlítani.' },
      { k: 'single', q: 'Mit ígér a `const` az operátor metódus után?', opts: ['Gyors', 'Nem módosítja az objektumot', 'Nem dob kivételt'], answer: 1, why: 'Ugyanaz, mint bármely metódusnál: a fordító ellenőrzi, hogy a metódus nem ír mezőt.' },
    ],
    note: {
      summary: ['Saját típuson megadhatod, mit jelentsen a `+`, `==`, `<<` és társaik.', 'Csak akkor terhelj túl, ha a jelentés magától értetődő.', 'A `<<` túlterhelése teszi a típusodat kiírhatóvá — hibakeresésnél felbecsülhetetlen.', 'Operátor metódusnál tedd ki a `const`-ot.', 'Lebegőpontos értéket tűréssel hasonlíts, ne `==`-szel.'],
      terms: [{ term: 'operátor-túlterhelés', def: 'Beépített operátor jelentésének megadása saját típusra.' }, { term: 'stream operátor', def: 'A `<<` túlterhelése kiíráshoz.' }, { term: 'lebegőpontos tűrés', def: 'Közelítő összehasonlítás egy kis megengedett eltéréssel.' }],
    },
  },
  {
    day: 8,
    title: 'Öröklődés és virtuális metódusok',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'A C++ öröklődése hasonlít a Javáéra, egy lényeges különbséggel: itt **meg kell mondanod**, hogy egy metódus felülírható legyen.' },
      { k: 'code', lang: 'cpp', src: 'class Robot {\npublic:\n    virtual void mozog() const { std::cout << "mozog\\n"; }\n    virtual ~Robot() = default;      // FONTOS\n};\n\nclass Rover : public Robot {\npublic:\n    void mozog() const override { std::cout << "gurul\\n"; }\n};', explain: 'A `virtual` teszi felülírhatóvá, az `override` pedig ellenőrizteti a fordítóval, hogy tényleg felülírsz valamit — elgépelésnél hibát kapsz.' },
      { k: 'callout', tone: 'warn', md: 'Ha egy osztálynak van `virtual` metódusa, a **destruktora is legyen virtuális**. Enélkül a `delete` egy ősosztály-mutatón át nem hívja meg a leszármazott destruktorát, és szivárog az erőforrás.' },
      { k: 'code', lang: 'cpp', src: 'std::vector<std::unique_ptr<Robot>> flotta;\nflotta.push_back(std::make_unique<Rover>());\n\nfor (const auto &r : flotta) r->mozog();    // "gurul"', explain: 'A polimorfizmus **mutatón vagy referencián át** működik. Értékként tárolva levágódna a leszármazott rész.' },
      { k: 'callout', tone: 'key', md: 'Ez az **object slicing**: ha `Robot r = rover;` formában másolsz, csak az ősosztály-rész marad meg, a többi elvész. Ezért tárolunk polimorf objektumot mindig mutatóval.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit jelent a `virtual`?', opts: ['Az osztály absztrakt', 'A metódus felülírható a leszármazottban', 'A metódus privát'], answer: 1, why: 'A C++-ban alapból nem felülírható egy metódus. A `virtual` kapcsolja be a futásidejű feloldást.' },
      { k: 'single', q: 'Miért kell virtuális destruktor?', opts: ['Gyorsabb', 'Hogy ősosztály-mutatón át törölve a leszármazott destruktora is lefusson', 'Mert kötelező'], answer: 1, why: 'Enélkül csak az ősosztály destruktora fut, és a leszármazott erőforrásai elszivárognak.' },
      { k: 'single', q: 'Mi az object slicing?', opts: ['A memória felosztása', 'Értékként másoláskor a leszármazott rész elveszik', 'Egy optimalizálás'], answer: 1, why: 'Az ősosztály típusú változóba csak az ősosztály-rész fér bele. Ezért tárolunk polimorf objektumot mutatóval.' },
      { k: 'single', q: 'Mire jó az `override` kulcsszó?', opts: ['Gyorsít', 'A fordító ellenőrzi, hogy tényleg felülírsz egy virtuális metódust', 'Kötelezővé teszi a felülírást'], answer: 1, why: 'Elgépelt névnél vagy eltérő szignatúránál fordítási hibát kapsz, nem pedig egy csendben új metódust.' },
    ],
    note: {
      summary: ['A C++-ban a metódus alapból nem felülírható; a `virtual` kapcsolja be.', 'Az `override` ellenőrizteti a fordítóval, hogy tényleg felülírsz.', 'Virtuális metódusú osztálynak virtuális destruktora is legyen.', 'A polimorfizmus mutatón vagy referencián át működik.', 'Object slicing: értékként másolva a leszármazott rész elveszik.'],
      terms: [{ term: 'virtual', def: 'Kulcsszó, ami futásidőben feloldhatóvá teszi a metódushívást.' }, { term: 'override', def: 'Jelölés, amit a fordító ellenőriz felülíráskor.' }, { term: 'object slicing', def: 'A leszármazott rész elvesztése érték szerinti másoláskor.' }],
    },
  },
  {
    day: 9,
    title: 'Absztrakt osztály',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'Az **absztrakt osztály** olyan, amiből nem lehet példányt készíteni: szerződést ír le, amit a leszármazottaknak teljesíteniük kell.' },
      { k: 'code', lang: 'cpp', src: 'class Szenzor {\npublic:\n    virtual double olvas() const = 0;    // tisztán virtuális\n    virtual ~Szenzor() = default;\n};\n\nclass Ultrahang : public Szenzor {\npublic:\n    double olvas() const override { return 12.5; }\n};', explain: 'A `= 0` teszi tisztán virtuálissá. Attól lesz az osztály absztrakt, hogy legalább egy ilyen metódusa van.' },
      { k: 'callout', tone: 'key', md: 'Az absztrakt osztály a **szerződés**: aki ebből származik, kötelezően tud `olvas()`-ni. A többi kód innentől bármilyen szenzorral működik, anélkül hogy ismerné a konkrét típusokat.' },
      { k: 'code', lang: 'cpp', src: 'double atlag(const std::vector<std::unique_ptr<Szenzor>> &szenzorok) {\n    double osszeg = 0;\n    for (const auto &sz : szenzorok) osszeg += sz->olvas();\n    return szenzorok.empty() ? 0 : osszeg / szenzorok.size();\n}', explain: 'Ez a függvény sosem fog változni attól, hogy új szenzortípust vezetsz be. Ez a polimorfizmus valódi haszna.' },
      { k: 'callout', tone: 'tip', md: 'Ha egy absztrakt osztálynak csak tisztán virtuális metódusai vannak és nincs állapota, azt más nyelvekben interfésznek hívják. A C++-ban nincs külön kulcsszó rá — ugyanaz az eszköz.' },
    ],
    quiz: [
      { k: 'single', q: 'Mitől lesz egy osztály absztrakt?', opts: ['Az `abstract` kulcsszótól', 'Attól, hogy van legalább egy tisztán virtuális metódusa', 'Attól, hogy nincs konstruktora'], answer: 1, why: 'A `= 0` jelöli a tisztán virtuális metódust. Egy ilyen is elég ahhoz, hogy az osztályból ne lehessen példányt készíteni.' },
      { k: 'single', q: 'Mi a tisztán virtuális metódus jelölése?', opts: ['virtual void f();', 'virtual void f() = 0;', 'abstract void f();'], answer: 1, why: 'A `= 0` azt mondja: nincs megvalósítása, a leszármazottnak kell megadnia.' },
      { k: 'single', q: 'Mi az absztrakt osztály haszna?', opts: ['Gyorsabb kód', 'Szerződést ír le, így a használó kód független a konkrét típusoktól', 'Kevesebb memória'], answer: 1, why: 'Új szenzortípus bevezetésekor a feldolgozó kódhoz hozzá sem kell nyúlni.' },
      { k: 'single', q: 'Van-e külön `interface` kulcsszó a C++-ban?', opts: ['Igen', 'Nincs: állapot nélküli, tisztán virtuális osztály tölti be a szerepét', 'Csak újabb szabványban'], answer: 1, why: 'Ami más nyelvekben interfész, az itt egy absztrakt osztály mezők nélkül.' },
    ],
    note: {
      summary: ['Tisztán virtuális metódus: `virtual void f() = 0;`.', 'Egy tisztán virtuális metódus elég ahhoz, hogy az osztály absztrakt legyen.', 'Absztrakt osztályból nem lehet példányt készíteni.', 'A szerződés leírása teszi a használó kódot függetlenné a konkrét típusoktól.', 'A C++-ban nincs `interface` kulcsszó: állapot nélküli absztrakt osztály tölti be.'],
      terms: [{ term: 'tisztán virtuális metódus', def: 'Megvalósítás nélküli virtuális metódus, `= 0` jelöléssel.' }, { term: 'absztrakt osztály', def: 'Osztály, amiből nem lehet példányt készíteni.' }, { term: 'interfész', def: 'Állapot nélküli, csak szerződést leíró absztrakt osztály.' }],
    },
  },
  {
    day: 10,
    title: 'Okos mutatók',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'A `new` és a `delete` ugyanazt a bajt hozza, mint a C `malloc`/`free` párosa: el lehet felejteni. Az **okos mutató** ezt megoldja — a RAII alkalmazása a dinamikus memóriára.' },
      { k: 'code', lang: 'cpp', src: '#include <memory>\n\n{\n    auto r = std::make_unique<Rover>("Mk-I");\n    r->halad(30);\n}   // itt automatikusan törlődik — nincs delete', explain: 'A `unique_ptr` kizárólagos tulajdonos: pontosan egy van belőle, és a hatókör végén felszabadítja, amire mutat.' },
      { k: 'text', md: 'A három eszköz:\n\n- **`unique_ptr`** — egy tulajdonos. Ez az alapértelmezés.\n- **`shared_ptr`** — több tulajdonos, számlálóval. Az utolsó szabadítja fel.\n- **`weak_ptr`** — nem tulajdonol, csak megfigyel. Körkörös hivatkozás megtörésére.' },
      { k: 'callout', tone: 'key', md: 'Modern C++-ban `new`-t és `delete`-et szinte soha nem írsz. `make_unique` vagy `make_shared` — és a felszabadítás magától megtörténik, akkor is, ha kivétel repül át a kódon.' },
      { k: 'callout', tone: 'warn', md: 'A `shared_ptr` nem ingyen van: számlálót tart karban, és a kölcsönös hivatkozás (`A` tartja `B`-t, `B` tartja `A`-t) megakadályozza a felszabadítást. Ilyenkor az egyik irány legyen `weak_ptr`.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a `unique_ptr`?', opts: ['Egy sima mutató', 'Kizárólagos tulajdonos, ami a hatókör végén felszabadít', 'Egy másolat'], answer: 1, why: 'Pontosan egy tulajdonosa van, és a destruktora törli a mutatott objektumot. Nem kell `delete`.' },
      { k: 'single', q: 'Mikor használj `shared_ptr`-t?', opts: ['Mindig', 'Ha több helynek is tulajdonosnak kell lennie', 'Soha'], answer: 1, why: 'A megosztott tulajdon számlálót igényel, ami költség. Ha egy tulajdonos elég, a `unique_ptr` jobb.' },
      { k: 'single', q: 'Mi a baj a kölcsönös `shared_ptr` hivatkozással?', opts: ['Lassú', 'A számláló sosem éri el a nullát, ezért nem szabadul fel', 'Nem fordul le'], answer: 1, why: 'Mindkettő tartja a másikat életben. A kör megtöréséhez az egyik irányt `weak_ptr`-ré kell tenni.' },
      { k: 'single', q: 'Mennyi `delete`-et írsz modern C++-ban?', opts: ['Minden new-hoz egyet', 'Szinte soha egyet sem', 'Kettőt'], answer: 1, why: 'A `make_unique` és a `make_shared` kezeli. A kézi `new`/`delete` ma kódszag.' },
    ],
    note: {
      summary: ['Az okos mutató a RAII alkalmazása a dinamikus memóriára.', '`unique_ptr`: egy tulajdonos, automatikus felszabadítás — ez az alapértelmezés.', '`shared_ptr`: több tulajdonos, számlálóval; az utolsó szabadít fel.', '`weak_ptr`: megfigyel, de nem tulajdonol; körkörös hivatkozás megtörésére.', 'Modern C++-ban `new` és `delete` helyett `make_unique` és `make_shared`.', 'Kölcsönös `shared_ptr` hivatkozás megakadályozza a felszabadítást.'],
      terms: [{ term: 'okos mutató', def: 'Objektum, ami a mutatott memória élettartamát kezeli.' }, { term: 'unique_ptr', def: 'Kizárólagos tulajdonú okos mutató.' }, { term: 'weak_ptr', def: 'Nem tulajdonló megfigyelő, körkörös hivatkozás ellen.' }],
    },
  },
];
