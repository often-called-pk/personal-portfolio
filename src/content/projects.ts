import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'active-aero-lap-time',
    title: 'Implementable active aerodynamics in minimum lap time simulation',
    summary:
      'Extended a minimum-lap-time framework with independent front and rear wings and four-wheel torque vectoring. The free wing recovers 0.24-0.43 % of a lap over the best swept static setting; the thesis tests how much survives implementation.',
    year: '2026',
    category: 'Thesis',
    context: 'MSc thesis, Zenvo Automotive',
    role: 'Sole author',
    tools: ['MATLAB', 'CasADi', 'IPOPT', 'Simulink'],
    featured: true,
    cover: '/images/projects/active-aero-lap-time/cumulative-delta-barcelona.png',
    images: [
      {
        src: '/images/projects/active-aero-lap-time/cumulative-delta-barcelona.png',
        caption: 'Cumulative time delta along a Barcelona lap for two pairs of wing configurations.',
      },
    ],
    overview:
      "For my MSc thesis with Zenvo Automotive I extended an established minimum-lap-time optimal-control framework with independently controlled front and rear wings and four-wheel torque vectoring. The aerodynamics come from the partner's CFD wing-angle sweeps and ride-height map, resolved into one smooth, differentiable model. I framed the result as implementability rather than headline gain.",
    contributions: [
      'Solved 9 configurations across Barcelona-Catalunya and the Nürburgring in a distance-domain, direct-collocation formulation (CasADi and IPOPT): 18 converged laps on a problem of about 22,000 variables.',
      "Integrated the partner's CFD sweeps, ride-height map and Pacejka MF5.2 tyre coefficients into one smooth, analytically differentiable model, resolving the ride-height and downforce feedback loop so aero balance moves per axle with wing angle.",
      "Measured how much of the free wing's optimum survives discrete wing positions, a mandated braking deployment and the actuator rate actually delivered.",
      'Gated every model change behind 8 validation scripts and 26 unit tests (600+ assertions), and reported each delta against the measured numerical resolution of the method.',
      'Delivered a per-feature design spec and a provenance record for every borrowed parameter.',
    ],
    result:
      'The free wing recovers 0.24-0.43 % of a lap over the best swept static setting. A velocity-scheduled law designed for an assumed 60 deg/s actuator ceases to exist at the rate actually available, under half that.',
    links: [],
  },
  {
    slug: 'utac-2026-kia-niro',
    title: 'UTAC Challenge 2026: Kia Niro EV state estimation',
    summary:
      "Overall winners at UTAC Challenge 2026. Built the Kia Niro EV model in IPG CarMaker and took the team's mass, slope, battery state-of-charge and tyre-road friction estimators through staged test runs.",
    year: '2026',
    category: 'Competition',
    context: 'Cranfield group design project, UTAC Challenge 2026',
    role: 'Chief Engineer, 9-person team',
    tools: ['IPG CarMaker', 'Simulink', 'Python', 'CAN', 'EKF', 'RLS'],
    featured: false,
    cover: '/images/projects/utac-2026-kia-niro/efficiency-map.png',
    images: [
      {
        src: '/images/projects/utac-2026-kia-niro/efficiency-map.png',
        caption: "Representative traction motor efficiency map, scaled to the Kia Niro EV's peak torque and power.",
      },
      {
        src: '/images/projects/utac-2026-kia-niro/friction-curve.png',
        caption: 'Friction against longitudinal slip on a 0.7-friction surface, with a linear slip-slope fit.',
      },
      {
        src: '/images/projects/utac-2026-kia-niro/friction-estimate.png',
        caption: 'Friction estimator output against the actual road friction of 0.5 over a test run.',
      },
    ],
    overview:
      "I led the 9-person Cranfield team as Chief Engineer at the UTAC Challenge 2026 in Paris, working on state estimation for a Kia Niro EV. The CarMaker vehicle model draws on the team's own characterisation work (track testing, drive-cycle analysis, a custom PMSM powertrain and HV battery definition) and was checked against the team's measured cornering and slalom runs. The CarMaker road models cover the real Milton Keynes to Cranfield route and the slalom and steady-state cornering manoeuvres used for validation.",
    contributions: [
      'Led the 9-person team as Chief Engineer: ran the weekly cadence, secured test-facility and dynamometer access, set up the shared GitHub repository, and built and ran the test plan (static, dynamic and track characterisation).',
      "Built the Kia Niro EV model in IPG CarMaker from the team's own characterisation work and checked it against the team's measured cornering and slalom runs.",
      "Integrated the team's Simulink estimators (mass and slope, battery state of charge by EKF, friction) and a slip controller into the CarMaker model, then ran them through baseline, validation, mu-estimator and slip-control test runs.",
      'Defined, validated and tested the tyre-road friction estimation strategy; with no tyre data or wheel-speed sensor on the car, ran 50+ CarMaker surface-friction variations to build the lookup table the estimator runs from.',
      'Wrote the Python CAN-bus logger used to capture test data from the vehicle.',
    ],
    result:
      'Overall winners of the UTAC Challenge 2026 in Paris, representing Cranfield University.',
    links: [],
  },
  {
    slug: 'fullmodelsim-python',
    title: 'FullModelSim: 23-state vehicle model and solver in Python',
    summary:
      'A 23-state vehicle model and optimal-control solver ported from MATLAB to object-oriented Python, wrapped in a PySide6 desktop app and packaged as a standalone Windows executable.',
    year: '2026',
    category: 'Personal',
    context: 'Personal, MATLAB-to-Python port',
    role: 'Sole developer',
    tools: ['Python', 'CasADi', 'IPOPT', 'PySide6', 'PyInstaller'],
    featured: false,
    cover: '/images/projects/fullmodelsim-python/gui.png',
    images: [
      {
        src: '/images/projects/fullmodelsim-python/gui.png',
        caption: 'Desktop front end: circuit, aero configuration, tyre model and solver start settings.',
      },
    ],
    overview:
      'FullModelSim is a minimum-lap-time solver: a 23-state vehicle model posed as an optimal-control problem and solved with IPOPT through CasADi. I ported it from MATLAB to object-oriented Python and wrapped it in a PySide6 desktop application.',
    contributions: [
      'Ported the 23-state vehicle model and optimal-control solver, about 5,600 lines of Python in all including 15 test scripts.',
      'Ran the solver out of process behind a JSON and subprocess interface with live log streaming into the GUI, so a multi-minute solve never blocks or crashes the UI.',
      'Integrated the Coin-HSL MA57 and MA97 linear solvers into IPOPT behind a pre-flight load probe with automatic MUMPS fallback; benchmarked about 4-5x lower per-iteration linear-solve cost than MUMPS.',
      'Root-caused an MA57 convergence stall to a missing scaling option and fixed it by enabling MC64 scaling.',
      'Added a PyInstaller runtime hook for the CasADi DLL search path and bundled the HSL libraries into the build.',
    ],
    result:
      'The port solves the full 23-state problem with Coin-HSL linear solvers at about 4-5x lower per-iteration linear-solve cost than MUMPS, and is packaged as a standalone Windows executable.',
    links: [],
  },
  {
    slug: 'indian-f4-telemetry-platform',
    title: 'Indian F4 telemetry platform (indianf4championship.com)',
    summary:
      'Telemetry platform that Indian Formula 4 race engineers use at the circuit: vendor exports go into PostgreSQL, every lap lands on a common distance basis, and Plotly views overlay up to four drivers.',
    year: '2024-26',
    category: 'Personal',
    context: 'Indian F4 Championship',
    role: 'Sole developer, own initiative',
    tools: ['Flask', 'PostgreSQL', 'Plotly', 'Docker', 'nginx', 'Azure'],
    featured: false,
    images: [],
    overview:
      'Built on my own initiative and still run by me alone, this is the application Indian Formula 4 race engineers use at the circuit. With it, lap-time delta between drivers can be attributed corner by corner.',
    contributions: [
      'Built the Flask application and its ingestion pipeline: exports from two vendor systems (Marelli WinTAX4 and AiM RaceStudio3) are loaded into a PostgreSQL schema.',
      'Transformed every lap onto a common distance basis and built Plotly views that overlay up to four drivers, so lap-time delta is attributable corner by corner.',
      'Packaged the application with Docker behind nginx and hosted it on Azure.',
      'Owned the whole lifecycle alone: requirements from the engineers, build, release, and fixes between race events.',
      'Added an inventory system with role-based access for parts and tools across two championships, documented the platform and used it to train 30 interns.',
    ],
    result:
      "It removed the engineers' dependence on the championship's proprietary viewer and became the training tool for 30 interns.",
    links: [],
  },
  {
    slug: 'indian-f4-2025-dashboard',
    title: 'Indian F4 2025 telemetry dashboard',
    summary:
      'Serverless rebuild of the telemetry platform for the 2025 season: a React, TypeScript and Vite front end on shadcn/ui, with an AWS backend of Lambda, S3 and API Gateway.',
    year: '2025',
    category: 'Personal',
    context: 'Indian F4 Championship',
    role: 'Sole developer, AI-assisted',
    tools: ['React', 'TypeScript', 'Vite', 'shadcn/ui', 'AWS Lambda', 'S3', 'API Gateway'],
    featured: false,
    cover: '/images/projects/indian-f4-2025-dashboard/dashboard-traces.png',
    images: [
      {
        src: '/images/projects/indian-f4-2025-dashboard/dashboard-traces.png',
        caption: 'Speed, time delta, throttle and RPM for four laps on a common distance axis, 2025 season build.',
      },
    ],
    overview:
      'A serverless web app that compares drivers across laps with synchronised chart cursors, delta time and a GPS track map. Behind the front end, API Gateway and Lambda serve processed telemetry, and files uploaded to S3 trigger processing into DynamoDB.',
    contributions: [
      'Built the React and TypeScript front end on Vite, shadcn/ui, Tailwind and Recharts, with CSV upload, driver selection and speed, RPM, throttle and brake charts.',
      'Added multi-driver comparison: lap-time charts, delta time between drivers, a GPS track map and chart cursors that move in sync.',
      'Designed the serverless backend: API Gateway in front of a Lambda handler that checks for existing processed data and runs a CSV processor to return a response formatted for telemetry analysis.',
      'Wired uploads to S3 to trigger the Lambda handler, which updates telemetry records in DynamoDB.',
      'Secured the API with a Lambda authorizer that validates JWTs.',
    ],
    result:
      'A browser dashboard for comparing Indian F4 drivers lap by lap on a serverless AWS backend.',
    links: [],
  },
  {
    slug: 'racepaceoracle',
    title: 'RacePaceOracle',
    summary:
      "Formula 1 analysis web app on FastF1 data: compares drivers' laps, maps gear shifts, breaks down tyre strategy, charts position changes and track evolution. React, Vite and Tailwind front end, Python backend.",
    year: '2025',
    category: 'Personal',
    context: 'Personal, F1 analysis platform',
    role: 'Designer and developer',
    tools: ['React', 'Vite', 'Tailwind', 'FastF1', 'Python'],
    featured: false,
    images: [],
    overview:
      'RacePaceOracle is a personal Formula 1 analysis platform that I designed and developed. A Python backend processes session data from the FastF1 library, and a React, Vite and Tailwind front end presents it.',
    contributions: [
      "Built lap-time comparison so drivers' laps can be read side by side.",
      'Animated gear-shift maps to show how each driver attacks the corners.',
      'Broke down tyre strategy, covering pit-stop efficiency and compound performance.',
      'Charted lap-by-lap position swings through a race.',
      'Analysed track evolution, showing lap times dropping as rubber builds up on the circuit.',
    ],
    result:
      'A React and Python web app that turns FastF1 session data into driver, tyre and track analysis.',
    links: [],
  },
  {
    slug: 'active-aero-controller-codegen',
    title: 'Active-aero controller with verified C code generation',
    summary:
      'A 100 Hz active-aero ECU in Simulink, tested against a 6-DOF plant, with generated C that matches the model exactly on five of six outputs and within 1 ulp on the sixth.',
    year: '2026',
    category: 'Coursework',
    context: 'Coursework, Embedded Vehicle Control Systems',
    role: 'Sole author',
    tools: ['Simulink', 'Simulink Coder', 'C'],
    featured: false,
    images: [],
    overview:
      'Coursework for Embedded Vehicle Control Systems: an active-aero ECU designed, verified and turned into C inside one Simulink project. Six models, referenced under a top harness with variant subsystems, cover the 100 Hz discrete ECU, a 5 kHz 6-DOF plant on Vehicle Dynamics Blockset, a predictive driver and a replay harness. All interfaces are five buses in a Simulink data dictionary, so the ECU has a fully specified root interface that real hardware can replace. Confidential supplier data is kept out of every model file by architecture: loaded at project start-up and referenced by expression.',
    contributions: [
      'Designed the six-model Simulink set as model references under a top harness with variant subsystems, with all interfaces defined as five buses in a data dictionary (a 34-element vehicle-state bus among them).',
      'Wrote the 100 Hz ECU (curvature classifier, hysteresis and minimum-dwell state selection, brake-triggered airbrake overlay, PI torque-vectoring allocator with anti-windup) and built the wing actuators (lag, rate limit, travel clamp) as a locked reusable library.',
      'Generated ECU C with Simulink Coder, compiled under -std=c99 -pedantic with zero diagnostics, and showed equivalence with the model across five stimulus cases: bit-exact on five of six outputs, within 1 ulp on the sixth.',
      'Wrote a 9-gate acceptance suite covering the tyre law, aero chain, actuator physics, closed-loop behaviour, a Model Advisor subset, structural checks, code equivalence and Gherkin scenarios in Simulink Test.',
      "The suite caught a silent zero-vertical-load wiring defect and showed the native Magic Formula block could not represent the lateral tyre force, so the solver's own tyre law was ported (error 2.4 % to 1e-14).",
    ],
    result:
      'Generated C that compiles with zero diagnostics under -std=c99 -pedantic and was shown equivalent to the Simulink ECU across five stimulus cases.',
    links: [],
  },
  {
    slug: 'arduino-can-cruise-control',
    title: 'Digital cruise controller over an emulated vehicle bus',
    summary:
      'A PID cruise controller written for a lab-provided MATLAB simulation where speed, demand and control travel as 10-bit bus words, plus lab-supplied Simulink models for CAN messaging on an Arduino Uno.',
    year: '2025',
    category: 'Coursework',
    context: 'Coursework, Embedded Systems',
    role: 'Individual coursework',
    tools: ['MATLAB', 'Simulink', 'Arduino', 'CAN'],
    featured: false,
    images: [],
    overview:
      "Embedded Systems coursework on digital control and CAN communication. The cruise controller runs in the lab-provided MATLAB simulation, where speed, driver demand and throttle and brake signals are fixed-width binary words, as they would be on a communication bus. Lab-supplied Simulink models target an Arduino Uno through Embedded Coder and use an MCP2515 library to read an analog input, send and receive CAN frames and drive a motor with PWM and direction outputs.",
    contributions: [
      'Wrote the PID cruise controller: integrator pre-loaded to the roughly 50 % throttle that holds the initial 60 mph, integral clamped against windup, output saturated to the -100 to 100 % throttle and brake range.',
      'Wrote the decode and encode steps for the emulated bus: demand (30-110 mph) and speed (0-150 mph) read from 10-bit words, control written back as a 10-bit word with rounding and a top-of-range clamp.',
      'Ran the three lab-supplied Simulink models for an Arduino Uno (Embedded Coder, C, 10 ms fixed step) around an MCP2515 CAN library: analog input, CAN transmit and receive, and motor PWM and direction outputs.',
    ],
    result:
      'A cruise-control loop that operates on bit-encoded bus signals inside a lab-provided simulation, plus hands-on CAN messaging on an Arduino Uno through an MCP2515.',
    links: [],
  },
];
