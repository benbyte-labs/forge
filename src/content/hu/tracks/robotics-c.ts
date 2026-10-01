import type { Day } from '../../types';

/** ROBOTIKA trek, 6–12. nap. */
export const roboticsHuC: Day[] = [
  {
    day: 6,
    title: 'Áramellátás és akkumulátor',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A kezdő robotok fele nem a kódtól nem működik, hanem a tápellátástól. Érdemes ezt a napot komolyan venni.' },
      { k: 'text', md: 'A három szám, amit minden akkuról tudnod kell:\n\n- **Feszültség (V)** — mennyit ad. Egy LiPo cella 3,7 V névleges, 4,2 V tele.\n- **Kapacitás (mAh)** — mennyi ideig. 2000 mAh elvileg 2 A-t ad egy órán át.\n- **C-érték** — mekkora áramot bír. 20C egy 2000 mAh-s akkun 40 A csúcsot jelent.' },
      { k: 'formula', tex: 't = \\frac{\\text{kapacitás (mAh)}}{\\text{fogyasztás (mA)}}', explain: 'Egy 2000 mAh-s akku 500 mA fogyasztásnál négy óráig bírja — elvileg. A gyakorlatban számolj 70-80%-kal.' },
      { k: 'callout', tone: 'key', md: 'A motor indításkor a névleges áram **többszörösét** veszi fel. Ettől a feszültség pillanatra beszakad, és a mikrokontroller újraindul. A tünet: „a robot resetel, amikor elindul". A megoldás: külön táp a logikának, vagy egy nagy kondenzátor a motor mellé.' },
      { k: 'callout', tone: 'warn', md: 'A LiPo cellát soha ne merítsd 3,0 V alá, és soha ne töltsd 4,2 V fölé. Mindkettő tönkreteszi, és a túltöltés tüzet okozhat. Használj védőáramkört és megfelelő töltőt.' },
    ],
    quiz: [
      { k: 'numeric', q: 'Egy 2000 mAh-s akku meddig bír 500 mA fogyasztást? (óra)', answer: 4, tol: 0.2, unit: 'h', why: 't = 2000 / 500 = 4 óra elvileg. A gyakorlatban a veszteségek miatt ennél kevesebb.' },
      { k: 'single', q: 'Miért resetel a mikrokontroller motorindításkor?', opts: ['Szoftverhiba', 'A motor indítóárama pillanatra beszakítja a feszültséget', 'Túlmelegszik'], answer: 1, why: 'Az indítóáram a névleges többszöröse. A feszültség leesik a mikrokontroller működési minimuma alá, és az újraindul.' },
      { k: 'single', q: 'Mit jelent a 20C egy 2000 mAh-s akkun?', opts: ['20 órán át bírja', '20 × 2 A = 40 A csúcsáramot bír', '20 V-os'], answer: 1, why: 'A C-érték a kapacitás szorzója. 2000 mAh = 2 Ah, és 20 × 2 A = 40 A a megengedett csúcs.' },
      { k: 'single', q: 'Mi a megoldás a feszültségbeszakadásra?', opts: ['Erősebb motor', 'Külön táp a logikának vagy nagy kondenzátor a motor mellé', 'Gyorsabb kód'], answer: 1, why: 'A logikát el kell választani a motor zajától. A kondenzátor pedig puffereli a pillanatnyi áramigényt.' },
    ],
    note: {
      summary: ['Az akku három száma: feszültség (V), kapacitás (mAh), C-érték.', 'Üzemidő = kapacitás / fogyasztás, a gyakorlatban 70-80%-a.', 'A motor indítóárama a névleges többszöröse, és beszakítja a feszültséget.', 'Ettől resetel a mikrokontroller — ez a leggyakoribb kezdő rejtély.', 'Megoldás: külön logikai táp vagy nagy kondenzátor a motor mellé.', 'LiPo-t soha ne merítsd 3,0 V alá, és ne töltsd 4,2 V fölé.'],
      terms: [{ term: 'kapacitás', def: 'Az akku által tárolt töltés, mAh-ban.' }, { term: 'C-érték', def: 'A kapacitás szorzója, ami a megengedett csúcsáramot adja.' }, { term: 'feszültségbeszakadás', def: 'A tápfeszültség pillanatnyi leesése nagy áramfelvételkor.' }],
    },
  },
  {
    day: 7,
    title: 'Mikrokontroller alapok',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A **mikrokontroller** egy teljes számítógép egy chipben: processzor, memória és ki-bemeneti lábak. Nincs rajta operációs rendszer — a te programod az egyetlen, ami fut.' },
      { k: 'text', md: 'Amivel kezdeni fogsz:\n\n- **Arduino (ATmega328)** — a legegyszerűbb, rengeteg példa. 16 MHz, 2 KB RAM.\n- **ESP32** — wifivel és bluetoothszal, sokkal erősebb. 240 MHz, 520 KB RAM.\n- **Raspberry Pi Pico** — olcsó, kétmagos, jól dokumentált.' },
      { k: 'code', lang: 'c', src: 'void setup() {\n    pinMode(13, OUTPUT);     // egyszer fut le, induláskor\n}\n\nvoid loop() {\n    digitalWrite(13, HIGH);  // örökké ismétlődik\n    delay(500);\n    digitalWrite(13, LOW);\n    delay(500);\n}', explain: 'Ez ugyanaz a vezérlési hurok, amit az első napon láttál. A `setup` a beállítás, a `loop` a sense-decide-act ciklus.' },
      { k: 'callout', tone: 'warn', md: 'A `delay()` **megállítja az egész programot**. Félmásodperces delay alatt a robot nem érzékel, nem dönt, nem reagál. Komoly vezérlőben ezért `millis()`-szel mérünk időt, delay helyett.' },
      { k: 'callout', tone: 'key', md: 'A memória kevés. Egy Arduinón 2 KB RAM van — ennyibe egy közepes szöveg is alig fér bele. Ezért van a beágyazott programozásban annyi `int` és olyan kevés dinamikus memóriafoglalás.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi fut egy mikrokontrolleren a programod mellett?', opts: ['Linux', 'Semmi — nincs operációs rendszer', 'Windows'], answer: 1, why: 'A te programod az egyetlen. Ez egyszerűsít, de azt is jelenti, hogy minden a te felelősséged.' },
      { k: 'single', q: 'Mi a baj a `delay()` használatával?', opts: ['Pontatlan', 'Megállítja az egész programot: nem érzékel és nem reagál', 'Sok memóriát eszik'], answer: 1, why: 'A delay blokkol. Egy robot nem engedheti meg magának, hogy fél másodpercig vak legyen.' },
      { k: 'single', q: 'Mivel mérünk időt delay helyett?', opts: ['sleep()', 'millis()', 'wait()'], answer: 1, why: 'A `millis()` az indulás óta eltelt ezredmásodperceket adja. Ezzel nem blokkolva lehet időzíteni.' },
      { k: 'single', q: 'Mennyi RAM van egy klasszikus Arduinón?', opts: ['2 KB', '2 MB', '2 GB'], answer: 0, why: 'Két kilobájt. Ezért kerüli a beágyazott kód a dinamikus memóriafoglalást és a nagy adatszerkezeteket.' },
    ],
    note: {
      summary: ['A mikrokontroller teljes számítógép egy chipben, operációs rendszer nélkül.', 'Gyakori darabok: Arduino, ESP32, Raspberry Pi Pico.', 'A `setup` egyszer fut, a `loop` örökké — ez a vezérlési hurok.', 'A `delay()` blokkol: a robot alatta nem érzékel és nem reagál.', 'Időzítéshez `millis()`-t használj, nem delay-t.', 'A memória kevés: egy Arduinón 2 KB RAM van.'],
      terms: [{ term: 'mikrokontroller', def: 'Egy chipbe integrált processzor, memória és ki-bemenet.' }, { term: 'setup és loop', def: 'Az Arduino program két kötelező függvénye: indítás és fő ciklus.' }, { term: 'blokkoló késleltetés', def: 'Olyan várakozás, ami alatt a program semmi mást nem csinál.' }],
    },
  },
  {
    day: 8,
    title: 'Digitális és analóg jelek',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A mikrokontroller lábai kétféle jelet ismernek. A különbség megértése nélkül nem fogsz tudni szenzort bekötni.' },
      { k: 'text', md: '**Digitális:** csak két állapot, HIGH vagy LOW. Gomb, LED, kapcsoló, ki-be jel.\n\n**Analóg:** folytonos feszültség 0 és a referencia közt. Potenciométer, fényérzékelő, hőmérő, akkufeszültség.' },
      { k: 'code', lang: 'c', src: '// digitális\nint allapot = digitalRead(2);      // HIGH vagy LOW\ndigitalWrite(13, HIGH);\n\n// analóg\nint nyers = analogRead(A0);        // 0..1023 (10 bites ADC)\ndouble volt = nyers * 5.0 / 1023.0;', explain: 'Az `analogRead` nem voltot ad, hanem egy egész számot. A 10 bites ADC 1024 lépésre osztja a 0–5 V tartományt.' },
      { k: 'callout', tone: 'key', md: 'Az **ADC felbontása** szabja meg a pontosságot. 10 biten a lépésköz 5 V / 1024 ≈ 4,9 mV. Ennél finomabb különbséget nem fogsz látni, akármilyen jó a szenzorod.' },
      { k: 'callout', tone: 'warn', md: 'A szabadon hagyott digitális bemenet „lebeg": véletlenszerűen HIGH és LOW közt ugrál. Gombnál ezért kell **felhúzó vagy lehúzó ellenállás** — vagy a beépített `INPUT_PULLUP` mód.' },
    ],
    quiz: [
      { k: 'numeric', q: 'Mekkora feszültséget jelent az 512-es analogRead érték 5 V-os referencián? (V, egy tizedes)', answer: 2.5, tol: 0.1, unit: 'V', why: '512 / 1023 × 5 V ≈ 2,5 V. Az 512 nagyjából a tartomány fele.' },
      { k: 'single', q: 'Mit ad vissza az `analogRead`?', opts: ['Voltot', 'Egy egész számot 0 és 1023 közt', 'HIGH vagy LOW értéket'], answer: 1, why: 'Az ADC a feszültséget lépésekre bontja. A voltra átszámítás a te dolgod.' },
      { k: 'single', q: 'Miért kell felhúzó ellenállás egy gombhoz?', opts: ['Hogy ne égjen ki', 'Mert a szabadon hagyott bemenet lebeg és véletlenszerű értéket ad', 'Hogy gyorsabb legyen'], answer: 1, why: 'Lebegő bemenetnél a mérés zajt olvas. A felhúzó ellenállás határozott alapállapotot ad.' },
      { k: 'single', q: 'Mi a 10 bites ADC lépésköze 5 V-on?', opts: ['Kb. 4,9 mV', 'Kb. 50 mV', 'Pontosan 1 mV'], answer: 0, why: '5 V osztva 1024 lépéssel ≈ 4,9 mV. Ennél kisebb különbséget a mikrokontroller nem lát.' },
    ],
    note: {
      summary: ['Digitális jel: két állapot, HIGH vagy LOW.', 'Analóg jel: folytonos feszültség, amit az ADC számmá alakít.', 'A 10 bites ADC 0–1023 értéket ad; a voltra átszámítás a te dolgod.', 'A felbontás szabja meg a pontosságot: 5 V / 1024 ≈ 4,9 mV.', 'A szabadon hagyott digitális bemenet lebeg — felhúzó ellenállás kell.'],
      terms: [{ term: 'ADC', def: 'Analóg-digitális átalakító, ami feszültségből számot csinál.' }, { term: 'felbontás', def: 'Az ADC lépésköze, ami a megkülönböztethető legkisebb különbséget adja.' }, { term: 'felhúzó ellenállás', def: 'Határozott alapállapotot adó ellenállás egy bemeneten.' }],
    },
  },
  {
    day: 9,
    title: 'I2C, SPI, UART',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Ha a szenzor többet akar mondani egyetlen feszültségnél, **kommunikációs protokoll** kell. Három van, amivel találkozni fogsz.' },
      { k: 'text', md: '**I2C** — két vezeték (SDA, SCL), sok eszköz egy buszon, mindegyiknek címe van. Lassabb, de egyszerű a bekötés. Giroszkóp, kijelző, hőmérő.\n\n**SPI** — négy vezeték, gyors, eszközönként külön kiválasztó láb. SD-kártya, kijelző, nagy sebességű szenzor.\n\n**UART** — két vezeték (RX, TX), két eszköz közt. GPS, bluetooth modul, soros konzol.' },
      { k: 'callout', tone: 'key', md: 'Az I2C-nél minden eszköznek **egyedi címe** kell legyen a buszon. Két azonos című szenzort nem köthetsz ugyanarra a két vezetékre — ilyenkor cím-átállító lábat vagy multiplexert kell használni.' },
      { k: 'code', lang: 'c', src: '#include <Wire.h>\n\nvoid setup() {\n    Wire.begin();\n    Serial.begin(115200);\n}\n\nvoid loop() {\n    Wire.beginTransmission(0x68);   // az eszköz címe\n    Wire.write(0x3B);               // melyik regisztert kérjük\n    Wire.endTransmission(false);\n    Wire.requestFrom(0x68, 2);\n    int ertek = (Wire.read() << 8) | Wire.read();\n    Serial.println(ertek);\n}', explain: 'Ez a minta minden I2C szenzornál ugyanaz: cím, regiszter, kérés, olvasás. A `<< 8` a két bájtot egy 16 bites számmá fűzi.' },
      { k: 'callout', tone: 'warn', md: 'Az I2C-hez **felhúzó ellenállás** kell mindkét vonalra (tipikusan 4,7 kΩ). Sok modulon már rajta van — de ha több modult kötsz össze, a párhuzamos ellenállások túl kicsik lesznek.' },
    ],
    quiz: [
      { k: 'single', q: 'Hány vezeték kell az I2C-hez?', opts: ['Kettő: SDA és SCL', 'Négy', 'Egy'], answer: 0, why: 'Egy adat- és egy óravezeték. Ezen sok eszköz osztozik, mindegyik a saját címén.' },
      { k: 'single', q: 'Mi történik, ha két azonos című eszköz van az I2C buszon?', opts: ['Felváltva válaszolnak', 'Ütköznek, és egyik sem működik megbízhatóan', 'Automatikusan megoldódik'], answer: 1, why: 'A cím azonosítja az eszközt. Két azonos címnél a mester nem tudja, kihez beszél.' },
      { k: 'single', q: 'Melyiket használnád GPS modulhoz?', opts: ['I2C', 'UART', 'SPI'], answer: 1, why: 'A GPS modulok tipikusan soros adatfolyamot küldenek, ami pontosan a UART dolga.' },
      { k: 'single', q: 'Mit csinál a `(Wire.read() << 8) | Wire.read()`?', opts: ['Két értéket összead', 'Két bájtból egy 16 bites számot épít', 'Kétszer olvas ugyanonnan'], answer: 1, why: 'A felső bájtot nyolc bittel balra tolja, és hozzá-vagyolja az alsót. Így lesz a két bájtból egy szám.' },
    ],
    note: {
      summary: ['I2C: két vezeték, sok eszköz, mindegyiknek egyedi címe.', 'SPI: négy vezeték, gyors, eszközönként külön kiválasztó láb.', 'UART: két vezeték, pont-pont kapcsolat (GPS, bluetooth, konzol).', 'Az I2C minta mindig: cím, regiszter, kérés, olvasás.', 'Két azonos című eszköz nem lehet ugyanazon az I2C buszon.', 'Az I2C-hez felhúzó ellenállás kell mindkét vonalra.'],
      terms: [{ term: 'I2C', def: 'Kétvezetékes busz, amin több eszköz osztozik cím alapján.' }, { term: 'SPI', def: 'Gyors, négyvezetékes protokoll eszközönkénti kiválasztással.' }, { term: 'UART', def: 'Kétvezetékes soros kapcsolat két eszköz közt.' }],
    },
  },
  {
    day: 10,
    title: 'Zaj és szűrés',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Minden valódi mérés zajos. A kérdés nem az, hogyan szabadulj meg a zajtól — hanem hogy mennyit vagy hajlandó fizetni érte **késleltetésben**.' },
      { k: 'code', lang: 'c', src: '// 1. Mozgóátlag: egyszerű, de memóriát és késleltetést igényel\ndouble atlag(int *minta, int db) {\n    long osszeg = 0;\n    for (int i = 0; i < db; i++) osszeg += minta[i];\n    return (double) osszeg / db;\n}' },
      { k: 'code', lang: 'c', src: '// 2. Exponenciális szűrő: egyetlen változó, nagyon hatékony\ndouble szurt = 0;\nconst double ALFA = 0.2;     // 0 = lomha, 1 = nyers\n\nvoid frissit(double uj) {\n    szurt = ALFA * uj + (1 - ALFA) * szurt;\n}', explain: 'Ez a legjobb ár-érték arányú szűrő beágyazott rendszerben: egy szorzás, egy összeadás, egy változó.' },
      { k: 'callout', tone: 'key', md: 'Minden szűrő **késleltet**. Minél simább a jel, annál lassabban követi a valódi változást. Egy ütközéselkerülő szenzornál a túl erős szűrés azt jelenti, hogy a robot későn fékez.' },
      { k: 'callout', tone: 'tip', md: 'Kiugró értékek ellen a **medián** jobb, mint az átlag: három mérésből a középsőt véve egyetlen hibás érték sem rontja el az eredményt. Az átlagot egy 400 cm-es hamis mérés elhúzza.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi minden szűrő ára?', opts: ['Memória', 'Késleltetés', 'Pontatlanság'], answer: 1, why: 'A simítás múltbeli adatokra épül, ezért a szűrt jel mindig késik a valódihoz képest.' },
      { k: 'single', q: 'Mit jelent az ALFA = 0.2 az exponenciális szűrőben?', opts: ['Gyorsan követ', 'Az új mérés 20%-ban számít, a régi érték 80%-ban', 'Kikapcsolja a szűrést'], answer: 1, why: 'Kis alfa simább, de lomhább jelet ad. Nagy alfa gyorsan követ, de zajosabb marad.' },
      { k: 'single', q: 'Mivel védekezel egyetlen kiugró mérés ellen?', opts: ['Átlaggal', 'Mediánnal', 'Nagyobb alfával'], answer: 1, why: 'Az átlagot egy hamis 400 cm-es érték elhúzza. A medián a középsőt veszi, így a kiugró érték kiesik.' },
      { k: 'single', q: 'Mi az exponenciális szűrő előnye a mozgóátlaggal szemben?', opts: ['Pontosabb', 'Egyetlen változót igényel, nem egy puffert', 'Nincs késleltetése'], answer: 1, why: 'Nem kell tárolni a korábbi mintákat. Kevés memóriájú mikrokontrolleren ez döntő.' },
    ],
    note: {
      summary: ['Minden valódi mérés zajos; a szűrés ára a késleltetés.', 'Mozgóátlag: egyszerű, de puffert és memóriát igényel.', 'Exponenciális szűrő: egyetlen változó, egy szorzás — a legjobb ár-érték arány.', 'Kis alfa simább és lomhább, nagy alfa gyorsabb és zajosabb.', 'Kiugró értékek ellen a medián jobb, mint az átlag.', 'Túl erős szűrés az ütközéselkerülésnél késői fékezést jelent.'],
      terms: [{ term: 'mozgóátlag', def: 'Az utolsó n minta átlaga, pufferrel.' }, { term: 'exponenciális szűrő', def: 'Egyváltozós simítás, ahol az új mérés súlya alfa.' }, { term: 'medián szűrés', def: 'A középső érték kiválasztása több mérésből, kiugrók ellen.' }],
    },
  },
  {
    day: 11,
    title: 'Egyenes kinematika',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'Az **egyenes kinematika** kérdése: ha tudom minden ízület szögét, hol van a kar vége? Ez a könnyebb irány — csak trigonometria.' },
      { k: 'formula', tex: 'x = L_1\\cos\\theta_1 + L_2\\cos(\\theta_1 + \\theta_2)', explain: 'Kétízületes síkbeli kar vízszintes koordinátája. Minden szakasz hozzáad egy vetületet, és a szögek összeadódnak.' },
      { k: 'formula', tex: 'y = L_1\\sin\\theta_1 + L_2\\sin(\\theta_1 + \\theta_2)', explain: 'Ugyanaz függőlegesen. A két képlet együtt megadja a végpontot.' },
      { k: 'code', lang: 'py', src: 'import math\n\nL1, L2 = 30, 25\n\ndef veg(t1, t2):\n    a1 = math.radians(t1)\n    a2 = a1 + math.radians(t2)\n    x = L1 * math.cos(a1) + L2 * math.cos(a2)\n    y = L1 * math.sin(a1) + L2 * math.sin(a2)\n    return x, y\n\nprint(veg(0, 0))     # (55, 0) — teljesen kinyújtva', explain: 'A szögek **összeadódnak**: a második ízület szöge az elsőhöz képest értendő, nem a vízszinteshez.' },
      { k: 'robot', scene: 'arm-bench' },
      { k: 'callout', tone: 'key', md: 'Az egyenes kinematikának **mindig pontosan egy megoldása** van: adott szögekhez egy végpont tartozik. Az inverz irány ennél sokkal nehezebb — holnap meglátod, miért.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit számol ki az egyenes kinematika?', opts: ['A szükséges szögeket egy célponthoz', 'A végpont helyét az ízületszögekből', 'A kar tömegét'], answer: 1, why: 'Szögekből pozíció. Ez a könnyű irány, mert csak be kell helyettesíteni a képletbe.' },
      { k: 'numeric', q: 'L1 = 30, L2 = 25, mindkét szög 0. Hol van a végpont x koordinátája? (cm)', answer: 55, tol: 0.5, unit: 'cm', why: 'Nulla szögnél mindkét szakasz vízszintesen áll: 30 + 25 = 55 cm.' },
      { k: 'single', q: 'Hogyan értendő a második ízület szöge?', opts: ['A vízszinteshez képest', 'Az előző szakaszhoz képest', 'A föld felé'], answer: 1, why: 'Ezért adódnak össze a szögek a képletben: a második szakasz iránya az első irányához képest fordul el.' },
      { k: 'single', q: 'Hány megoldása van az egyenes kinematikának?', opts: ['Mindig pontosan egy', 'Nulla vagy kettő', 'Végtelen'], answer: 0, why: 'Adott szögekhez egyetlen végpont tartozik. Az inverz irány az, ahol több megoldás is lehet.' },
    ],
    note: {
      summary: ['Az egyenes kinematika az ízületszögekből számítja a végpontot.', 'A szögek összeadódnak: a második ízület az elsőhöz képest fordul.', 'x = L1·cos(θ1) + L2·cos(θ1+θ2), y ugyanígy szinusszal.', 'A szögfüggvények radiánt várnak — fokból át kell váltani.', 'Az egyenes kinematikának mindig pontosan egy megoldása van.'],
      terms: [{ term: 'egyenes kinematika', def: 'A végpont helyének számítása az ízületszögekből.' }, { term: 'szakaszhossz', def: 'A kar egy merev elemének hossza.' }, { term: 'halmozott szög', def: 'Az ízületszögek összege, ami a szakasz abszolút irányát adja.' }],
    },
  },
  {
    day: 12,
    title: 'Inverz kinematika',
    minutes: 26,
    lesson: [
      { k: 'text', md: 'Az **inverz kinematika** a fordított kérdés: ide akarom tenni a kar végét — milyen szögek kellenek hozzá? Ez a nehezebb irány, és nem mindig van megoldása.' },
      { k: 'text', md: 'Három eset lehetséges:\n\n- **Nincs megoldás** — a pont messzebb van, mint L1 + L2, vagy közelebb, mint |L1 − L2|.\n- **Pontosan egy** — a pont épp a határon van, a kar teljesen kinyújtva vagy behajlítva.\n- **Kettő** — „könyök fel" és „könyök le": két különböző szögpár ugyanoda visz.' },
      { k: 'formula', tex: '\\cos\\theta_2 = \\frac{x^2 + y^2 - L_1^2 - L_2^2}{2L_1L_2}', explain: 'A koszinusztétel adja a második ízület szögét. Ha az eredmény -1 és 1 közt van, van megoldás; ha kívül, a pont elérhetetlen.' },
      { k: 'code', lang: 'py', src: 'import math\n\ndef inverz(x, y, L1=30, L2=25):\n    d2 = x*x + y*y\n    c2 = (d2 - L1*L1 - L2*L2) / (2*L1*L2)\n    if c2 < -1 or c2 > 1:\n        return None                     # elérhetetlen\n    t2 = -math.acos(c2)                 # könyök fel\n    t1 = math.atan2(y, x) - math.atan2(L2*math.sin(t2), L1 + L2*math.cos(t2))\n    return math.degrees(t1), math.degrees(t2)', explain: 'Ugyanez a kód fut a FORGE Robot Laborjában. A `None` visszaadása fontos: jobb bevallani, hogy nem megy, mint közelítőleg rossz szögeket adni.' },
      { k: 'robot', scene: 'arm-bench' },
      { k: 'callout', tone: 'key', md: 'A két megoldás közül a **könyök fel** a szokásos választás: így a kar nem ütközik az asztallal. Valódi robotnál az is számít, melyik éri el gyorsabban az új pozíciót a jelenlegiből.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit számol ki az inverz kinematika?', opts: ['A végpont helyét', 'A szükséges ízületszögeket egy célponthoz', 'A kar sebességét'], answer: 1, why: 'Pozícióból szögek. Ez a nehéz irány, mert nem mindig van megoldás, és néha több is van.' },
      { k: 'single', q: 'Mikor nincs megoldás?', opts: ['Soha', 'Ha a pont messzebb van, mint L1+L2, vagy közelebb, mint |L1−L2|', 'Ha negatív a koordináta'], answer: 1, why: 'A kar csak egy gyűrűn belül ér el: a teljes nyújtáson belül, de a behajlított minimumon kívül.' },
      { k: 'single', q: 'Hány megoldás van egy elérhető, nem határhelyzetű pontra?', opts: ['Egy', 'Kettő: könyök fel és könyök le', 'Végtelen'], answer: 1, why: 'A kar kétféleképpen hajolhat ugyanoda. Valódi robotnál kell egy szabály, melyiket válassza.' },
      { k: 'single', q: 'Miért jobb `None`-t adni elérhetetlen pontnál, mint közelítő szögeket?', opts: ['Gyorsabb', 'Mert a közelítő érték csendben rossz helyre vinné a kart', 'Kevesebb kódot kell írni'], answer: 1, why: 'A hívó legalább tudja, hogy baj van. Egy csendes közelítés pedig ütközéshez vagy hibás művelethez vezet.' },
    ],
    note: {
      summary: ['Az inverz kinematika a célpontból számítja a szükséges ízületszögeket.', 'Három eset: nincs megoldás, pontosan egy, vagy kettő (könyök fel és le).', 'A koszinusztétel adja a második szöget; ha |cos| > 1, a pont elérhetetlen.', 'Elérhetetlen pontnál adj vissza `None`-t, ne közelítő szögeket.', 'A könyök fel a szokásos választás: így a kar nem ütközik az asztallal.'],
      terms: [{ term: 'inverz kinematika', def: 'Az ízületszögek számítása egy kívánt végpontból.' }, { term: 'munkatér', def: 'Azon pontok halmaza, amiket a kar elér.' }, { term: 'könyök fel megoldás', def: 'A két lehetséges szögpár közül az, amelyiknél a könyök felfelé hajlik.' }],
    },
  },
];
