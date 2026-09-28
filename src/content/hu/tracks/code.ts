import type { Track } from '../../types';

export const codeHu: Track = {
  id: 'code',
  title: 'Kódolás',
  blurb: 'A nulláról odáig, hogy kóddal vezérelsz egy robotot.',
  plannedTitles: [
    'Változók és típusok',
    'Elágazás: if, elif, else',
    'Ciklusok: while és for',
    'Listák',
    'Szótárak',
    'Ciklusminták listákon',
    'Függvények',
    'Paraméterek és visszatérési érték',
    'Hatókör és mellékhatás',
    'Szövegek kezelése',
    'Formázás és beolvasás',
    'Szövegfeldolgozás a gyakorlatban',
    'Fájlok írása és olvasása',
    'JSON és strukturált adat',
    'Adatok mentése és visszatöltése',
    'Osztályok és objektumok',
    'Állapot és metódusok',
    'Öröklődés, amikor tényleg kell',
    'Hibák és kivételek',
    'Hibakeresés módszeresen',
    'Egy elromlott program megjavítása',
    'Modulok és importálás',
    'Könyvtárak használata',
    'Dokumentáció olvasása',
    'Keresés: lineáris és bináris',
    'Rendezés és miért számít',
    'Bonyolultság emberi nyelven',
    'Robotvezérlő: a szenzorhurok',
    'Robotvezérlő: döntési logika',
    'Robotvezérlő: teljes küldetés',
  ],
  days: [
    // ── Day 1 ───────────────────────────────────────────────────────
    {
      day: 1,
      title: 'Változók és típusok',
      minutes: 20,
      lesson: [
        {
          k: 'text',
          md: 'Egy program adatokkal dolgozik. A **változó** egy név, amivel hivatkozol egy adatra. Ennyi. Nem doboz, nem varázslat — egy címke, amit ráakasztasz egy értékre, hogy később is meg tudd szólítani.',
        },
        {
          k: 'code',
          lang: 'py',
          src: 'tav = 15\nnev = "Rover"\nfut = True\n\nprint(nev, tav)',
          explain: 'Három változó, három különböző fajta adat. A `=` itt nem egyenlőséget jelent, hanem azt: "ezt az értéket mostantól így hívom".',
        },
        {
          k: 'text',
          md: 'Minden értéknek van **típusa**, és a típus dönti el, mit lehet vele csinálni. Két számot összeadhatsz. Két szöveget összefűzhetsz. Egy számot és egy szöveget viszont nem — a Python ilyenkor hibát dob, és ez jó hír: inkább szóljon, mint hogy csendben butaságot csináljon.',
        },
        {
          k: 'code',
          lang: 'py',
          src: 'print(2 + 3)        # 5        — szám + szám\nprint("2" + "3")    # 23       — szöveg + szöveg\nprint(type(2))      # <class \'int\'>\nprint(type("2"))    # <class \'str\'>',
          explain: 'A `type()` megmondja, mivel van dolgod. Amikor nem érted, mi történik, ez az első kérdés, amit fel kell tenned.',
        },
        {
          k: 'text',
          md: 'A négy típus, amivel a következő hetekben dolgozni fogsz:\n\n- `int` — egész szám: `15`, `-3`, `0`\n- `float` — tizedes szám: `3.14`, `0.5`\n- `str` — szöveg: `"Rover"`, `"hello"`\n- `bool` — igaz vagy hamis: `True`, `False`',
        },
        {
          k: 'callout',
          tone: 'key',
          md: 'A robotodnál ez nem elmélet. A távolságérzékelő `float`-ot ad (12.7 cm). A motor bekapcsolt állapota `bool`. A robot neve `str`. Ha rossz típussal számolsz, a robot nekimegy a falnak.',
        },
        {
          k: 'callout',
          tone: 'tip',
          md: 'Adj a változóidnak nevet, ami elmondja, mi van bennük. `tavolsag_cm` jobb, mint `t`. Hat hónap múlva te leszel az, aki nem érti a saját kódját.',
        },
      ],
      lab: {
        lab: 'code',
        lang: 'py',
        brief: 'Hozz létre egy `tavolsag` nevű változót 42 értékkel, és egy `nev` nevű változót "Rover" értékkel. Írasd ki őket egy sorban, szóközzel elválasztva.',
        starter: '# Ide írd a megoldást\n',
        checks: [
          { k: 'output', contains: 'Rover', label: 'A kimenetben szerepel a név' },
          { k: 'output', contains: '42', label: 'A kimenetben szerepel a távolság' },
        ],
        hints: [
          'A változó létrehozása: `nev = "Rover"`.',
          'Egyszerre több dolgot is ki tudsz íratni: `print(a, b)`.',
          'Teljes megoldás: `tavolsag = 42` majd `nev = "Rover"` majd `print(nev, tavolsag)`.',
        ],
      },
      quiz: [
        {
          k: 'single',
          q: 'Mit csinál a `=` jel a `tav = 15` sorban?',
          opts: [
            'Megvizsgálja, hogy a tav egyenlő-e 15-tel',
            'Hozzárendeli a 15 értéket a tav névhez',
            'Kiírja a képernyőre, hogy 15',
          ],
          answer: 1,
          why: 'Az egyetlen `=` értékadás: a jobb oldalt hozzárendeli a bal oldali névhez. Az egyenlőség vizsgálata a `==`, azt a következő napon nézzük meg.',
        },
        {
          k: 'output',
          q: 'Mit ír ki ez a program?',
          code: 'print("2" + "3")',
          lang: 'py',
          opts: ['5', '23', 'Hibát dob'],
          answer: 1,
          why: 'Mindkét érték szöveg, a `+` pedig szövegeket összefűz, nem ad össze. Számokká alakítva (`int("2") + int("3")`) kapnál 5-öt.',
        },
        {
          k: 'single',
          q: 'Milyen típusú érték a `True`?',
          opts: ['str', 'int', 'bool'],
          answer: 2,
          why: 'A `bool` a logikai típus, két lehetséges értéke van: `True` és `False`. Ebből épül minden döntés a programodban.',
        },
        {
          k: 'multi',
          q: 'Melyik két változónév mondja el, mit tárol?',
          opts: ['x', 'akkumulator_szazalek', 'a1', 'motor_fordulatszam'],
          answers: [1, 3],
          why: 'A beszédes név az, amit hat hónap múlva is megértesz. Az `x` és az `a1` semmit nem árul el, és a hiba keresésekor pont ez fog hiányozni.',
        },
        {
          k: 'numeric',
          q: 'Mennyi lesz az eredmény: `3 + 4 * 2`?',
          answer: 11,
          tol: 0.01,
          why: 'A szorzás előbb hajtódik végre, mint az összeadás, ugyanúgy, mint a matekórán: 4*2 = 8, majd 3+8 = 11. Ha 14-et vártál, zárójelre gondoltál: `(3+4)*2`.',
        },
      ],
      note: {
        summary: [
          'A változó egy név, amivel egy értékre hivatkozol. A `=` értékadás, nem egyenlőség.',
          'Minden értéknek van típusa, és a típus dönti el, milyen műveletek értelmesek rajta.',
          'Négy alaptípus: `int` (egész), `float` (tizedes), `str` (szöveg), `bool` (igaz/hamis).',
          'A `+` számokon összead, szövegeken összefűz. Szám és szöveg keverve hibát ad.',
          'A `type(érték)` megmondja, mivel van dolgod — ez az első kérdés, ha valami nem stimmel.',
          'A beszédes változónév nem stílus kérdése: hibakereséskor ez menti meg az időd.',
        ],
        terms: [
          { term: 'változó', def: 'Név, amivel egy tárolt értékre hivatkozol.' },
          { term: 'értékadás', def: 'A `=` művelet: a jobb oldali értéket a bal oldali névhez köti.' },
          { term: 'típus', def: 'Az érték fajtája, ami eldönti, milyen műveletek végezhetők rajta.' },
          { term: 'bool', def: 'Logikai típus két értékkel: `True` és `False`.' },
        ],
      },
    },

    // ── Day 2 ───────────────────────────────────────────────────────
    {
      day: 2,
      title: 'Elágazás: if, elif, else',
      minutes: 22,
      lesson: [
        {
          k: 'text',
          md: 'Eddig a programod fentről lefelé végigfutott minden soron. Az **elágazás** az első eszköz, amivel dönteni tud: ha ez igaz, csináld ezt, egyébként amazt.',
        },
        {
          k: 'code',
          lang: 'py',
          src: 'tavolsag = 8\n\nif tavolsag < 10:\n    print("Akadály! Fékezz.")\nelse:\n    print("Szabad az út.")',
          explain: 'A `:` után jövő **behúzott** sorok tartoznak az `if`-hez. A Pythonban a behúzás nem dísz — ez mondja meg, mi tartozik hova.',
        },
        {
          k: 'text',
          md: 'Az `if` után egy **feltétel** áll, ami igaz vagy hamis. Az összehasonlító műveletek:\n\n- `==` egyenlő (két egyenlőségjel!)\n- `!=` nem egyenlő\n- `<` `>` kisebb, nagyobb\n- `<=` `>=` kisebb vagy egyenlő, nagyobb vagy egyenlő',
        },
        {
          k: 'callout',
          tone: 'warn',
          md: 'Az `=` értékadás, a `==` összehasonlítás. Ez a leggyakoribb kezdő hiba, és a Python szerencsére hibát dob rá, nem csendben rossz eredményt ad.',
        },
        {
          k: 'code',
          lang: 'py',
          src: 'akku = 35\n\nif akku > 70:\n    print("Teljes gőz")\nelif akku > 20:\n    print("Takarékos mód")\nelse:\n    print("Töltés kell")',
          explain: 'Az `elif` = "egyébként ha". Fentről lefelé vizsgálódik, és az **első** igaz ágnál megáll. A 35 nem nagyobb 70-nél, de nagyobb 20-nál, tehát "Takarékos mód".',
        },
        {
          k: 'text',
          md: 'Feltételeket össze is fűzhetsz: `and` (mindkettő igaz), `or` (legalább az egyik igaz), `not` (megfordítja).',
        },
        {
          k: 'code',
          lang: 'py',
          src: 'if tavolsag > 20 and akku > 30:\n    print("Mehetünk gyorsan")',
        },
        {
          k: 'callout',
          tone: 'key',
          md: 'A robotod egész viselkedése ilyen döntésekből áll: ha közel a fal, fordulj; ha gyenge az akku, lassíts; ha látod a célt, állj meg. A 28. naptól pontosan ezt fogod írni.',
        },
      ],
      lab: {
        lab: 'code',
        lang: 'py',
        brief: 'Adott egy `tavolsag` változó. Írj elágazást: ha kisebb mint 10, írja ki hogy "STOP"; ha 10 és 30 között van, hogy "LASSAN"; egyébként hogy "MEHET". Próbáld ki több értékkel is.',
        starter: 'tavolsag = 15\n\n# Ide jön az elágazás\n',
        checks: [
          { k: 'output', contains: 'LASSAN', label: '15-nél LASSAN a helyes válasz' },
        ],
        hints: [
          'Kezdd így: `if tavolsag < 10:`',
          'A középső esethez `elif tavolsag < 30:` elég — ide már csak az jut, ami nem volt kisebb 10-nél.',
          'A végén `else:` ág kell a maradékra.',
        ],
      },
      quiz: [
        {
          k: 'single',
          q: 'Mi a különbség az `=` és a `==` között?',
          opts: [
            'Semmi, mindkettő összehasonlít',
            'Az `=` értéket ad, a `==` összehasonlít',
            'Az `=` összehasonlít, a `==` értéket ad',
          ],
          answer: 1,
          why: 'Az `=` hozzárendel egy értéket egy névhez. A `==` megkérdezi, hogy két érték egyenlő-e, és `True` vagy `False` a válasza.',
        },
        {
          k: 'output',
          q: 'Mit ír ki ez a kód?',
          code: 'akku = 35\nif akku > 70:\n    print("A")\nelif akku > 20:\n    print("B")\nelse:\n    print("C")',
          lang: 'py',
          opts: ['A', 'B', 'C', 'B és C is'],
          answer: 1,
          why: 'Az `elif` láncban az első igaz ág fut le, és utána a program kilép a láncból. 35 nem nagyobb 70-nél, de nagyobb 20-nál, szóval "B" — és csak az.',
        },
        {
          k: 'single',
          q: 'Mikor igaz az `a > 5 and b < 3` feltétel?',
          opts: [
            'Ha legalább az egyik igaz',
            'Ha mindkettő igaz',
            'Ha egyik sem igaz',
          ],
          answer: 1,
          why: 'Az `and` mindkét oldaltól igazat vár. Ha bármelyik hamis, az egész hamis. A "legalább az egyik" az `or`.',
        },
        {
          k: 'single',
          q: 'Miért számít a behúzás a Pythonban?',
          opts: [
            'Csak szépészeti kérdés',
            'A behúzás mondja meg, mely sorok tartoznak az if-hez',
            'A Python figyelmen kívül hagyja',
          ],
          answer: 1,
          why: 'Más nyelvekben kapcsos zárójel jelöli a blokkot, a Pythonban a behúzás. Ezért egy elcsúszott szóköz nem stílushiba, hanem megváltoztatja, mit csinál a programod.',
        },
      ],
      note: {
        summary: [
          'Az `if` feltétel alapján dönt: az igaz ág fut le, a többi nem.',
          'Az `elif` láncban fentről lefelé az **első** igaz ág fut le, utána a program kilép a láncból.',
          'Összehasonlítás: `==`, `!=`, `<`, `>`, `<=`, `>=`. Az `=` ezekkel szemben értékadás.',
          'Feltételek fűzése: `and` (mindkettő), `or` (legalább egy), `not` (megfordít).',
          'A Pythonban a behúzás határozza meg, mely sorok tartoznak a blokkhoz — nem díszítés.',
        ],
        terms: [
          { term: 'feltétel', def: 'Kifejezés, aminek az értéke igaz vagy hamis.' },
          { term: 'elif', def: '"Egyébként ha" — további ág, amit csak akkor vizsgál, ha az előzők hamisak voltak.' },
          { term: 'blokk', def: 'Összetartozó sorok csoportja, amit a Pythonban a behúzás jelöl.' },
          { term: 'logikai operátor', def: 'Az `and`, `or` és `not`, amivel feltételeket kapcsolsz össze.' },
        ],
      },
    },

    // ── Day 3 ───────────────────────────────────────────────────────
    {
      day: 3,
      title: 'Ciklusok: while és for',
      minutes: 24,
      lesson: [
        {
          k: 'text',
          md: 'A **ciklus** megismétel valamit. Ez az, amiért a számítógép hasznos: nem unja meg, és nem téveszt a tízezredik körnél sem.',
        },
        {
          k: 'code',
          lang: 'py',
          src: 'for i in range(5):\n    print("lépés", i)',
          explain: 'A `for` egy sorozat minden elemén végigmegy. A `range(5)` a 0, 1, 2, 3, 4 számokat adja — **öt** darabot, de nullától indulva.',
        },
        {
          k: 'callout',
          tone: 'warn',
          md: 'A `range(5)` nem tartalmazza az 5-öt. Ez zavarónak tűnik, amíg meg nem szokod, aztán logikus lesz: `range(n)` mindig pontosan `n` darab számot ad.',
        },
        {
          k: 'code',
          lang: 'py',
          src: 'tavolsag = 100\n\nwhile tavolsag > 0:\n    print("még", tavolsag, "cm")\n    tavolsag = tavolsag - 20',
          explain: 'A `while` addig ismétel, amíg a feltétel igaz. Figyeld meg az utolsó sort: ha az kimaradna, a feltétel örökre igaz maradna.',
        },
        {
          k: 'callout',
          tone: 'key',
          md: 'Minden `while` ciklusnál tedd fel a kérdést: **mi az, ami miatt ez egyszer véget ér?** Ha nem tudsz válaszolni, végtelen ciklust írtál. A FORGE Kód Laborja három másodperc után leállítja a kódod, de egy igazi robotban ez lemerült akkumulátor.',
        },
        {
          k: 'text',
          md: 'Két kiegészítő szó:\n\n- `break` — azonnal kilép a ciklusból\n- `continue` — kihagyja a kör hátralévő részét, és jön a következő kör',
        },
        {
          k: 'code',
          lang: 'py',
          src: 'for i in range(10):\n    if i == 3:\n        continue     # a 3-at kihagyjuk\n    if i == 6:\n        break        # 6-nál befejezzük\n    print(i)',
          explain: 'A kimenet: 0 1 2 4 5. A 3 kimarad, a 6-nál pedig vége.',
        },
      ],
      lab: {
        lab: 'code',
        lang: 'py',
        brief: 'Írj ki egy ciklussal minden 2 és 20 közötti páros számot, egyenként új sorba. (Segítség: egy szám akkor páros, ha `szam % 2 == 0`.)',
        starter: '# A % a maradékot adja: 7 % 2 == 1, 8 % 2 == 0\n',
        checks: [
          { k: 'output', contains: '2', label: 'A 2 benne van' },
          { k: 'output', contains: '20', label: 'A 20 benne van' },
        ],
        hints: [
          'Menj végig a számokon: `for szam in range(2, 21):`',
          'A `range(2, 21)` a 2-től 20-ig adja a számokat — a felső határ nincs benne.',
          'A cikluson belül: `if szam % 2 == 0: print(szam)`. Vagy elegánsabban: `range(2, 21, 2)` kettesével lépked.',
        ],
      },
      quiz: [
        {
          k: 'numeric',
          q: 'Hány számot ad a `range(5)`?',
          answer: 5,
          tol: 0.01,
          why: '`range(n)` mindig pontosan n darab számot ad, 0-tól n-1-ig. Tehát 0, 1, 2, 3, 4 — öt darab, de az 5 nincs köztük.',
        },
        {
          k: 'output',
          q: 'Mit ír ki ez a kód?',
          code: 'for i in range(4):\n    if i == 2:\n        break\n    print(i)',
          lang: 'py',
          opts: ['0 1 2 3', '0 1', '0 1 2', 'semmit'],
          answer: 1,
          why: 'A `break` azonnal kilép, mielőtt a `print` lefutna. A 0 és az 1 kiíródik, majd i=2-nél a ciklus véget ér.',
        },
        {
          k: 'single',
          q: 'Mitől lesz végtelen egy `while` ciklus?',
          opts: [
            'Ha `for` helyett `while`-t használsz',
            'Ha semmi nem változtatja meg a feltételt hamisra',
            'Ha több mint 1000-szer fut le',
          ],
          answer: 1,
          why: 'A `while` addig ismétel, amíg a feltétel igaz. Ha a cikluson belül semmi nem viszi a feltételt hamis felé, sosem lesz vége. Mindig keresd meg, mi az a sor, ami a kilépés felé mozdít.',
        },
        {
          k: 'single',
          q: 'Mi a különbség a `break` és a `continue` között?',
          opts: [
            'A break kihagyja a kört, a continue kilép',
            'A break kilép a ciklusból, a continue a következő körre ugrik',
            'Ugyanaz a kettő',
          ],
          answer: 1,
          why: 'A `break` befejezi az egész ciklust. A `continue` csak az aktuális kör hátralévő részét hagyja ki, és jön a következő ismétlés.',
        },
        {
          k: 'order',
          q: 'Milyen sorrendben történnek a dolgok egy `while` ciklusban?',
          items: [
            'A ciklusmag lefut',
            'A feltétel kiértékelődik',
            'A vezérlés visszatér a feltételhez',
          ],
          correct: [1, 0, 2],
          why: 'A `while` először mindig a feltételt nézi meg — ezért fordulhat elő, hogy a ciklusmag egyszer sem fut le. Utána jön a mag, majd vissza a feltételhez.',
        },
      ],
      note: {
        summary: [
          'A `for` egy sorozat elemein megy végig; a `range(n)` n darab számot ad 0-tól n-1-ig.',
          'A `range(a, b)` a-tól b-1-ig megy, a `range(a, b, lepes)` pedig lépésközzel.',
          'A `while` addig ismétel, amíg a feltétel igaz — mindig legyen benne valami, ami a kilépés felé visz.',
          'Végtelen ciklus akkor keletkezik, ha a feltétel sosem válik hamissá. A Kód Labor 3 másodperc után leállítja.',
          '`break` kilép a ciklusból, `continue` a következő körre ugrik.',
          'A `%` a maradékot adja; a `szam % 2 == 0` a szokásos páros-teszt.',
        ],
        terms: [
          { term: 'ciklus', def: 'Szerkezet, ami egy kódrészletet többször futtat le.' },
          { term: 'range', def: 'Számsorozatot előállító függvény; a felső határ nincs benne.' },
          { term: 'végtelen ciklus', def: 'Olyan ciklus, aminek a feltétele sosem válik hamissá.' },
          { term: 'break', def: 'Azonnal kilép a ciklusból.' },
          { term: 'continue', def: 'Kihagyja az aktuális kör hátralévő részét.' },
        ],
      },
    },
  ],
};
