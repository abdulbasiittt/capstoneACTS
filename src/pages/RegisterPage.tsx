import { AlertCircle, BriefcaseBusiness, GraduationCap, UserPlus2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useActs } from "../context/AppContext";
import type { UserRole } from "../types";

export function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") === "employer" ? "employer" : "student";
  const { registerStudentUser, registerEmployerUser } = useActs();
  const [role, setRole] = useState<UserRole>(initialRole);
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [institution, setInstitution] = useState("");
  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter them.");
      return;
    }

    if (role === "student") {
      const result = registerStudentUser({
        fullName,
        emailAddress,
        phoneNumber,
        age: Number(age),
        institution,
        username,
        password,
      });

      if (!result.success) {
        setError(result.message);
        return;
      }

      navigate("/profile-setup");
      return;
    }

    const result = registerEmployerUser({
      contactName,
      companyName,
      contactEmail,
      contactPhone,
      username,
      password,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/employer/company-setup");
  };

  return (
    <div className="mx-auto max-w-5xl py-6">
      <div className="surface-card overflow-hidden">
        <div className="bg-gradient-to-br from-teal-700 via-teal-600 to-accent-600 p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
            Welcome Registration
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight">
            Choose how you want to register
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85">
            Select whether you are joining ACTS as a student or an employer, then complete the
            local prototype registration details for that workspace.
          </p>
        </div>

        <div className="grid gap-6 p-8 lg:grid-cols-[1fr_0.92fr]">
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  value: "student" as const,
                  title: "Student / Job Seeker",
                  description: "Profile setup, skill vector creation, simulation, and job search.",
                  icon: GraduationCap,
                },
                {
                  value: "employer" as const,
                  title: "Employer",
                  description: "Company setup, candidate search, hiring presets, and job posting.",
                  icon: BriefcaseBusiness,
                },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setRole(option.value);
                    setError("");
                  }}
                  className={`rounded-3xl border p-5 text-left transition ${
                    role === option.value
                      ? "border-accent-200 bg-accent-50"
                      : "border-slate-200 bg-white hover:border-accent-200 hover:bg-accent-50/40"
                  }`}
                >
                  <option.icon className="h-5 w-5 text-accent-700" />
                  <p className="mt-4 text-sm font-semibold text-slate-900">{option.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{option.description}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-5">
              {role === "student" ? (
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                      value={fullName}
                      onChange={(event) => {
                        setFullName(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your name"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Personal email</span>
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                      value={emailAddress}
                      onChange={(event) => {
                        setEmailAddress(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your email address"
                      type="email"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Phone number</span>
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                      value={phoneNumber}
                      onChange={(event) => {
                        setPhoneNumber(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your phone number"
                      type="tel"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Age</span>
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                      value={age}
                      onChange={(event) => {
                        setAge(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your age"
                      type="number"
                      min="16"
                      max="80"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">University or school</span>
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                      value={institution}
                      onChange={(event) => {
                        setInstitution(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your university or school"
                    />
                  </label>
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Employer contact name</span>
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                      value={contactName}
                      onChange={(event) => {
                        setContactName(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter the main employer contact"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Company name</span>
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                      value={companyName}
                      onChange={(event) => {
                        setCompanyName(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your company name"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Company contact email</span>
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                      value={contactEmail}
                      onChange={(event) => {
                        setContactEmail(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter a company email"
                      type="email"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Company contact phone</span>
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                      value={contactPhone}
                      onChange={(event) => {
                        setContactPhone(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter a company phone number"
                      type="tel"
                    />
                  </label>
                </div>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Username</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                    setError("");
                  }}
                  placeholder="Choose a unique username"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  type="password"
                  placeholder="Create a password"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Confirm password</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setError("");
                  }}
                  type="password"
                  placeholder="Re-enter your password"
                />
              </label>
            </div>

            {error ? (
              <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleRegister}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <UserPlus2 className="h-4 w-4" />
                Create {role === "student" ? "student" : "employer"} account
              </button>
              <Link
                to="/login"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back to sign in
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-6">
              <p className="text-sm font-semibold text-slate-900">What happens next?</p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                {role === "student" ? (
                  <>
                    <p>Your student contact, age, school, username, and password details are stored locally for this prototype only.</p>
                    <p>A starter student workspace is created so you can continue into profile setup immediately.</p>
                    <p>You will then be able to search employer-posted jobs and compare them with ACTS simulation outputs.</p>
                  </>
                ) : (
                  <>
                    <p>Your employer contact details and login are stored locally for this prototype only.</p>
                    <p>You will continue into company setup to register company details, verify the company, and publish jobs.</p>
                    <p>The employer dashboard will also support candidate search by role, degree, and skill indicators.</p>
                  </>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-6">
              <p className="text-sm font-semibold text-slate-900">Prototype scope</p>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                This is a frontend-only capstone registration flow. It simulates account creation
                and workspace entry without any live backend services or production authentication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
