import type { Day } from '../../types';

/** PHYSICS track, days 2–5. */
export const physicsEnB: Day[] = [
  {
    day: 2,
    title: 'Velocity and acceleration',
    minutes: 20,
    lesson: [
      { k: 'text', md: '**Velocity** says how fast position changes. **Acceleration** says how fast velocity changes. Confusing the two is the most common misunderstanding in physics.' },
      { k: 'formula', tex: 'v = \\frac{\\Delta s}{\\Delta t}, \\qquad a = \\frac{\\Delta v}{\\Delta t}', explain: 'Both have the same shape: something changing, divided by the time it took. That is why acceleration is in m/s², not m/s.' },
      { k: 'callout', tone: 'key', md: 'High speed does not mean acceleration. A car cruising at 130 km/h has **zero** acceleration as long as its speed does not change. Your robot accelerates when it starts or brakes — not when it is going fast.' },
      { k: 'formula', tex: 's = v_0 t + \\frac{1}{2}at^2', explain: 'The distance under constant acceleration. Starting from rest (v₀ = 0) leaves half a t squared — the formula you will use most often.' },
      { k: 'sim', sim: 'incline' },
      { k: 'text', md: 'On a slope, part of gravity accelerates the block. Slide the angle: shallow and it barely moves, steep and it picks up fast. Friction works against it — that comes on day 8.' },
    ],
    quiz: [
      { k: 'numeric', q: 'A robot goes from 0 to 6 m/s in 3 s. What is its acceleration? (m/s²)', answer: 2, tol: 0.05, unit: 'm/s²', why: 'a = Δv/Δt = 6/3 = 2 m/s². Every second its speed grows by 2 m/s.' },
      { k: 'single', q: 'What is the acceleration of a car holding a steady 100 km/h?', opts: ['100 m/s²', 'Zero', 'Cannot be determined'], answer: 1, why: 'Acceleration is the **change** in velocity. If the speed does not change, the acceleration is zero, however fast it goes.' },
      { k: 'single', q: 'What is the unit of acceleration?', opts: ['m/s', 'm/s²', 'm²/s'], answer: 1, why: 'Velocity (m/s) changing per second (s) gives m/s² — "metres per second, per second".' },
      { k: 'numeric', q: 'At 2 m/s² from rest, how far in 3 s? (m)', answer: 9, tol: 0.2, unit: 'm', why: 's = ½at² = 0.5 · 2 · 9 = 9 m. Note that time counts squared: twice the time, four times the distance.' },
    ],
    note: {
      summary: ['Velocity is change in position per unit time: v = Δs/Δt.', 'Acceleration is change in velocity per unit time: a = Δv/Δt.', 'The unit of acceleration is m/s², not m/s.', 'High speed does not mean acceleration — at steady speed it is zero.', 'Constant acceleration: s = v₀t + ½at². Time counts squared.'],
      terms: [{ term: 'velocity', def: 'Change in position per unit time; a vector.' }, { term: 'acceleration', def: 'Change in velocity per unit time.' }, { term: 'uniform acceleration', def: 'Motion at constant acceleration, where distance grows with time squared.' }],
    },
  },
  {
    day: 3,
    title: "Newton's laws",
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Three sentences from which all of classical mechanics follows. You do not need them word for word — you need to understand what they mean.' },
      { k: 'text', md: '**First (inertia):** what moves keeps moving unless a force acts on it. What is still stays still. On Earth it does not look that way only because friction is always there.\n\n**Second:** F = m · a. Force causes acceleration, and the same force accelerates a heavier body less.\n\n**Third:** every force has an equal and opposite counter-force. A robot moves forward because its wheel pushes the ground backwards.' },
      { k: 'formula', tex: 'F = m \\cdot a', explain: 'The most important formula in physics. Know two of the three and the third follows. Units: N = kg · m/s².' },
      { k: 'callout', tone: 'key', md: 'Without the third law no robot could set off. The wheel rubs backwards against the floor and the floor pushes the robot forward. On ice that fails — which is why the wheel just spins there.' },
      { k: 'sim', sim: 'projectile' },
      { k: 'callout', tone: 'tip', md: 'When a problem stalls, draw **every** force on the body as an arrow. Most mechanics mistakes come from leaving one out.' },
    ],
    quiz: [
      { k: 'numeric', q: 'What force accelerates a 2 kg robot at 3 m/s²? (N)', answer: 6, tol: 0.1, unit: 'N', why: 'F = m·a = 2 · 3 = 6 N. A direct application of the second law.' },
      { k: 'single', q: 'Why can a robot move forward?', opts: ['The motor pushes the air', 'The wheel pushes the ground back, and the ground pushes the robot forward', 'It is lighter than air'], answer: 1, why: 'That is the third law. The reaction from the ground drives the robot; on ice, without enough friction, it does not happen.' },
      { k: 'single', q: 'What does the first law state?', opts: ['Every body slows down by itself', 'Without a force, the state of motion does not change', 'Heavier bodies fall faster'], answer: 1, why: 'No force, no acceleration: what was moving keeps moving. On Earth friction makes it look otherwise.' },
      { k: 'single', q: 'The same force acts on a 1 kg and a 4 kg body. Which accelerates more?', opts: ['The 1 kg one, four times as much', 'The 4 kg one', 'Equally'], answer: 0, why: 'a = F/m. Four times the mass gives a quarter of the acceleration for the same force.' },
    ],
    note: {
      summary: ['First law: without a force, the state of motion does not change.', 'Second law: F = m·a — force causes acceleration, mass resists it.', 'Third law: every force has an equal and opposite counter-force.', 'A robot moves because the wheel pushes the ground and the ground pushes back.', 'The same force accelerates a heavier body proportionally less.', 'When stuck: draw every force as an arrow.'],
      terms: [{ term: 'inertia', def: "A body's resistance to a change in its state of motion." }, { term: 'force', def: 'An interaction that causes acceleration; measured in newtons.' }, { term: 'reaction force', def: 'The equal and opposite force with which a body pushes back.' }],
    },
  },
  {
    day: 4,
    title: 'Work and energy',
    minutes: 22,
    lesson: [
      { k: 'text', md: '**Work** happens when a force causes a displacement. Holding a box without moving does no work in the physical sense — however tired you get.' },
      { k: 'formula', tex: 'W = F \\cdot s \\cdot \\cos\\alpha', explain: 'Work is force times displacement, but only the component of the force along the displacement counts. A perpendicular force (α = 90°) does no work at all.' },
      { k: 'text', md: '**Energy** is the capacity to do work. Two kinds you will use:\n\n- **Kinetic energy:** E = ½mv²\n- **Potential energy:** E = mgh' },
      { k: 'callout', tone: 'key', md: 'Kinetic energy grows with the **square** of speed. Twice the speed is four times the energy — which is why a crash at double the speed is four times as severe, and why your battery drains disproportionately when you run the robot fast.' },
      { k: 'sim', sim: 'spring' },
      { k: 'text', md: 'The spring shows the two kinds converting back and forth. Without damping (c = 0) the total energy stays constant. Raise c: the energy turns into heat and the oscillation dies away.' },
    ],
    quiz: [
      { k: 'numeric', q: 'What is the kinetic energy of a 2 kg robot at 3 m/s? (J)', answer: 9, tol: 0.2, unit: 'J', why: 'E = ½mv² = 0.5 · 2 · 9 = 9 J. Note the speed squared.' },
      { k: 'single', q: 'Do you do work holding a box still?', opts: ['Yes, a lot', 'Physically no, because there is no displacement', 'Only if it is heavy'], answer: 1, why: 'Work needs displacement. Your muscles burn energy, but they do no work on the box — that is the gap between the physical and the everyday meaning.' },
      { k: 'single', q: 'How much does kinetic energy grow when speed doubles?', opts: ['It doubles', 'It quadruples', 'It does not change'], answer: 1, why: 'Energy goes with the square of speed: 2² = 4. That is why raising speed is so consequential.' },
      { k: 'numeric', q: 'What is the potential energy of a 1 kg body at 2 m? (J, g = 9.81)', answer: 19.62, tol: 0.3, unit: 'J', why: 'E = mgh = 1 · 9.81 · 2 = 19.62 J. That is the work done against gravity to lift it there.' },
    ],
    note: {
      summary: ['Work: force × displacement, counting only the component along the motion.', 'No displacement, no work — however tiring it feels.', 'Kinetic energy: E = ½mv² — it grows with the square of speed.', 'Potential energy: E = mgh.', 'Twice the speed is four times the energy — hence the disproportionate battery drain.', 'Without damping the total energy is conserved; with damping it becomes heat.'],
      terms: [{ term: 'work', def: 'Force multiplied by the displacement it causes.' }, { term: 'kinetic energy', def: 'The energy of motion: ½mv².' }, { term: 'conservation of energy', def: 'In a closed system the total energy is constant; it only changes form.' }],
    },
  },
  {
    day: 5,
    title: 'Torque',
    minutes: 22,
    lesson: [
      { k: 'text', md: '**Torque** is the "force" of turning. What matters is not only how hard you push, but how far from the axis you push.' },
      { k: 'formula', tex: 'M = F \\cdot r', explain: 'Force times the perpendicular distance from the axis. Measured in Nm. That is why a door opens more easily at the handle than at the hinge.' },
      { k: 'sim', sim: 'torque' },
      { k: 'text', md: 'A balance is level when the torques on the two sides match: m₁·r₁ = m₂·r₂. A lighter mass can hold its own if it sits further out.' },
      { k: 'callout', tone: 'key', md: 'On a robot arm this is make-or-break. The servo at the base has to hold the **whole arm**, along its full extended length. A 100 g gripper at 30 cm is 0.3 Nm — more than many hobby servos can manage.' },
      { k: 'callout', tone: 'tip', md: 'For an arm, always design for the worst case: fully extended, maximum load. If it holds there, it holds everywhere else.' },
    ],
    quiz: [
      { k: 'numeric', q: 'What torque does 5 N give on a 0.4 m arm? (Nm)', answer: 2, tol: 0.05, unit: 'Nm', why: 'M = F·r = 5 · 0.4 = 2 Nm. The length of the arm matters as much as the size of the force.' },
      { k: 'single', q: 'Why is a door easier to open at the handle?', opts: ['Your hand is stronger there', 'The arm is longer, so the same force gives more torque', 'There is less friction there'], answer: 1, why: 'M = F·r. Further from the hinge, the same force gives many times the torque.' },
      { k: 'single', q: 'When is a balance level?', opts: ['When the two masses are equal', 'When the torques on the two sides are equal', 'When the two arms are equal'], answer: 1, why: 'Equal torques is the condition: m₁·r₁ = m₂·r₂. The masses can differ if the arms make up for it.' },
      { k: 'numeric', q: 'A 100 g gripper on a 30 cm arm. What torque at the base? (Nm, g = 9.81)', answer: 0.29, tol: 0.03, unit: 'Nm', why: 'F = mg = 0.1 · 9.81 = 0.98 N, M = F·r = 0.98 · 0.3 ≈ 0.29 Nm. That is what the base servo must hold — and that is just the gripper.' },
    ],
    note: {
      summary: ['Torque = force × perpendicular distance from the axis, in Nm.', 'The same force on a longer arm gives more torque.', 'Balance: equal torques, not equal masses.', 'On a robot arm the base servo carries the whole arm load.', '100 g at 30 cm is already 0.3 Nm — beyond many hobby servos.', 'Always design for the worst case: fully extended, full load.'],
      terms: [{ term: 'torque', def: 'Turning effect: force times distance from the axis.' }, { term: 'moment arm', def: 'The perpendicular distance between the axis and the line of the force.' }, { term: 'equilibrium', def: 'The state in which the torques on a body sum to zero.' }],
    },
  },
];
