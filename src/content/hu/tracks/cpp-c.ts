import type { Day } from '../../types';

/** C++ trek, 11–17. nap. */
export const cppHuC: Day[] = [
  {
    day: 11,
    title: 'Sablonok (template)',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'A sablon olyan kód, ami **típusokra általánosít**. Egyszer írod meg, és a fordító minden használt típusra legenerálja a megfelelő változatot.' },
      { k: 'code', lang: 'cpp', src: 'template <typename T>\nT nagyobb(const T& a, const T& b) {\n    return (a > b) ? a : b;\n}\n\nint main() {\n    nagyobb(3, 7);            // T = int\n    nagyobb(2.5, 1.5);        // T = double\n    nagyobb<std::string>("a", "b");\n}', explain: 'A típust a fordító kikövetkezteti a paraméterekből. Ha nem egyértelmű, megadhatod kézzel a kacsacsőrök közt.' },
      { k: 'callout', tone: 'key', md: 'A sablon **fordítási időben** fejtődik ki. Nincs futásidejű költsége: a generált kód ugyanolyan gyors, mintha kézzel írtad volna az `int` változatot. Ez a C++ fő előnye a futásidejű általánosítással szemben.' },
      { k: 'code', lang: 'cpp', src: 'template <typename T>\nclass Verem {\n    std::vector<T> elemek;\npublic:\n    void betesz(T ertek) { elemek.push_back(std::move(ertek)); }\n    T kivesz() {\n        T v = std::move(elemek.back());\n        elemek.pop_back();\n        return v;\n    }\n    bool ures() const { return elemek.empty(); }\n};', explain: 'Osztálysablon. A `Verem<int>` és a `Verem<std::string>` két külön, teljesen különálló osztály lesz a lefordított programban.' },
      { k: 'callout', tone: 'warn', md: 'A sablon kódja jellemzően **a fejlécben** marad, nem `.cpp` fájlban: a fordítónak látnia kell a teljes törzset ahhoz, hogy kifejtse. Ez az oka a hosszú fordítási időknek a sablonnehéz kódban.' },
      { k: 'callout', tone: 'tip', md: 'A sablonhibák üzenetei hírhedten hosszúak. Olvasd **alulról felfelé**: az utolsó sorokban van a tényleges ok, a fölötte lévő tucatnyi sor csak a kifejtési útvonal.' },
    ],
    quiz: [
      { k: 'single', q: 'Mikor fejtődik ki egy sablon?', opts: ['Futásidőben', 'Fordítási időben', 'Linkeléskor'], answer: 1, why: 'A fordító minden használt típusra külön kódot generál. Ezért nincs futásidejű költsége.' },
      { k: 'single', q: 'Miért marad a sablon kódja a fejlécben?', opts: ['Hagyomány', 'Mert a fordítónak látnia kell a teljes törzset a kifejtéshez', 'Mert rövidebb'], answer: 1, why: 'Kifejtéskor a teljes definíció kell. Ezért nehéz a sablonkódot külön fordítási egységbe tenni.' },
      { k: 'single', q: 'Mi a `Verem<int>` és a `Verem<std::string>` viszonya?', opts: ['Ugyanaz az osztály', 'Két külön, önálló osztály a lefordított programban', 'Örökölnek egymásból'], answer: 1, why: 'Minden kifejtés külön típus. Ezért nő a bináris mérete sok kifejtésnél.' },
      { k: 'single', q: 'Hogyan olvasd a hosszú sablonhibát?', opts: ['Felülről', 'Alulról felfelé: az utolsó sorokban van a tényleges ok', 'Középről'], answer: 1, why: 'A fölső sorok a kifejtési útvonalat sorolják. A valódi hiba a lánc végén van.' },
      { k: 'single', q: 'Mi a sablon fő előnye a futásidejű általánosítással szemben?', opts: ['Rövidebb kód', 'Nincs futásidejű költsége: a generált kód olyan gyors, mint a kézzel írt', 'Kisebb bináris'], answer: 1, why: 'Nincs virtuális hívás vagy típusvizsgálat futásidőben; mindent a fordító old meg.' },
    ],
    note: {
      summary: ['A sablon típusokra általánosít, fordítási időben kifejtve.', 'A típust a fordító kikövetkezteti a paraméterekből.', 'Nincs futásidejű költsége: olyan gyors, mint a kézzel írt változat.', 'Minden kifejtés külön típus a lefordított programban.', 'A sablonkód a fejlécben marad, mert a törzs kell a kifejtéshez.', 'A hibaüzenetet alulról felfelé olvasd.'],
      terms: [{ term: 'sablon', def: 'Típusokra általánosító kód, fordítási időben kifejtve.' }, { term: 'kifejtés (instantiation)', def: 'A fordító által egy konkrét típusra generált változat.' }, { term: 'típuskikövetkeztetés', def: 'A fordító a paraméterekből állapítja meg a típust.' }],
    },
  },
  {
    day: 12,
    title: 'STL konténerek',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'A standard könyvtár kész tárolókat ad. Nem kell láncolt listát írni — a feladatod az, hogy **a megfelelőt válaszd**.' },
      { k: 'text', md: '- **`vector`** — bővíthető tömb. Ez a jó választás a legtöbb esetben.\n- **`array`** — fix méretű tömb, méret a típusban\n- **`map`** — rendezett kulcs–érték, fa alapon, `O(log n)`\n- **`unordered_map`** — hasított kulcs–érték, átlagban `O(1)`\n- **`set` / `unordered_set`** — halmaz, ismétlés nélkül\n- **`deque`** — két végén gyorsan bővíthető' },
      { k: 'code', lang: 'cpp', src: '#include <vector>\n#include <unordered_map>\n\nstd::vector<int> szamok{3, 1, 4, 1, 5};\nszamok.push_back(9);\nszamok.reserve(100);            // előre foglal, elkerüli az átmásolást\n\nstd::unordered_map<std::string, int> akkuk;\nakkuk["Rover-1"] = 87;\nif (auto it = akkuk.find("Rover-2"); it != akkuk.end()) {\n    std::cout << it->second;\n}', explain: 'A `find` + `end()` összehasonlítás a biztonságos keresés. A `akkuk["Rover-2"]` ezzel szemben **létrehozná** a hiányzó kulcsot nullával — ez gyakori hibaforrás.' },
      { k: 'callout', tone: 'key', md: 'Alapértelmezésben mindig **`vector`**. Összefüggő memória, tökéletes gyorsítótár-viselkedés. A láncolt lista elméletben gyorsabb beszúrásnál, a gyakorlatban szinte mindig lassabb, mert minden elem máshol van a memóriában.' },
      { k: 'callout', tone: 'warn', md: 'A `vector` **érvényteleníti az iterátorait**, amikor növekszik és új helyre másol. Ha ciklusban szúrsz be, az iterátorod a ciklus közepén elavulhat. Ezért van a `reserve`: ha előre tudod a méretet, nincs átmásolás.' },
      { k: 'text', md: 'Mikor `map` és mikor `unordered_map`? Ha **rendezett bejárás** kell, vagy a kulcsokat sorrendben akarod, `map`. Ha csak gyors keresés kell, `unordered_map`. Nagy adatnál az utóbbi érezhetően gyorsabb.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi az alapértelmezett konténer?', opts: ['list', 'vector', 'deque'], answer: 1, why: 'Összefüggő memória és jó gyorsítótár-viselkedés. A láncolt lista a gyakorlatban szinte mindig lassabb.' },
      { k: 'single', q: 'Mi történik a `map["hianyzo"]` kifejezéssel?', opts: ['Hibát ad', 'Létrehozza a kulcsot alapértelmezett értékkel', 'Visszaad nullptr-t'], answer: 1, why: 'Ez gyakori hibaforrás. Olvasáshoz `find` vagy `at` kell, nem a szögletes zárójel.' },
      { k: 'single', q: 'Mikor érvénytelenednek a `vector` iterátorai?', opts: ['Soha', 'Amikor a vector növekszik és új helyre másol', 'Minden olvasásnál'], answer: 1, why: 'Az átmásolás új címre teszi az elemeket. A `reserve` előre foglal, és ezzel elkerülhető.' },
      { k: 'single', q: 'Mikor válassz `map`-et `unordered_map` helyett?', opts: ['Ha rendezett bejárás kell', 'Ha gyorsabb keresés kell', 'Mindig'], answer: 0, why: 'A `map` fa alapú, ezért rendezett. Az `unordered_map` hasít: átlagban gyorsabb, de a sorrend tetszőleges.' },
      { k: 'single', q: 'Mire való a `reserve`?', opts: ['Törli a tartalmat', 'Előre foglal helyet, elkerülve a növekedéskori átmásolást', 'Rendez'], answer: 1, why: 'Ha tudod a várható méretet, egyetlen foglalás elég, és az iterátorok sem érvénytelenednek közben.' },
    ],
    note: {
      summary: ['`vector` az alapértelmezés: összefüggő memória, jó gyorsítótár-viselkedés.', '`map` rendezett `O(log n)`, `unordered_map` hasított átlagban `O(1)`.', 'A `map[kulcs]` létrehozza a hiányzó kulcsot; olvasáshoz `find` vagy `at`.', 'A `vector` növekedéskor érvényteleníti az iterátorait.', '`reserve` előre foglal, és elkerüli az átmásolást.', 'Rendezett bejáráshoz `map`, gyors kereséshez `unordered_map`.'],
      terms: [{ term: 'vector', def: 'Összefüggő memóriájú bővíthető tömb.' }, { term: 'iterátor-érvénytelenítés', def: 'A konténer módosítása használhatatlanná teheti a meglévő iterátorokat.' }, { term: 'reserve', def: 'Előzetes helyfoglalás a vector számára.' }],
    },
  },
  {
    day: 13,
    title: 'Iterátorok',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Az **iterátor** a konténerek közös nyelve: általánosított mutató, ami tud lépni és dereferálni. Ettől működik ugyanaz az algoritmus `vector`-on és `map`-en is.' },
      { k: 'code', lang: 'cpp', src: 'std::vector<int> v{3, 1, 4};\n\nfor (auto it = v.begin(); it != v.end(); ++it) {\n    std::cout << *it << " ";\n}\n\nfor (const auto& x : v) {       // ugyanaz, olvashatóbban\n    std::cout << x << " ";\n}', explain: 'A `begin()` az elsőre mutat, az `end()` az **utolsó utánra** — nem egy elemre. Ezért a `!=` és nem a `<` a helyes feltétel: minden konténerre működik.' },
      { k: 'callout', tone: 'key', md: 'Az `end()` nem elem, hanem **határjelző**. Dereferálni meghatározatlan viselkedés. Ettől lesz egységes a félig nyitott `[begin, end)` tartomány: az üres konténerre `begin() == end()`, és a méret pontosan `end() - begin()`.' },
      { k: 'text', md: 'A gyakorlatban a tartomány alapú `for` ciklust használd. Explicit iterátor akkor kell, amikor:\n\n- **törölsz** menet közben (`it = v.erase(it)`)\n- **visszafelé** haladsz (`rbegin()`, `rend()`)\n- **két tartományt** lépkedsz egyszerre\n- algoritmusnak adod át' },
      { k: 'callout', tone: 'warn', md: 'Ciklusban törölni csapda: az `erase` érvényteleníti az iterátort. A helyes alak `it = v.erase(it);`, mert az `erase` a **következő** érvényes iterátort adja vissza. A növelést ilyenkor hagyd el abban az ágban.' },
      { k: 'callout', tone: 'tip', md: 'A `const auto&` a jó alapértelmezés tartomány alapú ciklusban: nem másol, és nem is enged módosítani. Módosításhoz `auto&`, és csak akkor írj `auto`-t önmagában, ha tényleg másolatot akarsz.' },
    ],
    quiz: [
      { k: 'single', q: 'Mire mutat az `end()`?', opts: ['Az utolsó elemre', 'Az utolsó utáni helyre: határjelző', 'A konténer méretére'], answer: 1, why: 'Nem elem, hanem határ. Dereferálni meghatározatlan viselkedés.' },
      { k: 'single', q: 'Miért `!=` a ciklusfeltétel, nem `<`?', opts: ['Gyorsabb', 'Mert minden iterátortípusra működik, nem csak a véletlen elérésűre', 'Szokás'], answer: 1, why: 'A `map` iterátorán nincs `<` operátor. A `!=` minden konténerrel működik.' },
      { k: 'single', q: 'Hogyan törölsz helyesen ciklusban?', opts: ['`v.erase(it); ++it;`', '`it = v.erase(it);`', '`delete it;`'], answer: 1, why: 'Az `erase` érvényteleníti a régi iterátort, és visszaadja a következő érvényeset.' },
      { k: 'single', q: 'Mi a jó alapértelmezés tartomány alapú ciklusban?', opts: ['`auto`', '`const auto&`', '`auto*`'], answer: 1, why: 'Nem másol és nem enged módosítani. Módosításhoz `auto&`, másoláshoz `auto`.' },
      { k: 'single', q: 'Mit jelent a félig nyitott `[begin, end)` tartomány?', opts: ['A begin benne van, az end nincs', 'Mindkettő benne van', 'Egyik sincs benne'], answer: 0, why: 'Ettől lesz üres konténerre `begin() == end()`, és a méret pontosan a két iterátor különbsége.' },
    ],
    note: {
      summary: ['Az iterátor általánosított mutató: a konténerek közös nyelve.', '`begin()` az első elem, `end()` az utolsó utáni határjelző.', 'A félig nyitott `[begin, end)` tartomány adja az egységes kezelést.', 'Ciklusfeltétel `!=`, mert minden iterátortípusra működik.', 'Törlés ciklusban: `it = v.erase(it);`.', 'Tartomány alapú ciklusban `const auto&` a jó alapértelmezés.'],
      terms: [{ term: 'iterátor', def: 'Általánosított mutató konténerelemekre.' }, { term: 'félig nyitott tartomány', def: '`[begin, end)`: a kezdet benne, a vég nincs.' }, { term: 'tartomány alapú for', def: 'A `for (auto& x : v)` alakú ciklus.' }],
    },
  },
  {
    day: 14,
    title: 'Algoritmusok: sort, find, transform',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'Az `<algorithm>` fejléc száznál több kész algoritmust ad. A szabály egyszerű: **ne írj kézzel ciklust olyasmire, amire van algoritmus**. Rövidebb, kevesebb hibalehetőség, és sokszor gyorsabb is.' },
      { k: 'code', lang: 'cpp', src: '#include <algorithm>\n#include <numeric>\n\nstd::vector<int> v{5, 2, 8, 1};\n\nstd::sort(v.begin(), v.end());                 // 1 2 5 8\n\nauto it = std::find(v.begin(), v.end(), 8);\nif (it != v.end()) { /* megvan */ }\n\nint osszeg = std::accumulate(v.begin(), v.end(), 0);\n\nstd::vector<int> negyzetek(v.size());\nstd::transform(v.begin(), v.end(), negyzetek.begin(),\n               [](int x) { return x * x; });', explain: 'Minden algoritmus iterátorpárt vesz, nem konténert. Ezért működnek részletekre is: `std::sort(v.begin(), v.begin() + 3)` csak az első hármat rendezi.' },
      { k: 'callout', tone: 'key', md: 'A leggyakrabban használtak: `sort`, `find`, `find_if`, `count`, `any_of`, `all_of`, `transform`, `copy_if`, `accumulate`, `min_element`, `max_element`. Ez a tucat lefedi a mindennapi munka nagy részét.' },
      { k: 'code', lang: 'cpp', src: '/* Rendezés saját szabály szerint */\nstd::sort(roverek.begin(), roverek.end(),\n          [](const Rover& a, const Rover& b) {\n              return a.akku() > b.akku();     // csökkenő\n          });\n\n/* Szűrés */\nstd::vector<Rover> gyengek;\nstd::copy_if(roverek.begin(), roverek.end(),\n             std::back_inserter(gyengek),\n             [](const Rover& r) { return r.akku() < 20; });', explain: 'A `back_inserter` minden elemet `push_back`-kel ad hozzá, tehát a cél konténernek nem kell előre akkorának lennie.' },
      { k: 'callout', tone: 'warn', md: 'Az **összehasonlító szabálynak szigorú gyengerendezésnek kell lennie**: ha `a < b` igaz, `b < a` legyen hamis, és `a < a` mindig hamis. Egy `<=` használata itt futásidejű összeomlást okozhat, mert a rendező algoritmus kiszalad a tömbből.' },
      { k: 'callout', tone: 'tip', md: 'C++20-tól van tartomány változat: `std::ranges::sort(v)` — nem kell a két iterátort kiírni. Ha a fordítód tudja, használd, mert sokkal olvashatóbb.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit vesznek paraméterül az STL algoritmusok?', opts: ['Konténert', 'Iterátorpárt', 'Mutatót'], answer: 1, why: 'Ezért működnek részletekre is, és ezért függetlenek a konténer típusától.' },
      { k: 'single', q: 'Mit ad vissza a `std::find`, ha nem talál?', opts: ['nullptr', 'Az `end()` iterátort', 'Kivételt dob'], answer: 1, why: 'Mindig hasonlítsd `end()`-hez, mielőtt dereferálnád.' },
      { k: 'single', q: 'Mire való a `back_inserter`?', opts: ['Rendezésre', 'Hogy az algoritmus `push_back`-kel adjon hozzá, így a cél nem kell előre akkora legyen', 'Törlésre'], answer: 1, why: 'Enélkül a `copy_if` már létező helyekre írna, és a cél konténert előre méretezni kellene.' },
      { k: 'single', q: 'Miért nem használhatsz `<=`-t összehasonlító szabályként?', opts: ['Lassú', 'Mert nem szigorú gyengerendezés, és a rendező kiszaladhat a tömbből', 'Nem fordul le'], answer: 1, why: 'Az `a < a` ekkor igaz lenne, és erre a `std::sort` nem készül fel. Az eredmény összeomlás lehet.' },
      { k: 'single', q: 'Mi a `std::ranges::sort(v)` előnye?', opts: ['Gyorsabb', 'Nem kell a két iterátort kiírni, olvashatóbb', 'Többet tud rendezni'], answer: 1, why: 'C++20 tartományváltozat. Ugyanaz az algoritmus, kevesebb zajjal.' },
    ],
    note: {
      summary: ['Ne írj kézzel ciklust olyasmire, amire van algoritmus.', 'Minden algoritmus iterátorpárt vesz, nem konténert.', 'A `find` `end()`-et ad vissza, ha nem talál.', 'Saját rendezési szabály lambdával adható át.', 'A szabály legyen szigorú gyengerendezés: `<`, soha nem `<=`.', '`back_inserter` nélkül a cél konténert előre méretezni kell.', 'C++20: `std::ranges::sort(v)`.'],
      terms: [{ term: 'szigorú gyengerendezés', def: 'Az összehasonlítóval szemben támasztott követelmény; `a < a` mindig hamis.' }, { term: 'back_inserter', def: 'Iterátor, ami `push_back`-kel ad hozzá a célhoz.' }, { term: 'tartomány (ranges)', def: 'C++20 változat, ami a teljes konténert veszi.' }],
    },
  },
  {
    day: 15,
    title: 'Lambda kifejezések',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A lambda **helyben megírt névtelen függvény**. Akkor használd, ha egy függvényre csak egy helyen van szükség — tipikusan algoritmusok paramétereként.' },
      { k: 'code', lang: 'cpp', src: 'auto duplaz = [](int x) { return x * 2; };\nstd::cout << duplaz(21);        // 42\n\n/* Teljes alak:\n   [elkapás](paraméterek) -> visszatérés { törzs } */\nauto oszt = [](int a, int b) -> double {\n    return static_cast<double>(a) / b;\n};', explain: 'A visszatérési típust a fordító általában kikövetkezteti; csak akkor írd ki, ha több `return` van különböző típussal, vagy pontosítani akarsz.' },
      { k: 'callout', tone: 'key', md: 'A szögletes zárójel az **elkapási lista**: megmondja, mit lát a lambda a környezetéből.\n\n- `[]` — semmit\n- `[x]` — `x` másolatát\n- `[&x]` — `x`-et hivatkozásként\n- `[=]` — mindent másolatként\n- `[&]` — mindent hivatkozásként\n- `[this]` — az aktuális objektumot' },
      { k: 'code', lang: 'cpp', src: 'int kuszob = 20;\nauto gyenge = [kuszob](const Rover& r) {     // másolat\n    return r.akku() < kuszob;\n};\n\nint szamlalo = 0;\nstd::for_each(v.begin(), v.end(), [&szamlalo](int) {\n    ++szamlalo;                               // hivatkozás: kívül is látszik\n});', explain: 'Másolattal a lambda független marad. Hivatkozással módosíthatja a külső változót — de csak addig, amíg az él.' },
      { k: 'callout', tone: 'warn', md: 'A `[&]` **veszélyes, ha a lambda túléli a hatókört**: a hivatkozás lógóvá válik, és a hívás meghatározatlan viselkedés. Ha a lambdát eltárolod vagy visszaadod, elkapj másolattal.' },
      { k: 'callout', tone: 'tip', md: 'Írd ki, mit kapsz el, ne használd a `[=]` vagy `[&]` alakot. Az explicit `[kuszob]` elolvasásakor azonnal látszik a függés — és a fordító szól, ha elírtad.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a lambda?', opts: ['Egy sablon', 'Helyben megírt névtelen függvény', 'Egy konténer'], answer: 1, why: 'Akkor hasznos, ha egy függvényre csak egy helyen van szükség, például algoritmus paramétereként.' },
      { k: 'single', q: 'Mit jelent a `[&x]` elkapás?', opts: ['`x` másolatát', '`x`-et hivatkozásként: a lambda módosíthatja a külső változót', 'Semmit'], answer: 1, why: 'A hivatkozás a külső változóra mutat. Módosítás kívül is látszik — de csak amíg az eredeti él.' },
      { k: 'single', q: 'Mikor veszélyes a `[&]` elkapás?', opts: ['Soha', 'Ha a lambda túléli a hatókört: a hivatkozás lógóvá válik', 'Rövid lambdákban'], answer: 1, why: 'A tárolt vagy visszaadott lambda már megszűnt változókra hivatkozna. Ilyenkor másolattal kell elkapni.' },
      { k: 'single', q: 'Miért jobb kiírni az elkapott neveket a `[=]`-nél?', opts: ['Gyorsabb', 'Látszik a függés, és a fordító szól elírásnál', 'Rövidebb'], answer: 1, why: 'Az explicit lista dokumentál. A `[=]` elrejti, hogy a lambda mitől függ.' },
      { k: 'single', q: 'Mikor kell kiírni a lambda visszatérési típusát?', opts: ['Mindig', 'Ha több `return` van különböző típussal, vagy pontosítani akarsz', 'Soha'], answer: 1, why: 'Egyébként a fordító kikövetkezteti. Kiírni akkor érdemes, ha a kikövetkeztetés nem az, amit szeretnél.' },
    ],
    note: {
      summary: ['A lambda helyben megírt névtelen függvény.', 'Alak: `[elkapás](paraméterek) -> típus { törzs }`.', 'Elkapás: `[x]` másolat, `[&x]` hivatkozás, `[=]`/`[&]` minden.', 'A `[&]` lógó hivatkozást ad, ha a lambda túléli a hatókört.', 'Írd ki, mit kapsz el: dokumentál és ellenőrizhető.', 'A visszatérési típust a fordító általában kikövetkezteti.'],
      terms: [{ term: 'lambda', def: 'Helyben definiált névtelen függvényobjektum.' }, { term: 'elkapási lista', def: 'A szögletes zárójel tartalma: mit lát a lambda kívülről.' }, { term: 'lógó hivatkozás', def: 'Megszűnt változóra mutató hivatkozás.' }],
    },
  },
  {
    day: 16,
    title: 'auto és típuskikövetkeztetés',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'Az `auto` megkéri a fordítót, hogy a kezdőértékből állapítsa meg a típust. Nem dinamikus típus: a típus továbbra is fordítási időben dől el, és utána nem változhat.' },
      { k: 'code', lang: 'cpp', src: 'auto n = 42;                       // int\nauto d = 3.14;                     // double\nauto s = std::string{"hello"};     // std::string\n\nstd::map<std::string, std::vector<int>> m;\nfor (const auto& [kulcs, lista] : m) {   // strukturált kötés\n    std::cout << kulcs << ": " << lista.size() << "\\n";\n}', explain: 'Az `auto` nélkül az iterátor típusa `std::map<std::string, std::vector<int>>::const_iterator` lenne. A strukturált kötés (C++17) ráadásul szét is szedi a párt kulcsra és értékre.' },
      { k: 'callout', tone: 'key', md: 'Mikor használd? Ha a típus **a jobb oldalról nyilvánvaló**, vagy ha kiírni fájdalmasan hosszú lenne: iterátorok, lambdák, sablonkifejezések. Ha viszont a típus fontos információ az olvasónak, írd ki.' },
      { k: 'callout', tone: 'warn', md: 'Az `auto` **eldobja a hivatkozást és a const-ot**. Az `auto x = v[0];` másolatot készít akkor is, ha `v[0]` hivatkozás volt. Ha nem akarsz másolni, `const auto&` kell. Ez a leggyakoribb rejtett teljesítményhiba a C++-ban.' },
      { k: 'text', md: 'A gyakorlati sorrend, amin érdemes végigmenni:\n\n1. `const auto&` — olvasol, nem másolsz (alapértelmezés)\n2. `auto&` — módosítani akarsz\n3. `auto` — tényleg másolatot akarsz\n4. `auto&&` — általános sablonkódban, továbbítható hivatkozás' },
      { k: 'callout', tone: 'tip', md: 'A `const auto& [kulcs, ertek]` szerkezet végre olvashatóvá teszi a map bejárását. Ez volt a C++17 egyik legtöbbet használt újdonsága.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit jelent az `auto`?', opts: ['Dinamikus típus futásidőben', 'A fordító a kezdőértékből állapítja meg a típust, fordítási időben', 'Automatikus memóriakezelés'], answer: 1, why: 'A típus továbbra is statikus és fordítási időben dől el; csak nem neked kell leírni.' },
      { k: 'single', q: 'Mi történik az `auto x = v[0];` sorral, ha `v[0]` hivatkozás?', opts: ['Hivatkozás marad', 'Másolat készül, mert az `auto` eldobja a hivatkozást', 'Fordítási hiba'], answer: 1, why: 'Ez a leggyakoribb rejtett másolás C++-ban. `const auto&` kell, ha nem akarsz másolni.' },
      { k: 'single', q: 'Mi a jó alapértelmezés olvasáshoz?', opts: ['`auto`', '`const auto&`', '`auto&&`'], answer: 1, why: 'Nem másol és nem enged módosítani. Csak akkor térj el ettől, ha indokod van rá.' },
      { k: 'single', q: 'Mit csinál a `const auto& [kulcs, ertek]` szerkezet?', opts: ['Két változót deklarál', 'Strukturált kötés: szétszedi a párt kulcsra és értékre', 'Lambdát definiál'], answer: 1, why: 'C++17 újdonság. A map bejárása ettől lett végre olvasható.' },
      { k: 'single', q: 'Mikor NE használj `auto`-t?', opts: ['Hosszú iterátortípusoknál', 'Ha a típus fontos információ az olvasónak', 'Lambdáknál'], answer: 1, why: 'Az `auto` akkor jó, ha a típus nyilvánvaló vagy lényegtelen. Ha üzenete van, írd ki.' },
    ],
    note: {
      summary: ['Az `auto` a kezdőértékből következteti a típust, fordítási időben.', 'Használd hosszú vagy nyilvánvaló típusoknál: iterátor, lambda, sablon.', 'Az `auto` eldobja a hivatkozást és a const-ot — rejtett másolás forrása.', 'Sorrend: `const auto&`, `auto&`, `auto`, `auto&&`.', 'Strukturált kötés (C++17): `const auto& [kulcs, ertek]`.', 'Ha a típus fontos információ, írd ki.'],
      terms: [{ term: 'típuskikövetkeztetés', def: 'A fordító a kezdőértékből állapítja meg a típust.' }, { term: 'strukturált kötés', def: 'Pár vagy struktúra szétbontása több névre.' }, { term: 'rejtett másolás', def: 'Nem szándékolt másolat, amit az `auto` okoz hivatkozás helyett.' }],
    },
  },
];
