import type { Day } from '../../types';

/** ROBOTICS track, days 6–12. */
export const roboticsEnC: Day[] = [
  {
    day: 6,
    title: 'Power and batteries',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Half of all beginner robots fail not because of the code but because of the power supply. This day is worth taking seriously.' },
      { k: 'text', md: 'Three numbers you need from every battery:\n\n- **Voltage (V)** — how much it gives. A LiPo cell is 3.7 V nominal, 4.2 V full.\n- **Capacity (mAh)** — for how long. 2000 mAh nominally gives 2 A for an hour.\n- **C rating** — how much current it can deliver. 20C on a 2000 mAh pack means a 40 A peak.' },
      { k: 'formula', tex: 't = \\frac{\\text{capacity (mAh)}}{\\text{draw (mA)}}', explain: 'A 2000 mAh battery lasts four hours at a 500 mA draw — in theory. In practice reckon on 70–80 per cent.' },
      { k: 'callout', tone: 'key', md: 'A motor draws **several times** its rated current on start-up. The voltage sags for an instant and the microcontroller reboots. The symptom: "the robot resets when it starts moving". The fix: a separate supply for the logic, or a large capacitor beside the motor.' },
      { k: 'callout', tone: 'warn', md: 'Never discharge a LiPo cell below 3.0 V and never charge it above 4.2 V. Both ruin it, and overcharging can start a fire. Use a protection circuit and a proper charger.' },
    ],
    quiz: [
      { k: 'numeric', q: 'How long does a 2000 mAh battery last at a 500 mA draw? (hours)', answer: 4, tol: 0.2, unit: 'h', why: 't = 2000 / 500 = 4 hours in theory. In practice losses make it less.' },
      { k: 'single', q: 'Why does the microcontroller reset when a motor starts?', opts: ['A software bug', 'The inrush current sags the voltage for an instant', 'It overheats'], answer: 1, why: 'Inrush current is several times the rated figure. The voltage drops below the controller\'s minimum and it restarts.' },
      { k: 'single', q: 'What does 20C mean on a 2000 mAh pack?', opts: ['It lasts 20 hours', '20 × 2 A = a 40 A peak current', 'It is 20 V'], answer: 1, why: 'The C rating multiplies the capacity. 2000 mAh is 2 Ah, and 20 × 2 A = 40 A permitted peak.' },
      { k: 'single', q: 'What is the fix for a voltage sag?', opts: ['A stronger motor', 'A separate logic supply or a large capacitor beside the motor', 'Faster code'], answer: 1, why: 'The logic must be isolated from the motor\'s noise, and a capacitor buffers the momentary demand.' },
    ],
    note: {
      summary: ['Three battery numbers: voltage (V), capacity (mAh), C rating.', 'Runtime = capacity / draw, in practice 70–80 per cent of that.', 'Motor inrush current is several times the rated figure and sags the voltage.', 'That is what resets the microcontroller — the most common beginner mystery.', 'Fix: a separate logic supply or a large capacitor beside the motor.', 'Never take a LiPo below 3.0 V or above 4.2 V.'],
      terms: [{ term: 'capacity', def: 'The charge a battery stores, in mAh.' }, { term: 'C rating', def: 'A multiplier on capacity giving the permitted peak current.' }, { term: 'voltage sag', def: 'A momentary drop in supply voltage under a large current draw.' }],
    },
  },
  {
    day: 7,
    title: 'Microcontroller basics',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A **microcontroller** is a whole computer on one chip: processor, memory and input/output pins. There is no operating system — your program is the only thing running.' },
      { k: 'text', md: 'What you will start with:\n\n- **Arduino (ATmega328)** — the simplest, with countless examples. 16 MHz, 2 KB RAM.\n- **ESP32** — with wifi and bluetooth, far more powerful. 240 MHz, 520 KB RAM.\n- **Raspberry Pi Pico** — cheap, dual-core, well documented.' },
      { k: 'code', lang: 'c', src: 'void setup() {\n    pinMode(13, OUTPUT);     // runs once, at start-up\n}\n\nvoid loop() {\n    digitalWrite(13, HIGH);  // repeats forever\n    delay(500);\n    digitalWrite(13, LOW);\n    delay(500);\n}', explain: 'This is the same control loop you met on day one. `setup` is the configuration, `loop` is the sense-decide-act cycle.' },
      { k: 'callout', tone: 'warn', md: '`delay()` **stops the whole program**. During a half-second delay the robot senses nothing, decides nothing and reacts to nothing. Serious controllers time with `millis()` instead.' },
      { k: 'callout', tone: 'key', md: 'Memory is scarce. An Arduino has 2 KB of RAM — barely enough for a medium-sized piece of text. That is why embedded code is full of `int` and nearly free of dynamic allocation.' },
    ],
    quiz: [
      { k: 'single', q: 'What else runs on a microcontroller alongside your program?', opts: ['Linux', 'Nothing — there is no operating system', 'Windows'], answer: 1, why: 'Your program is the only one. That simplifies things, and it also means everything is your responsibility.' },
      { k: 'single', q: 'What is wrong with using `delay()`?', opts: ['It is imprecise', 'It stops the whole program: no sensing, no reacting', 'It uses a lot of memory'], answer: 1, why: 'Delay blocks. A robot cannot afford to be blind for half a second.' },
      { k: 'single', q: 'What do you time with instead of delay?', opts: ['sleep()', 'millis()', 'wait()'], answer: 1, why: '`millis()` gives the milliseconds since start-up. With it you can time without blocking.' },
      { k: 'single', q: 'How much RAM does a classic Arduino have?', opts: ['2 KB', '2 MB', '2 GB'], answer: 0, why: 'Two kilobytes. That is why embedded code avoids dynamic allocation and large data structures.' },
    ],
    note: {
      summary: ['A microcontroller is a whole computer on a chip, with no operating system.', 'Common boards: Arduino, ESP32, Raspberry Pi Pico.', '`setup` runs once, `loop` forever — that is the control loop.', '`delay()` blocks: the robot senses and reacts to nothing while it runs.', 'Time with `millis()` rather than delay.', 'Memory is scarce: an Arduino has 2 KB of RAM.'],
      terms: [{ term: 'microcontroller', def: 'Processor, memory and I/O integrated on one chip.' }, { term: 'setup and loop', def: 'The two required Arduino functions: start-up and main cycle.' }, { term: 'blocking delay', def: 'A wait during which the program does nothing else.' }],
    },
  },
  {
    day: 8,
    title: 'Digital and analogue signals',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Microcontroller pins understand two kinds of signal. Without grasping the difference you will not wire a sensor correctly.' },
      { k: 'text', md: '**Digital:** two states only, HIGH or LOW. A button, an LED, a switch, an on/off signal.\n\n**Analogue:** a continuous voltage between zero and the reference. A potentiometer, a light sensor, a thermometer, a battery voltage.' },
      { k: 'code', lang: 'c', src: '// digital\nint state = digitalRead(2);        // HIGH or LOW\ndigitalWrite(13, HIGH);\n\n// analogue\nint raw = analogRead(A0);          // 0..1023 (10-bit ADC)\ndouble volts = raw * 5.0 / 1023.0;', explain: '`analogRead` does not give volts but a whole number. A 10-bit ADC divides the 0–5 V range into 1024 steps.' },
      { k: 'callout', tone: 'key', md: 'The **ADC resolution** sets the precision. At 10 bits the step is 5 V / 1024 ≈ 4.9 mV. You will not see a finer difference than that, however good your sensor.' },
      { k: 'callout', tone: 'warn', md: 'An unconnected digital input "floats": it jumps randomly between HIGH and LOW. A button therefore needs a **pull-up or pull-down resistor** — or the built-in `INPUT_PULLUP` mode.' },
    ],
    quiz: [
      { k: 'numeric', q: 'What voltage does an analogRead of 512 mean on a 5 V reference? (V, one decimal)', answer: 2.5, tol: 0.1, unit: 'V', why: '512 / 1023 × 5 V ≈ 2.5 V. 512 is roughly half the range.' },
      { k: 'single', q: 'What does `analogRead` return?', opts: ['Volts', 'A whole number between 0 and 1023', 'HIGH or LOW'], answer: 1, why: 'The ADC splits the voltage into steps. Converting to volts is up to you.' },
      { k: 'single', q: 'Why does a button need a pull-up resistor?', opts: ['So it does not burn out', 'Because an unconnected input floats and reads randomly', 'To make it faster'], answer: 1, why: 'A floating input reads noise. The pull-up gives it a definite resting state.' },
      { k: 'single', q: 'What is the step of a 10-bit ADC on 5 V?', opts: ['About 4.9 mV', 'About 50 mV', 'Exactly 1 mV'], answer: 0, why: '5 V divided by 1024 steps ≈ 4.9 mV. The microcontroller cannot see a smaller difference.' },
    ],
    note: {
      summary: ['A digital signal has two states: HIGH or LOW.', 'An analogue signal is a continuous voltage the ADC turns into a number.', 'A 10-bit ADC gives 0–1023; converting to volts is up to you.', 'Resolution sets precision: 5 V / 1024 ≈ 4.9 mV.', 'An unconnected digital input floats — it needs a pull-up resistor.'],
      terms: [{ term: 'ADC', def: 'Analogue-to-digital converter turning voltage into a number.' }, { term: 'resolution', def: 'The step of an ADC, giving the smallest distinguishable difference.' }, { term: 'pull-up resistor', def: 'A resistor giving an input a definite resting state.' }],
    },
  },
  {
    day: 9,
    title: 'I2C, SPI, UART',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'When a sensor has more to say than a single voltage, you need a **communication protocol**. Three of them will cross your path.' },
      { k: 'text', md: '**I2C** — two wires (SDA, SCL), many devices on one bus, each with an address. Slower, but simple to wire. Gyroscopes, displays, thermometers.\n\n**SPI** — four wires, fast, a separate select line per device. SD cards, displays, high-speed sensors.\n\n**UART** — two wires (RX, TX), between two devices. GPS, bluetooth modules, the serial console.' },
      { k: 'callout', tone: 'key', md: 'On I2C every device needs a **unique address** on the bus. Two sensors with the same address cannot share the same two wires — you then need an address-select pin or a multiplexer.' },
      { k: 'code', lang: 'c', src: '#include <Wire.h>\n\nvoid setup() {\n    Wire.begin();\n    Serial.begin(115200);\n}\n\nvoid loop() {\n    Wire.beginTransmission(0x68);   // the device address\n    Wire.write(0x3B);               // which register we want\n    Wire.endTransmission(false);\n    Wire.requestFrom(0x68, 2);\n    int value = (Wire.read() << 8) | Wire.read();\n    Serial.println(value);\n}', explain: 'The pattern is the same for every I2C sensor: address, register, request, read. The `<< 8` joins two bytes into one 16-bit number.' },
      { k: 'callout', tone: 'warn', md: 'I2C needs a **pull-up resistor** on both lines (typically 4.7 kΩ). Many modules already have them — but connect several modules and the parallel resistors become too small.' },
    ],
    quiz: [
      { k: 'single', q: 'How many wires does I2C need?', opts: ['Two: SDA and SCL', 'Four', 'One'], answer: 0, why: 'One data line and one clock line. Many devices share them, each on its own address.' },
      { k: 'single', q: 'What happens if two devices share an I2C address?', opts: ['They take turns', 'They clash and neither works reliably', 'It resolves itself'], answer: 1, why: 'The address identifies the device. With two the same, the master cannot tell who it is talking to.' },
      { k: 'single', q: 'Which would you use for a GPS module?', opts: ['I2C', 'UART', 'SPI'], answer: 1, why: 'GPS modules typically emit a serial stream, which is exactly what UART is for.' },
      { k: 'single', q: 'What does `(Wire.read() << 8) | Wire.read()` do?', opts: ['Adds two values', 'Builds a 16-bit number from two bytes', 'Reads the same place twice'], answer: 1, why: 'It shifts the high byte left by eight bits and ORs in the low one. Two bytes become one number.' },
    ],
    note: {
      summary: ['I2C: two wires, many devices, each with a unique address.', 'SPI: four wires, fast, a select line per device.', 'UART: two wires, point to point (GPS, bluetooth, console).', 'The I2C pattern is always: address, register, request, read.', 'Two devices cannot share an address on the same I2C bus.', 'I2C needs pull-up resistors on both lines.'],
      terms: [{ term: 'I2C', def: 'A two-wire bus shared by several devices by address.' }, { term: 'SPI', def: 'A fast four-wire protocol with per-device selection.' }, { term: 'UART', def: 'A two-wire serial link between two devices.' }],
    },
  },
  {
    day: 10,
    title: 'Noise and filtering',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Every real measurement is noisy. The question is not how to get rid of the noise — it is how much **delay** you are willing to pay for it.' },
      { k: 'code', lang: 'c', src: '// 1. Moving average: simple, but costs memory and delay\ndouble average(int *samples, int count) {\n    long total = 0;\n    for (int i = 0; i < count; i++) total += samples[i];\n    return (double) total / count;\n}' },
      { k: 'code', lang: 'c', src: '// 2. Exponential filter: one variable, very effective\ndouble filtered = 0;\nconst double ALPHA = 0.2;     // 0 = sluggish, 1 = raw\n\nvoid update(double fresh) {\n    filtered = ALPHA * fresh + (1 - ALPHA) * filtered;\n}', explain: 'This is the best value-for-money filter on an embedded system: one multiplication, one addition, one variable.' },
      { k: 'callout', tone: 'key', md: 'Every filter **delays**. The smoother the signal, the more slowly it follows a real change. On a collision-avoidance sensor, too much filtering means the robot brakes late.' },
      { k: 'callout', tone: 'tip', md: 'Against outliers the **median** beats the average: take the middle of three readings and one bad value cannot spoil the result. An average is dragged off by a single false 400 cm.' },
    ],
    quiz: [
      { k: 'single', q: 'What does every filter cost?', opts: ['Memory', 'Delay', 'Accuracy'], answer: 1, why: 'Smoothing rests on past data, so the filtered signal always lags the real one.' },
      { k: 'single', q: 'What does ALPHA = 0.2 mean in an exponential filter?', opts: ['It follows quickly', 'The new reading counts 20 per cent, the old value 80', 'It turns filtering off'], answer: 1, why: 'A small alpha is smoother but more sluggish. A large alpha follows quickly but stays noisier.' },
      { k: 'single', q: 'How do you defend against a single outlier?', opts: ['With an average', 'With a median', 'With a larger alpha'], answer: 1, why: 'An average is dragged off by a false 400 cm. A median takes the middle, so the outlier drops out.' },
      { k: 'single', q: 'What is the advantage of an exponential filter over a moving average?', opts: ['It is more accurate', 'It needs one variable rather than a buffer', 'It has no delay'], answer: 1, why: 'No past samples have to be stored. On a memory-poor microcontroller that is decisive.' },
    ],
    note: {
      summary: ['Every real measurement is noisy; the price of filtering is delay.', 'Moving average: simple, but needs a buffer and memory.', 'Exponential filter: one variable, one multiplication — the best value for money.', 'A small alpha is smoother and slower; a large one faster and noisier.', 'Against outliers the median beats the average.', 'Over-filtering a collision sensor means braking late.'],
      terms: [{ term: 'moving average', def: 'The average of the last n samples, using a buffer.' }, { term: 'exponential filter', def: 'Single-variable smoothing where the new reading has weight alpha.' }, { term: 'median filter', def: 'Taking the middle of several readings, against outliers.' }],
    },
  },
  {
    day: 11,
    title: 'Forward kinematics',
    minutes: 24,
    lesson: [
      { k: 'text', md: '**Forward kinematics** asks: given every joint angle, where is the end of the arm? This is the easier direction — just trigonometry.' },
      { k: 'formula', tex: 'x = L_1\\cos\\theta_1 + L_2\\cos(\\theta_1 + \\theta_2)', explain: 'The horizontal coordinate of a two-joint planar arm. Each link adds a projection, and the angles accumulate.' },
      { k: 'formula', tex: 'y = L_1\\sin\\theta_1 + L_2\\sin(\\theta_1 + \\theta_2)', explain: 'The same vertically. Together the two formulas give the end point.' },
      { k: 'code', lang: 'py', src: 'import math\n\nL1, L2 = 30, 25\n\ndef tip(t1, t2):\n    a1 = math.radians(t1)\n    a2 = a1 + math.radians(t2)\n    x = L1 * math.cos(a1) + L2 * math.cos(a2)\n    y = L1 * math.sin(a1) + L2 * math.sin(a2)\n    return x, y\n\nprint(tip(0, 0))     # (55, 0) — fully extended', explain: 'The angles **accumulate**: the second joint angle is relative to the first link, not to the horizontal.' },
      { k: 'robot', scene: 'arm-bench' },
      { k: 'callout', tone: 'key', md: 'Forward kinematics always has **exactly one solution**: given angles give one end point. The inverse direction is far harder — tomorrow you will see why.' },
    ],
    quiz: [
      { k: 'single', q: 'What does forward kinematics compute?', opts: ['The angles needed for a target', 'The end point from the joint angles', 'The mass of the arm'], answer: 1, why: 'Angles to position. The easy direction, because you just substitute into the formula.' },
      { k: 'numeric', q: 'L1 = 30, L2 = 25, both angles zero. What is the x coordinate of the tip? (cm)', answer: 55, tol: 0.5, unit: 'cm', why: 'At zero angles both links lie horizontally: 30 + 25 = 55 cm.' },
      { k: 'single', q: 'What is the second joint angle measured against?', opts: ['The horizontal', 'The previous link', 'The ground'], answer: 1, why: 'That is why the angles add up in the formula: the second link turns relative to the direction of the first.' },
      { k: 'single', q: 'How many solutions does forward kinematics have?', opts: ['Always exactly one', 'Zero or two', 'Infinitely many'], answer: 0, why: 'Given angles give a single end point. It is the inverse direction where several solutions can exist.' },
    ],
    note: {
      summary: ['Forward kinematics computes the end point from the joint angles.', 'The angles accumulate: the second joint turns relative to the first link.', 'x = L1·cos(θ1) + L2·cos(θ1+θ2), y the same with sine.', 'Trigonometric functions expect radians — convert from degrees.', 'Forward kinematics always has exactly one solution.'],
      terms: [{ term: 'forward kinematics', def: 'Computing the end point from the joint angles.' }, { term: 'link length', def: 'The length of one rigid element of an arm.' }, { term: 'accumulated angle', def: 'The sum of joint angles giving a link its absolute direction.' }],
    },
  },
  {
    day: 12,
    title: 'Inverse kinematics',
    minutes: 26,
    lesson: [
      { k: 'text', md: '**Inverse kinematics** asks the reverse: I want the tip here — what angles get it there? This is the harder direction, and it does not always have an answer.' },
      { k: 'text', md: 'Three cases are possible:\n\n- **No solution** — the point is further than L1 + L2, or closer than |L1 − L2|.\n- **Exactly one** — the point is right on the boundary, with the arm fully extended or fully folded.\n- **Two** — "elbow up" and "elbow down": two different angle pairs reach the same place.' },
      { k: 'formula', tex: '\\cos\\theta_2 = \\frac{x^2 + y^2 - L_1^2 - L_2^2}{2L_1L_2}', explain: 'The cosine rule gives the second joint angle. If the result lies between -1 and 1 there is a solution; outside that the point is out of reach.' },
      { k: 'code', lang: 'py', src: 'import math\n\ndef inverse(x, y, L1=30, L2=25):\n    d2 = x*x + y*y\n    c2 = (d2 - L1*L1 - L2*L2) / (2*L1*L2)\n    if c2 < -1 or c2 > 1:\n        return None                     # out of reach\n    t2 = -math.acos(c2)                 # elbow up\n    t1 = math.atan2(y, x) - math.atan2(L2*math.sin(t2), L1 + L2*math.cos(t2))\n    return math.degrees(t1), math.degrees(t2)', explain: 'The same code runs in the FORGE Robot Lab. Returning `None` matters: better to admit it cannot be done than to hand back approximately wrong angles.' },
      { k: 'robot', scene: 'arm-bench' },
      { k: 'callout', tone: 'key', md: 'Of the two solutions, **elbow up** is the usual pick: that way the arm does not hit the table. On a real robot it also matters which one is reached faster from the current pose.' },
    ],
    quiz: [
      { k: 'single', q: 'What does inverse kinematics compute?', opts: ['The end point', 'The joint angles needed for a target', 'The speed of the arm'], answer: 1, why: 'Position to angles. The hard direction, because there is not always a solution and sometimes there are several.' },
      { k: 'single', q: 'When is there no solution?', opts: ['Never', 'When the point is further than L1+L2 or closer than |L1−L2|', 'When a coordinate is negative'], answer: 1, why: 'The arm reaches only within an annulus: inside full extension but outside the folded minimum.' },
      { k: 'single', q: 'How many solutions does a reachable, non-boundary point have?', opts: ['One', 'Two: elbow up and elbow down', 'Infinitely many'], answer: 1, why: 'The arm can fold two ways to the same place. A real robot needs a rule for choosing.' },
      { k: 'single', q: 'Why return `None` for an unreachable point rather than approximate angles?', opts: ['It is faster', 'Because an approximation would quietly take the arm to the wrong place', 'Less code to write'], answer: 1, why: 'At least the caller knows something is wrong. A silent approximation leads to a collision or a botched operation.' },
    ],
    note: {
      summary: ['Inverse kinematics computes the joint angles needed for a target point.', 'Three cases: no solution, exactly one, or two (elbow up and down).', 'The cosine rule gives the second angle; |cos| > 1 means out of reach.', 'For an unreachable point return `None`, not approximate angles.', 'Elbow up is the usual pick: the arm then misses the table.'],
      terms: [{ term: 'inverse kinematics', def: 'Computing joint angles from a desired end point.' }, { term: 'workspace', def: 'The set of points an arm can reach.' }, { term: 'elbow-up solution', def: 'The one of the two angle pairs where the elbow bends upwards.' }],
    },
  },
];
