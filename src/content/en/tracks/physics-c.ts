import type { Day } from '../../types';

/** PHYSICS track, days 6–12. */
export const physicsEnC: Day[] = [
  {
    day: 6,
    title: 'Rotation',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Rotation has the same structure as straight-line motion — every quantity simply has a rotating counterpart.' },
      { k: 'text', md: '| straight | rotating |\n| --- | --- |\n| distance (s) | angle (φ) |\n| velocity (v) | angular velocity (ω) |\n| acceleration (a) | angular acceleration (α) |\n| mass (m) | moment of inertia (I) |\n| force (F) | torque (M) |' },
      { k: 'formula', tex: 'M = I \\cdot \\alpha', explain: 'This is the rotating counterpart of F = m·a. The moment of inertia is the rotating "mass": it says how hard something is to spin up.' },
      { k: 'callout', tone: 'key', md: 'Moment of inertia depends not only on the mass but on **where that mass sits**. Mass far from the axis resists rotation far more. That is why a flywheel has its material at the rim, and why a spinning skater pulls their arms in.' },
      { k: 'formula', tex: '\\omega = \\frac{2\\pi n}{60}', explain: 'From revolutions per minute to angular velocity in radians per second. 600 rpm ≈ 62.8 rad/s. You need it constantly in motor calculations.' },
    ],
    quiz: [
      { k: 'single', q: 'What is the rotating counterpart of mass?', opts: ['Torque', 'Moment of inertia', 'Angular velocity'], answer: 1, why: 'As mass resists acceleration, moment of inertia resists being spun up.' },
      { k: 'single', q: 'What besides mass determines the moment of inertia?', opts: ['Colour', 'How far the mass is from the axis', 'Temperature'], answer: 1, why: 'Distance counts squared. That is why a solid disc spins up more easily than a ring of the same mass.' },
      { k: 'numeric', q: 'What is 600 rpm in angular velocity? (rad/s, one decimal)', answer: 62.8, tol: 1, unit: 'rad/s', why: 'ω = 2π·600/60 = 2π·10 ≈ 62.8 rad/s.' },
      { k: 'single', q: 'Why does a spinning skater pull their arms in?', opts: ['It looks better', 'It lowers their moment of inertia, so they spin faster', 'To avoid dizziness'], answer: 1, why: 'Angular momentum is conserved. With a smaller moment of inertia the same momentum means a higher angular velocity.' },
    ],
    note: {
      summary: ['Every rotational quantity has a straight-line counterpart.', 'M = I·α is the rotating counterpart of F = m·a.', 'Moment of inertia is the rotating "mass": how hard something is to spin up.', 'Not only mass matters but distance from the axis, squared.', 'ω = 2πn/60 converts revolutions per minute to angular velocity.'],
      terms: [{ term: 'angular velocity', def: 'Change of angle per unit time, in rad/s.' }, { term: 'moment of inertia', def: 'Resistance to being rotated; the rotating counterpart of mass.' }, { term: 'angular momentum', def: 'The "momentum" of rotation, conserved without external torque.' }],
    },
  },
  {
    day: 7,
    title: 'Momentum and collisions',
    minutes: 22,
    lesson: [
      { k: 'text', md: '**Momentum** is mass times velocity. In a closed system its total is always conserved — in a collision too.' },
      { k: 'formula', tex: 'p = m \\cdot v', explain: 'A 2 kg robot at 3 m/s has 6 kg·m/s of momentum. It is a vector: the direction counts too.' },
      { k: 'callout', tone: 'key', md: '**Conservation of momentum** says: the total before and after a collision is the same. That holds whether the bodies stick together or bounce apart — even though the energy need not be conserved.' },
      { k: 'text', md: 'Two kinds of collision:\n\n- **Elastic** — energy is conserved too. Billiard balls, steel spheres.\n- **Inelastic** — some energy becomes heat and deformation. Two cars, two bodies sticking together.' },
      { k: 'formula', tex: 'F \\cdot \\Delta t = \\Delta p', explain: 'Impulse equals the change in momentum. That is how an airbag protects you: it does not reduce the momentum change, it stretches the time — so the force is smaller.' },
    ],
    quiz: [
      { k: 'numeric', q: 'What is the momentum of a 2 kg body at 3 m/s? (kg·m/s)', answer: 6, tol: 0.1, unit: 'kg·m/s', why: 'p = m·v = 2 · 3 = 6 kg·m/s.' },
      { k: 'single', q: 'What is conserved in every collision?', opts: ['Energy', 'Momentum', 'Velocity'], answer: 1, why: 'Momentum always is. Energy only in an elastic collision — otherwise some of it turns into heat.' },
      { k: 'single', q: 'How does an airbag protect you?', opts: ['It absorbs the blow', 'It stretches the time of the collision, so the force is smaller', 'It reduces the speed'], answer: 1, why: 'The momentum change is the same. Spread over a longer time, the force is proportionally smaller.' },
      { k: 'single', q: 'What is the difference between an elastic and an inelastic collision?', opts: ['The speed', 'In an elastic one energy is conserved; in an inelastic one it becomes heat', 'The mass'], answer: 1, why: 'Momentum is conserved in both. Only the fate of the energy differs.' },
    ],
    note: {
      summary: ['Momentum is p = m·v, a vector quantity.', 'Momentum is conserved in every collision.', 'In an elastic collision energy is conserved too; in an inelastic one it becomes heat.', 'Impulse: F·Δt = Δp.', 'An airbag stretches the time, which is why the force drops.'],
      terms: [{ term: 'momentum', def: 'Mass times velocity; the "quantity" of motion.' }, { term: 'conservation of momentum', def: 'The total momentum of a closed system is constant.' }, { term: 'impulse', def: 'Force times duration, equal to the change in momentum.' }],
    },
  },
  {
    day: 8,
    title: 'Friction',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Without friction your robot could not set off, stop or turn. It is not an enemy — it is a tool.' },
      { k: 'formula', tex: 'F_f = \\mu \\cdot F_n', explain: 'Friction force is the normal force times the coefficient. The **area of contact does not appear** — surprising, but true.' },
      { k: 'text', md: 'There are two kinds:\n\n- **Static friction** — until it moves. Larger, and what you must overcome to start.\n- **Kinetic friction** — once it is sliding. Smaller.\n\nThat is why a cupboard is harder to start moving than to keep pushing.' },
      { k: 'sim', sim: 'incline' },
      { k: 'callout', tone: 'key', md: 'Your robot\'s acceleration is limited by grip, not by the motor. A stronger motor is no help if the wheel slips: the maximum acceleration is **a = μg**. A rubber-on-concrete pair at μ = 0.7 allows at most 6.9 m/s².' },
      { k: 'callout', tone: 'tip', md: 'If the wheels spin on start-up, you do not need more torque but **more grip**: softer rubber, more weight on the wheel, or a gentler ramp-up.' },
    ],
    quiz: [
      { k: 'single', q: 'What does NOT appear in the friction formula?', opts: ['The normal force', 'The area of contact', 'The coefficient of friction'], answer: 1, why: 'Ff = μ·Fn. Area does not count — over a larger area the pressure is proportionally lower.' },
      { k: 'single', q: 'Which is larger: static or kinetic friction?', opts: ['Static', 'Kinetic', 'They are equal'], answer: 0, why: 'That is why starting something moving is harder than pushing it afterwards. Static friction must be broken first.' },
      { k: 'numeric', q: 'What is the maximum acceleration at μ = 0.7? (m/s², g = 9.81)', answer: 6.9, tol: 0.3, unit: 'm/s²', why: 'a = μg = 0.7 · 9.81 ≈ 6.9 m/s². No motor, however strong, beats that.' },
      { k: 'single', q: 'What should you do if the wheels spin on start-up?', opts: ['A stronger motor', 'Add grip: softer rubber or a gentler ramp-up', 'A bigger battery'], answer: 1, why: 'The motor already delivers more torque than the grip can transmit. More torque would just mean more spin.' },
    ],
    note: {
      summary: ['Ff = μ·Fn — friction depends on the normal force and the coefficient.', 'The area of contact does not appear in the formula.', 'Static friction exceeds kinetic: harder to start than to keep pushing.', 'A robot\'s maximum acceleration is a = μg, not set by the motor.', 'Spinning wheels need more grip, not more torque.'],
      terms: [{ term: 'coefficient of friction', def: 'A number for a surface pair that sets the friction force.' }, { term: 'static friction', def: 'The larger friction before motion begins.' }, { term: 'normal force', def: 'The force perpendicular to the surface, which sets the friction.' }],
    },
  },
  {
    day: 9,
    title: 'Springs and oscillation',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A spring is the simplest system that **oscillates by itself**. And more importantly: nearly every oscillating system behaves like a spring.' },
      { k: 'formula', tex: 'F = -k \\cdot x', explain: "Hooke's law. The minus means the force always points towards equilibrium. The further you pull it, the harder it pulls back." },
      { k: 'formula', tex: 'T = 2\\pi\\sqrt{\\frac{m}{k}}', explain: 'The period. Notice what is **not** in it: the displacement. A spring takes the same time for a small swing as for a large one.' },
      { k: 'sim', sim: 'spring' },
      { k: 'callout', tone: 'key', md: 'A heavier mass oscillates more slowly, a stiffer spring faster. Four times the mass means twice the period — because of the square root, not linearly.' },
      { k: 'callout', tone: 'tip', md: 'This is not only about springs. The tip of a robot arm springing back after a bend, a suspension, a load cell — all are described by the same formula. If something oscillates, find the "k" and the "m" in it.' },
    ],
    quiz: [
      { k: 'single', q: "What does the minus in Hooke's law mean?", opts: ['The force is negative', 'The force always points towards equilibrium', 'The spring stretches'], answer: 1, why: 'The restoring force opposes the displacement. That is what makes the motion an oscillation rather than a runaway.' },
      { k: 'single', q: 'What does NOT affect the period?', opts: ['The mass', 'The spring constant', 'The size of the displacement'], answer: 2, why: 'T = 2π√(m/k) contains no displacement. A small and a large swing take the same time.' },
      { k: 'single', q: 'What happens to the period if you quadruple the mass?', opts: ['It quadruples', 'It doubles', 'It does not change'], answer: 1, why: 'Mass is under the square root: √4 = 2. Four times the mass gives twice the period.' },
      { k: 'single', q: 'What happens with a stiffer spring?', opts: ['It oscillates more slowly', 'It oscillates faster', 'No change'], answer: 1, why: 'k is in the denominator: a larger k gives a smaller T, meaning a faster oscillation.' },
    ],
    note: {
      summary: ["Hooke's law: F = -k·x, the restoring force points towards equilibrium.", 'Period: T = 2π√(m/k).', 'The period does not depend on the size of the displacement.', 'A heavier mass oscillates slower, a stiffer spring faster.', 'Four times the mass is twice the period — because of the square root.', 'Every oscillating system fits this: find the k and the m.'],
      terms: [{ term: 'spring constant (k)', def: 'The stiffness of a spring: force needed per unit displacement.' }, { term: 'period', def: 'The time of one full oscillation.' }, { term: 'restoring force', def: 'The force towards equilibrium that sustains the oscillation.' }],
    },
  },
  {
    day: 10,
    title: 'Damping',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A real oscillation dies away sooner or later: **damping** takes energy out of the system. That is not a fault but often exactly what you want.' },
      { k: 'formula', tex: 'm\\ddot{x} + c\\dot{x} + kx = 0', explain: 'The equation of a damped oscillation. `c` is the damping coefficient: it gives a braking force proportional to velocity.' },
      { k: 'text', md: 'There are three cases, and much of engineering is about choosing which you want:\n\n- **Underdamped** — settles while oscillating. Fast, but overshoots.\n- **Critically damped** — the fastest settling without overshoot. This is the target.\n- **Overdamped** — creeps in sluggishly with no oscillation. Safe but slow.' },
      { k: 'sim', sim: 'spring' },
      { k: 'callout', tone: 'key', md: 'These are exactly the three cases you will meet with a PID controller. A badly tuned robot arm oscillates around its new position — that is underdamped behaviour, and the cure is the same: more damping, a larger D term.' },
      { k: 'callout', tone: 'tip', md: 'Damping is proportional to velocity, not displacement. It therefore does not slow a gentle move; it only brakes sudden oscillation — which is precisely what we want.' },
    ],
    quiz: [
      { k: 'single', q: 'What is critical damping?', opts: ['When it does not oscillate', 'The fastest settling without overshoot', 'When it is slowest'], answer: 1, why: 'It is the boundary case: less damping oscillates, more is sluggish.' },
      { k: 'single', q: 'What is the damping force proportional to?', opts: ['Displacement', 'Velocity', 'Mass'], answer: 1, why: 'That is why it does not disturb slow motion and brakes fast oscillation effectively.' },
      { k: 'single', q: 'What happens in an underdamped system?', opts: ['It settles while oscillating, overshooting the target', 'It creeps in slowly', 'It does not move'], answer: 0, why: 'With little damping the system swings past the target and oscillates around it until it dies away.' },
      { k: 'single', q: 'Where do you meet these same three cases?', opts: ['In PID control', 'In speed measurement', 'In batteries'], answer: 0, why: 'A badly tuned controller behaves exactly this way: oscillating, critically settling, or sluggish.' },
    ],
    note: {
      summary: ['Damping takes energy out: the oscillation dies away.', 'The equation: m·ẍ + c·ẋ + k·x = 0, where c is the damping coefficient.', 'Three cases: underdamped (oscillates), critical (fastest without overshoot), overdamped (sluggish).', 'The damping force is proportional to velocity, not displacement.', 'The same three cases appear when tuning a PID controller.'],
      terms: [{ term: 'damping', def: 'Velocity-proportional braking that removes energy from a system.' }, { term: 'critical damping', def: 'The fastest settling without overshoot.' }, { term: 'overshoot', def: 'Passing beyond the target value while settling.' }],
    },
  },
  {
    day: 11,
    title: 'Inclines and simple machines',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A **simple machine** does not reduce the work — it redistributes it. You do the same job with a smaller force over a longer distance.' },
      { k: 'formula', tex: 'W = F \\cdot s = \\text{constant}', explain: 'This is the "golden rule": what you gain in force you lose in distance. No machine gives energy away.' },
      { k: 'text', md: 'The classic machines:\n\n- **Inclined plane** — reach the height over a longer path with less force.\n- **Lever** — less force on the longer arm (this is torque).\n- **Pulley** — every moving pulley halves the force and doubles the distance.\n- **Screw** — a wrapped-up inclined plane; a very large force multiplication.\n- **Gear** — trades speed for torque.' },
      { k: 'sim', sim: 'incline' },
      { k: 'callout', tone: 'key', md: 'Your robot\'s gearbox is the same thing: a ten-to-one ratio gives a tenth of the speed and (without losses) ten times the torque. The golden rule applies exactly here too.' },
      { k: 'callout', tone: 'warn', md: 'In reality friction always takes a cut. A gearbox typically runs at 70–95 per cent efficiency — the rest becomes heat. That is why a loaded servo gets warm.' },
    ],
    quiz: [
      { k: 'single', q: 'What does a simple machine reduce?', opts: ['The work', 'The force required, at the cost of distance', 'The energy'], answer: 1, why: 'The work stays the same. It is only distributed differently between force and distance.' },
      { k: 'single', q: 'What does a ten-to-one gearbox give?', opts: ['Ten times the speed', 'Ten times the torque at a tenth the speed', 'Ten times the power'], answer: 1, why: 'It trades speed for torque. The power (without losses) stays the same.' },
      { k: 'single', q: 'Why does a loaded servo get warm?', opts: ['It is too fast', 'Because the losses become heat', 'Because the voltage is high'], answer: 1, why: 'A gearbox runs at 70–95 per cent efficiency. Whatever does not become motion becomes heat.' },
      { k: 'single', q: 'What is a screw, physically?', opts: ['A lever', 'A wrapped-up inclined plane', 'A pulley'], answer: 1, why: 'The thread is a long, gentle slope wound around the shaft. That is where its force multiplication comes from.' },
    ],
    note: {
      summary: ['A simple machine does not reduce work; it redistributes it between force and distance.', 'Golden rule: W = F·s stays constant.', 'Incline, lever, pulley, screw, gear — all do the same thing.', 'A gearbox trades speed for torque: ten-to-one gives ten times the torque.', 'In reality efficiency is 70–95 per cent; the rest becomes heat.'],
      terms: [{ term: 'simple machine', def: 'A device that trades force against distance.' }, { term: 'golden rule', def: 'What you gain in force you lose in distance.' }, { term: 'efficiency', def: 'The ratio of useful to supplied energy.' }],
    },
  },
  {
    day: 12,
    title: 'Pressure and fluids',
    minutes: 20,
    lesson: [
      { k: 'text', md: '**Pressure** is force divided by area. The same force over a small area gives an enormous pressure — which is why a knife cuts and why a snowshoe does not sink.' },
      { k: 'formula', tex: 'p = \\frac{F}{A}', explain: 'Its unit is the pascal: 1 Pa = 1 N/m². Atmospheric pressure is about 101,325 Pa, or 1 bar.' },
      { k: 'formula', tex: 'p = \\rho g h', explain: 'The pressure of a column of fluid depends only on its **height**, not on the shape of the vessel. Ten metres of water is about 1 bar — which is why pressure rises so fast with depth.' },
      { k: 'callout', tone: 'key', md: "Pascal's law: in an enclosed fluid, pressure spreads **equally in every direction**. That is why hydraulics work: the force on the small piston reappears magnified on the large one, in the ratio of the areas." },
      { k: 'callout', tone: 'tip', md: 'In robotics this underlies pneumatics and hydraulics. An industrial arm lifting a hundred kilos is almost certainly hydraulic — because that gives the most force in the least space.' },
    ],
    quiz: [
      { k: 'numeric', q: 'What pressure does 100 N give over 0.01 m²? (Pa)', answer: 10000, tol: 100, unit: 'Pa', why: 'p = F/A = 100 / 0.01 = 10,000 Pa, that is 0.1 bar.' },
      { k: 'single', q: 'What does the pressure of a fluid column depend on?', opts: ['The shape of the vessel', 'Only the height (and the density)', 'The volume of the vessel'], answer: 1, why: 'A thin pipe and a wide tank with water at the same height give the same pressure at the bottom.' },
      { k: 'single', q: "What does Pascal's law state?", opts: ['Pressure is greater downwards', 'In an enclosed fluid pressure spreads equally in every direction', 'Fluids are incompressible'], answer: 1, why: 'That is how a hydraulic system turns the force on a small piston into a magnified force on a large one.' },
      { k: 'single', q: 'Why does a knife cut?', opts: ['Because it is hard', 'Because the same force over a tiny area gives a huge pressure', 'Because of the angle'], answer: 1, why: 'p = F/A. The area of the blade edge is minute, so the pressure is enormous.' },
    ],
    note: {
      summary: ['Pressure is p = F/A, measured in pascals (N/m²).', 'The same force over a small area gives an enormous pressure.', 'A fluid column gives p = ρgh — height matters, shape does not.', "Pascal's law: pressure in an enclosed fluid is equal in all directions.", 'Hydraulics rest on this: the area ratio magnifies the force.'],
      terms: [{ term: 'pressure', def: 'Force divided by area; measured in pascals.' }, { term: 'hydrostatic pressure', def: 'Pressure arising from the height of a fluid column.' }, { term: "Pascal's law", def: 'Pressure in an enclosed fluid spreads equally in every direction.' }],
    },
  },
];
