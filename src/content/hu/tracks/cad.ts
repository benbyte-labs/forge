import type { Track } from '../../types';
import { cadHuB } from './cad-b';
import { cadHuC } from './cad-c';
import { cadHuD } from './cad-d';
import { cadHuE } from './cad-e';

export const cadHu: Track = {
  id: 'cad',
  title: 'CAD',
  blurb: 'Vázlattól a nyomtatható alkatrészig.',
  plannedTitles: [
    'Nézetek és koordináták',
    'A vázlat',
    'Kényszerek',
    'Extrude és revolve',
    'Falvastagság és nyomtathatóság',
    'Fillet és chamfer',
    'Furatok és menetek',
    'Mintázatok és tükrözés',
    'Referenciasíkok',
    'Loft és sweep',
    'Héjazás',
    'Bordák és merevítés',
    'Paraméteres tervezés',
    'Tervezési szándék',
    'Szerelvények',
    'Illesztések és kényszerek szerelvényben',
    'Tűrés és illeszkedés',
    'Csavarok és kötőelemek',
    'Csapágyak beépítése',
    'Motorrögzítés tervezése',
    'Kábelvezetés',
    'Műszaki rajz',
    'Méretezés és jelölések',
    'Anyagválasztás',
    'Nyomtatási orientáció',
    'Támaszok elkerülése',
    'Szeletelés és rétegvastagság',
    'Utómunka és illesztés',
    'Az első robotalkatrészed',
    'Teljes robotváz megtervezése',
  ],
  days: [
    {
      day: 1,
      title: 'Nézetek és koordináták',
      minutes: 18,
      lesson: [
        {
          k: 'text',
          md: 'A CAD-ben mindig **három dimenzióban** dolgozol, de a képernyőd lapos. Ezért a legelső dolog, amit meg kell tanulnod, nem parancs, hanem szemlélet: hogyan lásd a térbeli alkatrészt síkbeli nézetekből.',
        },
        {
          k: 'text',
          md: 'A három tengely: **X** (jobbra), **Y** (hátra), **Z** (felfelé). Ez a legelterjedtebb konvenció, és a 3D nyomtatók is így gondolkodnak: a Z a rétegek iránya.',
        },
        {
          k: 'callout',
          tone: 'key',
          md: 'A Z tengely a 3D nyomtatásnál nem egyenrangú a másik kettővel. A nyomtató rétegenként épít fölfelé, ezért az alkatrész Z irányban gyengébb, mint X-Y-ban. Ez később egy egész napot fog kapni.',
        },
        {
          k: 'text',
          md: 'A három alapnézet, amit minden CAD program felajánl:\n\n- **Felülnézet** — fentről lefelé, az XY síkot látod\n- **Elölnézet** — szemből, az XZ síkot\n- **Oldalnézet** — oldalról, az YZ síkot\n\nEgy alkatrészt akkor értesz meg, ha mindhármat el tudod képzelni.',
        },
        {
          k: 'text',
          md: 'Van még kettő, amit gyakran fogsz használni: az **izometrikus nézet** (ferdén fentről, mindhárom tengely látszik) és a **metszet** (belevágsz az alkatrészbe, hogy lásd a belsejét). A FORGE CAD Laborjában mindkettő elérhető.',
        },
        {
          k: 'callout',
          tone: 'tip',
          md: 'Tölts be egy saját STL-t a CAD Laborba, és forgasd meg. Próbáld meg előre megmondani, mit fogsz látni felülnézetből, mielőtt odakattintasz. Ez a készség pár nap alatt kialakul, és utána végig segít.',
        },
        {
          k: 'text',
          md: 'Az **origó** a (0, 0, 0) pont. Minden méret ehhez képest értendő. Amikor egy alkatrészt tervezel, gondold át előre, hol legyen az origó: általában a legfontosabb illeszkedő felületen, mert így lesznek a méreteid kerek számok.',
        },
      ],
      quiz: [
        {
          k: 'single',
          q: 'Melyik tengely mutat általában felfelé?',
          opts: ['X', 'Y', 'Z'],
          answer: 2,
          why: 'A Z a függőleges tengely. 3D nyomtatásnál ez különösen fontos: a nyomtató Z irányban építi egymásra a rétegeket.',
        },
        {
          k: 'single',
          q: 'Melyik síkot látod felülnézetből?',
          opts: ['XY', 'XZ', 'YZ'],
          answer: 0,
          why: 'Felülről lefelé nézve a vízszintes síkot, az XY-t látod. Az XZ az elölnézet, az YZ az oldalnézet.',
        },
        {
          k: 'single',
          q: 'Mire jó a metszeti nézet?',
          opts: [
            'Hogy lásd az alkatrész belsejét',
            'Hogy kinyomtasd az alkatrészt',
            'Hogy megmérd a súlyát',
          ],
          answer: 0,
          why: 'A metszet virtuálisan belevág az alkatrészbe, így látod a belső üregeket, falvastagságokat, furatokat — mindazt, amit kívülről nem.',
        },
        {
          k: 'single',
          q: 'Hol érdemes felvenni az origót egy alkatrésznél?',
          opts: [
            'Mindig a bal alsó sarokban',
            'A legfontosabb illeszkedő felületen',
            'Teljesen mindegy',
          ],
          answer: 1,
          why: 'Ha az origó azon a felületen van, amihez az alkatrész illeszkedik, a fontos méretek kerek számok lesznek, és később könnyebb módosítani. Ez a "tervezési szándék" első megjelenése.',
        },
      ],
      note: {
        summary: [
          'A CAD háromdimenziós, a képernyő sík — a nézetek közti váltogatás megtanulandó készség.',
          'Tengelyek: X jobbra, Y hátra, Z felfelé. A Z a 3D nyomtatás rétegiránya.',
          'Három alapnézet: felülnézet (XY), elölnézet (XZ), oldalnézet (YZ).',
          'Az izometrikus nézet mindhárom tengelyt mutatja, a metszet a belsőt tárja fel.',
          'Az origó (0,0,0) a viszonyítási pont; érdemes a legfontosabb illeszkedő felületre tenni.',
        ],
        terms: [
          { term: 'origó', def: 'A koordinátarendszer (0, 0, 0) pontja, amihez minden méret viszonyul.' },
          { term: 'izometrikus nézet', def: 'Ferde nézet, amiben mindhárom tengely egyszerre látszik.' },
          { term: 'metszet', def: 'Virtuális vágás az alkatrészen, ami feltárja a belsejét.' },
          { term: 'Z tengely', def: 'A függőleges tengely; 3D nyomtatásnál a rétegek építési iránya.' },
        ],
      },
    },
    ...cadHuB,
    ...cadHuC,
    ...cadHuD,
    ...cadHuE,
  ],
};
