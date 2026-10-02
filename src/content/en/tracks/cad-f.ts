import type { Day } from '../../types';

/** CAD track, days 27-30. */
export const cadEnF: Day[] = [
  {
    day: 27,
    title: 'Slicing and layer height',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'The **slicer** turns a 3D model into paths the printer understands. Most quality questions are decided here — often more by the slicer than by the model.' },
      { k: 'callout', tone: 'key', md: 'The four settings that matter most:\n\n- **Layer height** — 0.1 mm is fine and slow, 0.2 mm is the default, 0.3 mm is fast and coarse\n- **Wall count** — most of the strength comes from here; 3 or 4 walls usually beat raising the infill\n- **Infill** — 15 to 20 percent is enough for most parts\n- **Print speed** — slower gives better quality, especially on the first layer' },
      { k: 'text', md: 'A common misunderstanding: **raising the infill does not make a part strong**. Going from 20 to 50 percent doubles the time and material but barely improves bending strength. For the same time, **thicken the walls** instead — that is outer material, and it carries the bending load.' },
      { k: 'code', lang: 'js', src: '// Rules of thumb from practice\nlayer        = 0.2    // mm, a good default\nwalls        = 3      // 1.2 mm wall with a 0.4 nozzle\ninfill       = 20     // percent, gyroid pattern\nfirst_layer  = 0.3    // mm, thicker for adhesion\nfirst_speed  = 20     // mm/s, slowly\n\n// For a loaded part:\nwalls_loaded  = 5     // 2 mm wall, far stronger\ninfill_loaded = 40    // and only then raise the infill', explain: 'The relationship between wall count and infill is the key decision. Walls are outer material carrying the bending load; infill is internal and mainly stops the faces sagging.' },
      { k: 'callout', tone: 'warn', md: 'The **first layer** decides whether a print succeeds. Thicker layer, slower speed, hotter bed. If the first layer does not stick, the part shifts and every layer above it is wrong. A good half of print failures start here.' },
      { k: 'callout', tone: 'tip', md: 'The slicer **preview** is the most important and least used tool. Step through the model layer by layer before printing: you see where support will go, where a wall is thin, and where geometry will droop. Two minutes, and it saves a six-hour ruined print.' },
    ],
    quiz: [
      { k: 'single', q: 'What is a good default layer height?', opts: ['0.05 mm', '0.2 mm', '0.5 mm'], answer: 1, why: '0.1 mm is fine and slow, 0.3 mm fast and coarse. 0.2 is the sensible middle.' },
      { k: 'single', q: 'What strengthens a part more?', opts: ['Raising the infill', 'More walls', 'Slower printing'], answer: 1, why: 'Walls are outer material carrying the bending load. Raising infill barely helps.' },
      { k: 'single', q: 'How much infill is enough for most parts?', opts: ['5 percent', '15-20 percent', '100 percent'], answer: 1, why: 'Only heavily loaded parts need more, and even then thicken the walls first.' },
      { k: 'single', q: 'Why does the first layer matter so much?', opts: ['It is the most visible', 'If it does not stick, the part shifts and everything above is wrong', 'It is the thickest'], answer: 1, why: 'A good half of print failures start at the first layer.' },
      { k: 'single', q: 'What is the slicer preview for?', opts: ['It looks nice', 'Stepping layer by layer shows support, thin walls and droop', 'It speeds things up'], answer: 1, why: 'Two minutes, and it saves a six-hour ruined print.' },
    ],
    note: {
      summary: ['The slicer turns a model into printer paths.', 'Layer height: 0.1 fine, 0.2 default, 0.3 fast.', 'Most strength comes from the walls, not the infill.', '15-20 percent infill is enough; thicken walls first.', 'Make the first layer thicker and slower.', 'Step through the slicer preview before printing.'],
      terms: [{ term: 'slicer', def: 'The program converting a model into printer paths.' }, { term: 'infill', def: 'The lattice filling the interior of a part.' }, { term: 'wall count', def: 'The number of perimeters printed around the outside.' }],
    },
  },
  {
    day: 28,
    title: 'Post-processing and fitting',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A part out of the printer is rarely finished. A few simple post-processing steps decide whether it becomes a working component or just a nicely shaped piece of plastic.' },
      { k: 'callout', tone: 'key', md: 'Three steps you will almost always need:\n\n1. **Remove support** — with side cutters, then deburr what remains\n2. **Drill out holes** — a printed hole is always undersized; use a drill or reamer to bring it to nominal\n3. **Clean mating faces** — the spread lip of the first layer (elephant foot) comes off with a file' },
      { k: 'text', md: '**Elephant foot** is common and insidious: the first layer spreads slightly under bed pressure and the bottom of the part comes out 0.2 to 0.3 mm oversized. It then will not fit where you designed it. Two answers: **elephant foot compensation** in the slicer, or a chamfer filed afterwards.' },
      { k: 'callout', tone: 'warn', md: '**Melting in a heat-set insert** takes practice. Set the iron around 200 degrees, press the insert in slowly and vertically, and let it cool before putting a screw in. Pressed too fast it tilts; too hot and the plastic wells up around it.' },
      { k: 'text', md: 'Gluing depends on the material:\n\n- **PLA and PETG** — cyanoacrylate (superglue) holds well\n- **ABS** — dissolved in acetone it bonds to itself, the strongest joint of all\n- **Nylon** — almost nothing sticks to it; bolt it or print it in one piece\n\nFor a large area, epoxy works on all of them.' },
      { k: 'callout', tone: 'tip', md: 'When designing, leave a **0.2 mm gap** at every mating face and add a small **chamfer** in the insertion direction. The chamfer acts as a lead-in: the part finds its place by itself instead of catching on the edge.' },
    ],
    quiz: [
      { k: 'single', q: 'What is elephant foot?', opts: ['A type of support', 'The first layer spreading so the bottom comes out oversized', 'A defect on the top'], answer: 1, why: 'A 0.2 to 0.3 mm difference that stops the part fitting where you designed it.' },
      { k: 'single', q: 'Why drill out holes?', opts: ['It looks better', 'Because a printed hole always comes out undersized', 'To make it stronger'], answer: 1, why: 'A drill or reamer brings it to the nominal size.' },
      { k: 'single', q: 'What iron temperature suits a heat-set insert?', opts: ['100 degrees', 'Around 200 degrees', '350 degrees'], answer: 1, why: 'Press slowly and vertically, and let it cool before inserting a screw.' },
      { k: 'single', q: 'What bonds ABS most strongly?', opts: ['Superglue', 'Acetone, to itself', 'Water'], answer: 1, why: 'Acetone dissolves ABS, so the joint is effectively a weld.' },
      { k: 'single', q: 'What should you add in the insertion direction?', opts: ['A larger gap', 'A chamfer acting as a lead-in', 'More material'], answer: 1, why: 'The part finds its place by itself instead of catching on the edge.' },
    ],
    note: {
      summary: ['A printed part is rarely finished: support, holes, faces.', 'Printed holes come out undersized: drill them to nominal.', 'Elephant foot: compensate in the slicer or file it off.', 'Heat-set insert: 200 degree iron, slow and vertical, then cool.', 'Gluing: superglue for PLA/PETG, acetone for ABS, almost nothing for nylon.', 'Design a 0.2 mm gap and a lead-in chamfer.'],
      terms: [{ term: 'elephant foot', def: 'The spread of the first layer at the base of a part.' }, { term: 'deburring', def: 'Removing protruding remnants from a surface.' }, { term: 'reamer', def: 'A cutting tool producing an accurate hole size.' }],
    },
  },
  {
    day: 29,
    title: 'Your first robot part',
    minutes: 26,
    lesson: [
      { k: 'text', md: 'Time to carry one complete part from requirement to printed object. A motor mount is a good choice: simple enough to finish in one sitting, real enough to contain every step.' },
      { k: 'callout', tone: 'key', md: 'The full route:\n\n1. **Requirements** — which motor, what load, where it bolts\n2. **Parameters** — every number into the list, with names (day 13)\n3. **Sketch** fully defined, with functional constraints (day 14)\n4. **Solid** by extrusion, then the details\n5. **Fillets and chamfers** at the end\n6. **Place in the assembly** and run an interference check (day 16)\n7. **Print orientation** and slicing (days 25 and 27)\n8. **Print, post-process, test fit**' },
      { k: 'text', md: 'What everyone gets wrong on their first part, worth knowing in advance:\n\n- **Forgotten tool access** — the screw fits, the hex key does not\n- **Too tight a gap** — a fit designed with no clearance that will not go together\n- **Wrong orientation** — the mount breaks along the layers under the first load\n- **Missing cable exit**' },
      { k: 'callout', tone: 'warn', md: 'The **test fit on the real component** cannot be skipped. The model may be perfect, but the motor tolerance, the screw length or printing accuracy can differ. Print it, try it, record the difference, and **fix the parameters** — not the geometry.' },
      { k: 'callout', tone: 'tip', md: 'If you are unsure about a fit, print a **test coupon** first: just the boss and the holes, 5 mm thick. It is done in ten minutes and tells you whether the clearance is right — instead of printing a four-hour mount at the wrong size.' },
      { k: 'text', md: 'Finally document it: save the parameter list with the final values, and note the layer height and wall count you printed at. On the next part that is your starting point, so you need not work it out again.' },
    ],
    quiz: [
      { k: 'single', q: 'What is the first step in designing a part?', opts: ['The sketch', 'Clarifying the requirements', 'Printing'], answer: 1, why: 'Which motor, what load, where it bolts — everything else follows.' },
      { k: 'single', q: 'When do the fillets come?', opts: ['At the start', 'At the end, after the main shape', 'It does not matter'], answer: 1, why: 'If a later hole lands on a filleted edge, the model breaks.' },
      { k: 'single', q: 'What is the commonest beginner mistake?', opts: ['Too large a part', 'Forgotten tool access: the screw fits, the key does not', 'Too many parameters'], answer: 1, why: 'That is why you model the tool cylinder and rotate the assembly.' },
      { k: 'single', q: 'What should you fix when the test fit shows a difference?', opts: ['The geometry', 'The parameters', 'The printer'], answer: 1, why: 'That is what a parametric model is for: one number propagates through everything.' },
      { k: 'single', q: 'What is a test coupon good for?', opts: ['Looks', 'Ten minutes tells you whether the clearance is right, instead of four hours', 'Strength'], answer: 1, why: 'Just the boss and the holes, 5 mm thick, is enough to check the fit.' },
    ],
    note: {
      summary: ['Route: requirements, parameters, sketch, solid, details, assembly, orientation, print.', 'Fillets come at the end.', 'Common mistakes: tool access, tight gap, wrong orientation, cable exit.', 'The test fit cannot be skipped.', 'Fix the parameters, not the geometry.', 'Print a test coupon for an uncertain fit.', 'Document the final parameters and print settings.'],
      terms: [{ term: 'test coupon', def: 'A small quick print used to verify a fit.' }, { term: 'test fit', def: 'Trying the printed part against the real component.' }, { term: 'tool access', def: 'The clear space a tool needs to reach a fastener.' }],
    },
  },
  {
    day: 30,
    title: 'Designing a complete chassis',
    minutes: 30,
    lesson: [
      { k: 'text', md: 'After one part comes the real task: a **complete chassis** holding the motors, the battery, the controller and the sensors — while staying assemblable and repairable.' },
      { k: 'callout', tone: 'key', md: 'Start with **skeleton geometry** (day 15): a separate sketch holding only the main dimensions and axes — track width, wheelbase, wheel diameter, battery position. Every part refers to it, so changing the track width carries the whole machine with it.' },
      { k: 'text', md: 'Mass layout decides how the machine behaves:\n\n- **The battery is the heaviest item** — it sets the centre of mass\n- Keep it **low**: the lower, the more stable\n- **Centred**, biased slightly towards the driven wheels for traction\n- **Put sensors at the edges**, where they see the most' },
      { k: 'callout', tone: 'warn', md: '**Serviceability** is what beginner chassis always get wrong. Ask of every part: *how do I get it out when it fails?* If replacing a motor means removing the controller and pulling eight cables, the machine will be abandoned on the bench at its second fault.' },
      { k: 'text', md: 'Three practical principles for a chassis:\n\n- **Layering** — drive on the bottom level, electronics in the middle, payload on top. One level lifts off.\n- **A standard mounting pattern** — a 20 mm hole grid on the base plate that anything bolts to. No redesign when the layout changes.\n- **Access openings** — to connectors and switches, without disassembly.' },
      { k: 'callout', tone: 'tip', md: 'Print the chassis **small first**, at 25 or 50 percent. It finishes in a few hours, and the proportions, the collisions and the assembly order all show up the same — at a fraction of the material and time.' },
      { k: 'text', md: 'After thirty days you have it all: sketching, solids, assemblies, tolerances, drawings, materials, printing and post-processing. Designing the next machine needs no new skills, only practice — and every chassis will be faster than the one before.' },
    ],
    quiz: [
      { k: 'single', q: 'Where should you start a complete chassis?', opts: ['With the most complex part', 'With skeleton geometry holding only the main dimensions', 'With the render'], answer: 1, why: 'Every part refers to it, so a change in one main dimension carries the machine.' },
      { k: 'single', q: 'Where should the battery go?', opts: ['As high as possible', 'Low and centred, biased towards the driven wheels', 'On top'], answer: 1, why: 'It is the heaviest item; its position sets the centre of mass and the stability.' },
      { k: 'single', q: 'What do beginner chassis always get wrong?', opts: ['The colour', 'Serviceability', 'The mass'], answer: 1, why: 'If replacing a motor means stripping everything, the machine stalls at its second fault.' },
      { k: 'single', q: 'What is a standard mounting pattern good for?', opts: ['Looks', 'Anything bolts to it, with no redesign when the layout changes', 'Strength'], answer: 1, why: 'A 20 mm hole grid on the base plate makes the whole machine flexible.' },
      { k: 'single', q: 'Why print the chassis small first?', opts: ['It is cheaper', 'A few hours shows the proportions, collisions and assembly order just as well', 'It is stronger'], answer: 1, why: '25 to 50 percent scale is enough to check proportions, collisions and assembly order.' },
    ],
    note: {
      summary: ['Start with skeleton geometry: only the main dimensions and axes.', 'The battery sets the centre of mass: keep it low and centred.', 'Put sensors at the edges where they see the most.', 'Serviceability is the commonest mistake: how do I get it out?', 'Layering, a standard hole grid, and access openings.', 'Print the chassis at 25-50 percent scale first.'],
      terms: [{ term: 'skeleton geometry', def: 'A shared reference sketch holding the main dimensions.' }, { term: 'centre of mass', def: 'The balance point of the mass distribution, setting stability.' }, { term: 'mounting pattern', def: 'A standard hole grid anything can be fixed to.' }],
    },
  },
];
