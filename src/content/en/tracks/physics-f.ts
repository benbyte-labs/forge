import type { Day } from '../../types';

/** PHYSICS track, days 27-30. */
export const physicsEnF: Day[] = [
  {
    day: 27,
    title: 'Stress and deformation',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'Yesterday gave you `sigma = E · epsilon`. Now look at what happens as you load harder — because material does not behave the same way throughout.' },
      { k: 'callout', tone: 'key', md: 'The four regions of a stress-strain curve:\n\n1. **Elastic** — it springs back when the load is removed. Hooke law applies here.\n2. **Yield** — from here the deformation is permanent.\n3. **Hardening** — the material takes more, but already deformed.\n4. **Fracture** — it breaks.' },
      { k: 'text', md: 'In design the **yield strength** is what counts, not the ultimate tensile strength. A part that has permanently bent has already failed even if it did not break: the shaft is out of line, the hole has moved.' },
      { k: 'code', lang: 'py', src: '# Safety factor\nyield_strength = 250e6   # Pa, structural steel\nF = 1200                 # N load\nA = 20e-6                # m2, 20 mm2 section\n\nsigma = F / A\nn = yield_strength / sigma\nprint(f"Stress: {sigma/1e6:.0f} MPa")\nprint(f"Safety factor: {n:.2f}")\n# 60 MPa, n = 4.17 -> comfortably enough', explain: 'The **safety factor** is the yield strength divided by the actual stress. Around 2 is acceptable for static loads; near people or with unknown loads use 4 or 5.' },
      { k: 'callout', tone: 'warn', md: '**Fatigue** is a separate phenomenon: repeated loading breaks a material even when each single load stays far below yield. A spring bent a million times fails at a third of its rated load. For moving parts you design to the fatigue limit, not the yield strength.' },
      { k: 'callout', tone: 'tip', md: '**Stress concentration** is the main cause of fractures: a sharp internal corner, an abrupt change of section, the edge of a hole. A fillet in an internal corner can halve the local stress — which is why every well-designed part has radii.' },
    ],
    quiz: [
      { k: 'single', q: 'How far does Hooke law apply?', opts: ['To fracture', 'Through the elastic region, up to yield', 'Always'], answer: 1, why: 'Above yield the deformation is permanent and the linear relation ends.' },
      { k: 'single', q: 'Which value governs design?', opts: ['Ultimate tensile strength', 'Yield strength', 'Elastic modulus'], answer: 1, why: 'A permanently bent part has failed even though it did not break.' },
      { k: 'single', q: 'What is the safety factor?', opts: ['Yield strength divided by actual stress', 'Mass over force', 'Efficiency'], answer: 0, why: 'Around 2 for static loads; 4 or 5 near people.' },
      { k: 'single', q: 'What is fatigue?', opts: ['Material heating', 'Fracture under repeated loading, even below yield', 'Loss of elasticity'], answer: 1, why: 'For moving parts you design to the fatigue limit, not the yield strength.' },
      { k: 'single', q: 'What is a stress concentration?', opts: ['The thickest point', 'A sharp internal corner or abrupt section change', 'The middle of a face'], answer: 1, why: 'A fillet in an internal corner can halve the local stress.' },
    ],
    note: {
      summary: ['Four regions: elastic, yield, hardening, fracture.', 'Hooke law applies only in the elastic region.', 'Design to the yield strength, not the ultimate strength.', 'Safety factor: 2 static, 4-5 near people.', 'Fatigue breaks material below yield under repeated loading.', 'Add fillets to internal corners against stress concentration.'],
      terms: [{ term: 'yield strength', def: 'The stress above which deformation becomes permanent.' }, { term: 'safety factor', def: 'Yield strength divided by the actual stress.' }, { term: 'fatigue', def: 'Fracture from repeated loading below yield.' }],
    },
  },
  {
    day: 28,
    title: 'Waves and sound',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A wave carries **energy without carrying matter**. The water goes nowhere with the wave; it only moves up and down. This is the shared basis of sound, light and radio.' },
      { k: 'callout', tone: 'key', md: 'The basic relation for every wave:\n\n`c = f · lambda`\n\npropagation speed = frequency × wavelength. The **medium** sets the speed and the **source** sets the frequency — the wavelength follows.' },
      { k: 'code', lang: 'py', src: 'c_air = 343.0         # m/s at 20 degrees\n\nfor f in (40000, 1000, 100):\n    lam = c_air / f\n    print(f"{f:6} Hz -> {lam*1000:7.2f} mm wavelength")\n# 40000 Hz -> 8.58 mm   (ultrasonic sensor)\n#  1000 Hz -> 343.00 mm\n#   100 Hz -> 3430.00 mm', explain: 'An ultrasonic range sensor works at 40 kHz because an 8.6 mm wavelength is small enough to reflect off everyday objects rather than bend around them.' },
      { k: 'text', md: 'Three phenomena that work the same way for every wave:\n\n- **Reflection** — the basis of all range finding\n- **Refraction** — the speed changes at a boundary and the wave turns\n- **Diffraction** — it reaches behind an obstacle when the wavelength is comparable to the obstacle size' },
      { k: 'callout', tone: 'warn', md: '**Diffraction** explains the most important limit of an ultrasonic sensor: an 8.6 mm wavelength bends around objects smaller than that. A table leg or a stretched cable is simply **not seen** by ultrasound — the wave passes it by.' },
      { k: 'text', md: 'The **Doppler effect**: when the source or the observer moves, the frequency shifts. An approaching source sounds higher, a receding one lower. Speed radar and motion detection in parking sensors work from this.' },
    ],
    quiz: [
      { k: 'single', q: 'What does a wave carry?', opts: ['Matter', 'Energy without carrying matter', 'Charge'], answer: 1, why: 'The water goes nowhere with the wave; it only moves up and down.' },
      { k: 'single', q: 'What is the basic relation?', opts: ['`c = f · lambda`', '`F = m · a`', '`U = I · R`'], answer: 0, why: 'The medium sets the speed and the source the frequency; the wavelength follows.' },
      { k: 'single', q: 'Why does an ultrasonic sensor work at 40 kHz?', opts: ['It is cheaper', 'Because an 8.6 mm wavelength reflects off everyday objects', 'Because it is audible'], answer: 1, why: 'A longer wavelength would bend around objects by diffraction.' },
      { k: 'single', q: 'What does an ultrasonic sensor fail to see?', opts: ['A wall', 'Objects smaller than the wavelength, such as a stretched cable', 'The floor'], answer: 1, why: 'Diffraction means the wave simply bends around a small object.' },
      { k: 'single', q: 'What is the Doppler effect?', opts: ['Wave attenuation', 'A frequency shift when the source moves', 'Reflection'], answer: 1, why: 'Approaching sounds higher, receding lower. Speed radar works from it.' },
    ],
    note: {
      summary: ['A wave carries energy without carrying matter.', '`c = f · lambda`: the medium sets the speed, the source the frequency.', 'Ultrasonic sensors work at 40 kHz, an 8.6 mm wavelength.', 'Three phenomena: reflection, refraction, diffraction.', 'Diffraction is why ultrasound misses small objects.', 'Doppler effect: a moving source shifts the frequency.'],
      terms: [{ term: 'wavelength', def: 'The distance between two points of equal phase.' }, { term: 'diffraction', def: 'A wave bending into the region behind an obstacle.' }, { term: 'Doppler effect', def: 'A frequency shift from motion of source or observer.' }],
    },
  },
  {
    day: 29,
    title: 'Light and optics',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Light is an electromagnetic wave following the same rules as sound — only far faster, with a wavelength measured in micrometres.' },
      { k: 'callout', tone: 'key', md: 'The wavelength bands used in robotics:\n\n- **Visible light** — 380 to 750 nm, what a camera sees\n- **Near infrared** — 850 to 950 nm, most range sensors and line followers\n- **Far infrared** — 8 to 14 μm, the thermal camera band' },
      { k: 'text', md: 'The **refractive index** (n) says how much slower light travels in a material: `n = c_vacuum / c_material`. At a boundary the ray bends, following **Snell law**. That is the basis of how lenses work.' },
      { k: 'code', lang: 'py', src: '# The thin lens equation: where is the image?\n# 1/f = 1/o + 1/i\nf = 25.0            # mm, focal length\n\nfor o in (50, 100, 1000):\n    i = 1 / (1/f - 1/o)\n    mag = i / o\n    print(f"object {o:5} mm -> image {i:6.1f} mm, magnification {mag:.2f}x")\n# 50 -> 50.0 mm, 1.00x    100 -> 33.3 mm, 0.33x    1000 -> 25.6 mm, 0.03x', explain: 'At a large object distance the image distance tends to the focal length. That is why a camera sensor sits roughly one focal length behind the lens when looking at distant things.' },
      { k: 'callout', tone: 'warn', md: 'The biggest pitfall in machine vision is not the algorithm but the **lighting**. Recognition that works in changing light sees something different at every hour of the day. The remedy: **your own constant light source** and, ideally, an enclosed shaded space — that beats any filtering algorithm.' },
      { k: 'callout', tone: 'tip', md: 'An **infrared bandpass filter** is the cheapest reliability upgrade: illuminate with an 850 nm LED and put a filter on the camera that passes only that. Room lighting and daylight then practically vanish from the image.' },
    ],
    quiz: [
      { k: 'single', q: 'What wavelength do line-following sensors use?', opts: ['380-750 nm', '850-950 nm, near infrared', '8-14 micrometres'], answer: 1, why: 'Far infrared is the thermal camera band and visible light is the ordinary camera.' },
      { k: 'single', q: 'What does the refractive index tell you?', opts: ['The colour of light', 'How much slower light travels in the material', 'How much light is absorbed'], answer: 1, why: '`n = c_vacuum / c_material`. Snell law and lens behaviour follow from it.' },
      { k: 'single', q: 'Where is the image of a very distant object?', opts: ['At the lens', 'About one focal length away', 'Infinitely far'], answer: 1, why: 'That is why a camera sensor sits roughly one focal length behind the lens.' },
      { k: 'single', q: 'What is the biggest pitfall in machine vision?', opts: ['The algorithm', 'The lighting', 'The resolution'], answer: 1, why: 'In changing light, recognition sees something different at every hour.' },
      { k: 'single', q: 'What is an infrared bandpass filter for?', opts: ['Sharpening', 'Blocking room light and passing only your own IR illumination', 'Raising resolution'], answer: 1, why: 'It is the cheapest reliability upgrade in machine vision.' },
    ],
    note: {
      summary: ['Light is an electromagnetic wave following the same rules as sound.', 'Bands: visible 380-750 nm, near IR 850-950 nm, thermal 8-14 μm.', 'Refractive index `n = c_vacuum / c_material` gives Snell law.', 'Lens equation `1/f = 1/o + 1/i`; distant objects image at the focal length.', 'The main pitfall of machine vision is lighting, not the algorithm.', 'Own IR light plus a bandpass filter removes ambient light.'],
      terms: [{ term: 'refractive index', def: 'How much slower light travels in a material.' }, { term: 'focal length', def: 'The distance at which parallel rays converge after a lens.' }, { term: 'bandpass filter', def: 'An optical filter passing only one wavelength range.' }],
    },
  },
  {
    day: 30,
    title: 'The physics in your robot',
    minutes: 30,
    lesson: [
      { k: 'text', md: 'Thirty days of physics is not a pile of separate chapters. In a robot all of it appears at once, interacting. Walk through it on a real machine.' },
      { k: 'callout', tone: 'key', md: 'This much physics works simultaneously in a simple rover:\n\n- **Newton laws** — how much force to accelerate\n- **Friction** — does the wheel grip or slip\n- **Drag** — only matters at speed\n- **Torque** — the link between motor and wheel\n- **Electricity** — Ohm law, power, efficiency\n- **Magnetism** — how the motor works\n- **Thermodynamics** — how much heat and how it leaves\n- **Strength of materials** — will the mount break' },
      { k: 'code', lang: 'py', src: '# End to end: how long does one charge last?\nm, r, v = 3.0, 0.04, 0.5        # kg, m, m/s\nmu_roll = 0.02                  # rolling resistance\ng = 9.81\n\nF = mu_roll * m * g             # N, force needed to keep moving\nP_mech = F * v                  # W, mechanical power\neta = 0.52                      # the efficiency chain from day 23\nP_electrical = P_mech / eta\n\nWh_battery = 36.0               # 3 Ah at 12 V\nhours = Wh_battery / P_electrical\nprint(f"Mechanical: {P_mech:.2f} W, electrical: {P_electrical:.2f} W")\nprint(f"Run time: {hours:.1f} hours (excluding the controller)")', explain: 'This calculation ties three days together: friction, power, efficiency and energy. That is what physics looks like in practice — not one formula but a chain.' },
      { k: 'text', md: 'The estimating method worth keeping:\n\n1. **Order of magnitude first.** Watts or kilowatts? Newtons or kilonewtons? An order-of-magnitude error shows up; a decimal place does not matter.\n2. **Simplify boldly.** Drag is negligible at 0.5 m/s. Say so and drop it.\n3. **Allow margin.** A factor of two wherever you are unsure.\n4. **Measure.** The calculation says what to expect; the measurement says what is.' },
      { k: 'callout', tone: 'warn', md: 'Checking the **units** is the fastest debugging there is. If a formula does not come out in the expected unit, the formula is wrong — however elegant it looks. Mixing centimetres and metres is the commonest and the costliest.' },
      { k: 'callout', tone: 'tip', md: 'Physics here is not an end in itself: you learned it to **know in advance** what will happen before you build. Half an hour of calculation at the desk saves a burnt-out motor driver and two weeks waiting for the replacement.' },
    ],
    quiz: [
      { k: 'single', q: 'How many areas of physics act at once in a simple rover?', opts: ['One or two', 'All of them: mechanics, electricity, magnetism, heat, strength', 'Only mechanics'], answer: 1, why: 'That is why the chapters cannot be treated separately: they interact.' },
      { k: 'single', q: 'What is the first step in a practical estimate?', opts: ['An exact calculation', 'Establishing the order of magnitude', 'Simulation'], answer: 1, why: 'An order-of-magnitude error shows up; a decimal place does not matter.' },
      { k: 'single', q: 'When may you drop drag?', opts: ['Never', 'At low speed, such as 0.5 m/s', 'Always'], answer: 1, why: 'Simplify boldly, but state what you dropped and why.' },
      { k: 'single', q: 'What is the fastest way to debug a calculation?', opts: ['Redo it', 'Check the units', 'Simulate it'], answer: 1, why: 'If the unit is wrong, the formula is wrong. Mixing cm and m is the commonest error.' },
      { k: 'single', q: 'What is physics for in robot building?', opts: ['Passing exams', 'Knowing in advance what will happen before you build', 'Documentation'], answer: 1, why: 'Half an hour of calculation saves a burnt-out driver and two weeks of waiting.' },
    ],
    note: {
      summary: ['A rover runs on mechanics, electricity, magnetism, heat and strength at once.', 'Physics in practice is a chain, not a single formula.', 'Estimating: order of magnitude, bold simplification, margin, then measurement.', 'Checking units is the fastest debugging there is.', 'Mixing cm and m is the commonest and costliest error.', 'The point is knowing in advance what will happen before you build.'],
      terms: [{ term: 'order-of-magnitude estimate', def: 'A rough calculation establishing the right scale.' }, { term: 'unit check', def: 'Verifying a formula through the units it produces.' }, { term: 'margin', def: 'An allowance for uncertain parameters.' }],
    },
  },
];
