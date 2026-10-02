import type { Day } from '../../types';

/** ROBOTICS track, days 27-30. */
export const roboticsEnF: Day[] = [
  {
    day: 27,
    title: 'Testing in simulation',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'Simulation is the fastest feedback loop in robotics. A collision on screen is free; the same collision in reality is a broken part and a week of delay.' },
      { k: 'callout', tone: 'key', md: 'What simulation captures **well**: control logic, path planning, the state machine, kinematics and error-handling branches. You can exercise those precisely, a thousand times over, under varying conditions.' },
      { k: 'callout', tone: 'warn', md: 'What simulation does **not** capture: traction, backlash, a snagged cable, the real character of sensor noise, motor heating. This is called the **reality gap**, and it is why many controllers that are perfect in simulation fail on the first real run.' },
      { k: 'text', md: 'Narrowing the reality gap:\n\n- **Add noise** to simulated sensors rather than returning perfect values\n- **Randomise the parameters** (mass, friction, latency) per run — that is what makes a controller robust\n- **Model the latency**: a real sensor and motor do not respond instantly\n- **Measure in reality** and tune the simulation to the measured values' },
      { k: 'text', md: 'The FORGE Robot Lab follows exactly this logic: the kinematics is the same code that would run in a real controller, and execution happens on a separate thread with a time limit — precisely how an infinite loop would have to be contained in a real system.' },
      { k: 'callout', tone: 'tip', md: 'The most valuable simulation test is not the one where everything works. It is the one where **something breaks**: a sensor drops out, a wheel jams, the battery dies. Those are hard to arrange in reality and one line in simulation.' },
    ],
    quiz: [
      { k: 'single', q: 'What does simulation capture well?', opts: ['Traction', 'Control logic, path planning, state machines, kinematics', 'Motor heating'], answer: 1, why: 'You can exercise those a thousand times under varying conditions.' },
      { k: 'single', q: 'What is the reality gap?', opts: ['Simulation resolution', 'What simulation does not model: traction, backlash, real noise', 'The screen size'], answer: 1, why: 'It is why many controllers that are perfect in simulation fail on the first real run.' },
      { k: 'single', q: 'Why add noise to simulated sensors?', opts: ['To make it harder', 'Because a controller built on perfect values fails in reality', 'To slow it down'], answer: 1, why: 'A real sensor never gives an exact value; the controller must tolerate that.' },
      { k: 'single', q: 'What does randomising parameters per run give you?', opts: ['Faster simulation', 'A robust controller not tuned to one parameter set', 'A nicer picture'], answer: 1, why: 'Varying mass, friction and latency generalises the controller.' },
      { k: 'single', q: 'What is the most valuable simulation test?', opts: ['The one where everything works', 'The one where something breaks: a sensor drops out, a wheel jams', 'The fastest one'], answer: 1, why: 'Those are hard to arrange in reality and a single line in simulation.' },
    ],
    note: {
      summary: ['Simulation is the fastest feedback loop: a collision is free.', 'It captures logic, path planning and kinematics well.', 'It misses traction, backlash and real noise — the reality gap.', 'Narrow it with sensor noise, randomised parameters and modelled latency.', 'Measure in reality and tune the simulation to that.', 'The most valuable test is the failure case, not the successful run.'],
      terms: [{ term: 'reality gap', def: 'The difference between simulation and reality.' }, { term: 'domain randomisation', def: 'Varying model parameters per run for robustness.' }, { term: 'fault injection', def: 'Deliberately causing a failure to exercise the controller.' }],
    },
  },
  {
    day: 28,
    title: 'Choosing components',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'A good robot is not made of the best components but of components that **match each other**. The order in which you choose them matters.' },
      { k: 'callout', tone: 'key', md: 'The correct order works **backwards from the task**:\n\n1. **What must it do?** — mass, speed, terrain, run time\n2. **How much torque at the wheel?** — that gives the motor and gearbox\n3. **How much current?** — that gives the motor driver\n4. **How much energy?** — that gives the battery\n5. **How much computation?** — that gives the controller' },
      { k: 'code', lang: 'py', src: '# How big a motor do you need?\nm = 3.0            # kg, robot mass\nr = 0.04           # m, wheel radius\na = 0.5            # m/s2, desired acceleration\nslope = 0.1        # a 10 percent incline\ng = 9.81\n\nF = m*a + m*g*slope          # acceleration plus slope\nM_total = F * r\nprint(f"Total torque needed: {M_total:.3f} Nm")\nprint(f"Per wheel of four: {M_total/4:.3f} Nm, with margin: {M_total/4*2:.3f} Nm")\n# 0.178 Nm per wheel, 0.356 Nm with margin', explain: 'A **factor of two margin** is not waste: friction, efficiency and manufacturing spread all eat into it. Without margin the robot works on paper and will not move in reality.' },
      { k: 'text', md: 'When choosing a motor driver the **stall current** is what counts, not the running current. A motor that draws 1 A normally can pull 10 A stalled. The driver must survive that for at least a few seconds.' },
      { k: 'callout', tone: 'warn', md: '**Connectors and wire gauge** are the most frequently undersized items. In a 20 amp circuit a thin wire and a weak connector heat up, drop voltage and eventually melt. It is not the glamorous part, but it causes most of the fires.' },
      { k: 'callout', tone: 'tip', md: 'Choose a component that is **available**, not the best one. An ideal motor with an eight-week lead time is worse than a good one arriving tomorrow. And always order spares of the wearing and fragile parts.' },
    ],
    quiz: [
      { k: 'single', q: 'In what order should you choose components?', opts: ['Controller, battery, motor', 'Backwards from the task: torque, motor, driver, battery', 'Whatever appeals'], answer: 1, why: 'Each step defines the requirement for the next.' },
      { k: 'single', q: 'What margin should a motor have?', opts: ['No margin needed', 'About a factor of two', 'A factor of ten'], answer: 1, why: 'Friction, efficiency and manufacturing spread all eat into the calculated value.' },
      { k: 'single', q: 'What governs the choice of motor driver?', opts: ['The running current', 'The stall current', 'The voltage'], answer: 1, why: 'A motor drawing 1 A normally can pull 10 A stalled.' },
      { k: 'single', q: 'Which item is most often undersized?', opts: ['The motor', 'The connectors and wire gauge', 'The controller'], answer: 1, why: 'Not the glamorous part, but the cause of most heating and fires.' },
      { k: 'single', q: 'What matters more than the best component?', opts: ['The cheapest', 'That it is available', 'The lightest'], answer: 1, why: 'An ideal motor with an eight-week lead time is worse than a good one arriving tomorrow.' },
    ],
    note: {
      summary: ['A good robot is made of matching components.', 'Order: task → torque → motor → driver → battery → controller.', 'Allow about a factor of two torque margin.', 'Size the driver for the stall current.', 'Connectors and wire gauge are the commonest undersizing.', 'Choose available components and order spares.'],
      terms: [{ term: 'stall current', def: 'The maximum current drawn by a motor that cannot turn.' }, { term: 'torque margin', def: 'The allowance above the calculated torque.' }, { term: 'wire gauge', def: 'Conductor thickness, limiting the current it can carry.' }],
    },
  },
  {
    day: 29,
    title: 'Assembly and wiring',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'After the design, assembly decides whether the robot is reliable. A few rules save a great deal of later debugging.' },
      { k: 'callout', tone: 'key', md: 'Assemble **subassembly by subassembly, testing after every step**. One motor fitted, wired, spun — then the next. Fit all four at once and if one does not turn at the end, you have four places to look.' },
      { k: 'text', md: 'Basic wiring rules:\n\n- **Common ground** — every circuit ground should meet at one point (a star point), or you get ground loops and noise\n- **Colour code** — red for positive, black for negative, consistently throughout\n- **A label on every cable** — in two months you will not know which is the front-left motor\n- **A fuse right at the battery**, not at the controller' },
      { k: 'callout', tone: 'warn', md: 'Connecting the **battery must be the last step**, and the reverse on disassembly: the first thing you remove. Working with a connected battery means short circuits, sparks and a dead controller. Reversed polarity kills everything in an instant.' },
      { k: 'text', md: 'Commissioning order:\n\n1. **Inspect before powering** — no loose strands, every screw tightened\n2. **Power only, no motors** — is the voltage at the controller right?\n3. **Motors unloaded**, wheels off the ground — do they turn the right way?\n4. **Test the emergency stop**\n5. **First run** at low speed, within arm reach' },
      { k: 'callout', tone: 'tip', md: 'Take **assembly photographs** as you go, and draw a simple wiring diagram. At the next repair, six months later, those two things are worth more than any CAD model.' },
    ],
    quiz: [
      { k: 'single', q: 'How should you assemble?', opts: ['Everything at once, then test', 'Subassembly by subassembly, testing after each step', 'As it comes'], answer: 1, why: 'Fit four motors at once and you have four places to look for the fault.' },
      { k: 'single', q: 'Why use a common ground star point?', opts: ['Fewer cables', 'Because multiple ground paths create ground loops and noise', 'It is cheaper'], answer: 1, why: 'A ground loop is the hardest noise source to track down in a robot.' },
      { k: 'single', q: 'Where should the fuse go?', opts: ['By the controller', 'Right at the battery', 'Anywhere'], answer: 1, why: 'That protects the whole wiring run, not just the part after the controller.' },
      { k: 'single', q: 'When should you connect the battery?', opts: ['First', 'As the last step, and remove it first on disassembly', 'Any time'], answer: 1, why: 'Working with a connected battery means short circuits and a dead controller.' },
      { k: 'single', q: 'What is worth most at a repair six months later?', opts: ['The CAD model', 'Assembly photographs and a wiring diagram', 'The source code'], answer: 1, why: 'They show how the machine actually went together.' },
    ],
    note: {
      summary: ['Assemble subassembly by subassembly, testing after each step.', 'A common ground star point prevents ground loops.', 'Colour code and label every cable.', 'Put the fuse right at the battery.', 'Connect the battery last and disconnect it first.', 'Commissioning: inspect, power, unloaded motors, E-stop, first run.', 'Take photographs and draw a wiring diagram.'],
      terms: [{ term: 'star point', def: 'A single common point where all grounds meet.' }, { term: 'ground loop', def: 'Interference caused by multiple ground paths.' }, { term: 'commissioning', def: 'The stepwise, verified first power-up.' }],
    },
  },
  {
    day: 30,
    title: 'Your first robot',
    minutes: 30,
    lesson: [
      { k: 'text', md: 'After thirty days you have every piece: drive, sensing, control, mapping, design, safety. Now comes what it was all for — build something.' },
      { k: 'callout', tone: 'key', md: 'Make the first robot **deliberately small**. A line follower that completes a track. A rover that avoids obstacles. An arm that moves one block. A finished small machine is worth more than an unfinished big one.' },
      { k: 'text', md: 'The suggested route:\n\n1. **Write down in one sentence** what it does. If it does not fit in one sentence, it is too big.\n2. **Sketch it** by hand: what is where, what moves.\n3. **Calculate** the torque and the energy (day 28).\n4. **Design the load-bearing parts** in CAD.\n5. **Write the control in simulation** (day 27) before building anything.\n6. **Build it** subassembly by subassembly, testing (day 29).\n7. **Tune** in reality: PID, thresholds, speeds.' },
      { k: 'callout', tone: 'warn', md: 'The commonest failure is not technical but **scope**. Most beginner robot projects stall because they were too ambitious. Cut the plan in half, build that half, then extend — building onto a working machine is always easier.' },
      { k: 'text', md: 'What is worth adding on the next round, once this works:\n\n- **ROS 2** — when the project has several nodes and you do not want to write the messaging yourself\n- **Camera and vision** — real object recognition instead of line following\n- **Better drive** — a servo with feedback instead of a stepper\n- **Sharing** — publish the designs and the code so others can build it' },
      { k: 'callout', tone: 'tip', md: 'Keep a **build log**: what you tried, what did not work, and why. In six months that log will be worth more than the robot itself — because it is what you will design the next machine from.' },
    ],
    quiz: [
      { k: 'single', q: 'What should your first robot be like?', opts: ['As complex as possible', 'Deliberately small and finishable', 'Competition grade'], answer: 1, why: 'A finished small machine is worth more than an unfinished big one.' },
      { k: 'single', q: 'What is a good test that the plan is not too big?', opts: ['It fits in one sentence', 'Fewer than ten parts', 'Done in a day'], answer: 0, why: 'If what it does will not fit in one sentence, it is too big.' },
      { k: 'single', q: 'When should you write the control code?', opts: ['After building', 'In simulation, before building anything', 'While building'], answer: 1, why: 'The simulation loop is much faster, and logic errors surface cheaply there.' },
      { k: 'single', q: 'What is the commonest reason robot projects stall?', opts: ['Lack of money', 'Overambitious scope', 'Bad components'], answer: 1, why: 'Cut the plan in half; extending a working machine is always easier.' },
      { k: 'single', q: 'Why keep a build log?', opts: ['To look good', 'Because you will design the next machine from it', 'It is required'], answer: 1, why: 'In six months it is worth more than the robot: it holds what failed and why.' },
    ],
    note: {
      summary: ['Make the first robot deliberately small and finishable.', 'If what it does will not fit in one sentence, it is too big.', 'Route: describe, sketch, calculate, CAD, simulate control, build, tune.', 'Write the control in simulation before building.', 'Most projects stall from overambitious scope.', 'Next round: ROS 2, camera, better drive, sharing.', 'Keep a build log — it is worth the most later.'],
      terms: [{ term: 'scope', def: 'The size and content a project takes on.' }, { term: 'build log', def: 'A record of what you tried and what did not work.' }, { term: 'ROS 2', def: 'A widely used robotics framework for inter-node communication.' }],
    },
  },
];
