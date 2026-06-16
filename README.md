# ACTS Frontend Demo Prototype

This repository contains the frontend demo prototype for the bachelor capstone project **Adaptive Career Trajectory Simulation Engine (ACTS)**.

ACTS is presented here as a web-based platform for:

- structured profile capture
- skill vector representation
- probabilistic career trajectory simulation
- skill gap analysis
- saved results review
- employer-side talent insight dashboards

The prototype is frontend-only and uses mock data plus simulated state transitions. It is intended for demos, screenshots, walkthroughs, and academic presentations.

## Run status

This project can run after cloning from GitHub.

I verified the following in this workspace:

- `npm install` completes successfully
- `npm run build` completes successfully
- the production output is generated in `dist`

Note:
The first build attempt in this environment failed because of sandbox filesystem restrictions outside the project folder, not because of the app itself. The actual Vite production build succeeds.

## Tech stack

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Recharts
- Lucide React

## Project structure

- `src/` application source code
- `public/` static assets copied into the final build
- `dist/` production build output
- `netlify.toml` Netlify build configuration
- `package.json` scripts and dependencies

## Teammate setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd CapstoneDemo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will print a local URL in the terminal, usually:

```text
http://localhost:5173
```

Open that URL in your browser.

## Production build

To generate the deployable build:

```bash
npm run build
```

The final output will be created in:

```text
dist/
```

To preview the production build locally:

```bash
npm run preview
```

## Recommended environment

- Node.js 20 or newer
- npm 10 or newer

If you already have Node installed, you can check with:

```bash
node -v
npm -v
```

## Main routes

- `/` splash page
- `/welcome` welcome page
- `/home` landing / home page
- `/login` role access
- `/register` account registration
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

## Demo credentials

Named student demo accounts:

- `abdul.basit@acts.my` / `12345`
- `hysam@acts.my` / `123456`
- `lin.tunoo@acts.my` / `1234567`
- `poh.xinkat@acts.my` / `12345678`
- `edwin@acts.my` / `123456789`

Employer demo account:

- `employer@acts.my` / `acts-employer`

Newly registered users can sign in with the username and password they create on the register page.

## How the prototype maps to ACTS architecture

- **User Layer**
  - Student / Job Seeker flow
  - Employer flow
- **Presentation Layer**
  - Welcome page
  - Home page
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

## Netlify deployment

This repo is configured for Netlify with:

- Build command: `npm run build`
- Publish directory: `dist`

SPA routing support is handled through:

- `public/_redirects`
- `netlify.toml`

## Troubleshooting

### Git says "detected dubious ownership"

On some Windows setups, Git may block commands with a safe-directory warning. If that happens, run:

```bash
git config --global --add safe.directory C:/path/to/your/cloned/repo
```

Then retry your Git command.

### Port 5173 is already in use

Close the other Vite session using that port, or run the app after stopping the conflicting process.

### Dependencies do not install

Make sure Node.js and npm are installed correctly, then try:

```bash
npm install
```

again from the project root.

## Notes

- This is a demonstration prototype, not a production prediction engine.
- Career outputs are mock probabilistic estimates for presentation purposes only.
- No real authentication, backend services, or database connections are included.
