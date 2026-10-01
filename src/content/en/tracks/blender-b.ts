import type { Day } from '../../types';

/** BLENDER track, days 4–10. */
export const blenderEnB: Day[] = [
  {
    day: 4,
    title: 'Edit mode: vertices, edges, faces',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'In object mode a thing is one piece. In **edit mode** (Tab) you can take it apart: the surface is made of vertices, edges and faces.' },
      { k: 'text', md: 'The three selection modes sit on the 1, 2, 3 keys:\n\n- **1** — vertex\n- **2** — edge\n- **3** — face\n\nSame geometry, different eyes. G/R/S work exactly as before, now on the selected parts.' },
      { k: 'callout', tone: 'key', md: 'A face needs at least three vertices. Blender handles quads and n-gons too, but the **quad** is the right choice: it smooths predictably and subdivides cleanly.' },
      { k: 'text', md: 'Selecting quickly:\n\n- **A** — everything\n- **Alt + A** — nothing\n- **L** — the connected piece under the cursor\n- **Alt + click an edge** — a whole edge loop\n- **Ctrl + click** — the shortest path between two selections' },
      { k: 'callout', tone: 'tip', md: 'Press **Z** and pick wireframe or x-ray if you want to select vertices on the far side too. Otherwise you only reach the surface facing you.' },
    ],
    quiz: [
      { k: 'single', q: 'How do you switch between vertex, edge and face selection?', opts: ['Tab', 'The 1, 2, 3 keys', 'Shift'], answer: 1, why: 'In edit mode 1 is vertex, 2 is edge, 3 is face. Tab switches between object and edit mode.' },
      { k: 'single', q: 'Why is a quad better than a triangle when modelling?', opts: ['It takes less space', 'It smooths predictably and subdivides cleanly', 'It renders faster'], answer: 1, why: 'A quad grid behaves predictably under smoothing and keeps edge loops intact. Triangles break the loops.' },
      { k: 'single', q: 'What does Alt + click on an edge do?', opts: ['Deletes the edge', 'Selects a whole edge loop', 'Cuts it in two'], answer: 1, why: 'An edge loop is a run of edges around the model. It is the most common selection move in modelling.' },
      { k: 'single', q: 'What is the Z key for here?', opts: ['Undo', 'Switching display mode, for example to wireframe', 'Zoom'], answer: 1, why: 'Z opens the display-mode pie. In wireframe you can also select vertices on the far side.' },
    ],
    note: {
      summary: ['In edit mode the surface is made of vertices, edges and faces.', 'Selection mode: 1 vertex, 2 edge, 3 face.', 'The quad is the right base unit: it smooths and subdivides well.', 'Selecting: A all, Alt+A none, L connected piece, Alt+click an edge loop.', 'Press Z for wireframe to reach vertices on the far side.'],
      terms: [{ term: 'vertex', def: 'A point in space; the smallest building block of a surface.' }, { term: 'edge loop', def: 'A connected run of edges going around a model.' }, { term: 'n-gon', def: 'A face with more than four sides, best avoided.' }],
    },
  },
  {
    day: 5,
    title: 'Extrude and inset',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Two operations build most shapes. Get used to these two and you can model.' },
      { k: 'text', md: '**Extrude (E)** — pull new geometry out of the selected face. The same idea as the CAD extrude, but free, from any face.\n\n**Inset (I)** — draw a smaller face of the same shape inside the face. This makes frames, buttons and the rim of a recess.' },
      { k: 'code', lang: 'js', src: '// The usual recipe for a recess:\n// 1. select the face\n// 2. I  (inset)   → a smaller face inside\n// 3. E  (extrude) → then move it inwards\n// 4. Esc or right-click if you want it left in place', explain: 'Escape does not undo the extrude, only the move! The face is created in place — the most common beginner mistake, and it leaves doubled geometry.' },
      { k: 'callout', tone: 'warn', md: 'If you extrude by accident and "undo" it with Escape, Blender **leaves** a face sitting exactly on the old one. Use Ctrl+Z, or clean up later with M → Merge by Distance.' },
      { k: 'callout', tone: 'key', md: 'After an extrude the selection moves to the **new** part. That is why E, move, E, move builds a chain — an arm, a pipe, a staircase.' },
    ],
    quiz: [
      { k: 'single', q: 'What does inset (I) do?', opts: ['Pulls the face out', 'Creates a smaller face of the same shape inside it', 'Deletes the face'], answer: 1, why: 'Inset shrinks inwards within the plane of the face. Frames, rims and button surfaces come from it.' },
      { k: 'single', q: 'What happens if you press Escape after an extrude?', opts: ['The whole thing is undone', 'The new geometry stays in place, doubled over the old', 'Nothing'], answer: 1, why: 'Escape only cancels the move. The new faces exist and sit exactly on the old ones — that is where the odd shading comes from.' },
      { k: 'single', q: 'Where does the selection go after an extrude?', opts: ['The original face', 'The newly created part', 'Nothing'], answer: 1, why: 'That is why you can press E repeatedly and build a chain out of it.' },
      { k: 'order', q: 'In what order do you make a recess in a face?', items: ['Extrude inwards', 'Select the face', 'Inset'], correct: [1, 2, 0], why: 'Select the face, inset a smaller one inside it, then push that inwards with extrude.' },
    ],
    note: {
      summary: ['Extrude (E) pulls new geometry out of the selected face.', 'Inset (I) creates a smaller face of the same shape within it.', 'Recipe for a recess: select → inset → extrude inwards.', 'Escape after an extrude does not undo it: the face stays, doubled.', 'After an extrude the selection moves to the new part, so chains are easy.'],
      terms: [{ term: 'extrude', def: 'Pulling new geometry out of a selected face or edge.' }, { term: 'inset', def: 'Creating a smaller face of the same shape within a face.' }, { term: 'doubled geometry', def: 'Faces lying on top of each other, causing shading artefacts.' }],
    },
  },
  {
    day: 6,
    title: 'Loop cuts and subdividing',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Much of modelling is about having **geometry where it is needed** — and nowhere else. The loop cut is the main tool for that.' },
      { k: 'text', md: '**Ctrl + R** (loop cut): hover over a surface and a yellow loop appears. Click and a new edge loop is created. Move it, then click again to place it — or right-click to drop it exactly in the middle.' },
      { k: 'callout', tone: 'tip', md: 'Before placing, **scroll** to insert several loops at once. Six even divisions in one move is far more precise than cutting six times.' },
      { k: 'text', md: '**Subdivide** (right-click → Subdivide) splits the selected edges. It is less directed than a loop cut: it easily creates triangles and messy topology. Use it sparingly.' },
      { k: 'callout', tone: 'key', md: 'Unnecessary geometry is as much of a problem as missing geometry. Every edge not shaping something slows you down and spoils the smoothing. Ask: is this loop doing a job?' },
    ],
    quiz: [
      { k: 'single', q: 'What is the loop cut shortcut?', opts: ['Ctrl + R', 'Ctrl + L', 'Shift + D'], answer: 0, why: 'Ctrl + R starts the loop cut; the yellow preview shows where the loop will go.' },
      { k: 'single', q: 'What does scrolling do during a loop cut?', opts: ['Zooms', 'Raises the number of loops inserted at once', 'Rotates'], answer: 1, why: 'Scrolling inserts several parallel loops evenly spaced, in a single operation.' },
      { k: 'single', q: 'Why avoid subdivide?', opts: ['It is slow', 'It easily creates messy topology and triangles', 'It does not work on quads'], answer: 1, why: 'Subdivide splits everything without direction. A loop cut puts an edge exactly where you want it.' },
      { k: 'single', q: 'Why is unnecessary geometry a problem?', opts: ['It is not', 'It slows you down and spoils the smoothing', 'Only the file gets bigger'], answer: 1, why: 'Every edge that shapes nothing is in the way: harder to select, harder to edit, and worse to smooth.' },
    ],
    note: {
      summary: ['Ctrl + R is the loop cut: it inserts a new edge loop around the form.', 'Scrolling during a loop cut inserts several loops evenly.', 'Right-click while moving a loop cut drops it exactly in the middle.', 'Subdivide is undirected and can produce messy topology.', 'Unnecessary edges are as bad as missing ones — every loop should do a job.'],
      terms: [{ term: 'loop cut', def: 'Inserting a new edge loop around a form with Ctrl + R.' }, { term: 'subdivide', def: 'Splitting selected edges, without direction.' }, { term: 'topology', def: 'How the edge mesh of a surface is laid out.' }],
    },
  },
  {
    day: 7,
    title: 'Modifiers: Mirror and Subdivision',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'A **modifier** is an operation that does not rewrite the geometry but sits on top of it. It can be changed or removed at any time — far safer than reshaping by hand.' },
      { k: 'text', md: '**Mirror:** model half the object and the modifier mirrors the other half. A robot arm, a car, a face — you only build one side. Change it and the other side follows.' },
      { k: 'callout', tone: 'warn', md: 'Mirror reflects across the object **origin**. If the origin is not on the symmetry plane, the halves drift apart. Start a mirrored model from the origin.' },
      { k: 'text', md: '**Subdivision Surface** (Ctrl + 1, 2, 3): smooths the surface by subdividing it. A cube at Subdivision 2 becomes sphere-like. `Levels Viewport` is the working detail, `Render` the final one.' },
      { k: 'callout', tone: 'key', md: 'Subdivision likes **quad-based** topology. Triangles and n-gons produce creases and pinches. That is the main reason to model in quads.' },
      { k: 'callout', tone: 'tip', md: 'Modifier order matters: Mirror should come **before** Subdivision, or a seam appears where the halves meet.' },
    ],
    quiz: [
      { k: 'single', q: 'What is the biggest advantage of a modifier?', opts: ['Speed', 'It does not rewrite the geometry and can be changed or removed any time', 'A smaller file'], answer: 1, why: 'A modifier is a layer above the geometry. The raw data stays untouched, so the decision stays reversible.' },
      { k: 'single', q: 'What does the Mirror modifier reflect across?', opts: ['The world centre', 'The object origin', 'The camera'], answer: 1, why: 'The origin is the mirror plane. With it in the wrong place the halves drift apart or overlap.' },
      { k: 'single', q: 'Why is Subdivision bad on triangles?', opts: ['It does not work', 'It creates creases and pinches on the surface', 'It is slower'], answer: 1, why: 'The subdivision algorithm is designed for quads. On triangles and n-gons the smoothing is uneven.' },
      { k: 'single', q: 'In what order should Mirror and Subdivision go?', opts: ['Mirror first', 'Subdivision first', 'It makes no difference'], answer: 0, why: 'If Subdivision runs first, each half smooths separately and a seam is left where they meet.' },
    ],
    note: {
      summary: ['A modifier is a layer above the geometry: non-destructive and removable.', 'Mirror reflects across the object origin — keep the origin on the symmetry plane.', 'With Mirror you only model half the object.', 'Subdivision Surface smooths by subdividing; Ctrl + 1/2/3 sets the level.', 'Subdivision likes quads; triangles produce creases.', 'Modifier order matters: Mirror before Subdivision.'],
      terms: [{ term: 'modifier', def: 'A non-destructive operation layered over the geometry.' }, { term: 'Mirror', def: 'A modifier completing a model by reflecting across the origin.' }, { term: 'Subdivision Surface', def: 'A smoothing modifier that refines a surface by subdividing it.' }],
    },
  },
  {
    day: 8,
    title: 'Bevel and shading',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'In reality **there is no perfectly sharp edge**. Every manufactured object has a tiny rounding, and that is what catches the light. Without it a render looks "computery".' },
      { k: 'text', md: '**Ctrl + B** (bevel): select the edge, press it, drag the mouse. **Scroll** to raise the number of segments: one segment is a chamfer, three is already a rounding.' },
      { k: 'callout', tone: 'key', md: 'A couple of tenths of a millimetre is enough. The size is not the point — what matters is that there **is** a narrow surface to catch light. That is what makes the object read as real.' },
      { k: 'text', md: '**Shading** is a separate question: right-click → Shade Smooth makes the surface smooth, Shade Flat makes it faceted. Shade Smooth on its own, however, also blurs the edges you wanted sharp.' },
      { k: 'callout', tone: 'tip', md: 'The fix: Shade Smooth **plus** Auto Smooth (in newer Blender, the Smooth by Angle modifier). It leaves edges sharper than a given angle sharp and smooths the rest. Thirty degrees is a good start.' },
    ],
    quiz: [
      { k: 'single', q: 'Why does a model need a bevel?', opts: ['To make it smaller', 'Because no real edge is perfectly sharp, and the rounding catches the light', 'Because Blender requires it'], answer: 1, why: 'The narrow rounded strip is what glints. Without it the edges stay unnaturally sharp in the render.' },
      { k: 'single', q: 'What does scrolling do during a bevel?', opts: ['Zooms', 'Raises the number of segments, so the rounding gets finer', 'Rotates'], answer: 1, why: 'One segment is a plain chamfer; more segments make a smooth rounding.' },
      { k: 'single', q: 'What is wrong with plain Shade Smooth on its own?', opts: ['It is slow', 'It also blurs the edges you wanted sharp', 'It does not work on quads'], answer: 1, why: 'It smooths everything, including intentionally sharp edges. That is why Auto Smooth, which decides by angle, is needed.' },
      { k: 'single', q: 'What does Auto Smooth / Smooth by Angle do?', opts: ['Smooths everything', 'Leaves edges sharper than a given angle sharp', 'Rounds the edges'], answer: 1, why: 'It decides per edge by angle. Flat surfaces stay smooth while real edges stay sharp.' },
    ],
    note: {
      summary: ['No real edge is perfectly sharp — the bevel is what catches light.', 'Ctrl + B is bevel; scrolling raises the number of segments.', 'A couple of tenths of a millimetre is enough; what matters is having a reflecting strip.', 'Shade Smooth smooths everything, including sharp edges.', 'Auto Smooth / Smooth by Angle decides by angle; thirty degrees is a good start.'],
      terms: [{ term: 'bevel', def: 'Chamfering or rounding an edge into a narrow surface.' }, { term: 'segment', def: 'The number of divisions in a bevel; more segments, smoother rounding.' }, { term: 'Auto Smooth', def: 'Angle-based shading that keeps real edges sharp.' }],
    },
  },
  {
    day: 9,
    title: 'Modelling a simple object',
    minutes: 26,
    lesson: [
      { k: 'text', md: 'Today we put it together and make a **motor mount** — the kind you would actually print for your robot.' },
      { k: 'text', md: '**1.** Shift + A → Mesh → Cube. Press S and type the size.\n**2.** Tab into edit mode and halve it with a loop cut (Ctrl + R).\n**3.** Select the front face, I (inset), then E inwards — that is the motor pocket.\n**4.** For the holes: inset a small circle… or more simply a Boolean, which comes tomorrow.\n**5.** Ctrl + B on the edges, two segments.\n**6.** Shade Smooth + Auto Smooth.' },
      { k: 'callout', tone: 'key', md: 'While modelling, **measure**. Press N and the panel on the right shows the size of the selection. If your motor is 25 mm wide, make the pocket 25.4 — for print tolerance.' },
      { k: 'callout', tone: 'tip', md: 'Treat one unit as one metre and think in millimetres by setting Scene Properties → Units → Millimeters. For printing that is essential.' },
      { k: 'text', md: 'If you get stuck: **Ctrl + Z** goes back indefinitely, and the operator panel in the bottom-left corner lets you change the last operation without redoing it.' },
    ],
    quiz: [
      { k: 'single', q: 'What does the N panel show?', opts: ['Render settings', 'The size and position of the selection', 'Materials'], answer: 1, why: 'The N panel shows transform data. While modelling it is where you check that the thing really is 25 mm.' },
      { k: 'single', q: 'Why make the pocket slightly bigger than the motor?', opts: ['It looks better', 'For print tolerance, so it actually fits', 'To use less material'], answer: 1, why: 'A printer can be a few tenths of a millimetre off. A 25 mm motor will not go into a pocket of exactly 25 mm.' },
      { k: 'single', q: 'What can you do if you want to change an operation afterwards?', opts: ['Redo it', 'Adjust it in the operator panel in the bottom-left corner', 'Nothing'], answer: 1, why: 'The last operator panel stays open. Until you do something else you can tune its values freely.' },
      { k: 'order', q: 'In what order does the mount come together?', items: ['Bevel on the edges', 'Base shape and size', 'Pocket with inset and extrude'], correct: [1, 2, 0], why: 'First the block and its size, then the functional recess, and the bevel always last — further operations would ruin it.' },
    ],
    note: {
      summary: ['Modelling order: base shape → size → functional detail → bevel → shading.', 'The N panel shows the size and position of the selection.', 'Set units to millimetres for printing work.', 'Leave tolerance on a fit: make the pocket a few tenths larger.', 'The operator panel in the bottom-left corner is adjustable after the fact.', 'The bevel always comes last.'],
      terms: [{ term: 'N panel', def: 'The side panel showing the size and position of the selection.' }, { term: 'tolerance', def: 'A deliberate size difference so two parts can be assembled.' }, { term: 'operator panel', def: 'The adjustable parameter box appearing in the bottom-left corner.' }],
    },
  },
  {
    day: 10,
    title: 'Topology: why it matters',
    minutes: 22,
    lesson: [
      { k: 'text', md: '**Topology** is how the edge mesh is laid out. Two models can look identical while one is workable and the other causes trouble at every later step.' },
      { k: 'text', md: 'What makes topology good?\n\n- **Quads**, not triangles and n-gons.\n- **Continuous edge loops** running around the form.\n- **Density where it is needed**: more edges where it curves, fewer where it is flat.\n- **Loops that follow the logic of the form** — around the eyes and mouth on a face, around the joint on a robot arm.' },
      { k: 'callout', tone: 'key', md: 'Topology becomes critical in three places: **smoothing** (Subdivision), **deformation** (animation, bending) and **UV unwrapping**. On a static, flat object it matters less — but you cannot always know that in advance.' },
      { k: 'text', md: 'The usual troubles: five or six edges meeting at one point (a pole), long thin triangles, doubled vertices lying on each other, and face normals pointing inwards.' },
      { k: 'callout', tone: 'tip', md: 'Cleanup: **M → Merge by Distance** joins coincident vertices and **Shift + N** turns the normals outwards. Run both before exporting anything.' },
    ],
    quiz: [
      { k: 'single', q: 'What is topology?', opts: ['The colour of the model', 'How the edge mesh is laid out on the surface', 'The render quality'], answer: 1, why: 'Two models that look the same can have radically different topology, and that decides whether you can keep working with them.' },
      { k: 'multi', q: 'In which two places is good topology critical?', opts: ['Smoothing (Subdivision)', 'File size', 'Deformation in animation', 'Render colour'], answers: [0, 2], why: 'Smoothing and bending both follow the edge mesh. With bad loops, each produces creases and breaks.' },
      { k: 'single', q: 'What does Merge by Distance do?', opts: ['Joins nearby, coincident vertices', 'Smooths the surface', 'Rounds the edges'], answer: 0, why: 'Doubled vertices are invisible but break the surface and its shading. This command clears them.' },
      { k: 'single', q: 'What does Shift + N do?', opts: ['New object', 'Turns the face normals outwards', 'Clears the selection'], answer: 1, why: 'Inward-facing normals give black patches or wrong shading. Shift + N turns them all outwards consistently.' },
    ],
    note: {
      summary: ['Topology is how the edge mesh is laid out; identical-looking models can differ wildly.', 'Good topology: quads, continuous loops, density where the form curves.', 'Critical for smoothing, deformation and UV unwrapping.', 'Usual troubles: poles, thin triangles, doubled vertices, inward normals.', 'M → Merge by Distance joins coincident vertices.', 'Shift + N turns normals outwards; run it before exporting.'],
      terms: [{ term: 'topology', def: 'The layout of the edge mesh on a surface.' }, { term: 'pole', def: 'A point where five or more edges meet instead of the usual four.' }, { term: 'normal', def: 'The outward direction of a face, which determines its shading.' }],
    },
  },
];
