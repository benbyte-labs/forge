import type { Day } from '../../types';

/** CAD trek, 27–30. nap. */
export const cadHuF: Day[] = [
  {
    day: 27,
    title: 'Szeletelés és rétegvastagság',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'A **szeletelő** (slicer) alakítja a 3D modellt a nyomtató számára érthető útvonalakká. Itt dől el a legtöbb minőségi kérdés — gyakran többen múlik rajta, mint magán a modellen.' },
      { k: 'callout', tone: 'key', md: 'A négy legfontosabb beállítás:\n\n- **Rétegvastagság** — 0,1 mm finom és lassú, 0,2 mm az alapértelmezés, 0,3 mm gyors és durva\n- **Falak száma** — a szilárdság nagy része innen jön; 3-4 fal rendszerint többet ér, mint a kitöltés növelése\n- **Kitöltés** (infill) — 15-20 százalék elég a legtöbb alkatrészhez\n- **Nyomtatási sebesség** — lassabb jobb minőséget ad, főleg az első rétegnél' },
      { k: 'text', md: 'Egy gyakori félreértés: a **kitöltés növelése nem teszi erőssé** az alkatrészt. 20 százalékról 50-re emelni megduplázza az időt és az anyagot, de a hajlítószilárdságot alig növeli. Ugyanazért az időért inkább **vastagítsd a falakat** — az külső anyag, és az veszi fel a hajlítás terhét.' },
      { k: 'code', lang: 'js', src: '// Ökölszabályok a gyakorlatból\nreteg          = 0.2    // mm, jó alapértelmezés\nfalak          = 3      // 0,4-es fúvókánál 1,2 mm falvastagság\nkitoltes       = 20     // százalék, giroid mintával\nelso_reteg     = 0.3    // mm, vastagabb a jobb tapadásért\nelso_sebesseg  = 20     // mm/s, lassan\n\n// Terhelt alkatrészhez:\nfalak_terhelt  = 5      // 2 mm fal, jóval erősebb\nkitoltes_terh  = 40     // és csak ezután emeld a kitöltést', explain: 'A falszám és a kitöltés viszonya a legfontosabb döntés. A fal külső anyag, ami a hajlítás terhét viseli; a kitöltés belső, és főleg a lapok behorpadása ellen véd.' },
      { k: 'callout', tone: 'warn', md: 'Az **első réteg** dönti el, hogy sikerül-e a nyomtatás. Vastagabb réteg, lassabb sebesség, melegebb asztal. Ha az első réteg nem tapad, a darab elmozdul, és minden fölötte lévő réteg hibás lesz. A nyomtatási hibák jó fele itt kezdődik.' },
      { k: 'callout', tone: 'tip', md: 'A szeletelő **előnézete** a legfontosabb és legkevésbé használt eszköz. Léptesd végig rétegenként a modellt nyomtatás előtt: látod, hol lesz támasz, hol vékony a fal, és hol fog átlógni a geometria. Két perc, és megspórol egy hatórás elrontott nyomtatást.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a jó alapértelmezett rétegvastagság?', opts: ['0,05 mm', '0,2 mm', '0,5 mm'], answer: 1, why: '0,1 mm finom és lassú, 0,3 mm gyors és durva. A 0,2 a jó középút.' },
      { k: 'single', q: 'Mi erősíti jobban az alkatrészt?', opts: ['A kitöltés növelése', 'Több fal', 'Lassabb nyomtatás'], answer: 1, why: 'A fal külső anyag, ami a hajlítás terhét viseli. A kitöltés növelése alig segít.' },
      { k: 'single', q: 'Mennyi kitöltés elég a legtöbb alkatrészhez?', opts: ['5 százalék', '15-20 százalék', '100 százalék'], answer: 1, why: 'Ennél többre csak erősen terhelt darabnál van szükség, és akkor is előbb a falakat vastagítsd.' },
      { k: 'single', q: 'Miért fontos különösen az első réteg?', opts: ['Ez látszik legjobban', 'Ha nem tapad, a darab elmozdul és minden fölötte hibás lesz', 'Ez a legvastagabb'], answer: 1, why: 'A nyomtatási hibák jó fele az első rétegnél kezdődik.' },
      { k: 'single', q: 'Mire jó a szeletelő előnézete?', opts: ['Szépen mutat', 'Rétegenként végigléptetve látod a támaszt, a vékony falat és az átlógást', 'Gyorsít'], answer: 1, why: 'Két perc, és megspórol egy hatórás elrontott nyomtatást.' },
    ],
    note: {
      summary: ['A szeletelő alakítja a modellt nyomtatói útvonalakká.', 'Rétegvastagság: 0,1 finom, 0,2 alapértelmezés, 0,3 gyors.', 'A szilárdság nagy része a falakból jön, nem a kitöltésből.', '15-20 százalék kitöltés elég; előbb a falakat vastagítsd.', 'Az első réteg vastagabb és lassabb legyen.', 'Nézd végig a szeletelő előnézetét rétegenként nyomtatás előtt.'],
      terms: [{ term: 'szeletelő (slicer)', def: 'A modellt nyomtatói útvonalakká alakító program.' }, { term: 'kitöltés (infill)', def: 'A darab belsejét kitöltő rácsszerkezet.' }, { term: 'falszám', def: 'A külső kerület mentén nyomtatott vonalak száma.' }],
    },
  },
  {
    day: 28,
    title: 'Utómunka és illesztés',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A nyomtatóból kijövő darab ritkán kész. Néhány egyszerű utómunka-lépés dönti el, hogy működő alkatrész lesz-e belőle vagy csak egy formás műanyagdarab.' },
      { k: 'callout', tone: 'key', md: 'A három lépés, ami szinte mindig kell:\n\n1. **Támasz eltávolítása** — csípőfogóval, majd a maradék sorjázása\n2. **Furatok átfúrása** — a nyomtatott furat mindig szűkebb; fúró vagy dörzsár a névleges méretre\n3. **Illeszkedő felületek megtisztítása** — az első réteg kiszélesedő pereme (elefántláb) reszelővel levehető' },
      { k: 'text', md: 'Az **elefántláb** gyakori és alattomos: az első réteg a melegágy nyomásától kissé szétterül, és a darab alja 0,2-0,3 mm-rel nagyobb lesz. Ettől nem fér be oda, ahova tervezted. Két megoldás: a szeletelőben **elephant foot compensation**, vagy utólag egy letörés reszelővel.' },
      { k: 'callout', tone: 'warn', md: 'A **menetes betét beolvasztása** gyakorlatot kíván. A páka 200 fok körül legyen, a betétet lassan, függőlegesen nyomd be, és hagyd kihűlni, mielőtt csavart tennél bele. Túl gyorsan nyomva félrebillen; túl melegen a műanyag kibuggyan köré.' },
      { k: 'text', md: 'A ragasztás anyagfüggő:\n\n- **PLA és PETG** — ciánakrilát (pillanatragasztó) jól fog\n- **ABS** — acetonnal oldva magával a műanyaggal ragasztható, ez a legerősebb kötés\n- **Nylon** — szinte semmi nem fog rajta; csavarozd vagy nyomtasd egyben\n\nNagy felületen epoxi mindegyiknél jó.' },
      { k: 'callout', tone: 'tip', md: 'Tervezéskor hagyj **0,2 mm-es hézagot** minden illeszkedő felületnél, és adj hozzá egy kis **letörést** a beillesztés irányába. A letörés mint vezetőfelület működik: a darab magától a helyére talál, és nem akad meg a peremen.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi az elefántláb?', opts: ['Egy támasztípus', 'Az első réteg kiszélesedése, amitől a darab alja nagyobb lesz', 'Egy nyomtatási hiba a tetején'], answer: 1, why: '0,2-0,3 mm-es eltérés, amitől a darab nem fér be oda, ahova tervezted.' },
      { k: 'single', q: 'Miért kell a furatokat átfúrni?', opts: ['Szebb lesz', 'Mert a nyomtatott furat mindig szűkebb a névlegesnél', 'Hogy erősebb legyen'], answer: 1, why: 'Fúró vagy dörzsár hozza a névleges méretre.' },
      { k: 'single', q: 'Hány fokos legyen a páka menetes betét beolvasztásához?', opts: ['100 fok', '200 fok körül', '350 fok'], answer: 1, why: 'Lassan, függőlegesen nyomd be, és hagyd kihűlni, mielőtt csavart teszel bele.' },
      { k: 'single', q: 'Mivel ragasztható legerősebben az ABS?', opts: ['Pillanatragasztóval', 'Acetonnal, magával a műanyaggal', 'Vízzel'], answer: 1, why: 'Az aceton oldja az ABS-t, és a kötés gyakorlatilag összeolvasztás.' },
      { k: 'single', q: 'Mit adj a beillesztés irányába tervezéskor?', opts: ['Nagyobb hézagot', 'Egy letörést, ami vezetőfelületként működik', 'Több anyagot'], answer: 1, why: 'A darab magától a helyére talál, és nem akad meg a peremen.' },
    ],
    note: {
      summary: ['A nyomtatott darab ritkán kész: támasz, furat, felület.', 'A nyomtatott furat mindig szűkebb: fúrd át névleges méretre.', 'Elefántláb: az első réteg kiszélesedése; kompenzáld vagy reszeld le.', 'Menetes betét: 200 fokos páka, lassan, függőlegesen, majd hűlés.', 'Ragasztás: PLA/PETG pillanatragasztó, ABS aceton, nylon szinte semmi.', 'Tervezz 0,2 mm hézagot és letörést a beillesztés irányába.'],
      terms: [{ term: 'elefántláb', def: 'Az első réteg kiszélesedése a darab alján.' }, { term: 'sorjázás', def: 'A kiálló maradványok eltávolítása a felületről.' }, { term: 'dörzsár', def: 'Pontos furatméretet adó forgácsoló szerszám.' }],
    },
  },
  {
    day: 29,
    title: 'Az első robotalkatrészed',
    minutes: 26,
    lesson: [
      { k: 'text', md: 'Itt az ideje egy teljes alkatrészt végigvinni a követelménytől a kinyomtatott darabig. Egy motortartó jó választás: elég egyszerű ahhoz, hogy egy ülésben kész legyen, és elég valódi ahhoz, hogy minden lépés benne legyen.' },
      { k: 'callout', tone: 'key', md: 'A teljes menet:\n\n1. **Követelmények** — melyik motor, milyen terhelés, hova csavarozódik\n2. **Paraméterek** — minden szám a listába, nevekkel (13. nap)\n3. **Vázlat** teljesen meghatározva, funkcionális kényszerekkel (14. nap)\n4. **Test** extrude-dal, utána a részletek\n5. **Lekerekítés és letörés** a végén\n6. **Szerelvénybe illesztés** és ütközésvizsgálat (16. nap)\n7. **Nyomtatási tájolás** és szeletelés (25., 27. nap)\n8. **Nyomtatás, utómunka, felpróbálás**' },
      { k: 'text', md: 'Amit az első darabnál mindenki elront, és érdemes előre tudni:\n\n- **Elfelejtett szerszámhozzáférés** — a csavar befér, az imbuszkulcs nem\n- **Túl szűk hézag** — hézag nélkül tervezett illesztés, ami nem megy össze\n- **Rossz tájolás** — a tartó eltörik a rétegek mentén az első terhelésnél\n- **Hiányzó kábelkivezetés**' },
      { k: 'callout', tone: 'warn', md: 'A **felpróbálás a valódi alkatrészen** nem hagyható ki. A modell lehet tökéletes, de a motor tűrése, a csavar hossza vagy a nyomtatás pontatlansága eltérhet. Nyomtasd ki, próbáld fel, jegyezd fel az eltérést, és **javítsd a paramétereket** — nem a geometriát.' },
      { k: 'callout', tone: 'tip', md: 'Ha bizonytalan vagy egy illesztésben, nyomtass először egy **próbadarabot**: csak a perem és a furatok, 5 mm vastagon. Tíz perc alatt kész, és megmondja, jó-e a hézag — ahelyett, hogy négy órát nyomtatnál egy rossz méretű tartót.' },
      { k: 'text', md: 'Végül dokumentáld: mentsd el a paraméterlistát a végleges értékekkel, és írd fel, milyen rétegvastagsággal és falszámmal nyomtattad. A következő darabnál ez a kiindulás, és nem kell újra kitalálni.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi az első lépés egy alkatrész tervezésénél?', opts: ['A vázlat', 'A követelmények tisztázása', 'A nyomtatás'], answer: 1, why: 'Melyik motor, milyen terhelés, hova csavarozódik — ebből jön minden más.' },
      { k: 'single', q: 'Mikor jönnek a lekerekítések?', opts: ['Az elején', 'A végén, a nagy forma után', 'Mindegy'], answer: 1, why: 'Ha egy későbbi furat a lekerekített élre esik, a modell elromlik.' },
      { k: 'single', q: 'Melyik a leggyakoribb kezdő hiba?', opts: ['Túl nagy alkatrész', 'Elfelejtett szerszámhozzáférés: a csavar befér, a kulcs nem', 'Túl sok paraméter'], answer: 1, why: 'Ezért kell a szerszám hengerét is bemodellezni és körbeforgatni a szerelvényt.' },
      { k: 'single', q: 'Mit javíts, ha a felpróbálás eltérést mutat?', opts: ['A geometriát', 'A paramétereket', 'A nyomtatót'], answer: 1, why: 'Ezért paraméteres a modell: egy szám átírása végigfut az egészen.' },
      { k: 'single', q: 'Mi a próbadarab haszna?', opts: ['Szebb', 'Tíz perc alatt megmondja, jó-e a hézag, négy óra helyett', 'Erősebb'], answer: 1, why: 'Csak a perem és a furatok, 5 mm vastagon — elég az illesztés ellenőrzéséhez.' },
    ],
    note: {
      summary: ['Menet: követelmény, paraméter, vázlat, test, részletek, szerelvény, tájolás, nyomtatás.', 'A lekerekítések a végére jönnek.', 'Gyakori hibák: szerszámhozzáférés, szűk hézag, rossz tájolás, kábelkivezetés.', 'A felpróbálás nem hagyható ki.', 'Eltérésnél a paramétert javítsd, ne a geometriát.', 'Bizonytalan illesztéshez nyomtass próbadarabot.', 'Dokumentáld a végleges paramétereket és a nyomtatási beállításokat.'],
      terms: [{ term: 'próbadarab', def: 'Kis, gyorsan nyomtatható részlet az illesztés ellenőrzésére.' }, { term: 'felpróbálás', def: 'A kinyomtatott darab illesztése a valódi alkatrészhez.' }, { term: 'szerszámhozzáférés', def: 'A szerszám számára szükséges szabad tér.' }],
    },
  },
  {
    day: 30,
    title: 'Teljes robotváz megtervezése',
    minutes: 30,
    lesson: [
      { k: 'text', md: 'Egy alkatrész után jön az igazi feladat: egy **teljes váz**, ami összefogja a motorokat, az akkut, a vezérlőt és az érzékelőket — és közben szerelhető és javítható marad.' },
      { k: 'callout', tone: 'key', md: 'Kezdd **vázgeometriával** (skeleton, 15. nap): egy külön vázlat, ami csak a fő méreteket és tengelyeket tartalmazza — nyomtáv, tengelytáv, kerékátmérő, az akku helye. Minden alkatrész erre hivatkozik, és a nyomtáv megváltoztatása az egész gépet követi.' },
      { k: 'text', md: 'A tömegek elrendezése dönti el a gép viselkedését:\n\n- **A legnehezebb elem az akku** — ez adja a tömegközéppontot\n- **Alacsonyan** legyen: minél lejjebb, annál stabilabb\n- **Középen**, kissé a hajtott kerekek felé tolva a jó tapadásért\n- **Az érzékelők kerüljenek a szélekre**, ahol a legtöbbet látnak' },
      { k: 'callout', tone: 'warn', md: 'A **szerelhetőség** az, amit a kezdő vázak mindig elrontanak. Kérdezd meg minden alkatrésznél: *hogyan veszem ki, ha elromlik?* Ha egy motor cseréjéhez le kell szerelni a vezérlőt és ki kell húzni nyolc kábelt, a gép a második hibánál félbemarad az asztalon.' },
      { k: 'text', md: 'Három gyakorlati elv a vázhoz:\n\n- **Rétegekre bontás** — alsó szint a hajtás, középső az elektronika, felső a hasznos teher. Egy szint leemelhető.\n- **Szabványos rögzítőminta** — egy 20 mm-es furatrács az alaplapon, amire bármi felcsavarozható. Nem kell újratervezni, ha változik az elrendezés.\n- **Hozzáférési nyílások** — a csatlakozókhoz és a kapcsolókhoz, szétszerelés nélkül.' },
      { k: 'callout', tone: 'tip', md: 'Nyomtasd ki a vázat **először kicsiben**, 25 vagy 50 százalékos méretben. Néhány óra alatt kész, és az arányok, az ütközések és a szerelési sorrend ugyanúgy látszanak rajta — csak töredék anyagért és időért.' },
      { k: 'text', md: 'Harminc nap után megvan minden: vázlat, test, szerelvény, tűrés, rajz, anyag, nyomtatás, utómunka. A következő gép tervezése már nem új készségeket kíván, csak gyakorlást — és minden egyes váz gyorsabb lesz az előzőnél.' },
    ],
    quiz: [
      { k: 'single', q: 'Mivel kezdd egy teljes váz tervezését?', opts: ['A legbonyolultabb alkatrésszel', 'Vázgeometriával, ami csak a fő méreteket tartalmazza', 'A rendereléssel'], answer: 1, why: 'Minden alkatrész erre hivatkozik, így egy fő méret változása végigfut a gépen.' },
      { k: 'single', q: 'Hova tedd az akkut?', opts: ['Minél magasabbra', 'Alacsonyan és középen, kissé a hajtott kerekek felé', 'A tetejére'], answer: 1, why: 'Ez a legnehezebb elem; a helye adja a tömegközéppontot és ezzel a stabilitást.' },
      { k: 'single', q: 'Mit rontanak el a kezdő vázak mindig?', opts: ['A színt', 'A szerelhetőséget', 'A tömeget'], answer: 1, why: 'Ha egy motor cseréjéhez mindent le kell szerelni, a gép a második hibánál félbemarad.' },
      { k: 'single', q: 'Mi a szabványos rögzítőminta haszna?', opts: ['Szebb', 'Bármi felcsavarozható rá, nem kell újratervezni elrendezésváltáskor', 'Erősebb'], answer: 1, why: 'Egy 20 mm-es furatrács az alaplapon rugalmassá teszi az egész gépet.' },
      { k: 'single', q: 'Miért érdemes a vázat előbb kicsiben kinyomtatni?', opts: ['Olcsóbb', 'Mert néhány óra alatt kész, és az arányok és ütközések ugyanúgy látszanak', 'Mert erősebb'], answer: 1, why: '25-50 százalékos méret elég az arányok, ütközések és szerelési sorrend ellenőrzésére.' },
    ],
    note: {
      summary: ['Kezdd vázgeometriával: csak a fő méretek és tengelyek.', 'Az akku adja a tömegközéppontot: alacsonyan és középen.', 'Az érzékelők a szélekre, ahol a legtöbbet látnak.', 'A szerelhetőség a leggyakoribb hiba: hogyan veszem ki, ha elromlik?', 'Rétegekre bontás, szabványos furatrács, hozzáférési nyílások.', 'Nyomtasd ki a vázat először 25-50 százalékos méretben.'],
      terms: [{ term: 'vázgeometria', def: 'Fő méreteket tartalmazó közös referenciavázlat.' }, { term: 'tömegközéppont', def: 'A tömegeloszlás súlypontja, ami a stabilitást szabja meg.' }, { term: 'rögzítőminta', def: 'Szabványos furatrács, amire bármi felszerelhető.' }],
    },
  },
];
