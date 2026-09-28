import type { Day } from '../../types';

/** CAD track, days 2–5. */
export const cadEnB: Day[] = [
  {
    day: 2,
    title: 'The sketch',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'Every CAD part begins with a **sketch**: a two-dimensional outline drawn on a plane. The solid comes out of it later.' },
      { k: 'text', md: 'The elements of a sketch: line, arc, circle, rectangle, spline. You need few of them — most parts are lines and circles.' },
      { k: 'callout', tone: 'key', md: 'The sketch has to be **closed** if you want a solid from it. A single 0.01 mm gap and the program cannot tell inside from outside. That is behind most beginner error messages.' },
      { k: 'text', md: 'Three rules that spare you a great deal of pain:\n\n1. **Start from the origin.** At least one point must be tied to it, or the sketch drifts.\n2. **Keep it simple.** Two simple sketches beat one complicated one.\n3. **Do not draw repetition.** What appears four times, draw once and pattern — day 8 shows how.' },
      { k: 'callout', tone: 'tip', md: 'Draw roughly first and dimension afterwards. A CAD sketch is not a technical drawing: constraints and dimensions put it in place, not careful drawing.' },
    ],
    quiz: [
      { k: 'single', q: 'Why must a sketch be closed?', opts: ['So it looks better', 'Otherwise the program cannot tell inside from outside', 'To take less space'], answer: 1, why: 'Extruding needs an unambiguous interior. With even a tiny gap the outline encloses no area, so no solid can come from it.' },
      { k: 'single', q: 'Why start from the origin?', opts: ['The program runs faster', 'Otherwise the sketch is not anchored and can drift', 'Because it is compulsory'], answer: 1, why: 'With nothing tying it to the coordinate system, the sketch floats. A later edit can rearrange the whole thing.' },
      { k: 'single', q: 'What is a sketch?', opts: ['The finished part', 'A 2D outline on a plane that becomes a solid', 'The technical drawing'], answer: 1, why: 'A sketch is two-dimensional. Extrude or revolve is what lifts a three-dimensional solid out of it.' },
      { k: 'single', q: 'Which is better: one complicated sketch or two simple ones?', opts: ['One complicated', 'Two simple', 'It makes no difference'], answer: 1, why: 'Simple sketches are easier to constrain, edit and debug. A complicated one becomes unmanageable before long.' },
    ],
    note: {
      summary: ['Every part starts with a sketch: a 2D outline drawn on a plane.', 'The sketch must be closed, or no solid can come from it.', 'Tie at least one point to the origin so it cannot drift.', 'Two simple sketches beat one complicated one.', 'Draw roughly, then dimension — constraints are what make it exact.'],
      terms: [{ term: 'sketch', def: 'A two-dimensional outline on a plane from which a solid is made.' }, { term: 'closed contour', def: 'A gap-free outline that unambiguously encloses an area.' }, { term: 'origin', def: 'The zero point of the coordinate system the sketch anchors to.' }],
    },
  },
  {
    day: 3,
    title: 'Constraints',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A **constraint** is a rule you place on the sketch: "these two lines are parallel", "this circle is 10 mm across". The program keeps them, even when you edit later.' },
      { k: 'text', md: 'There are two kinds:\n\n**Geometric:** parallel, perpendicular, coincident, tangent, equal, horizontal, vertical, concentric.\n\n**Dimensional:** length, diameter, radius, angle, distance.' },
      { k: 'callout', tone: 'key', md: 'A sketch is **fully defined** when not one of its points can be dragged. Most CAD packages show this by colour. Aim for it: a half-defined sketch reshapes itself unexpectedly on a later edit.' },
      { k: 'callout', tone: 'warn', md: 'Do not **over**-constrain. Give a rectangle a width and both side lengths and you have created a contradiction. The program complains, but such a sketch is hard to untangle afterwards.' },
      { k: 'text', md: 'The good order is: draw → geometric constraints → dimensions. The other way round is far more work, because the dimensions keep jumping while the geometry is still loose.' },
    ],
    quiz: [
      { k: 'single', q: 'What does a fully defined sketch mean?', opts: ['Every line is black', 'Not one of its points can be dragged', 'It contains no circles'], answer: 1, why: 'With every degree of freedom removed by constraints, the geometry is unambiguous and will not shift on a later edit.' },
      { k: 'single', q: 'What is the right order when sketching?', opts: ['Dimensions, then geometric constraints', 'Draw, geometric constraints, dimensions', 'Dimensions only'], answer: 1, why: 'Geometric constraints pin the relationships. Dimension first and they keep moving while the geometry is still free.' },
      { k: 'single', q: 'What happens if you over-constrain?', opts: ['It becomes more precise', 'A contradiction appears and the program objects', 'Nothing'], answer: 1, why: 'You remove the same degree of freedom twice. With contradictory rules the program cannot tell which one to honour.' },
      { k: 'multi', q: 'Which two are geometric constraints?', opts: ['Parallel', 'Diameter 10 mm', 'Perpendicular', 'Length 25 mm'], answers: [0, 2], why: 'Parallel and perpendicular describe a relationship. Diameter and length are dimensional: they pin a number.' },
    ],
    note: {
      summary: ['A constraint is a rule the program honours through every edit.', 'Geometric: parallel, perpendicular, tangent, equal, concentric.', 'Dimensional: length, diameter, radius, angle.', 'A sketch is fully defined when no point can be dragged.', 'Good order: draw → geometric constraints → dimensions.', 'Over-constraining creates a contradiction that is hard to untangle.'],
      terms: [{ term: 'constraint', def: 'A rule placed on a sketch that the program always honours.' }, { term: 'fully defined', def: 'A sketch none of whose points can be dragged.' }, { term: 'over-constraining', def: 'Removing the same degree of freedom twice, creating a contradiction.' }],
    },
  },
  {
    day: 4,
    title: 'Extrude and revolve',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Two basic operations turn a sketch into a solid. Between them they cover most parts.' },
      { k: 'text', md: '**Extrude:** pull the sketch out perpendicular to its plane and it becomes a solid. A 20 mm circle extruded 5 mm is a disc.\n\n**Revolve:** spin the sketch around an axis. A half-circle revolved 360 degrees is a sphere. Every body of revolution — a screw, a shaft, a cup — is made this way.' },
      { k: 'callout', tone: 'key', md: 'Both operations can **add and remove** material. A "cut extrude" does the same thing but makes a hole. A hole is not a separate tool: it is a circle with a cut extrude.' },
      { k: 'text', md: 'Further extrude options you will use:\n\n- **Symmetric** — equally in both directions from the plane\n- **Draft** — slightly angled walls; required for casting, helpful for release when printing\n- **Up to surface** — extrudes until it meets another face' },
      { k: 'model', src: 'LIFT500_szegmens.stl' },
      { k: 'callout', tone: 'tip', md: 'A part can be built many ways. The good build is the one that is **easy to change later**. Ask yourself: if tomorrow it needs to be 5 mm longer, how many things must I edit? If the answer is one, you are on the right track.' },
    ],
    quiz: [
      { k: 'single', q: 'What does extrude do?', opts: ['Spins the sketch around an axis', 'Pulls the sketch out perpendicular into a solid', 'Rounds the edges'], answer: 1, why: 'Extrude adds depth perpendicular to the sketch plane. Spinning is revolve.' },
      { k: 'single', q: 'Which operation would make a screw?', opts: ['Extrude', 'Revolve', 'Fillet'], answer: 1, why: 'A screw is a body of revolution: you revolve its profile around an axis. The thread is a further operation on top.' },
      { k: 'single', q: 'How do you make a hole?', opts: ['With a dedicated hole tool and nothing else', 'Draw a circle and cut-extrude it away', 'By deleting'], answer: 1, why: 'A hole is a material-removing extrude. Most packages offer a convenient "hole" tool, but the same thing happens behind it.' },
      { k: 'single', q: 'What marks a good build?', opts: ['Few operations', 'It is easy to change later', 'The feature tree looks tidy'], answer: 1, why: "A part's life is about edits. If a dimension change is one number, you built it well." },
    ],
    note: {
      summary: ['Extrude: pull the sketch out perpendicular to get a solid.', 'Revolve: spin the sketch around an axis to get a body of revolution.', 'Both can add or remove material — a hole is a cut extrude.', 'Extrude options: symmetric, draft, up to surface.', 'The good build is the one a single number change can edit.'],
      terms: [{ term: 'extrude', def: 'Pulling a sketch perpendicular to its plane to form a solid.' }, { term: 'revolve', def: 'Spinning a sketch around an axis to form a body of revolution.' }, { term: 'cut extrude', def: 'A material-removing extrude, used for holes and slots.' }],
    },
  },
  {
    day: 5,
    title: 'Wall thickness and printability',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'On screen a model is always perfect. A printer is a physical machine, and there are rules it will not ignore.' },
      { k: 'text', md: '**Wall thickness.** The minimum is twice the nozzle diameter: with a 0.4 mm nozzle that is **0.8 mm**. A thinner wall is either skipped by the slicer or attempted as a single strand — which snaps.\n\n**Overhang.** An overhang steeper than 45 degrees droops without support. Forty-five is the limit because there each layer rests on half of the one below.\n\n**Bridges.** Between two points a printer can span roughly 5–10 mm. Longer than that and it sags.' },
      { k: 'callout', tone: 'key', md: 'Along the Z axis — between the layers — a part is markedly weaker than within a layer. If you know which way the load comes from, orient the part so the layers run across it.' },
      { k: 'model', src: 'LIFT500_gyuru_teljes.stl' },
      { k: 'callout', tone: 'tip', md: 'While designing, ask: "how will this sit on the bed?" If the answer is not obvious, or it needs a lot of support, change the geometry — that is far cheaper than clipping supports off afterwards.' },
      { k: 'text', md: 'Open your own STL files in the CAD Lab: the section slider lets you look inside and see where a wall thins out.' },
    ],
    quiz: [
      { k: 'numeric', q: 'What is the minimum wall thickness with a 0.4 mm nozzle? (mm)', answer: 0.8, tol: 0.05, unit: 'mm', why: 'Twice the nozzle diameter. A single-strand wall is not strong enough, and the slicer often drops it entirely.' },
      { k: 'numeric', q: 'At how many degrees does an overhang start needing support? (degrees)', answer: 45, tol: 5, unit: '°', why: 'Forty-five is the usual limit: there each layer still rests on half the one below. Steeper and it would print into thin air.' },
      { k: 'single', q: 'In which direction is a printed part weaker?', opts: ['Within a layer', 'Between layers, along the Z axis', 'Equally in both'], answer: 1, why: 'The bond between layers is weaker than continuous material. Tension along Z is the classic failure mode of a printed part.' },
      { k: 'single', q: 'What should you do if a geometry would need a lot of support?', opts: ['Print it and break the supports off', 'Change the geometry or the orientation', 'Thicken the wall'], answer: 1, why: 'Support leaves marks and costs time and material. A small geometry change at the design stage is far cheaper.' },
    ],
    note: {
      summary: ['Minimum wall thickness: twice the nozzle diameter (0.4 mm → 0.8 mm).', 'An overhang steeper than 45 degrees droops without support.', 'A printer can bridge 5–10 mm, no more.', 'A part is markedly weaker between layers, along Z.', 'Orient the part so the layers run across the load.', 'While designing, ask how it will sit on the bed.'],
      terms: [{ term: 'wall thickness', def: "The thickness of the model's wall; minimum twice the nozzle diameter." }, { term: 'overhang', def: 'An unsupported downward face, needing support beyond 45 degrees.' }, { term: 'layer adhesion', def: 'The bond between printed layers, weaker than continuous material.' }],
    },
  },
];
