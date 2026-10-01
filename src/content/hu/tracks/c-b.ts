import type { Day } from '../../types';

/** C trek, 4–10. nap. */
export const cHuB: Day[] = [
  {
    day: 4,
    title: 'Elágazás és ciklus',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A vezérlési szerkezetek szinte azonosak a Java-félékkel. Egy fontos különbség van: a C-ben **nincs külön logikai típus** a régi szabványokban — a nulla hamis, minden más igaz.' },
      { k: 'code', lang: 'c', src: 'int tav = 8;\n\nif (tav < 10) {\n    printf("Akadály\\n");\n} else if (tav < 30) {\n    printf("Lassíts\\n");\n} else {\n    printf("Mehet\\n");\n}\n\nfor (int i = 0; i < 5; i++) printf("%d ", i);\n\nwhile (tav > 0) tav--;' },
      { k: 'callout', tone: 'warn', md: 'A klasszikus C-hiba: `if (x = 5)` az `if (x == 5)` helyett. Ez **értékadás**, aminek az eredménye 5, ami igaz — tehát a feltétel mindig teljesül, és a fordító nem feltétlenül szól. Fordíts `-Wall`-lal.' },
      { k: 'code', lang: 'c', src: 'for (int i = 0; i < 10; i++) {\n    if (i == 3) continue;\n    if (i == 6) break;\n    printf("%d ", i);\n}\n// 0 1 2 4 5', explain: 'A `break` és a `continue` ugyanúgy működik, mint Pythonban.' },
      { k: 'callout', tone: 'tip', md: 'Egysoros `if`-nél is tedd ki a kapcsos zárójelet. Enélkül egy később beszúrt második sor már nem tartozik a feltételhez — és ez a hiba évtizedek óta szedi az áldozatait.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi számít igaznak C-ben?', opts: ['Csak a true', 'Minden, ami nem nulla', 'Csak az 1'], answer: 1, why: 'A C-ben a nulla hamis, minden más érték igaz. Ezért fordul elő, hogy egy véletlen értékadás mindig igaz feltételt ad.' },
      { k: 'single', q: 'Mi a baj az `if (x = 5)` sorral?', opts: ['Nem fordul le', 'Értékadás, nem összehasonlítás, és mindig igaz lesz', 'Lassú'], answer: 1, why: 'Az `=` értéket ad, és a kifejezés értéke 5, ami nem nulla, tehát igaz. Az összehasonlítás `==`.' },
      { k: 'output', q: 'Mit ír ki?', code: 'for (int i = 0; i < 4; i++) {\n    if (i == 2) continue;\n    printf("%d", i);\n}', lang: 'c', opts: ['0123', '013', '012'], answer: 1, why: 'A `continue` kihagyja a 2-t, a többi kiíródik: 0, 1, 3.' },
      { k: 'single', q: 'Miért tegyük ki a kapcsos zárójelet egysoros if-nél is?', opts: ['Szebb', 'Mert egy később beszúrt sor már nem tartozna a feltételhez', 'Gyorsabb'], answer: 1, why: 'Zárójel nélkül csak a következő egy utasítás tartozik az if-hez. A második sor feltétel nélkül lefut — csendben.' },
    ],
    note: {
      summary: ['A nulla hamis, minden más igaz — nincs külön logikai típus a régi C-ben.', 'Az `if (x = 5)` értékadás, nem összehasonlítás, és mindig igaz.', 'A `for`, `while`, `break`, `continue` ugyanúgy működik, mint máshol.', 'Egysoros if-nél is tedd ki a kapcsos zárójelet.', 'Fordíts `-Wall`-lal: sok ilyen hibát elkap.'],
      terms: [{ term: 'igazságérték', def: 'C-ben a nulla hamis, minden más érték igaz.' }, { term: 'értékadás a feltételben', def: 'Klasszikus hiba: `=` szerepel `==` helyett.' }, { term: 'blokk', def: 'Kapcsos zárójelek közé zárt utasítássorozat.' }],
    },
  },
  {
    day: 5,
    title: 'Függvények',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A C függvény deklarálja, mit vár és mit ad vissza. Ha a fordító még nem látta a függvényt a hívás helyén, hibát vagy figyelmeztetést ad — ezért van szükség **prototípusra**.' },
      { k: 'code', lang: 'c', src: '#include <stdio.h>\n\nint osszead(int a, int b);     // prototípus\n\nint main(void) {\n    printf("%d\\n", osszead(2, 3));\n    return 0;\n}\n\nint osszead(int a, int b) {    // definíció\n    return a + b;\n}', explain: 'A prototípus megmondja a fordítónak a függvény alakját, mielőtt a definíció következne. Fejlécfájlban is ez áll.' },
      { k: 'callout', tone: 'key', md: 'A C-ben **minden paraméter érték szerint adódik át**. Ha a függvénynek módosítania kell a hívó változóját, mutatót kell kapnia — más mód nincs rá.' },
      { k: 'code', lang: 'c', src: 'void novel(int *x) { (*x)++; }\n\nint n = 5;\nnovel(&n);\nprintf("%d\\n", n);    // 6', explain: 'A `(*x)++` zárójele fontos: a `*x++` a mutatót léptetné, nem az értéket.' },
      { k: 'callout', tone: 'warn', md: 'Soha ne adj vissza mutatót lokális változóra. A függvény visszatérésekor az a memória felszabadul, és a mutató „lógó" lesz — néha még működik, aztán egyszer csak nem.' },
    ],
    quiz: [
      { k: 'single', q: 'Mire való a prototípus?', opts: ['Gyorsabbá teszi a kódot', 'Megmondja a fordítónak a függvény alakját a definíció előtt', 'Lefuttatja a függvényt'], answer: 1, why: 'A C fentről lefelé olvas. A prototípus nélkül a fordító nem tudja, milyen paramétereket vár a lentebb definiált függvény.' },
      { k: 'single', q: 'Hogyan adódnak át a paraméterek C-ben?', opts: ['Hivatkozás szerint', 'Érték szerint, mindig', 'Típustól függően'], answer: 1, why: 'Mindig másolat készül. A hívó változójának módosításához a címét kell átadni egy mutatón keresztül.' },
      { k: 'single', q: 'Miért veszélyes lokális változóra mutatót visszaadni?', opts: ['Lassú', 'A függvény visszatérésekor az a memória felszabadul', 'Nem fordul le'], answer: 1, why: 'A lokális változó a verem egy darabja, amit a visszatérés után más használ fel. A mutató egy ideig még „jónak" tűnik, aztán szemetet ad.' },
      { k: 'single', q: 'Mi a különbség a `(*x)++` és a `*x++` közt?', opts: ['Semmi', 'Az első az értéket növeli, a második a mutatót lépteti', 'A második hibás'], answer: 1, why: 'A `++` erősebben köt, mint a `*`. Zárójel nélkül a mutató lép tovább, nem az érték nő.' },
    ],
    note: {
      summary: ['A prototípus a definíció előtt megmondja a függvény alakját a fordítónak.', 'A C-ben minden paraméter érték szerint adódik át.', 'A hívó változójának módosításához mutatót kell átadni.', 'A `(*x)++` az értéket növeli; a `*x++` a mutatót lépteti.', 'Lokális változóra sosem adj vissza mutatót: a memória felszabadul.'],
      terms: [{ term: 'prototípus', def: 'A függvény fejlécének előzetes bejelentése a fordítónak.' }, { term: 'érték szerinti átadás', def: 'A függvény a paraméter másolatát kapja meg.' }, { term: 'lógó mutató', def: 'Már felszabadított memóriára mutató, érvénytelen mutató.' }],
    },
  },
  {
    day: 6,
    title: 'Tömbök',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A C tömbje egy **összefüggő memóriaterület**, adott számú, azonos típusú elemmel. Nincs benne semmi varázslat — és semmi védelem sem.' },
      { k: 'code', lang: 'c', src: 'int tavok[5];                    // öt int, inicializálatlan!\nint meresek[] = {12, 8, 30, 5};  // a méret a listából jön\n\nint db = sizeof(meresek) / sizeof(meresek[0]);\nprintf("%d\\n", db);              // 4', explain: 'A tömb nem tudja a saját hosszát. A `sizeof` trükk a teljes méretet osztja az egy elem méretével — ez az egyetlen mód megtudni.' },
      { k: 'callout', tone: 'warn', md: 'A `tavok[10]` egy ötelemű tömbön **nem** hibázik: beleír a szomszédos memóriába. A program sokszor még fut is tovább, aztán fél órával később omlik össze valahol máshol. Ez a C leghírhedtebb hibafajtája.' },
      { k: 'code', lang: 'c', src: 'for (int i = 0; i < db; i++) {\n    printf("%d ", meresek[i]);\n}' },
      { k: 'callout', tone: 'key', md: 'A `sizeof` trükk **csak ott működik, ahol a tömböt deklaráltad**. Ha függvénynek adod át, mutatóvá válik, és a `sizeof` a mutató méretét adja. Ezért kell a hosszt mindig külön paraméterként átadni.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi történik, ha a tömb határán túlra írsz?', opts: ['Hibát dob', 'Beleír a szomszédos memóriába', 'Nem történik semmi'], answer: 1, why: 'A C nem ellenőrzi a határt. A program futhat még, de az adat sérül — és a hiba máshol, később jelentkezik.' },
      { k: 'single', q: 'Hogyan tudod meg egy tömb elemszámát?', opts: ['tomb.length', 'sizeof(tomb) / sizeof(tomb[0])', 'count(tomb)'], answer: 1, why: 'A tömb nem tárolja a hosszát. A teljes méretet osztod az egy elem méretével.' },
      { k: 'single', q: 'Miért nem működik a sizeof trükk függvényen belül?', opts: ['Mert lassú', 'Mert a tömb mutatóvá válik átadáskor', 'Mert a fordító tiltja'], answer: 1, why: 'Átadáskor csak a kezdőcím megy át. A `sizeof` ekkor a mutató méretét adja, nem a tömbét — ezért kell a hosszt külön átadni.' },
      { k: 'single', q: 'Mi az értéke egy inicializálatlan tömb elemeinek?', opts: ['Nulla', 'Meghatározatlan szemét', 'NULL'], answer: 1, why: 'Ugyanaz, mint minden lokális változónál: ami a memóriában volt. Mindig inicializálj.' },
    ],
    note: {
      summary: ['A tömb összefüggő memóriaterület, azonos típusú elemekkel.', 'A tömb nem tudja a saját hosszát: `sizeof(t) / sizeof(t[0])`.', 'A sizeof trükk nem működik függvényen belül — a hosszt külön add át.', 'A határon túli írás nem hibázik, csak a szomszédos memóriát rontja el.', 'Az inicializálatlan tömb elemei szemetet tartalmaznak.'],
      terms: [{ term: 'tömb', def: 'Összefüggő memóriaterület azonos típusú elemekkel.' }, { term: 'túlindexelés', def: 'Írás vagy olvasás a tömb határain kívül, ellenőrzés nélkül.' }, { term: 'tömbelfajulás', def: 'A tömb mutatóvá válása függvénynek átadáskor.' }],
    },
  },
  {
    day: 7,
    title: 'Mutató és tömb kapcsolata',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A C-ben a tömb neve a legtöbb helyen **az első elem címét** jelenti. Ezért tűnik úgy, hogy a tömb és a mutató ugyanaz — pedig nem az.' },
      { k: 'code', lang: 'c', src: 'int t[3] = {10, 20, 30};\nint *p = t;              // ugyanaz, mint &t[0]\n\nprintf("%d\\n", t[1]);    // 20\nprintf("%d\\n", p[1]);    // 20 — a mutató is indexelhető\nprintf("%d\\n", *(t + 1)); // 20 — ugyanaz másképp', explain: 'A `t[i]` valójában `*(t + i)`. Az indexelés csak kényelmesebb írásmód a mutatóaritmetikára.' },
      { k: 'callout', tone: 'key', md: 'A mutatóaritmetika **elemenként** lép, nem bájtonként. A `p + 1` négy bájttal arrébb mutat, ha `int*`, és nyolccal, ha `double*`. A fordító tudja a típus méretét, és elvégzi a szorzást.' },
      { k: 'code', lang: 'c', src: 'void kiir(int *t, int db) {      // a hosszt külön kell\n    for (int i = 0; i < db; i++)\n        printf("%d ", t[i]);\n}\n\nkiir(t, 3);', explain: 'A paraméterben az `int t[]` és az `int *t` teljesen egyenértékű — mindkettő mutató.' },
      { k: 'callout', tone: 'warn', md: 'A különbség mégis megvan: a `sizeof` a tömbre a teljes méretet adja, a mutatóra a mutató méretét. És a tömbnévnek nem lehet új értéket adni, a mutatónak igen.' },
    ],
    quiz: [
      { k: 'single', q: 'Mivel egyenértékű a `t[i]` kifejezés?', opts: ['*(t + i)', 't + i', '&t[i]'], answer: 0, why: 'Az indexelés csak írásmód: a fordító mindkettőt ugyanarra fordítja.' },
      { k: 'single', q: 'Mennyivel lép a `p + 1`, ha `p` egy `int*` 4 bájtos int-eken?', opts: ['1 bájttal', '4 bájttal', '8 bájttal'], answer: 1, why: 'A mutatóaritmetika elemenként lép: egy elem itt 4 bájt. A fordító végzi el a szorzást.' },
      { k: 'single', q: 'Mi a különbség a tömb és a mutató közt?', opts: ['Semmi', 'A sizeof mást ad, és a tömbnévnek nem lehet új értéket adni', 'A mutató gyorsabb'], answer: 1, why: 'Sok helyen egyformán viselkednek, de nem ugyanaz: a tömb maga a terület, a mutató csak egy cím.' },
      { k: 'single', q: 'Mit kell átadni a tömb mellé egy függvénynek?', opts: ['Semmit', 'Az elemszámot', 'A típust'], answer: 1, why: 'A függvény csak a kezdőcímet kapja meg. A hossz nélkül nem tudja, meddig mehet — ez a C egyik alapmintája.' },
    ],
    note: {
      summary: ['A tömb neve a legtöbb helyen az első elem címét jelenti.', 'A `t[i]` pontosan `*(t + i)` — az indexelés kényelmi írásmód.', 'A mutatóaritmetika elemenként lép, nem bájtonként.', 'Függvényparaméterben az `int t[]` és az `int *t` egyenértékű.', 'A tömb és a mutató mégsem ugyanaz: `sizeof` és az újraértékadás különbözik.', 'A tömb mellé mindig add át az elemszámot is.'],
      terms: [{ term: 'mutatóaritmetika', def: 'Mutató léptetése elemenként, a típus méretének megfelelően.' }, { term: 'tömbelfajulás', def: 'A tömbnév mutatóvá alakulása kifejezésben vagy paraméterben.' }, { term: 'elemszám-paraméter', def: 'A tömb hosszának külön átadása a függvénynek.' }],
    },
  },
  {
    day: 8,
    title: 'Sztringek C-ben',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A C-ben **nincs szöveg típus**. A sztring egy `char` tömb, aminek a végén egy `\\0` (nulla karakter) áll. Minden szövegkezelő függvény ezt a lezárót keresi.' },
      { k: 'code', lang: 'c', src: '#include <string.h>\n\nchar nev[] = "Rover";     // 6 bájt: R o v e r \\0\n\nprintf("%zu\\n", strlen(nev));   // 5 — a lezárót nem számolja\nprintf("%zu\\n", sizeof(nev));   // 6 — a lezárót is', explain: 'A `strlen` a karakterek száma, a `sizeof` a foglalt bájtok száma. A kettő mindig eggyel tér el.' },
      { k: 'callout', tone: 'warn', md: 'Ha a lezáró `\\0` hiányzik vagy felülíródik, a `printf` és a `strlen` addig olvas, amíg véletlenül nem talál egy nulla bájtot valahol a memóriában. Ez a C klasszikus biztonsági rése.' },
      { k: 'code', lang: 'c', src: 'char cel[20];\nstrcpy(cel, "Rover");            // másolás\nstrcat(cel, " Mk-II");           // hozzáfűzés\n\nif (strcmp(cel, "Rover Mk-II") == 0)\n    printf("egyezik\\n");', explain: 'A `strcmp` nullát ad, ha egyeznek. Szöveget C-ben soha nem `==`-szel hasonlítasz: az a két címet hasonlítaná.' },
      { k: 'callout', tone: 'key', md: 'A `strcpy` nem ellenőrzi, hogy elfér-e. Ha a cél kisebb, mint a forrás, túlír — ez a híres „buffer overflow". Használj `snprintf`-et vagy ellenőrizd a hosszt előre.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi zárja le a sztringet C-ben?', opts: ['Egy pontosvessző', 'Egy `\\0` nulla karakter', 'Egy újsor'], answer: 1, why: 'Minden szövegkezelő függvény ezt keresi. Nélküle nem tudná, hol ér véget a szöveg.' },
      { k: 'numeric', q: 'Hány bájtot foglal a `char s[] = "abc";`?', answer: 4, tol: 0.5, why: 'Három karakter plusz a lezáró nulla: négy bájt. A `strlen` ettől függetlenül 3-at ad.' },
      { k: 'single', q: 'Mivel hasonlítasz össze két sztringet C-ben?', opts: ['==', 'strcmp()', 'equals()'], answer: 1, why: 'A `==` a két címet hasonlítaná. A `strcmp` a tartalmat nézi, és nullát ad egyezéskor.' },
      { k: 'single', q: 'Mi a baj a `strcpy`-val?', opts: ['Lassú', 'Nem ellenőrzi, hogy elfér-e a cél pufferben', 'Elavult'], answer: 1, why: 'Ha a forrás hosszabb, túlír a célon. Ez a buffer overflow, a biztonsági hibák klasszikus forrása.' },
    ],
    note: {
      summary: ['A C-ben nincs szöveg típus: a sztring `\\0`-val lezárt char tömb.', '`strlen` a karakterek száma, `sizeof` a bájtoké — eggyel térnek el.', 'Hiányzó lezáró esetén a függvények túlolvasnak a memóriában.', 'Összehasonlítás `strcmp()`-pel; a `==` a címeket hasonlítaná.', 'A `strcpy` nem ellenőriz méretet — ez a buffer overflow forrása.'],
      terms: [{ term: 'nullával lezárt sztring', def: '`\\0` karakterrel végződő karaktertömb.' }, { term: 'strlen', def: 'A karakterek számát adó függvény, a lezáró nélkül.' }, { term: 'buffer overflow', def: 'Írás a lefoglalt terület határain túl.' }],
    },
  },
  {
    day: 9,
    title: 'Struktúrák',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A **struktúra** több, különböző típusú adatot fog össze egy néven. Ez a C válasza arra, amire más nyelvekben az objektum való.' },
      { k: 'code', lang: 'c', src: 'typedef struct {\n    char nev[20];\n    int akku;\n    double x, y;\n} Rover;\n\nRover r = {"Mk-I", 100, 0.0, 0.0};\n\nprintf("%s %d\\n", r.nev, r.akku);\nr.akku -= 5;', explain: 'A `typedef` nélkül minden használatnál ki kellene írni, hogy `struct Rover`. Ezért szokás így definiálni.' },
      { k: 'code', lang: 'c', src: 'void mozgat(Rover *r, double dx) {\n    r->x += dx;          // ugyanaz, mint (*r).x\n}\n\nmozgat(&r, 10.0);', explain: 'A `->` operátor mutatón keresztüli mezőelérés. Ez a leggyakoribb jelölés a C-ben, mert struktúrát szinte mindig mutatón át adunk át.' },
      { k: 'callout', tone: 'key', md: 'Struktúrát **érték szerint** is átadhatsz, de egy nagy struktúra másolása drága. Mutatóval csak egy címet adsz át — ezért a `->` a gyakoribb. Ha nem akarod, hogy a függvény módosítsa, írd `const Rover *r`-nek.' },
      { k: 'callout', tone: 'warn', md: 'Két struktúrát nem lehet `==`-szel összehasonlítani. Mezőnként kell, vagy `memcmp`-pel — de az utóbbi a kitöltő bájtokat is nézi, és félrevezető lehet.' },
    ],
    quiz: [
      { k: 'single', q: 'Mire való a `typedef` struktúránál?', opts: ['Gyorsabbá teszi', 'Hogy ne kelljen mindenhol kiírni a `struct` szót', 'Memóriát spórol'], answer: 1, why: 'A `typedef` nevet ad a típusnak. Nélküle minden deklarációnál `struct Rover r;` kellene.' },
      { k: 'single', q: 'Mit jelent a `->` operátor?', opts: ['Értékadás', 'Mezőelérés mutatón keresztül', 'Összehasonlítás'], answer: 1, why: 'Az `r->x` pontosan ugyanaz, mint `(*r).x`, csak olvashatóbb.' },
      { k: 'single', q: 'Miért adunk át struktúrát inkább mutatóval?', opts: ['Mert kötelező', 'Mert az érték szerinti átadás lemásolja az egészet', 'Mert különben nem fordul le'], answer: 1, why: 'Egy nagy struktúra másolása minden hívásnál felesleges munka. A mutató csak egy cím.' },
      { k: 'single', q: 'Hogyan hasonlítasz össze két struktúrát?', opts: ['==', 'Mezőnként', 'strcmp'], answer: 1, why: 'A `==` nem értelmezett struktúrákon. A `memcmp` létezik, de a kitöltő bájtok miatt megbízhatatlan.' },
    ],
    note: {
      summary: ['A struktúra több, különböző típusú adatot fog össze egy néven.', 'A `typedef` elhagyhatóvá teszi a `struct` szót minden használatnál.', 'Mezőelérés: `r.x` értéknél, `r->x` mutatón keresztül.', 'Struktúrát inkább mutatóval adj át: az érték szerinti átadás lemásolja.', 'Ha a függvény nem módosít, írd `const Type *`-nak.', 'Struktúrát nem lehet `==`-szel összehasonlítani, mezőnként kell.'],
      terms: [{ term: 'struktúra', def: 'Több, különböző típusú mezőt egyesítő összetett típus.' }, { term: 'typedef', def: 'Új név adása egy típusnak.' }, { term: 'nyíl operátor (->)', def: 'Mezőelérés struktúramutatón keresztül.' }],
    },
  },
  {
    day: 10,
    title: 'Dinamikus memória: malloc és free',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'Eddig minden memória automatikus volt: a függvény végén eltűnt. A **dinamikus memória** akkor kell, ha futásidőben derül ki, mennyi hely kell, vagy ha az adatnak túl kell élnie a függvényt.' },
      { k: 'code', lang: 'c', src: '#include <stdlib.h>\n\nint n = 100;\nint *t = malloc(n * sizeof(int));\n\nif (t == NULL) {\n    printf("Nincs elég memória\\n");\n    return 1;\n}\n\nt[0] = 42;\nfree(t);\nt = NULL;        // hogy ne maradjon lógó mutató', explain: 'A `malloc` bájtokat foglal, és a kezdőcímet adja vissza — vagy `NULL`-t, ha nem sikerült. Ezt **mindig** ellenőrizd.' },
      { k: 'callout', tone: 'key', md: 'Amit lefoglaltál, azt fel is kell szabadítani. Minden `malloc`-hoz tartozzon pontosan egy `free`. Ez a C legnagyobb felelőssége — és a legtöbb hosszú távú hiba forrása.' },
      { k: 'text', md: 'A három tipikus hiba:\n\n- **Memóriaszivárgás** — lefoglaltad, nem szabadítottad fel. A program egyre több memóriát eszik.\n- **Dupla felszabadítás** — kétszer hívtál `free`-t ugyanarra. Azonnali összeomlás vagy ennél rosszabb.\n- **Használat felszabadítás után** — `free` után még hozzányúlsz. Néha működik, és ettől alattomos.' },
      { k: 'callout', tone: 'tip', md: '`free` után azonnal állítsd a mutatót `NULL`-ra. A `NULL` feloldása azonnal összeomlik — ami sokkal jobb, mint csendben rossz adatot olvasni.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit ad vissza a `malloc`, ha nem sikerül a foglalás?', opts: ['Nullát', 'NULL mutatót', 'Hibát dob'], answer: 1, why: 'A C-ben nincs kivétel: a hibát visszatérési értékkel jelzi. Ezért kell minden `malloc` után ellenőrizni.' },
      { k: 'single', q: 'Mi a memóriaszivárgás?', opts: ['Rossz adatot olvasol', 'Lefoglaltad a memóriát, de nem szabadítottad fel', 'Kétszer szabadítottad fel'], answer: 1, why: 'A program egyre több memóriát foglal, és soha nem adja vissza. Hosszan futó programnál ez végül elfogyasztja a gépet.' },
      { k: 'single', q: 'Miért érdemes `free` után NULL-ra állítani a mutatót?', opts: ['Gyorsabb', 'Mert a NULL feloldása azonnal összeomlik, nem csendben hibázik', 'Kötelező'], answer: 1, why: 'A felszabadított memóriára mutató „lógó" mutató néha még működni látszik. A NULL azonnal és hangosan elbukik — ez könnyebben megtalálható.' },
      { k: 'single', q: 'Hány `free` tartozzon egy `malloc`-hoz?', opts: ['Egy sem', 'Pontosan egy', 'Kettő'], answer: 1, why: 'Egy sem: szivárgás. Kettő: dupla felszabadítás, ami összeomlást okoz. Pontosan egy a helyes.' },
    ],
    note: {
      summary: ['A `malloc` futásidőben foglal memóriát, és a kezdőcímet adja vissza.', 'Sikertelen foglalásnál `NULL`-t ad — ezt mindig ellenőrizd.', 'Minden `malloc`-hoz pontosan egy `free` tartozzon.', 'Három tipikus hiba: szivárgás, dupla felszabadítás, használat felszabadítás után.', '`free` után állítsd a mutatót `NULL`-ra: a NULL hangosan bukik el.'],
      terms: [{ term: 'malloc', def: 'Futásidejű memóriafoglalás, ami a kezdőcímet adja vissza.' }, { term: 'memóriaszivárgás', def: 'Lefoglalt, de soha fel nem szabadított memória.' }, { term: 'dupla felszabadítás', def: 'Ugyanarra a területre kétszer hívott free.' }],
    },
  },
];
