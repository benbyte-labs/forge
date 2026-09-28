import type { Day } from '../../types';

/** ROBOTICS track, days 2–5. */
export const roboticsEnB: Day[] = [
  {
    day: 2,
    title: 'Sensors: how a machine sees',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A robot does not "see" the world. It measures voltages and infers from them. Every sensor does the same thing: it turns a physical quantity into an electrical signal.' },
      { k: 'text', md: 'The ones you will start with:\n\n- **Ultrasonic rangefinder (HC-SR04)** — sends a sound, times the echo. 2–400 cm, cheap, but fooled by soft surfaces and angled walls.\n- **Infrared distance (Sharp)** — light reflection. Faster, but sunlight upsets it.\n- **Bump switch** — a plain switch. Zero intelligence, zero error.\n- **Encoder** — counts wheel rotation. That is how you know how far you went.\n- **IMU (gyroscope + accelerometer)** — angular rate and tilt.' },
      { k: 'formula', tex: 's = \\frac{v_{sound} \\cdot t}{2}', explain: 'The ultrasonic formula. Sound travels at about 343 m/s, and the time covers there and back, hence the two. Forget it and every distance you read is doubled.' },
      { k: 'callout', tone: 'key', md: 'Every sensor is **noisy** and every sensor **lies** sometimes. An ultrasonic says 400 cm when it hears no echo — even if there is a wall in front at an angle. Never make an irreversible decision from a single reading.' },
      { k: 'callout', tone: 'tip', md: 'A simple, effective defence: measure three times and take the middle value (the median). That filters out the freak reading, and it is three lines of code.' },
    ],
    quiz: [
      { k: 'numeric', q: 'The ultrasonic sensor times a 20 ms echo. How many metres away is the object? (v = 343 m/s)', answer: 3.43, tol: 0.1, unit: 'm', why: 's = v·t/2 = 343 · 0.020 / 2 = 3.43 m. The two is there because the sound travelled the distance twice.' },
      { k: 'single', q: 'What does an encoder give you?', opts: ['The distance to a wall', 'The rotation of the wheel', 'The tilt of the robot'], answer: 1, why: 'An encoder counts shaft rotation. From that and the wheel circumference you compute how far the robot moved — that is odometry.' },
      { k: 'single', q: 'Why is deciding from a single reading dangerous?', opts: ['It is slow', 'Every sensor is noisy and sometimes plain wrong', 'It draws more current'], answer: 1, why: 'One freak reading can make the robot brake at nothing, or drive into a wall. Filtering or repeating the measurement is not a luxury.' },
      { k: 'multi', q: 'Which two sensors measure distance directly?', opts: ['Ultrasonic', 'Gyroscope', 'Infrared', 'Encoder'], answers: [0, 2], why: 'Ultrasonic and infrared measure the distance ahead. A gyroscope gives angular rate and an encoder gives rotation.' },
    ],
    note: {
      summary: ['Every sensor turns a physical quantity into an electrical signal.', 'Ultrasonic: s = v·t/2 — the two accounts for the round trip.', 'Encoder: counts wheel rotation, which gives distance travelled.', 'Every sensor is noisy and sometimes plain wrong.', 'Defence: measure three times, take the median — three lines, big gain.'],
      terms: [{ term: 'sensor', def: 'A part that turns a physical quantity into an electrical signal.' }, { term: 'encoder', def: 'A sensor counting the rotation of a shaft.' }, { term: 'median filter', def: 'Using the middle of several readings to reject freak values.' }],
    },
  },
  {
    day: 3,
    title: 'Motors and servos',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'You will meet three kinds of motor, and the choice is not a matter of taste: each is for something different.' },
      { k: 'text', md: '**DC motor** — apply a voltage and it spins. Fast, cheap, but it has no idea where it is. For wheels.\n\n**Servo** — inside it is a DC motor plus gears plus a position sensor plus a controller. You command an angle (0–180°) and it holds it. For arms, steering, grippers.\n\n**Stepper** — turns in precise steps. Slow and runs warm, but accurate even open-loop. In 3D printers and CNC machines.' },
      { k: 'robot', scene: 'arm-bench' },
      { k: 'text', md: 'Every joint of the arm above is driven by a servo. Move the sliders and notice: each servo is commanded an **angle**, not a speed.' },
      { k: 'callout', tone: 'warn', md: '**Never** wire a motor straight to a microcontroller pin. An Arduino output handles 40 mA; a small motor draws 500 mA on start-up. You need a driver between them — tomorrow we look at which.' },
      { k: 'callout', tone: 'key', md: 'Torque and speed trade against each other: what is fast is weak. A **gearbox** converts one into the other — a ten-to-one ratio gives a tenth of the speed and ten times the torque.' },
    ],
    quiz: [
      { k: 'single', q: 'Which motor would you use for a robot arm elbow?', opts: ['DC motor', 'Servo', 'Neither'], answer: 1, why: 'A servo moves to an angle and holds it. That is exactly what an arm needs — a DC motor has no idea where it is.' },
      { k: 'single', q: 'What is inside a servo besides the motor?', opts: ['Just gears', 'Gears, a position sensor and a controller', 'A battery'], answer: 1, why: 'A servo is a complete closed loop: it measures its own angle and drives until it reaches the commanded one.' },
      { k: 'single', q: 'What does a ten-to-one gearbox buy you?', opts: ['Ten times the speed', 'Ten times the torque at a tenth the speed', 'Ten times the power'], answer: 1, why: 'A gearbox creates no energy: it trades speed for torque. The power (bar losses) stays the same.' },
      { k: 'single', q: 'Why can a motor not go straight onto a microcontroller pin?', opts: ['It would be slow', 'The motor draws many times the current the pin can supply', 'The voltage is wrong'], answer: 1, why: 'An Arduino pin handles tens of milliamps; a motor draws hundreds on start-up. Without a driver the pin burns out.' },
    ],
    note: {
      summary: ['DC motor: fast and cheap but has no idea where it is — for wheels.', 'Servo: motor + gearbox + sensor + controller; moves to an angle and holds it.', 'Stepper: precise step by step, slower — for printers and CNC.', 'Torque and speed trade against each other; a gearbox converts between them.', 'Never wire a motor straight to a microcontroller pin.'],
      terms: [{ term: 'servo', def: 'A closed-loop motor unit that moves to a commanded angle and holds it.' }, { term: 'torque', def: "Turning effect; the motor's 'strength' as against its speed." }, { term: 'gear ratio', def: 'The gearbox ratio that trades speed for torque.' }],
    },
  },
  {
    day: 4,
    title: 'H-bridges and PWM',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Two practical questions remain about motors: how do you reverse the direction, and how do you control the speed?' },
      { k: 'text', md: 'Direction needs an **H-bridge**. Four switches in an H; depending on which pair closes, current flows through the motor one way or the other. You buy it as a chip: L298N, TB6612, DRV8833.' },
      { k: 'callout', tone: 'warn', md: 'On one side of an H-bridge, the upper and lower switch must **never** be closed at once — that is a short across the supply. The ready-made chips prevent this internally, which is one reason not to build your own.' },
      { k: 'text', md: 'Speed needs **PWM** (pulse width modulation). You do not lower the voltage; you switch it on and off very fast. The **duty cycle** says what fraction of the time it is on.' },
      { k: 'formula', tex: 'U_{\\text{avg}} = U_{\\text{supply}} \\cdot D', explain: 'D is the duty cycle between 0 and 1. On a 12 V supply, 50 % duty averages 6 V. The motor, being heavy, feels this as smooth continuous drive.' },
      { k: 'sim', sim: 'motor' },
      { k: 'callout', tone: 'tip', md: 'Keep the PWM frequency above hearing (>20 kHz) or the motor whines. That is not cosmetic: the whine means the winding is vibrating, which wears it out.' },
    ],
    quiz: [
      { k: 'numeric', q: 'On a 12 V supply at 25 % duty cycle, what is the average voltage? (V)', answer: 3, tol: 0.1, unit: 'V', why: 'U = 12 · 0.25 = 3 V. PWM does not reduce the voltage; it applies it for part of the time.' },
      { k: 'single', q: 'What is an H-bridge for?', opts: ['Controlling motor speed', 'Reversing the direction of rotation', 'Measuring voltage'], answer: 1, why: 'An H-bridge reverses the current through the motor. Speed is the job of PWM — often the same chip does both.' },
      { k: 'single', q: 'What does duty cycle mean?', opts: ['The motor speed', 'The fraction of time the signal is on', 'The supply voltage'], answer: 1, why: 'Duty cycle is the ratio: 0 % always off, 100 % always on, 50 % half and half. From it comes the average voltage.' },
      { k: 'single', q: 'Why keep the PWM frequency above 20 kHz?', opts: ['To make the motor faster', 'So it does not whine in the audible range', 'To use less power'], answer: 1, why: 'In the audible range the winding vibrates audibly, and that vibration damages the motor over time.' },
    ],
    note: {
      summary: ['An H-bridge reverses current through the motor with four switches.', 'Ready-made chips: L298N, TB6612, DRV8833 — they guard against shorts internally.', 'PWM controls speed by switching on and off fast.', 'Average voltage = supply voltage × duty cycle.', 'Keep PWM above 20 kHz or the motor whines and wears.'],
      terms: [{ term: 'H-bridge', def: 'A four-switch circuit that reverses the current through a motor.' }, { term: 'PWM', def: 'Pulse width modulation: fast switching to control power.' }, { term: 'duty cycle', def: 'The on-time as a fraction of the whole period.' }],
    },
  },
  {
    day: 5,
    title: 'Drivetrain and odometry',
    minutes: 24,
    lesson: [
      { k: 'text', md: '**Odometry** means working out where you are from how far the wheels turned. Without a map or GPS, it is your only self-contained position estimate.' },
      { k: 'formula', tex: 's = 2\\pi r \\cdot \\frac{N}{N_{rev}}', explain: 'Distance travelled: the wheel circumference times the number of revolutions. N is the encoder count, N_rev the counts per revolution.' },
      { k: 'code', lang: 'py', src: 'CIRCUM = 2 * 3.14159 * 3.5      # 3.5 cm wheel radius\nCOUNTS_PER_REV = 360\n\ndef travelled(counts):\n    return CIRCUM * counts / COUNTS_PER_REV\n\nprint(travelled(720))     # two revolutions', explain: 'That is all there is to it. Your robot\'s position tracking begins with these few lines.' },
      { k: 'text', md: 'With differential drive, both quantities fall out of the two wheel distances:\n\n- **displacement** = (left + right) / 2\n- **rotation** = (right − left) / wheelbase' },
      { k: 'callout', tone: 'key', md: 'Odometry **accumulates error**. Every slip, every worn tyre adds to it and nothing ever corrects it. After ten metres you can easily be tens of centimetres out. That is why an external reference is needed later: a wall, a line, a marker, a camera.' },
      { k: 'robot', scene: 'line' },
      { k: 'callout', tone: 'tip', md: 'Measure the wheelbase carefully, then calibrate: have the robot turn 360 degrees and see where it stops. If it overshoots, your wheelbase value is too small.' },
    ],
    quiz: [
      { k: 'numeric', q: 'The wheel radius is 3 cm. How far does one full revolution take it? (cm, one decimal)', answer: 18.8, tol: 0.3, unit: 'cm', why: 'Circumference = 2πr = 2 · 3.14 · 3 = 18.85 cm. One revolution covers exactly one circumference.' },
      { k: 'single', q: 'What is odometry?', opts: ['Measuring distance with ultrasound', 'Estimating position from wheel rotation', 'Measuring the mass of the robot'], answer: 1, why: 'Odometry computes position from drive data. It needs no external signal, but in exchange it accumulates error.' },
      { k: 'single', q: 'Why is odometry not enough on its own?', opts: ['It is too slow', 'It accumulates error and never corrects itself', 'It draws too much current'], answer: 1, why: 'Every slip adds to the error and nothing pulls it back. Without an external reference the estimate slowly drifts.' },
      { k: 'single', q: 'How do you compute displacement with differential drive?', opts: ['The average of the two wheel distances', 'The sum of the two wheel distances', 'The larger of the two'], answer: 0, why: 'The centre of the robot travels the average of the two. Their difference gives the rotation.' },
    ],
    note: {
      summary: ['Odometry computes position from how far the wheels turned.', 'Distance travelled = wheel circumference × revolutions.', 'Differential drive: displacement = (left+right)/2, rotation = (right−left)/wheelbase.', 'Odometry accumulates error and never corrects itself.', 'Tens of centimetres of error after ten metres is normal — an external reference is needed.', 'Calibrate the wheelbase with a 360-degree turn.'],
      terms: [{ term: 'odometry', def: 'Position estimation from drive rotation data.' }, { term: 'wheelbase', def: 'The distance between the driven wheels, needed to compute rotation.' }, { term: 'error accumulation', def: 'The steady growth of estimation error without external correction.' }],
    },
  },
];
