import { ShieldCheck, UserRoundCog } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHeader } from "../components/common/PageHeader";
import { SkillChip } from "../components/common/SkillChip";
import { useActs } from "../context/AppContext";
import type { UserProfile } from "../types";

export function AccountPage() {
  const { profile, skills, saveProfile } = useActs();
  const [form, setForm] = useState<UserProfile>(profile);
  const [certificationInput, setCertificationInput] = useState(profile.certifications.join(", "));

  useEffect(() => {
    setForm(profile);
    setCertificationInput(profile.certifications.join(", "));
  }, [profile]);

  return (
    <div className="pb-6">
      <PageHeader
        eyebrow="Profile Management"
        title="Account and profile settings"
        description="Review and edit your profile information, saved skills, and placeholder account settings for the ACTS prototype."
        breadcrumbs={[
          { label: "Student Workspace", href: "/dashboard" },
          { label: "Account" },
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                value={form.fullName}
                onChange={(event) => setForm({ ...form, fullName: event.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Education level</span>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                value={form.educationLevel}
                onChange={(event) => setForm({ ...form, educationLevel: event.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Degree / specialization</span>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                value={form.degree}
                onChange={(event) => setForm({ ...form, degree: event.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Target occupation</span>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                value={form.targetOccupation}
                onChange={(event) => setForm({ ...form, targetOccupation: event.target.value })}
              />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Career preferences summary</span>
              <textarea
                rows={4}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                value={form.summary}
                onChange={(event) => setForm({ ...form, summary: event.target.value })}
              />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Certifications</span>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                value={certificationInput}
                onChange={(event) => setCertificationInput(event.target.value)}
              />
            </label>
          </div>
          <button
            type="button"
            onClick={() =>
              saveProfile({
                ...form,
                certifications: certificationInput
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              })
            }
            className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Save changes
          </button>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6">
            <div className="flex items-center gap-3">
              <UserRoundCog className="h-5 w-5 text-accent-700" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Saved skills</p>
                <p className="text-sm text-slate-500">
                  Skill profile data is managed separately in the ACTS vector editor
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <SkillChip
                  key={skill.id}
                  label={skill.name}
                  category={`${skill.proficiency}/5`}
                  active
                />
              ))}
            </div>
          </div>

          <div className="surface-card p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-teal-700" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Security settings placeholder</p>
                <p className="text-sm text-slate-500">
                  Presentational placeholders for future access control design
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              {[
                "Password reset workflow placeholder",
                "Multi-factor authentication placeholder",
                "Profile access audit log placeholder",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
