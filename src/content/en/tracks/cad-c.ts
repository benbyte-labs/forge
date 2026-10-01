import type { Day } from '../../types';

/** CAD track, days 6–12. */
export const cadEnC: Day[] = [
  {
    day: 6,
    title: 'Fillet and chamfer',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A **fillet** rounds an edge; a **chamfer** cuts it off. Both look like details, yet manufacturability and strength depend on them.' },
      { k: 'callout', tone: 'key', md: 'Stress gathers in internal corners — this is the **stress concentration** effect. A sharp internal corner is where a crack starts. A small radius can multiply the life of a part.' },
      { k: 'text', md: 'Which, when?\n\n- **Fillet** — internal corners, loaded areas, wherever stress gathers.\n- **Chamfer** — mating edges, so a screw or a hole finds its way, and so the burr does not cut.' },
      { k: 'callout', tone: 'warn', md: 'Always add fillets at the **end of modelling**. Round things early and later operations keep failing on them, or have to be rebuilt.' },
      { k: 'callout', tone: 'tip', md: 'For 3D printing a chamfer on a bottom edge beats a fillet: a rounding is an overhang from below and sags. A 45-degree chamfer prints without support.' },
    ],
    quiz: [
      { k: 'single', q: 'What is stress concentration?', opts: ['A change of colour', 'Stress gathering at a sharp internal corner, leading to a crack', 'The material heating up'], answer: 1, why: 'A sharp corner concentrates the load at a point. A small radius spreads it and multiplies the life of the part.' },
      { k: 'single', q: 'When should you add fillets?', opts: ['At the very start', 'At the end of modelling', 'It makes no difference'], answer: 1, why: 'Early fillets disturb later operations. Added at the end they can be changed or switched off at any time.' },
      { k: 'single', q: 'Which is better on a bottom edge for 3D printing?', opts: ['Fillet', 'Chamfer', 'Neither'], answer: 1, why: 'A rounding is an overhang from below and sags. A 45-degree chamfer prints without support.' },
      { k: 'single', q: 'What is a chamfer at the mouth of a hole for?', opts: ['Decoration', 'So the screw finds its way and the burr does not cut', 'Strength'], answer: 1, why: 'It guides the fit and removes the sharp rim. Every manufactured hole has one.' },
    ],
    note: {
      summary: ['Fillet = rounding, chamfer = cut-off edge.', 'A sharp internal corner concentrates stress: that is where cracks start.', 'Fillet loaded internal corners; chamfer mating edges.', 'Always add fillets at the end of modelling.', 'For 3D printing a bottom edge wants a chamfer, not a fillet.'],
      terms: [{ term: 'fillet', def: 'Rounding an edge to a given radius.' }, { term: 'chamfer', def: 'Cutting an edge off, typically at 45 degrees.' }, { term: 'stress concentration', def: 'Load gathering at a sharp corner, leading to a crack.' }],
    },
  },
  {
    day: 7,
    title: 'Holes and threads',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A hole is the most common feature of a part, and the one most often got wrong. The question is always the same: **what goes in it?**' },
      { k: 'text', md: 'Three kinds of hole:\n\n- **Clearance hole** — the screw shank passes through. Larger than the screw (3.2–3.4 mm for an M3).\n- **Tapped hole** — the screw bites into it. Its diameter is the **tapping size** (2.5 mm for an M3).\n- **Counterbore** — the screw head hides inside it.' },
      { k: 'callout', tone: 'key', md: 'When screwing two parts together, the **first** needs a clearance hole and the **second** a tapped one. If both are tapped the screw cannot pull them together — the most common beginner mistake.' },
      { k: 'text', md: 'In 3D printing, instead of a cut thread the usual answer is a **heat-set insert** hole: a plain, slightly tighter hole into which you melt a brass threaded insert with a soldering iron. Far stronger than a printed thread.' },
      { k: 'callout', tone: 'warn', md: 'A printed hole always comes out tighter than designed, because the material shrinks and the nozzle squeezes inwards. Allow 0.1–0.3 mm, or drill it to size afterwards.' },
    ],
    quiz: [
      { k: 'single', q: 'What clearance hole does an M3 screw need?', opts: ['2.5 mm', '3.2–3.4 mm', 'Exactly 3.0 mm'], answer: 1, why: 'The shank must pass with play. Exactly 3.0 mm will not go in, and 2.5 mm is the tapping size.' },
      { k: 'single', q: 'How do you screw two parts together?', opts: ['Tapped holes in both', 'Clearance in the first, tapped in the second', 'Clearance in both'], answer: 1, why: 'The screw pulls the first part with its head and bites in the second. With two tapped holes no clamping force arises.' },
      { k: 'single', q: 'What is a heat-set insert?', opts: ['A glue', 'A brass threaded insert melted into the plastic with an iron', 'A kind of screw'], answer: 1, why: 'Far stronger and more re-usable than a printed thread. It is the standard answer on 3D printed parts.' },
      { k: 'single', q: 'How does a printed hole compare with the design?', opts: ['Exactly the same', 'Tighter', 'Wider'], answer: 1, why: 'The material shrinks and the nozzle squeezes inwards. Design with 0.1–0.3 mm of allowance.' },
    ],
    note: {
      summary: ['Three kinds of hole: clearance, tapped, counterbore.', 'For an M3: clearance 3.2–3.4 mm, tapped 2.5 mm.', 'Screwed joint: clearance in the first part, tapped in the second.', 'A printed thread is weak: use a heat-set insert instead.', 'A printed hole comes out tighter; allow 0.1–0.3 mm.'],
      terms: [{ term: 'clearance hole', def: 'A hole a screw shank passes through with play.' }, { term: 'tapping size', def: 'The hole diameter a screw thread bites into.' }, { term: 'heat-set insert', def: 'A metal threaded insert melted into plastic with heat.' }],
    },
  },
  {
    day: 8,
    title: 'Patterns and mirroring',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'If you draw something twice, you are doing it wrong. **Patterns** and **mirroring** make many from one — and when you change the one, all of them follow.' },
      { k: 'text', md: 'The three tools:\n\n- **Linear pattern** — in a direction, at a spacing, in a count. A row of screws, ribs, a vent grille.\n- **Circular pattern** — around an axis. A bolt circle on a flange, spokes.\n- **Mirror** — across a plane. Half of a symmetric part is enough.' },
      { k: 'callout', tone: 'key', md: 'A pattern is **alive**: change the source hole from 3 mm to 4 and all eight follow. Copied by hand you would have to edit eight places — and you would certainly forget the eighth.' },
      { k: 'callout', tone: 'warn', md: 'A pattern fails when the source geometry disappears or is reshaped beneath it. That is a "broken reference", and it happens in every parametric CAD package. The cure: build on simple, stable references, not on the edge of a complicated surface.' },
      { k: 'callout', tone: 'tip', md: 'When mirroring, watch the **symmetry plane**: if the part origin is not at its centre, the halves drift apart. Exactly the same mistake as with the Mirror modifier in Blender.' },
    ],
    quiz: [
      { k: 'single', q: 'What is the biggest advantage of a pattern?', opts: ['A smaller file', 'Changing the source element updates every instance', 'Faster rendering'], answer: 1, why: 'You edit one place and all instances follow. Copying by hand would mean eight edits.' },
      { k: 'single', q: 'What would you use for a bolt circle on a flange?', opts: ['Linear pattern', 'Circular pattern', 'Mirror'], answer: 1, why: 'The holes sit around an axis at even angular spacing — exactly a circular pattern.' },
      { k: 'single', q: 'What is a "broken reference"?', opts: ['A corrupt file', 'A pattern failing because its source geometry vanished', 'A wrong unit'], answer: 1, why: 'The operation referred to an edge or face that no longer exists after an earlier change.' },
      { k: 'single', q: 'What should you watch when mirroring?', opts: ['The colour', 'That the symmetry plane really is at the centre', 'The file name'], answer: 1, why: 'A misplaced plane makes the halves drift apart or overlap — the same mistake as with Blender\'s Mirror.' },
    ],
    note: {
      summary: ['What you draw twice, you are drawing wrong.', 'Linear pattern: a direction, a spacing and a count.', 'Circular pattern: around an axis at even angular spacing.', 'Mirror: for a symmetric part, half is enough.', 'Changing the source updates every instance.', 'A pattern fails if the source geometry vanishes — build on stable references.'],
      terms: [{ term: 'pattern', def: 'Repeating an element in a regular arrangement.' }, { term: 'circular pattern', def: 'Repetition around an axis at even angular spacing.' }, { term: 'broken reference', def: 'An operation whose referenced geometry no longer exists.' }],
    },
  },
  {
    day: 9,
    title: 'Reference planes',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'So far you have sketched on the three base planes. In practice you often need a **plane of your own**: angled, offset, or aligned with a face.' },
      { k: 'text', md: 'You can create a plane:\n\n- by **offsetting** an existing plane by a distance,\n- at an **angle**, rotated about an edge,\n- through **three points**,\n- **tangent** to a surface.' },
      { k: 'callout', tone: 'key', md: 'A **reference plane is a more stable anchor** than a model face. Sketch on a face and that face disappears after a later change, and your sketch fails. A plane offset from a base plane survives.' },
      { k: 'text', md: 'This is part of **design intent**: you are telling the model "this plane is always 20 mm from the bottom", not "this plane is wherever that face happens to be now".' },
      { k: 'callout', tone: 'tip', md: 'If a part falls apart on every change, it almost certainly references faces and edges rather than base planes. This is called the "topological naming problem", and it exists in every parametric CAD package.' },
    ],
    quiz: [
      { k: 'single', q: 'Why is a reference plane more stable than a model face?', opts: ['It is faster', 'Because it does not disappear with a later change', 'Because it is bigger'], answer: 1, why: 'A face is the result of an operation and can vanish. A plane offset from a base plane is independent of it.' },
      { k: 'single', q: 'How do you create a plane through three points?', opts: ['You cannot', 'Three points define exactly one plane', 'You need four points'], answer: 1, why: 'Three non-collinear points define exactly one plane. It is one of the standard plane definitions.' },
      { k: 'single', q: 'What does design intent mean for planes?', opts: ['That it looks nice', 'That the plane is tied to something meaningful, not an incidental face', 'That there are few planes'], answer: 1, why: '"20 mm from the bottom" survives edits. "Wherever that face is" does not.' },
      { k: 'single', q: 'What is the sign of building on bad references?', opts: ['A large file', 'The part falls apart on every change', 'Slow display'], answer: 1, why: 'That is the topological naming problem: the referenced edge or face is no longer the same after a change.' },
    ],
    note: {
      summary: ['Create your own plane by offset, at an angle, through three points or tangent.', 'A reference plane is a more stable anchor than a model face.', 'A face can vanish with a change; a plane offset from a base plane cannot.', 'Design intent: tie the plane to something meaningful.', 'If a part falls apart on every change, it rests on bad references.'],
      terms: [{ term: 'reference plane', def: 'A self-defined plane to sketch on.' }, { term: 'design intent', def: 'Building a model so that a dimension change propagates sensibly.' }, { term: 'topological naming problem', def: 'Operations referencing edges and faces failing after a change.' }],
    },
  },
  {
    day: 10,
    title: 'Loft and sweep',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Extrude and revolve suit simple shapes. When the cross-section **changes** or the body follows a **curve**, you need two further tools.' },
      { k: 'text', md: '**Loft:** blends between two or more sketches on different planes. From a circle into a square, from a large profile to a small one. Transitions, streamlined covers, boat hulls.\n\n**Sweep:** carries a profile along a path. Pipes, cable channels, handles, ribs.' },
      { k: 'callout', tone: 'key', md: 'The quality of a loft depends on how the **points of the sketches correspond**. If the start point on the circle and on the square are in different places, the surface twists. Most packages show guide lines — those are what you adjust.' },
      { k: 'callout', tone: 'warn', md: 'A sweep path **cannot turn more sharply** than the size of the profile. Carry a 10 mm pipe along a 3 mm radius arc and the inner side folds through itself, and the operation fails.' },
      { k: 'callout', tone: 'tip', md: 'Do both with the simplest sketches you can. A loft between two circles is reliable; one between two complicated many-point profiles will almost certainly give an unmanageable surface.' },
    ],
    quiz: [
      { k: 'single', q: 'What does a loft do?', opts: ['Carries a profile along a path', 'Blends between two or more sketches', 'Rounds edges'], answer: 1, why: 'A loft creates the surface between the sketches. That is how a circle becomes a square gradually.' },
      { k: 'single', q: 'What does a sweep do?', opts: ['Blends between sketches', 'Carries a profile along a path', 'Mirrors'], answer: 1, why: 'The profile sweeps along the path, and the space it covers becomes the body. Pipes and handles come from it.' },
      { k: 'single', q: 'Why might a lofted surface twist?', opts: ['The wrong material', 'Because the start points of the sketches are not aligned', 'It is too small'], answer: 1, why: 'The program joins the profiles point by point. With offset start points the joining runs in a spiral.' },
      { k: 'single', q: 'What happens if a sweep path turns too sharply?', opts: ['It looks nicer', 'The surface folds through itself and the operation fails', 'It rounds it automatically'], answer: 1, why: 'The inner side of the profile intersects itself in the turn. The path radius must exceed half the profile.' },
    ],
    note: {
      summary: ['Loft: a blend between two or more sketches on different planes.', 'Sweep: carrying a profile along a path.', 'A loft twists when the sketch start points are not aligned.', 'A sweep fails when the path turns more sharply than the profile size.', 'Do both with the simplest sketches you can.'],
      terms: [{ term: 'loft', def: 'A surface blend between two or more sketches.' }, { term: 'sweep', def: 'Carrying a profile along a path.' }, { term: 'guide line', def: 'The marker showing how loft profiles correspond.' }],
    },
  },
  {
    day: 11,
    title: 'Shelling',
    minutes: 20,
    lesson: [
      { k: 'text', md: '**Shelling** hollows out a body, leaving a given wall thickness. A solid cube becomes an open box in a single operation.' },
      { k: 'callout', tone: 'key', md: 'This is not only about saving material. A solid plastic part is **worse** than a shelled one: the thick section pulls in as it cools (a sink mark) and leaves internal stress. That is why manufacturers shell everything.' },
      { k: 'text', md: 'The operation asks for:\n\n- the **wall thickness** (at least twice the nozzle diameter for 3D printing),\n- and **which faces** to remove — those become the openings.' },
      { k: 'callout', tone: 'warn', md: 'Shelling fails when the wall thickness exceeds the smallest internal fillet radius. The program then has nowhere to put the material. The fix: a thinner wall, a larger fillet — or shell **before** filleting.' },
      { k: 'callout', tone: 'tip', md: 'A large, flat shelled surface will bow. Put **ribs** on it — that is tomorrow. A 1 mm rib is worth more than doubling the wall.' },
    ],
    quiz: [
      { k: 'single', q: 'What does shelling do?', opts: ['Rounds edges', 'Hollows out a body leaving a given wall thickness', 'Mirrors'], answer: 1, why: 'The solid becomes a hollow shell with the thickness you specify.' },
      { k: 'single', q: 'Why is a solid plastic part bad?', opts: ['Too heavy', 'It pulls in as it cools and keeps internal stress', 'It cannot be printed'], answer: 1, why: 'Thick material cools unevenly. The sink mark causes a surface depression and weakness.' },
      { k: 'single', q: 'When does shelling fail?', opts: ['When the body is too large', 'When the wall is thicker than the smallest internal fillet', 'When there is a hole in it'], answer: 1, why: 'The program cannot fit the material into a tight corner. A thinner wall or a larger fillet solves it.' },
      { k: 'single', q: 'What should you do with a bowing large flat face?', opts: ['Double the wall thickness', 'Put ribs on it', 'Leave it solid'], answer: 1, why: 'A rib raises the section height, which stiffens far more effectively than thickening.' },
    ],
    note: {
      summary: ['Shelling makes a hollow body with a given wall thickness.', 'A solid plastic part is bad: it sinks as it cools and keeps stress.', 'You give the wall thickness and the faces to remove.', 'Shelling fails if the wall is thicker than the smallest internal fillet.', 'Stiffen a large flat face with ribs, not with thickness.'],
      terms: [{ term: 'shelling', def: 'Hollowing a body while leaving a given wall thickness.' }, { term: 'sink mark', def: 'A surface depression where thick plastic cools and contracts.' }, { term: 'open face', def: 'A face removed by shelling, giving an opening.' }],
    },
  },
  {
    day: 12,
    title: 'Ribs and stiffening',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'When a part flexes, the first instinct is to thicken it. That is nearly always the wrong answer: expensive, heavy, and bad for printing. A **rib** is far more effective.' },
      { k: 'callout', tone: 'key', md: 'Stiffness against bending grows with the **cube** of the section height. Twice the height is eight times the stiffness. That is why an I-beam carries so much, and why ribbing beats putting material everywhere.' },
      { k: 'text', md: 'Rib rules for plastic:\n\n- Make the rib **50–60 per cent** of the wall thickness — thicker and the outer surface sinks.\n- Keep the height to at most **three times** the thickness, or it buckles.\n- Fillet its root so it is not a stress concentrator.\n- Several small ribs beat one large one.' },
      { k: 'model', src: 'LIFT500_szegmens.stl' },
      { k: 'callout', tone: 'tip', md: 'In 3D printing the direction of a rib matters too: a rib running across the layers is far stronger. If you know which way the bending comes from, orient the part on the bed accordingly.' },
    ],
    quiz: [
      { k: 'single', q: 'How much does stiffness grow if you double the section height?', opts: ['Twice', 'Eight times', 'Four times'], answer: 1, why: 'Stiffness goes with the cube of height: 2³ = 8.' },
      { k: 'single', q: 'How thick should a rib be relative to the wall?', opts: ['The same', '50–60 per cent', 'Twice'], answer: 1, why: 'A thicker rib pulls the outer surface in as it cools and leaves a visible sink mark.' },
      { k: 'single', q: 'Why fillet the root of a rib?', opts: ['It looks nicer', 'Because a sharp corner concentrates stress and cracks start there', 'To use less material'], answer: 1, why: 'Exactly the same principle as with fillets: a sharp internal corner concentrates the load.' },
      { k: 'single', q: 'Which is better: one large rib or several small ones?', opts: ['One large', 'Several small', 'No difference'], answer: 1, why: 'Several small ribs stiffen more evenly, are less prone to buckling, and cause less sinking.' },
    ],
    note: {
      summary: ['Against flexing, a rib is more effective than thickening.', 'Stiffness grows with the cube of the section height.', 'Make a rib 50–60 per cent of the wall, or the surface sinks.', 'Keep the height to at most three times the thickness.', 'Fillet the root so it is not a stress concentrator.', 'In printing, a rib running across the layers is stronger.'],
      terms: [{ term: 'rib', def: 'A thin stiffening web that raises the section height.' }, { term: 'sink mark', def: 'A surface depression where thick material cools.' }, { term: 'section height', def: 'The dimension that governs stiffness against bending.' }],
    },
  },
];
