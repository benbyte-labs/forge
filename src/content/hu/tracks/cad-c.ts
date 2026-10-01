import type { Day } from '../../types';

/** CAD trek, 6–12. nap. */
export const cadHuC: Day[] = [
  {
    day: 6,
    title: 'Fillet és chamfer',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A **fillet** lekerekít egy élt, a **chamfer** letöri. Mindkettő apróságnak tűnik, pedig a gyárthatóság és a szilárdság múlik rajta.' },
      { k: 'callout', tone: 'key', md: 'A belső sarkokban a feszültség összegyűlik — ezt hívják **feszültséggyűjtő hatásnak**. Egy éles belső sarok a törés kiindulópontja. Egy kis lekerekítés sokszorosára növelheti az alkatrész élettartamát.' },
      { k: 'text', md: 'Mikor melyiket?\n\n- **Fillet** — belső sarkokba, terhelt részekre, ott, ahol a feszültség gyűlik.\n- **Chamfer** — illesztési élekre, hogy a csavar és a furat könnyen találjon, és hogy ne sértsen a sorja.' },
      { k: 'callout', tone: 'warn', md: 'A filletet mindig a **modellezés végén** add hozzá. Ha korán lekerekítesz, a későbbi műveletek folyton elbuknak rajta, vagy újra kell építeni őket.' },
      { k: 'callout', tone: 'tip', md: '3D nyomtatásnál az alsó él chamfere jobb, mint a fillet: a lekerekítés alulról kinyúlás, ami megereszkedik. A 45 fokos letörés viszont támasz nélkül is kinyomtatható.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a feszültséggyűjtő hatás?', opts: ['A szín változása', 'Az éles belső saroknál összegyűlő feszültség, ami töréshez vezet', 'Az anyag melegedése'], answer: 1, why: 'Az éles sarok ponton koncentrálja a terhelést. Egy kis lekerekítés szétteríti, és sokszorosára növeli az élettartamot.' },
      { k: 'single', q: 'Mikor add hozzá a filleteket?', opts: ['A legelején', 'A modellezés végén', 'Mindegy'], answer: 1, why: 'A korai fillet megzavarja a későbbi műveleteket. A végén hozzáadva bármikor módosítható vagy kikapcsolható.' },
      { k: 'single', q: 'Melyik jobb egy alsó élnél 3D nyomtatásnál?', opts: ['Fillet', 'Chamfer', 'Egyik sem'], answer: 1, why: 'A lekerekítés alulról kinyúlás, ami megereszkedik. A 45 fokos letörés támasz nélkül is nyomtatható.' },
      { k: 'single', q: 'Mire való a chamfer egy furat szélén?', opts: ['Díszítés', 'Hogy a csavar könnyen találjon, és ne sértsen a sorja', 'Erősítés'], answer: 1, why: 'Az illesztést vezeti be, és eltünteti az éles peremet. Minden gyártott furaton van.' },
    ],
    note: {
      summary: ['Fillet = lekerekítés, chamfer = letörés.', 'Az éles belső sarok feszültséggyűjtő: innen indul a törés.', 'Fillet a terhelt belső sarkokba, chamfer az illesztési élekre.', 'A filleteket mindig a modellezés végén add hozzá.', '3D nyomtatásnál az alsó élre chamfer való, nem fillet.'],
      terms: [{ term: 'fillet', def: 'Él lekerekítése adott sugárral.' }, { term: 'chamfer', def: 'Él letörése, jellemzően 45 fokban.' }, { term: 'feszültséggyűjtő hatás', def: 'A terhelés összegyűlése éles sarokban, ami töréshez vezet.' }],
    },
  },
  {
    day: 7,
    title: 'Furatok és menetek',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A furat a leggyakoribb alkatrész-jellemző, és az, amit a legtöbbször rontanak el. A kérdés mindig ugyanaz: **mi megy bele?**' },
      { k: 'text', md: 'Három furatfajta:\n\n- **Átmenő furat** — a csavar szára átmegy rajta. Átmérője a csavarnál nagyobb (M3-hoz 3,2–3,4 mm).\n- **Menetes furat** — a csavar beletekeredik. Átmérője a **magátmérő** (M3-hoz 2,5 mm).\n- **Süllyesztett furat** — a csavarfej elbújik benne.' },
      { k: 'callout', tone: 'key', md: 'Ha két alkatrészt csavarral fogsz össze, az **elsőben átmenő**, a **másodikban menetes** furat kell. Ha mindkettőben menetes, a csavar nem tudja összehúzni őket — ez a leggyakoribb kezdő hiba.' },
      { k: 'text', md: '3D nyomtatásnál a menetvágás helyett szokásos megoldás a **beütőanyás** (heat-set insert) furat: egy sima, kicsit szűkebb lyuk, amibe forrasztópákával beolvasztod a sárgaréz menetes betétet. Sokkal erősebb, mint a nyomtatott menet.' },
      { k: 'callout', tone: 'warn', md: 'A nyomtatott furat mindig szűkebb lesz a tervezettnél, mert az anyag összehúzódik és a fúvóka túlnyom. Számolj 0,1–0,3 mm-rel, vagy fúrd ki utólag méretre.' },
    ],
    quiz: [
      { k: 'single', q: 'Mekkora átmenő furat kell egy M3 csavarhoz?', opts: ['2,5 mm', '3,2–3,4 mm', 'Pontosan 3,0 mm'], answer: 1, why: 'A szárnak át kell férnie játékkal. A pontosan 3,0 mm-be nem megy be, a 2,5 mm pedig a menetes furat mérete.' },
      { k: 'single', q: 'Hogyan fogsz össze két alkatrészt csavarral?', opts: ['Mindkettőben menetes furat', 'Az elsőben átmenő, a másodikban menetes', 'Mindkettőben átmenő'], answer: 1, why: 'A csavar az első darabot a fejével húzza, a másodikban pedig fog. Két menetes furatnál nem jön létre összehúzó erő.' },
      { k: 'single', q: 'Mi a beütőanya (heat-set insert)?', opts: ['Egy ragasztó', 'Sárgaréz menetes betét, amit pákával olvasztasz a műanyagba', 'Egy csavarfajta'], answer: 1, why: 'Sokkal erősebb és többször oldható-zárható, mint a nyomtatott menet. 3D nyomtatott alkatrészeknél ez a szokásos megoldás.' },
      { k: 'single', q: 'Milyen lesz a nyomtatott furat a tervezetthez képest?', opts: ['Pontosan akkora', 'Szűkebb', 'Tágabb'], answer: 1, why: 'Az anyag összehúzódik, és a fúvóka kissé befelé nyom. Tervezz 0,1–0,3 mm ráhagyással.' },
    ],
    note: {
      summary: ['Három furatfajta: átmenő, menetes, süllyesztett.', 'M3 csavarhoz: átmenő 3,2–3,4 mm, menetes 2,5 mm.', 'Csavaros kötésnél az elsőben átmenő, a másodikban menetes furat kell.', 'A nyomtatott menet gyenge: használj beütőanyát helyette.', 'A nyomtatott furat szűkebb lesz; tervezz 0,1–0,3 mm ráhagyással.'],
      terms: [{ term: 'átmenő furat', def: 'Furat, amin a csavar szára játékkal átfér.' }, { term: 'magátmérő', def: 'A menetes furat átmérője, amibe a csavar belevág.' }, { term: 'beütőanya', def: 'Hővel műanyagba olvasztott menetes fémbetét.' }],
    },
  },
  {
    day: 8,
    title: 'Mintázatok és tükrözés',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'Ha valamit kétszer rajzolsz le, rosszul csinálod. A **mintázat** és a **tükrözés** egyetlen elemből sokat készít — és ha az egyet módosítod, az összes követi.' },
      { k: 'text', md: 'A három eszköz:\n\n- **Lineáris mintázat** — adott irányban, adott távolságra, adott darabszámban. Csavarsor, borda, szellőzőrács.\n- **Körkörös mintázat** — egy tengely körül. Furatkör egy karimán, küllők.\n- **Tükrözés** — egy síkra. Szimmetrikus alkatrész fele elég.' },
      { k: 'callout', tone: 'key', md: 'A mintázat **él**: ha a forrásfuratot 3 mm-ről 4-re állítod, mind a nyolc követi. Ha kézzel másoltad volna, nyolc helyen kellene átírni — és a nyolcadikat biztosan elfelejtenéd.' },
      { k: 'callout', tone: 'warn', md: 'A mintázat elbukik, ha a forrásgeometria eltűnik vagy átalakul alatta. Ez a „broken reference", és minden parametrikus CAD-ben előfordul. A gyógyszer: egyszerű, stabil referenciákra építs, ne egy bonyolult felület szélére.' },
      { k: 'callout', tone: 'tip', md: 'A tükrözésnél figyelj a **szimmetriasíkra**: ha az alkatrész origója nem a közepén van, a két fél elcsúszik. Pontosan ugyanaz a hiba, mint a Blender Mirror módosítójánál.' },
    ],
    quiz: [
      { k: 'single', q: 'Mi a mintázat legnagyobb előnye?', opts: ['Kisebb fájl', 'A forráselem módosítása az összes példányra átmegy', 'Gyorsabb render'], answer: 1, why: 'Egy helyen írsz át valamit, és az összes példány követi. Kézi másolásnál nyolc helyen kellene.' },
      { k: 'single', q: 'Mivel készítenél furatkört egy karimán?', opts: ['Lineáris mintázat', 'Körkörös mintázat', 'Tükrözés'], answer: 1, why: 'A furatok egy tengely körül, egyenletes szögosztásban helyezkednek el — pontosan ez a körkörös mintázat.' },
      { k: 'single', q: 'Mi a „broken reference"?', opts: ['Hibás fájl', 'A mintázat elbukik, mert a forrásgeometria eltűnt alóla', 'Rossz mértékegység'], answer: 1, why: 'A művelet egy olyan élre vagy felületre hivatkozott, ami egy korábbi módosítás után már nem létezik.' },
      { k: 'single', q: 'Mire figyelj tükrözésnél?', opts: ['A színre', 'Hogy a szimmetriasík tényleg a közepén legyen', 'A fájlnévre'], answer: 1, why: 'Rossz helyen lévő sík esetén a két fél elcsúszik vagy egymásba lóg — ugyanaz a hiba, mint a Blender Mirrorjánál.' },
    ],
    note: {
      summary: ['Amit kétszer rajzolsz le, azt rosszul csinálod.', 'Lineáris mintázat: adott irányban, távolságra, darabszámban.', 'Körkörös mintázat: tengely körül, egyenletes szögosztásban.', 'Tükrözés: szimmetrikus alkatrésznél elég a felét megrajzolni.', 'A forráselem módosítása minden példányra átmegy.', 'A mintázat elbukik, ha a forrásgeometria eltűnik — stabil referenciákra építs.'],
      terms: [{ term: 'mintázat', def: 'Egy elem többszörözése szabályos elrendezésben.' }, { term: 'körkörös mintázat', def: 'Többszörözés egy tengely körül, egyenletes szögosztásban.' }, { term: 'broken reference', def: 'Olyan művelet, aminek a hivatkozott geometriája megszűnt.' }],
    },
  },
  {
    day: 9,
    title: 'Referenciasíkok',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'Eddig a három alapsíkra rajzoltál. A valóságban gyakran kell **saját sík**: ferdén, eltolva, vagy egy felülethez igazítva.' },
      { k: 'text', md: 'Síkot létrehozhatsz:\n\n- **eltolással** egy meglévő síktól adott távolságra,\n- **szögben** egy él körül elforgatva,\n- **három ponton** át,\n- **felülethez érintőlegesen**.' },
      { k: 'callout', tone: 'key', md: 'A **referenciasík stabilabb hivatkozás**, mint egy modellfelület. Ha egy felületre rajzolsz, és az a felület egy korábbi módosítás után eltűnik, a vázlatod elbukik. Egy alapsíktól eltolt referenciasík viszont megmarad.' },
      { k: 'text', md: 'Ez a **tervezési szándék** része: azt mondod meg a modellnek, hogy „ez a sík mindig 20 mm-re van az aljtól", nem azt, hogy „ez a sík ott van, ahol most épp az a felület".' },
      { k: 'callout', tone: 'tip', md: 'Ha egy alkatrész minden módosításnál szétesik, szinte biztos, hogy felületekre és élekre hivatkozik alapsíkok helyett. Ezt hívják „topológiai névproblémának", és minden parametrikus CAD-ben létezik.' },
    ],
    quiz: [
      { k: 'single', q: 'Miért stabilabb a referenciasík, mint egy modellfelület?', opts: ['Gyorsabb', 'Mert nem tűnik el egy későbbi módosítástól', 'Mert nagyobb'], answer: 1, why: 'A felület egy művelet eredménye, és eltűnhet. Az alapsíktól eltolt referenciasík független tőle.' },
      { k: 'single', q: 'Hogyan hozol létre síkot három ponton át?', opts: ['Nem lehet', 'A három pont egyértelműen meghatároz egy síkot', 'Csak négy ponttal megy'], answer: 1, why: 'Három nem egy egyenesbe eső pont pontosan egy síkot határoz meg. Ez az egyik szokásos síkdefiníció.' },
      { k: 'single', q: 'Mit jelent a tervezési szándék a síkoknál?', opts: ['Hogy szép legyen', 'Hogy a sík értelmes dologhoz kötődjön, ne egy véletlen felülethez', 'Hogy kevés sík legyen'], answer: 1, why: '„20 mm-re az aljtól" túléli a módosításokat. „Ott, ahol az a felület van" nem.' },
      { k: 'single', q: 'Mi a jele annak, hogy rossz referenciákra építettél?', opts: ['Nagy a fájl', 'Az alkatrész minden módosításnál szétesik', 'Lassú a megjelenítés'], answer: 1, why: 'Ez a topológiai névprobléma: a hivatkozott él vagy felület a módosítás után már nem ugyanaz.' },
    ],
    note: {
      summary: ['Saját referenciasíkot eltolással, szögben, három ponton át vagy érintőlegesen hozhatsz létre.', 'A referenciasík stabilabb hivatkozás, mint egy modellfelület.', 'A felület eltűnhet egy módosítástól; az alapsíktól eltolt sík nem.', 'A tervezési szándék: a sík értelmes dologhoz kötődjön.', 'Ha az alkatrész minden módosításnál szétesik, rossz referenciákra épül.'],
      terms: [{ term: 'referenciasík', def: 'Saját definiálású sík, amire vázlatot lehet rajzolni.' }, { term: 'tervezési szándék', def: 'A modell úgy épül fel, hogy a méretváltozás értelmesen terjedjen.' }, { term: 'topológiai névprobléma', def: 'Élekre és felületekre hivatkozó műveletek elbukása módosítás után.' }],
    },
  },
  {
    day: 10,
    title: 'Loft és sweep',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Az extrude és a revolve egyszerű formákra jó. Ha a keresztmetszet **változik** vagy a test egy **görbe mentén** halad, két újabb eszköz kell.' },
      { k: 'text', md: '**Loft:** két vagy több, különböző síkon lévő vázlat közt képez átmenetet. Egy körből egy négyzetbe, egy nagy profilból egy kicsibe. Átmeneti idom, áramvonalas burkolat, hajótest.\n\n**Sweep:** egy profilt végigvisz egy útvonal mentén. Cső, kábelcsatorna, fogantyú, bordázat.' },
      { k: 'callout', tone: 'key', md: 'A loft minősége a vázlatok **pontjainak megfeleltetésén** múlik. Ha a körön és a négyzeten a kezdőpont máshol van, a felület megcsavarodik. A legtöbb program mutat vezetővonalakat — ezeket kell rendbe tenni.' },
      { k: 'callout', tone: 'warn', md: 'A sweep útvonalán **nem lehet élesebb kanyar**, mint a profil mérete. Ha egy 10 mm-es csövet 3 mm-es sugarú íven viszel végig, a belső oldal átfordul önmagán, és a művelet elbukik.' },
      { k: 'callout', tone: 'tip', md: 'Mindkettőt érdemes a lehető legegyszerűbb vázlatokkal csinálni. Egy loft két körből megbízható; két bonyolult, sok pontos profilból szinte biztosan kezelhetetlen felületet ad.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit csinál a loft?', opts: ['Végigvisz egy profilt útvonalon', 'Átmenetet képez két vagy több vázlat közt', 'Lekerekít'], answer: 1, why: 'A loft a vázlatok közti felületet hozza létre. Így lesz egy körből fokozatosan négyzet.' },
      { k: 'single', q: 'Mit csinál a sweep?', opts: ['Átmenetet képez', 'Egy profilt végigvisz egy útvonal mentén', 'Tükröz'], answer: 1, why: 'A profil végigsöpör az útvonalon, és az általa bejárt tér lesz a test. Csövek és fogantyúk készülnek vele.' },
      { k: 'single', q: 'Miért csavarodhat meg egy loft felülete?', opts: ['Rossz anyag', 'Mert a vázlatok kezdőpontjai nincsenek egymáshoz igazítva', 'Túl kicsi'], answer: 1, why: 'A program pontról pontra köti össze a profilokat. Elcsúszott kezdőpontnál a kötés spirálisan fut.' },
      { k: 'single', q: 'Mi történik, ha a sweep útvonala túl éles kanyart tesz?', opts: ['Szebb lesz', 'A felület átfordul önmagán, és a művelet elbukik', 'Automatikusan lekerekíti'], answer: 1, why: 'A profil belső oldala a kanyarban önmagába metsz. Az útvonal sugara legyen nagyobb a profil felénél.' },
    ],
    note: {
      summary: ['Loft: átmenet két vagy több, különböző síkon lévő vázlat közt.', 'Sweep: egy profil végigvezetése egy útvonalon.', 'A loft megcsavarodik, ha a vázlatok kezdőpontjai nincsenek igazítva.', 'A sweep elbukik, ha az útvonal élesebb kanyart tesz a profil méreténél.', 'Mindkettőt a lehető legegyszerűbb vázlatokkal csináld.'],
      terms: [{ term: 'loft', def: 'Két vagy több vázlat közti felületátmenet.' }, { term: 'sweep', def: 'Profil végigvezetése egy útvonal mentén.' }, { term: 'vezetővonal', def: 'A loft profiljainak megfeleltetését mutató jelölés.' }],
    },
  },
  {
    day: 11,
    title: 'Héjazás',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A **héjazás (shell)** kiüregesíti a testet, adott falvastagságot hagyva. Egy tömör kockából egy nyitott doboz lesz egyetlen művelettel.' },
      { k: 'callout', tone: 'key', md: 'Ez nem csak anyagtakarékosság. Egy tömör műanyag alkatrész **rosszabb**, mint egy héjazott: a vastag rész hűléskor behúzódik (szívódási üreg), és belül feszültség marad. A gyártók ezért héjaznak mindent.' },
      { k: 'text', md: 'A műveletnél megadod:\n\n- a **falvastagságot** (3D nyomtatásnál legalább a fúvóka kétszerese),\n- és azt, **melyik lapo(ka)t** távolítsa el — ezek lesznek a nyílások.' },
      { k: 'callout', tone: 'warn', md: 'A héjazás elbukik, ha a falvastagság nagyobb, mint a legkisebb belső lekerekítés sugara. Ilyenkor a program nem tud hova tenni az anyagot. A megoldás: vékonyabb fal, vagy nagyobb fillet — vagy héjazz a fillet **előtt**.' },
      { k: 'callout', tone: 'tip', md: 'Nagy, lapos héjazott felület be fog hajlani. Tegyél rá **bordákat** — erről szól a holnapi nap. Egy 1 mm magas borda többet ér, mint a fal megduplázása.' },
    ],
    quiz: [
      { k: 'single', q: 'Mit csinál a héjazás?', opts: ['Lekerekít', 'Kiüregesíti a testet adott falvastagságot hagyva', 'Tükröz'], answer: 1, why: 'A tömör testből üreges héj lesz, a megadott falvastagsággal.' },
      { k: 'single', q: 'Miért rossz egy tömör műanyag alkatrész?', opts: ['Túl nehéz', 'Hűléskor behúzódik, és belső feszültség marad benne', 'Nem lehet kinyomtatni'], answer: 1, why: 'A vastag anyag egyenetlenül hűl. A szívódási üreg felületi behúzódást és gyengeséget okoz.' },
      { k: 'single', q: 'Mikor bukik el a héjazás?', opts: ['Ha túl nagy a test', 'Ha a falvastagság nagyobb a legkisebb belső lekerekítésnél', 'Ha van benne furat'], answer: 1, why: 'A program nem tud elférni az anyaggal a kis sugarú sarokban. Vékonyabb fal vagy nagyobb fillet a megoldás.' },
      { k: 'single', q: 'Mit tegyél egy behajló, nagy lapos felülettel?', opts: ['Duplázd a falvastagságot', 'Tegyél rá bordákat', 'Hagyd tömören'], answer: 1, why: 'A borda a keresztmetszeti magasságot növeli, ami sokkal hatékonyabb merevítés, mint a vastagítás.' },
    ],
    note: {
      summary: ['A héjazás üreges testet csinál adott falvastagsággal.', 'A tömör műanyag rossz: hűléskor behúzódik és feszültség marad benne.', 'Megadod a falvastagságot és az eltávolítandó lapokat.', 'A héjazás elbukik, ha a fal vastagabb a legkisebb belső lekerekítésnél.', 'Nagy lapos felületet bordával merevíts, ne vastagítással.'],
      terms: [{ term: 'héjazás', def: 'Test kiüregesítése adott falvastagság meghagyásával.' }, { term: 'szívódási üreg', def: 'Vastag műanyag hűlésekor keletkező behúzódás.' }, { term: 'nyitott lap', def: 'A héjazásnál eltávolított felület, ami nyílást ad.' }],
    },
  },
  {
    day: 12,
    title: 'Bordák és merevítés',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Ha egy alkatrész hajlik, az első ösztön a vastagítás. Ez majdnem mindig rossz válasz: drága, nehéz, és nyomtatásnál rosszul sül el. A **borda** sokkal hatékonyabb.' },
      { k: 'callout', tone: 'key', md: 'A hajlítással szembeni merevség a keresztmetszet magasságának **harmadik hatványával** nő. Kétszeres magasság nyolcszoros merevség. Ezért tart meg egy I-gerenda annyit, és ezért éri meg bordázni ahelyett, hogy anyagot raknál mindenhova.' },
      { k: 'text', md: 'Bordázási szabályok műanyagnál:\n\n- A borda vastagsága legyen a fal **50–60%-a** — vastagabb bordánál beszívódik a külső felület.\n- A magasság legfeljebb a vastagság **háromszorosa**, különben eldől.\n- A tövét kerekítsd le (fillet), hogy ne legyen feszültséggyűjtő.\n- Több kisebb borda jobb, mint egy nagy.' },
      { k: 'model', src: 'LIFT500_szegmens.stl' },
      { k: 'callout', tone: 'tip', md: '3D nyomtatásnál a borda iránya is számít: a rétegekre merőlegesen futó borda sokkal erősebb. Ha tudod, melyik irányból jön a hajlítás, forgasd ehhez az alkatrészt a nyomtatóasztalon.' },
    ],
    quiz: [
      { k: 'single', q: 'Hányszorosára nő a merevség, ha a keresztmetszet magasságát duplázod?', opts: ['Kétszeresére', 'Nyolcszorosára', 'Négyszeresére'], answer: 1, why: 'A merevség a magasság harmadik hatványával arányos: 2³ = 8.' },
      { k: 'single', q: 'Milyen vastag legyen egy borda a falhoz képest?', opts: ['Ugyanolyan', '50–60%-a', 'Kétszerese'], answer: 1, why: 'Vastagabb bordánál a külső felület beszívódik hűléskor, és látható behúzódás marad rajta.' },
      { k: 'single', q: 'Miért kerekítsd le a borda tövét?', opts: ['Szebb', 'Mert az éles sarok feszültséggyűjtő, és onnan indul a törés', 'Hogy kevesebb anyag legyen'], answer: 1, why: 'Pontosan ugyanaz az elv, mint a filletnél: az éles belső sarok koncentrálja a terhelést.' },
      { k: 'single', q: 'Mi a jobb: egy nagy borda vagy több kicsi?', opts: ['Egy nagy', 'Több kicsi', 'Mindegy'], answer: 1, why: 'Több kisebb borda egyenletesebben merevít, kevésbé hajlamos eldőlni, és kevesebb beszívódást okoz.' },
    ],
    note: {
      summary: ['Hajlás ellen a borda hatékonyabb, mint a vastagítás.', 'A merevség a keresztmetszet magasságának harmadik hatványával nő.', 'A borda vastagsága a fal 50–60%-a legyen, különben beszívódik a felület.', 'A magasság legfeljebb a vastagság háromszorosa.', 'A borda tövét kerekítsd le, hogy ne legyen feszültséggyűjtő.', 'Nyomtatásnál a rétegekre merőlegesen futó borda erősebb.'],
      terms: [{ term: 'borda', def: 'Vékony merevítő lemez, ami a keresztmetszet magasságát növeli.' }, { term: 'beszívódás', def: 'A felület behúzódása vastag anyag hűlésekor.' }, { term: 'keresztmetszeti magasság', def: 'A hajlítással szembeni merevséget meghatározó méret.' }],
    },
  },
];
