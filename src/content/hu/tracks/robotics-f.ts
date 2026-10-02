import type { Day } from '../../types';

/** ROBOTIKA trek, 27–30. nap. */
export const roboticsHuF: Day[] = [
  {
    day: 27,
    title: 'Tesztelés szimulációban',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'A szimuláció a robotika leggyorsabb visszajelzési köre. Egy ütközés a képernyőn ingyen van; ugyanaz a valóságban eltört alkatrész és egy hét csúszás.' },
      { k: 'callout', tone: 'key', md: 'Amit a szimuláció **jól** megfog: a vezérlés logikája, az útvonaltervezés, az állapotgép, a kinematika és a hibakezelő ágak. Ezeket hajszálpontosan tudod próbálni, ezerszer egymás után, változtatható körülmények közt.' },
      { k: 'callout', tone: 'warn', md: 'Amit a szimuláció **nem** fog meg: a tapadás, a holtjáték, a kábel beakadása, a szenzorzaj valódi jellege, a motor melegedése. Ezt hívják **valóságrésnek** (reality gap), és ettől bukik meg sok szimulációban tökéletes vezérlés az első valódi próbán.' },
      { k: 'text', md: 'A valóságrés szűkítése:\n\n- **Adj zajt** a szimulált érzékelőkhöz, ne tökéletes értékeket adj vissza\n- **Véletlenítsd a paramétereket** (tömeg, súrlódás, késleltetés) futásonként — ettől lesz a vezérlés robusztus\n- **Modellezd a késleltetést**: a valódi érzékelő és a motor nem reagál azonnal\n- **Mérj a valóságban**, és állítsd a szimulációt a mért értékekre' },
      { k: 'text', md: 'A FORGE Robot Labja ezt a logikát követi: a kinematika ugyanaz a kód, ami a valódi vezérlőben futna, és a futtatás külön szálon, időkorláttal történik — pontosan úgy, ahogy egy valódi rendszerben is körbe kellene határolni egy végtelen ciklust.' },
      { k: 'callout', tone: 'tip', md: 'A legértékesebb szimulációs teszt nem az, ahol minden jól megy. Hanem az, ahol **elromlik valami**: kiesik egy szenzor, blokkol egy kerék, elfogy az akku. Ezeket a valóságban nehéz előidézni, szimulációban viszont egy sor.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit fog meg jól a szimuláció?', opts: ['A tapadást', 'A vezérlés logikáját, útvonaltervezést, állapotgépet, kinematikát', 'A motor melegedését'], answer: 1, why: 'Ezeket ezerszer, változtatható körülmények közt tudod próbálni.' },
      { k: 'single', q: 'Mi a valóságrés (reality gap)?', opts: ['A szimuláció felbontása', 'Az, amit a szimuláció nem modellez: tapadás, holtjáték, valódi zaj', 'A képernyő mérete'], answer: 1, why: 'Ettől bukik meg sok szimulációban tökéletes vezérlés az első valódi próbán.' },
      { k: 'single', q: 'Miért adj zajt a szimulált érzékelőkhöz?', opts: ['Hogy nehezebb legyen', 'Mert a tökéletes értékekre épülő vezérlés a valóságban megbukik', 'Hogy lassabb legyen'], answer: 1, why: 'A valódi érzékelő sosem ad pontos értéket; a vezérlésnek ezt bírnia kell.' },
      { k: 'single', q: 'Mit ad a paraméterek véletlenítése futásonként?', opts: ['Gyorsabb szimulációt', 'Robusztus vezérlést, ami nem egyetlen paraméterkészletre van hangolva', 'Szebb képet'], answer: 1, why: 'Tömeg, súrlódás és késleltetés változtatásával a vezérlés általánosabbá válik.' },
      { k: 'single', q: 'Mi a legértékesebb szimulációs teszt?', opts: ['Ahol minden jól megy', 'Ahol elromlik valami: kiesik egy szenzor, blokkol egy kerék', 'A leggyorsabb'], answer: 1, why: 'Ezeket a valóságban nehéz előidézni, szimulációban viszont egyetlen sor.' },
    ],
    note: {
      summary: ['A szimuláció a leggyorsabb visszajelzési kör: az ütközés ingyen van.', 'Jól fogja meg a logikát, az útvonaltervezést és a kinematikát.', 'Nem fogja meg a tapadást, holtjátékot, valódi zajt — ez a valóságrés.', 'Szűkítés: zaj az érzékelőkhöz, véletlenített paraméterek, modellezett késleltetés.', 'Mérj a valóságban, és arra állítsd a szimulációt.', 'A legértékesebb teszt a hibaeset, nem a sikeres futás.'],
      terms: [{ term: 'valóságrés', def: 'A szimuláció és a valóság közti eltérés.' }, { term: 'paraméter-véletlenítés', def: 'A modell paramétereinek futásonkénti változtatása a robusztusságért.' }, { term: 'hibainjektálás', def: 'Szándékos hiba előidézése a vezérlés próbájához.' }],
    },
  },
  {
    day: 28,
    title: 'Alkatrészválasztás',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'A jó robot nem a legjobb alkatrészekből áll, hanem **egymáshoz illő** alkatrészekből. Az alkatrészválasztás sorrendje számít.' },
      { k: 'callout', tone: 'key', md: 'A helyes sorrend **a végétől visszafelé**:\n\n1. **Mit kell csinálnia?** — tömeg, sebesség, terep, üzemidő\n2. **Mekkora nyomaték kell a kerékre?** — ebből jön a motor és a hajtómű\n3. **Mekkora áram kell?** — ebből jön a motorvezérlő\n4. **Mekkora energia kell?** — ebből jön az akku\n5. **Mennyit kell számolni?** — ebből jön a vezérlő' },
      { k: 'code', lang: 'py', src: '# Mekkora motor kell?\nm = 3.0            # kg, a robot tömege\nr = 0.04           # m, kerékrádiusz\na = 0.5            # m/s2, kívánt gyorsulás\nlejto = 0.1        # 10 százalékos emelkedő\ng = 9.81\n\nF = m*a + m*g*lejto          # gyorsítás + lejtő\nM_ossz = F * r\nprint(f"Szükséges össznyomaték: {M_ossz:.3f} Nm")\nprint(f"Négy kerékre: {M_ossz/4:.3f} Nm, tartalékkal: {M_ossz/4*2:.3f} Nm")\n# 0.178 Nm / kerék, tartalékkal 0.356 Nm', explain: 'A **kétszeres tartalék** nem pazarlás: a súrlódás, a hatásfok és a gyártási szórás mind elvesz belőle. Tartalék nélkül a robot papíron működik, a valóságban nem indul el.' },
      { k: 'text', md: 'A motorvezérlő kiválasztásánál a **blokkolási áram** a mérvadó, nem az üzemi. Egy motor, ami normálisan 1 A-t vesz fel, blokkolva 10 A-t is húzhat. A vezérlő ezt túl kell élje legalább néhány másodpercig.' },
      { k: 'callout', tone: 'warn', md: 'A **csatlakozók és a kábelkeresztmetszet** a leggyakrabban alulméretezett elem. Egy 20 amperes áramkörben a vékony kábel és a gyenge csatlakozó melegszik, feszültséget ejt, és végül megolvad. Ez nem a látványos rész, de ez okozza a legtöbb tüzet.' },
      { k: 'callout', tone: 'tip', md: 'Válassz **kapható** alkatrészt, ne a legjobbat. Egy nyolc hetes szállítási idejű ideális motor rosszabb, mint egy holnap megérkező jó. És mindig rendelj tartalékot a kopó és törékeny elemekből.' },
    ],
    quiz: [
      { k: 'single', q: 'Milyen sorrendben válassz alkatrészt?', opts: ['Vezérlő, akku, motor', 'A feladattól visszafelé: nyomaték, motor, vezérlő, akku', 'Ami tetszik'], answer: 1, why: 'Minden lépés a következő követelményét adja meg.' },
      { k: 'single', q: 'Mekkora tartalékkal válassz motort?', opts: ['Nincs szükség tartalékra', 'Körülbelül kétszeres', 'Tízszeres'], answer: 1, why: 'A súrlódás, a hatásfok és a gyártási szórás mind elvesz a számított értékből.' },
      { k: 'single', q: 'Mi a mérvadó a motorvezérlő kiválasztásánál?', opts: ['Az üzemi áram', 'A blokkolási áram', 'A feszültség'], answer: 1, why: 'Egy normálisan 1 A-t felvevő motor blokkolva 10 A-t is húzhat.' },
      { k: 'single', q: 'Melyik a leggyakrabban alulméretezett elem?', opts: ['A motor', 'A csatlakozók és a kábelkeresztmetszet', 'A vezérlő'], answer: 1, why: 'Nem a látványos rész, de ez okozza a legtöbb melegedést és tüzet.' },
      { k: 'single', q: 'Mi fontosabb a legjobb alkatrésznél?', opts: ['A legolcsóbb', 'Hogy kapható legyen', 'A legkönnyebb'], answer: 1, why: 'Egy nyolc hetes szállítási idejű ideális motor rosszabb, mint egy holnap megérkező jó.' },
    ],
    note: {
      summary: ['A jó robot egymáshoz illő alkatrészekből áll.', 'Sorrend: feladat → nyomaték → motor → vezérlő → akku → vezérlő.', 'Számolj kétszeres nyomatéktartalékkal.', 'A motorvezérlőt a blokkolási áramra méretezd.', 'A csatlakozó és a kábelkeresztmetszet a leggyakoribb alulméretezés.', 'Válassz kapható alkatrészt, és rendelj tartalékot.'],
      terms: [{ term: 'blokkolási áram', def: 'Az álló motor által felvett maximális áram.' }, { term: 'nyomatéktartalék', def: 'A számított nyomaték fölötti ráhagyás.' }, { term: 'kábelkeresztmetszet', def: 'A vezeték vastagsága, ami az átvihető áramot korlátozza.' }],
    },
  },
  {
    day: 29,
    title: 'Összeszerelés és kábelezés',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'A tervezés után az összeszerelés dönti el, hogy a robot megbízható lesz-e. Néhány szabály rengeteg későbbi hibakeresést spórol.' },
      { k: 'callout', tone: 'key', md: 'Szerelj **részegységenként, és tesztelj minden lépés után**. Egy motor beszerelve, bekötve, megforgatva — aztán a következő. Ha mind a négyet egyszerre szereled be, és a végén nem forog valamelyik, négy helyen kell keresned a hibát.' },
      { k: 'text', md: 'A bekötés alapszabályai:\n\n- **Közös föld** — minden áramkör földje egy ponton találkozzon (csillagpont), különben földhurok keletkezik és zaj\n- **Színkód** — piros a plusz, fekete a mínusz, és tartsd be végig\n- **Felirat minden kábelen** — két hónap múlva nem fogod tudni, melyik a bal első motor\n- **Biztosíték** az akku mellett közvetlenül, nem a vezérlőnél' },
      { k: 'callout', tone: 'warn', md: 'Az **akku csatlakoztatása legyen az utolsó lépés**, és fordítva: szétszereléskor az első, amit leveszel. Egy bekötött akku mellett végzett szerelés rövidzárlatot, szikrát és tönkrement vezérlőt jelent. A fordított polaritás egy pillanat alatt mindent megöl.' },
      { k: 'text', md: 'Az üzembe helyezés sorrendje:\n\n1. **Átnézés bekapcsolás előtt** — nincs lelógó szál, minden csavar meghúzva\n2. **Csak táp, motorok nélkül** — jó-e a feszültség a vezérlőn?\n3. **Motorok terhelés nélkül**, felbakolt kerékkel — jó irányba forognak?\n4. **Vészleállító próbája**\n5. **Első menet** kis sebességgel, kézzel elérhető közelségben' },
      { k: 'callout', tone: 'tip', md: 'Készíts **összeszerelési fényképeket** menet közben, és rajzolj egy egyszerű bekötési vázlatot. A következő javításnál, fél év múlva, ez a két dolog ér a legtöbbet — többet, mint bármilyen CAD modell.' },
    ],
    quiz: [
      { k: 'single', q: 'Hogyan szerelj?', opts: ['Mindent egyszerre, aztán teszt', 'Részegységenként, minden lépés után teszteléssel', 'Ahogy jön'], answer: 1, why: 'Ha négy motort egyszerre szerelsz be, négy helyen kell keresni a hibát.' },
      { k: 'single', q: 'Miért kell közös földpont (csillagpont)?', opts: ['Kevesebb kábel', 'Mert több földútvonal földhurkot és zajt okoz', 'Olcsóbb'], answer: 1, why: 'A földhurok a legnehezebben kereshető zajforrás egy robotban.' },
      { k: 'single', q: 'Hova kerüljön a biztosíték?', opts: ['A vezérlő mellé', 'Közvetlenül az akku mellé', 'Mindegy'], answer: 1, why: 'Így a teljes vezetékszakasz védett, nem csak a vezérlő utáni rész.' },
      { k: 'single', q: 'Mikor csatlakoztasd az akkut?', opts: ['Elsőként', 'Utolsó lépésként, és szétszereléskor elsőként vedd le', 'Bármikor'], answer: 1, why: 'Bekötött akku mellett szerelni rövidzárlatot és tönkrement vezérlőt jelent.' },
      { k: 'single', q: 'Mi ér a legtöbbet egy fél év múlva esedékes javításnál?', opts: ['A CAD modell', 'Az összeszerelési fényképek és a bekötési vázlat', 'A forráskód'], answer: 1, why: 'Ezekből derül ki, hogyan is állt össze a gép valójában.' },
    ],
    note: {
      summary: ['Szerelj részegységenként, és tesztelj minden lépés után.', 'Közös földpont (csillagpont) a földhurok ellen.', 'Színkód és felirat minden kábelen.', 'Biztosíték közvetlenül az akku mellé.', 'Az akku csatlakoztatása az utolsó lépés, leválasztása az első.', 'Üzembe helyezés: átnézés, táp, motor terhelés nélkül, vészleállító, első menet.', 'Készíts fényképeket és bekötési vázlatot.'],
      terms: [{ term: 'csillagpont', def: 'Egyetlen közös pont, ahol minden föld találkozik.' }, { term: 'földhurok', def: 'Több földútvonal által okozott zavarforrás.' }, { term: 'üzembe helyezés', def: 'A lépésenkénti, ellenőrzött első indítás.' }],
    },
  },
  {
    day: 30,
    title: 'Az első saját robotod',
    minutes: 30,
    lesson: [
      { k: 'text', md: 'Harminc nap után megvan minden darab: hajtás, érzékelés, szabályozás, térképezés, tervezés, biztonság. Most jön az, amiért az egész volt — építs valamit.' },
      { k: 'callout', tone: 'key', md: 'Az első robot legyen **szándékosan kicsi**. Egy vonalkövető, ami végigmegy egy pályán. Egy rover, ami elkerüli az akadályokat. Egy kar, ami átrak egy kockát. A kész kis gép többet ér, mint a félkész nagy.' },
      { k: 'text', md: 'A javasolt menet:\n\n1. **Írd le egy mondatban**, mit csinál. Ha nem fér egy mondatba, túl nagy.\n2. **Rajzold le** kézzel: mi hol van, mi mozog.\n3. **Számold ki** a nyomatékot és az energiát (28. nap).\n4. **Tervezd meg CAD-ben** a hordozó alkatrészeket.\n5. **Írd meg a vezérlést szimulációban** (27. nap), mielőtt bármit megépítesz.\n6. **Építsd meg** részegységenként, tesztelve (29. nap).\n7. **Hangolj** a valóságban: PID, küszöbök, sebességek.' },
      { k: 'callout', tone: 'warn', md: 'A leggyakoribb kudarc nem a technika, hanem a **méret**. A kezdő robotprojektek nagy része azért marad félbe, mert túl nagyra vállalták. Vágd ketté a tervet, építsd meg a felét, aztán bővítsd — működő gépre építeni mindig könnyebb.' },
      { k: 'text', md: 'Amit a következő körben érdemes hozzátenni, ha ez megvan:\n\n- **ROS 2** — ha a projekt több csomópontból áll, és nem akarod magad megírni a kommunikációt\n- **Kamera és látás** — vonalkövetés helyett valódi tárgyfelismerés\n- **Jobb hajtás** — léptetőmotor helyett szervó visszacsatolással\n- **Megosztás** — tedd fel a terveket és a kódot, hogy más is építhesse' },
      { k: 'callout', tone: 'tip', md: 'Vezess **építési naplót**: mit próbáltál, mi nem működött, és miért. Ez a napló fél év múlva többet fog érni, mint maga a robot — mert a következő gépet ebből fogod megtervezni.' },
    ],
    quiz: [
      { k: 'single', q: 'Milyen legyen az első saját robot?', opts: ['Minél összetettebb', 'Szándékosan kicsi és befejezhető', 'Verseny szintű'], answer: 1, why: 'A kész kis gép többet ér, mint a félkész nagy.' },
      { k: 'single', q: 'Mi a jó teszt arra, hogy nem túl nagy a terv?', opts: ['Belefér egy mondatba', 'Kevesebb mint tíz alkatrész', 'Egy nap alatt kész'], answer: 0, why: 'Ha nem fér egy mondatba, amit csinál, akkor túl nagy.' },
      { k: 'single', q: 'Mikor írd meg a vezérlést?', opts: ['Az építés után', 'Szimulációban, mielőtt bármit megépítesz', 'Közben'], answer: 1, why: 'A szimulációs kör sokkal gyorsabb, és a logikai hibák ott olcsón derülnek ki.' },
      { k: 'single', q: 'Mi a leggyakoribb oka a félbemaradt robotprojekteknek?', opts: ['Pénzhiány', 'Túl nagyra vállalt méret', 'Rossz alkatrészek'], answer: 1, why: 'Vágd ketté a tervet; működő gépre bővíteni mindig könnyebb.' },
      { k: 'single', q: 'Miért vezess építési naplót?', opts: ['Hogy szép legyen', 'Mert a következő gépet ebből fogod megtervezni', 'Kötelező'], answer: 1, why: 'Fél év múlva többet ér, mint maga a robot: ebben van, mi nem működött és miért.' },
    ],
    note: {
      summary: ['Az első robot legyen szándékosan kicsi és befejezhető.', 'Ha nem fér egy mondatba, amit csinál, túl nagy.', 'Menet: leírás, rajz, számítás, CAD, szimulált vezérlés, építés, hangolás.', 'A vezérlést szimulációban írd meg, mielőtt építesz.', 'A legtöbb projekt a túlvállalt mérettől marad félbe.', 'Következő kör: ROS 2, kamera, jobb hajtás, megosztás.', 'Vezess építési naplót — ez ér a legtöbbet később.'],
      terms: [{ term: 'hatókör (scope)', def: 'A projekt vállalt mérete és tartalma.' }, { term: 'építési napló', def: 'Feljegyzés arról, mit próbáltál és mi nem működött.' }, { term: 'ROS 2', def: 'Elterjedt robotikai keretrendszer csomópontok közti kommunikációhoz.' }],
    },
  },
];
