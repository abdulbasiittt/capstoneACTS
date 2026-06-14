# ACTS Frontend Demo Prototype

This repository contains a high-fidelity frontend prototype for the bachelor capstone project **Adaptive Career Trajectory Simulation Engine (ACTS)**.

## Project purpose

ACTS is presented here as a web-based platform for:

- structured profile capture
- skill vector representation
- probabilistic career trajectory simulation
- skill gap analysis
- saved results review
- employer-side talent insight dashboards

The prototype is **frontend only** and uses mock data plus simulated state transitions. It is designed for screenshots, demonstrations, and presentation walkthroughs.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Recharts
- Lucide React

## How the prototype maps to ACTS architecture

- **User Layer**
  - Student / Job Seeker flow
  - Employer flow
- **Presentation Layer**
  - Landing page
  - Student dashboard
  - Employer dashboard
  - Results and skill gap pages
- **Application Layer**
  - Login / role access
  - Profile setup
  - Skill vector editor
  - Simulation controller
  - Results history
- **ACTS Core Simulation Engine**
  - Processing page visually represents:
    - Markov Chain Career Transition Model
    - Monte Carlo Simulation Engine
    - Skill Gap Analysis Module
- **Data Layer**
  - Local mock state is structured as if it could later connect to a SQL-based relational database
- **External Data Source**
  - O*NET occupational mappings are represented in the UI copy and mock comparison logic

## Main routes

- `/` landing page
- `/login` role access
- `/profile-setup` student profile setup
- `/dashboard` student dashboard
- `/jobs` student job search using employer-posted roles
- `/skill-vector` skill profile and structured vector view
- `/run-simulation` simulation controller
- `/processing` staged ACTS engine processing screen
- `/results` probabilistic pathway dashboard
- `/skill-gap` skill gap analysis
- `/history` saved simulation history
- `/account` profile management
- `/employer` employer dashboard
- `/employer/company-setup` employer company registration, verification, presets, and job posting
- `/employer/talent-insights` employer talent insights
- `/employer/skill-trends` employer skill trends
- `/about` methodology page

## Development

Install dependencies and run the Vite app:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Demo behavior

- Demo Student Login opens the student dashboard
- Demo Employer Login opens the employer dashboard
- New user registration creates a local username/password account and opens profile setup
- Profile edits update the mock ACTS state
- Skill changes update the structured skill vector
- Employer company setup can register a company profile, simulate company verification, save hiring presets, and publish jobs
- Student users can search employer-posted jobs from the shared job board
- Running a simulation opens a staged processing screen
- Processing automatically generates mock results
- New results are saved into simulation history
- Saved runs can be reopened and compared

## Demo credentials

Named student demo accounts:

- `abdul.basit@acts.my` / `12345`
- `hysam@acts.my` / `123456`
- `lin.tunoo@acts.my` / `1234567`
- `poh.xinkat@acts.my` / `12345678`
- `edwin@acts.my` / `123456789`

Employer demo account:

- `employer@acts.my` / `acts-employer`

Newly registered users sign in with the username and password they create on the register page.

The public navbar intentionally keeps the demo passwords off-screen. Use the login page for role access and this README for the preset credentials when presenting the prototype.

## Notes

- This is a demonstration prototype, not a production prediction engine.
- Career outputs are mock probabilistic estimates for presentation purposes only.
- No real authentication, backend services, or database connections are included.
