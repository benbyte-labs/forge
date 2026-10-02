import type { Track } from '../../types';
import { physicsEnB } from './physics-b';
import { physicsEnC } from './physics-c';
import { physicsEnD } from './physics-d';
import { physicsEnE } from './physics-e';
import { physicsEnF } from './physics-f';

export const physicsEn: Track = {
  id: 'physics',
  title: 'Physics',
  blurb: 'Mechanics, energy, electricity, magnetism — through a robot lens.',
  plannedTitles: [
    'Units and vectors',
    'Velocity and acceleration',
    "Newton's laws",
    'Work and energy',
    'Torque',
    'Rotation',
    'Momentum and collisions',
    'Friction',
    'Springs and oscillation',
    'Damping',
    'Inclines and simple machines',
    'Pressure and fluids',
    'Drag',
    'Charge and voltage',
    'Current and Ohm law',
    'Series and parallel',
    'Power and heat',
    'Capacitors',
    'Magnetic fields',
    'Electromagnetism',
    'How a DC motor works',
    'Generators and induction',
    'Efficiency',
    'Thermodynamics basics',
    'Thermal conduction and cooling',
    'Strength of materials',
    'Stress and deformation',
    'Waves and sound',
    'Light and optics',
    'The physics in your robot',
  ],
  days: [
    {
      day: 1,
      title: 'Units and vectors',
      minutes: 20,
      lesson: [
        {
          k: 'text',
          md: 'In physics every number carries a **unit**. "12" on its own means nothing. "12 cm", "12 kg" and "12 V" are three entirely different statements.',
        },
        {
          k: 'callout',
          tone: 'key',
          md: 'In 1999 NASA lost a Mars probe because one team worked in pounds and the other in newtons. Units are not a formality.',
        },
        {
          k: 'text',
          md: 'The SI base units you will need:\n\n- length: **metre** (m)\n- mass: **kilogram** (kg)\n- time: **second** (s)\n- current: **ampere** (A)\n\nEverything else derives from these: velocity is m/s, force is N = kg·m/s², voltage is V = W/A.',
        },
        {
          k: 'formula',
          tex: 'v = \\frac{s}{t}',
          explain: 'Velocity is distance covered divided by time taken. With distance in metres and time in seconds, velocity comes out in m/s. Carrying the units through is the best free error check you will ever get.',
        },
        {
          k: 'text',
          md: 'Some quantities only have a magnitude: a mass is 3 kg and that is that. These are **scalars**. Others also have a direction: a robot moving at 5 cm/s is not the same as one moving backwards at 5 cm/s. These are **vectors**.',
        },
        {
          k: 'text',
          md: 'Vectors: displacement, velocity, acceleration, force.\nScalars: mass, time, temperature, energy.',
        },
        {
          k: 'callout',
          tone: 'tip',
          md: 'On your robot a vector usually means two numbers: an x and a y component. The rover position is (x, z), and its velocity is the direction it currently faces.',
        },
        { k: 'sim', sim: 'projectile' },
        {
          k: 'text',
          md: 'This simulation gets genuinely interesting in the coming days — for now, just notice that the **direction** of the launch velocity (the angle) matters as much as its magnitude. That is what being a vector means.',
        },
      ],
      quiz: [
        {
          k: 'single',
          q: 'Which quantity is a vector?',
          opts: ['Mass', 'Temperature', 'Velocity'],
          answer: 2,
          why: 'Velocity has both magnitude and direction — 5 m/s forward is not 5 m/s backward. Mass and temperature are scalars: they have no direction.',
        },
        {
          k: 'numeric',
          q: 'A robot covers 60 cm in 3 seconds. What is its average speed in cm/s?',
          answer: 20,
          tol: 0.1,
          unit: 'cm/s',
          why: 'v = s / t = 60 cm / 3 s = 20 cm/s. Notice the units divide too: cm / s = cm/s.',
        },
        {
          k: 'single',
          q: 'What is the SI unit of force?',
          opts: ['Newton (N)', 'Joule (J)', 'Watt (W)'],
          answer: 0,
          why: 'Force is measured in newtons: 1 N = 1 kg·m/s². The joule is energy and the watt is power — both coming in the next weeks.',
        },
        {
          k: 'multi',
          q: 'Which two are scalar quantities?',
          opts: ['Displacement', 'Mass', 'Force', 'Energy'],
          answers: [1, 3],
          why: 'Mass and energy have magnitude only. Displacement and force are vectors: the direction matters.',
        },
      ],
      note: {
        summary: [
          'Every physical number carries a unit; a bare number means nothing.',
          'SI base units: metre, kilogram, second, ampere. Everything else derives from them.',
          'Velocity is v = s/t, and the units divide along with it: m / s = m/s.',
          'Scalar = magnitude only (mass, time, energy). Vector = magnitude and direction (velocity, force, displacement).',
          'Carrying units through a calculation is a free error check: wrong unit out means wrong maths in.',
        ],
        terms: [
          { term: 'unit', def: 'The reference quantity that gives a number its meaning.' },
          { term: 'scalar', def: 'A quantity that has magnitude only.' },
          { term: 'vector', def: 'A quantity that has both magnitude and direction.' },
          { term: 'newton', def: 'The SI unit of force: 1 N = 1 kg·m/s².' },
        ],
        formulas: [{ tex: 'v = s / t', meaning: 'Average speed: distance covered divided by time taken.' }],
      },
    },
    ...physicsEnB,
    ...physicsEnC,
    ...physicsEnD,
    ...physicsEnE,
    ...physicsEnF,
  ],
};
