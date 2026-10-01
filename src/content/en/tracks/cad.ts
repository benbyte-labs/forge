import type { Track } from '../../types';
import { cadEnB } from './cad-b';
import { cadEnC } from './cad-c';

export const cadEn: Track = {
  id: 'cad',
  title: 'CAD',
  blurb: 'From a sketch to a printable part.',
  plannedTitles: [
    'Views and coordinates',
    'The sketch',
    'Constraints',
    'Extrude and revolve',
    'Wall thickness and printability',
    'Fillet and chamfer',
    'Holes and threads',
    'Patterns and mirroring',
    'Reference planes',
    'Loft and sweep',
    'Shelling',
    'Ribs and stiffening',
    'Parametric design',
    'Design intent',
    'Assemblies',
    'Mates and constraints in assemblies',
    'Tolerance and fit',
    'Screws and fasteners',
    'Fitting bearings',
    'Designing a motor mount',
    'Cable routing',
    'Technical drawings',
    'Dimensioning and annotation',
    'Choosing a material',
    'Print orientation',
    'Avoiding supports',
    'Slicing and layer height',
    'Post-processing and fit',
    'Your first robot part',
    'Designing a complete chassis',
  ],
  days: [
    {
      day: 1,
      title: 'Views and coordinates',
      minutes: 18,
      lesson: [
        {
          k: 'text',
          md: 'In CAD you always work in **three dimensions**, but your screen is flat. So the first thing to learn is not a command but a way of seeing: how to read a solid part from flat views.',
        },
        {
          k: 'text',
          md: 'The three axes: **X** (right), **Y** (back), **Z** (up). This is the common convention, and 3D printers think the same way: Z is the direction the layers stack.',
        },
        {
          k: 'callout',
          tone: 'key',
          md: 'For 3D printing the Z axis is not equal to the other two. The printer builds upward layer by layer, so the part is weaker along Z than across X-Y. A whole day is devoted to this later.',
        },
        {
          k: 'text',
          md: 'The three standard views every CAD package offers:\n\n- **Top** — looking down, you see the XY plane\n- **Front** — looking from the front, the XZ plane\n- **Side** — from the side, the YZ plane\n\nYou understand a part when you can picture all three.',
        },
        {
          k: 'text',
          md: 'Two more you will use constantly: the **isometric view** (from an angle above, all three axes visible) and the **section view** (cutting into the part to see inside). The FORGE CAD Lab offers both.',
        },
        {
          k: 'callout',
          tone: 'tip',
          md: 'Load one of your own STL files into the CAD Lab and spin it. Try to predict what the top view will look like before you click it. This skill builds in a few days and then helps you forever.',
        },
        {
          k: 'text',
          md: 'The **origin** is the point (0, 0, 0). Every dimension is measured from it. When you design a part, decide up front where the origin goes: usually on the most important mating face, because that is what keeps your dimensions round numbers.',
        },
      ],
      quiz: [
        {
          k: 'single',
          q: 'Which axis usually points up?',
          opts: ['X', 'Y', 'Z'],
          answer: 2,
          why: 'Z is the vertical axis. It matters especially in 3D printing: the printer stacks its layers along Z.',
        },
        {
          k: 'single',
          q: 'Which plane do you see in the top view?',
          opts: ['XY', 'XZ', 'YZ'],
          answer: 0,
          why: 'Looking down you see the horizontal plane, XY. XZ is the front view and YZ the side view.',
        },
        {
          k: 'single',
          q: 'What is a section view for?',
          opts: ['Seeing inside the part', 'Printing the part', 'Measuring its weight'],
          answer: 0,
          why: 'A section cuts virtually into the part so you can see internal cavities, wall thicknesses and holes — everything hidden from outside.',
        },
        {
          k: 'single',
          q: 'Where is it worth putting the origin of a part?',
          opts: [
            'Always in the bottom-left corner',
            'On the most important mating face',
            'It makes no difference',
          ],
          answer: 1,
          why: 'With the origin on the face the part mates against, the important dimensions come out as round numbers and later edits are easier. This is the first appearance of "design intent".',
        },
      ],
      note: {
        summary: [
          'CAD is three-dimensional and the screen is flat — switching between views is a skill to build.',
          'Axes: X right, Y back, Z up. Z is the layer direction in 3D printing.',
          'Three standard views: top (XY), front (XZ), side (YZ).',
          'The isometric view shows all three axes; the section view reveals the inside.',
          'The origin (0,0,0) is the reference; put it on the most important mating face.',
        ],
        terms: [
          { term: 'origin', def: 'The (0, 0, 0) point of the coordinate system that all dimensions refer to.' },
          { term: 'isometric view', def: 'An angled view showing all three axes at once.' },
          { term: 'section view', def: 'A virtual cut through the part that reveals its interior.' },
          { term: 'Z axis', def: 'The vertical axis; in 3D printing, the direction layers build.' },
        ],
      },
    },
    ...cadEnB,
    ...cadEnC,
  ],
};
