import { AlertCircle, KeyRound, LockKeyhole, Mail, ShieldCheck, UserPlus2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useActs } from "../context/AppContext";
import { demoStudentAccounts, employerDemoCredentials } from "../data/mockData";

const defaultStudentAccount = demoStudentAccounts[0];

export function LoginPage() {
  const navigate = useNavigate();
  const {
    loginAsDemo,
    loginRegisteredStudent,
    loginRegisteredEmployer,
    registeredStudentAccounts,
    registeredEmployerAccounts,
  } = useActs();
  const [role, setRole] = useState<"student" | "employer">("student");
  const [selectedStudentId, setSelectedStudentId] = useState(defaultStudentAccount.id);
  const [identifier, setIdentifier] = useState(defaultStudentAccount.email);
  const [password, setPassword] = useState(defaultStudentAccount.password);
  const [authError, setAuthError] = useState("");

  const applyStudentPreset = (studentId: string) => {
    const account = demoStudentAccounts.find((item) => item.id === studentId);

    if (!account) {
      return;
    }

    setRole("student");
    setSelectedStudentId(account.id);
    setIdentifier(account.email);
    setPassword(account.password);
    setAuthError("");
  };

  const applyEmployerPreset = () => {
    setRole("employer");
    setIdentifier(employerDemoCredentials.email);
    setPassword(employerDemoCredentials.password);
    setAuthError("");
  };

  const handleLogin = () => {
    setAuthError("");

    if (role === "student") {
      const normalizedIdentifier = identifier.trim().toLowerCase();
      const demoAccount = demoStudentAccounts.find(
        (item) => item.email.toLowerCase() === normalizedIdentifier,
      );

      if (demoAccount) {
        if (password !== demoAccount.password) {
          setAuthError(
            `Incorrect password entered for ${demoAccount.profile.fullName}. The demo passwords are listed in the README notes.`,
          );
          return;
        }

        loginAsDemo("student", demoAccount);
        navigate("/dashboard");
        return;
      }

      const registeredAccount = registeredStudentAccounts.find(
        (item) =>
          item.username.toLowerCase() === normalizedIdentifier ||
          item.emailAddress.toLowerCase() === normalizedIdentifier,
      );

      if (registeredAccount) {
        if (password !== registeredAccount.password) {
          setAuthError(
            `Incorrect password entered for ${registeredAccount.fullName}. Please try again.`,
          );
          return;
        }

        loginRegisteredStudent(registeredAccount);
        navigate("/dashboard");
        return;
      }

      setAuthError(
        "Student account not found. Choose a named demo profile or sign in with a registered username or email address.",
      );
      return;
    }

    const normalizedIdentifier = identifier.trim().toLowerCase();
    const registeredEmployer = registeredEmployerAccounts.find(
      (item) =>
        item.username.toLowerCase() === normalizedIdentifier ||
        item.contactEmail.toLowerCase() === normalizedIdentifier,
    );

    if (registeredEmployer) {
      if (password !== registeredEmployer.password) {
        setAuthError(`Incorrect password entered for ${registeredEmployer.companyName}.`);
        return;
      }

      loginRegisteredEmployer(registeredEmployer);
      navigate("/employer");
      return;
    }

    if (normalizedIdentifier !== employerDemoCredentials.email) {
      setAuthError("Employer account not recognised. Use the employer preset or a registered employer username.");
      return;
    }

    if (password !== employerDemoCredentials.password) {
      setAuthError("Incorrect password entered for Employer Demo.");
      return;
    }

    loginAsDemo("employer");
    navigate("/employer");
  };

  return (
    <div className="mx-auto max-w-6xl py-6">
      <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="surface-card overflow-hidden">
          <div className="bg-gradient-to-br from-accent-700 via-accent-600 to-teal-600 p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
              ACTS Sign In
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight">
              Named mock profiles and local registration
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/85">
              Use the named ACTS personas for presentation, or create a new local account with
              contact details to walk through the student or employer flow as a fresh user.
            </p>
          </div>
          <div className="p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  value: "student" as const,
                  title: "Student / Job Seeker",
                  description: "Named capstone personas plus locally registered student accounts.",
                },
                {
                  value: "employer" as const,
                  title: "Employer",
                  description: "Separate dashboard for talent insights, readiness, and skill trends.",
                },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setRole(option.value);
                    setAuthError("");

                    if (option.value === "student") {
                      applyStudentPreset(selectedStudentId);
                    } else {
                      applyEmployerPreset();
                    }
                  }}
                  className={`rounded-3xl border p-5 text-left transition ${
                    role === option.value
                      ? "border-accent-200 bg-accent-50"
                      : "border-slate-200 bg-white hover:border-accent-200 hover:bg-accent-50/40"
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-900">{option.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{option.description}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50/80 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-teal-600" />
                <div>
                  <p className="font-semibold text-slate-800">Prototype note</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Demo login loads named mock profiles, while registration can create either a
                    local student account or a local employer account in this browser session.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Student demo profiles</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Click a profile to auto-fill its login identifier and demo password.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={applyEmployerPreset}
                  className="rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800 transition hover:bg-teal-100"
                >
                  Load employer preset
                </button>
              </div>
              <div className="mt-4 grid gap-3">
                {demoStudentAccounts.map((account) => (
                  <button
                    key={account.id}
                    type="button"
                    onClick={() => applyStudentPreset(account.id)}
                    className={`rounded-3xl border p-4 text-left transition ${
                      selectedStudentId === account.id && role === "student"
                        ? "border-accent-200 bg-accent-50"
                        : "border-slate-200 bg-white hover:border-accent-200 hover:bg-accent-50/40"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">{account.profile.fullName}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {account.profile.currentOccupation} - {account.profile.specialization}
                        </p>
                      </div>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {account.profile.targetOccupation}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="surface-card p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
            Simulated authentication
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink">Sign in to ACTS</h2>
          <div className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Email address or username
              </span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  value={identifier}
                  onChange={(event) => {
                    setIdentifier(event.target.value);
                    setAuthError("");
                  }}
                  type="text"
                />
              </div>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setAuthError("");
                  }}
                  type="password"
                />
              </div>
            </label>
          </div>

          {authError ? (
            <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{authError}</p>
              </div>
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleLogin}
            className="mt-8 w-full rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Sign in as {role === "student" ? "Student / Job Seeker" : "Employer"}
          </button>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                const activeAccount =
                  demoStudentAccounts.find((item) => item.id === selectedStudentId) ??
                  demoStudentAccounts[0];
                applyStudentPreset(activeAccount.id);
                loginAsDemo("student", activeAccount);
                navigate("/dashboard");
              }}
              className="rounded-2xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm font-semibold text-accent-800 transition hover:bg-accent-100"
            >
              Demo Student Login
            </button>
            <button
              type="button"
              onClick={() => {
                applyEmployerPreset();
                loginAsDemo("employer");
                navigate("/employer");
              }}
              className="rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-100"
            >
              Demo Employer Login
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <UserPlus2 className="h-4 w-4" />
              Choose registration type
            </Link>
            <Link
              to="/home"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Return to home
            </Link>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-800">Presentation-ready defaults</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-800">Default student profile:</span> Abdul
                Basit, Data Scientist
              </p>
              <p>
                <span className="font-semibold text-slate-800">Additional demo personas:</span>{" "}
                Hysam, Lin Tun Oo, Poh Xin Kat, and Edwin
              </p>
              <p>
                <span className="font-semibold text-slate-800">Credential note:</span> Demo passwords
                are documented in the README instead of being displayed on this page.
              </p>
              <p>
                <span className="font-semibold text-slate-800">Registered users:</span>{" "}
                {registeredStudentAccounts.length} student account
                {registeredStudentAccounts.length === 1 ? "" : "s"} and{" "}
                {registeredEmployerAccounts.length} employer account
                {registeredEmployerAccounts.length === 1 ? "" : "s"} available in this browser session
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-5">
            <div className="flex items-start gap-3">
              <KeyRound className="mt-1 h-5 w-5 text-accent-700" />
              <div>
                <p className="font-semibold text-slate-800">Account note</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Student presets load named capstone personas, while registered student and
                  employer accounts can sign in with their username or saved email and continue into
                  their respective student or employer workspaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
