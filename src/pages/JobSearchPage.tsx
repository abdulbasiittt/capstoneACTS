import { BriefcaseBusiness, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { ProbabilityBar } from "../components/common/ProbabilityBar";
import { StatCard } from "../components/common/StatCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { useActs } from "../context/AppContext";
import { formatDateTime } from "../utils/format";

function calculateMatchScore(
  requiredSkills: string[],
  preferredSkills: string[],
  occupationTrack: string,
  targetOccupation: string,
  skillNames: Set<string>,
) {
  const requiredMatches = requiredSkills.filter((skill) => skillNames.has(skill.toLowerCase())).length;
  const preferredMatches = preferredSkills.filter((skill) => skillNames.has(skill.toLowerCase())).length;
  const requiredScore =
    requiredSkills.length > 0 ? (requiredMatches / requiredSkills.length) * 72 : 0;
  const preferredScore =
    preferredSkills.length > 0 ? (preferredMatches / preferredSkills.length) * 18 : 0;
  const occupationBonus = occupationTrack === targetOccupation ? 10 : 0;

  return Math.min(100, Math.round(requiredScore + preferredScore + occupationBonus));
}

export function JobSearchPage() {
  const [searchParams] = useSearchParams();
  const { jobPostings, employerCompanyProfile, profile, skills } = useActs();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [trackFilter, setTrackFilter] = useState("All occupation tracks");
  const [locationFilter, setLocationFilter] = useState("All locations");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const skillNames = new Set(skills.map((skill) => skill.name.toLowerCase()));
  const occupationTracks = [
    "All occupation tracks",
    ...new Set(jobPostings.map((posting) => posting.occupationTrack)),
  ];
  const locationOptions = [
    "All locations",
    ...new Set(jobPostings.map((posting) => posting.location)),
  ];

  const filteredPostings = jobPostings
    .map((posting) => ({
      ...posting,
      matchScore: calculateMatchScore(
        posting.requiredSkills,
        posting.preferredSkills,
        posting.occupationTrack,
        profile.targetOccupation,
        skillNames,
      ),
    }))
    .filter((posting) => {
      const normalizedQuery = query.trim().toLowerCase();
      const queryMatch =
        normalizedQuery.length === 0 ||
        posting.title.toLowerCase().includes(normalizedQuery) ||
        posting.companyName.toLowerCase().includes(normalizedQuery) ||
        posting.requiredSkills.some((skill) => skill.toLowerCase().includes(normalizedQuery)) ||
        posting.summary.toLowerCase().includes(normalizedQuery);
      const trackMatch =
        trackFilter === "All occupation tracks" || posting.occupationTrack === trackFilter;
      const locationMatch =
        locationFilter === "All locations" || posting.location === locationFilter;

      return queryMatch && trackMatch && locationMatch;
    })
    .sort((left, right) => right.matchScore - left.matchScore);

  const topPosting = filteredPostings[0];
  const regionAlignedCount = filteredPostings.filter(
    (posting) =>
      posting.location === profile.preferredRegion || posting.location === "Remote / Hybrid",
  ).length;
  const verifiedPostingCount = filteredPostings.filter(
    (posting) => posting.verificationStatus === "Verified",
  ).length;

  return (
    <div className="pb-6">
      <PageHeader
        eyebrow="Employer-Posted Job Search"
        title="Search jobs posted through the employer workspace"
        description="Search the shared ACTS job board, compare employer requirements with your skill vector, and review openings that align with your current target occupation."
        breadcrumbs={[
          { label: "Student Workspace", href: "/dashboard" },
          { label: "Job Search" },
        ]}
        actions={
          <Link
            to="/run-simulation"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Compare with simulation
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Open employer roles"
          value={`${jobPostings.length}`}
          caption="Jobs currently published from the employer-side workspace."
        />
        <StatCard
          title="Verified postings"
          value={`${verifiedPostingCount}`}
          caption="Roles connected to a verified company profile."
          tone="teal"
        />
        <StatCard
          title="Best match score"
          value={topPosting ? `${topPosting.matchScore}%` : "N/A"}
          caption={topPosting ? topPosting.title : "Run a broader search to find a match."}
          tone="plum"
        />
        <StatCard
          title="Region-aligned roles"
          value={`${regionAlignedCount}`}
          caption={`Matches in ${profile.preferredRegion} or remote-friendly options.`}
          tone="accent"
        />
      </div>

      <div className="surface-card mt-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Search the employer job board</p>
            <p className="mt-1 text-sm text-slate-500">
              Results reflect jobs posted from the employer prototype and can be compared with ACTS readiness outputs.
            </p>
          </div>
          <StatusBadge
            label={`${employerCompanyProfile.verificationStatus} employer workspace`}
            tone={employerCompanyProfile.verificationStatus === "Verified" ? "teal" : "amber"}
          />
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[1.35fr_0.85fr_0.8fr]">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Keyword search</span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                placeholder="Search roles, companies, or skills"
              />
            </div>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Occupation track</span>
            <select
              value={trackFilter}
              onChange={(event) => setTrackFilter(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
            >
              {occupationTracks.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Location</span>
            <select
              value={locationFilter}
              onChange={(event) => setLocationFilter(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
            >
              {locationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-4">
          {filteredPostings.length > 0 ? (
            filteredPostings.map((posting) => (
              <div key={posting.id} className="surface-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xl font-semibold text-slate-900">{posting.title}</p>
                      <StatusBadge
                        label={posting.verificationStatus}
                        tone={posting.verificationStatus === "Verified" ? "teal" : "amber"}
                      />
                      <StatusBadge label={posting.occupationTrack} tone="accent" />
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      {posting.companyName} | {posting.industry} | Posted {formatDateTime(posting.postedAt)}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-slate-50 px-4 py-3 text-right">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Match score
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-ink">{posting.matchScore}%</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-3xl border border-slate-100 bg-white p-4">
                    <p className="text-sm text-slate-500">Location and mode</p>
                    <p className="mt-2 font-semibold text-slate-900">
                      {posting.location} | {posting.workMode}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-white p-4">
                    <p className="text-sm text-slate-500">Employment type</p>
                    <p className="mt-2 font-semibold text-slate-900">{posting.employmentType}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-white p-4">
                    <p className="text-sm text-slate-500">Salary range</p>
                    <p className="mt-2 font-semibold text-slate-900">{posting.salaryRange}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-600">{posting.summary}</p>

                <div className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Key responsibilities</p>
                    <div className="mt-3 space-y-2">
                      {posting.responsibilities.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm text-slate-600"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <ProbabilityBar
                      label="Readiness threshold"
                      value={posting.minimumReadiness}
                      hint="Employer preset threshold for shortlist-ready candidates."
                    />
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-slate-900">Required skills</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {posting.requiredSkills.map((skill) => (
                          <span key={skill} className="pill-chip">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-slate-900">Preferred skills</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {posting.preferredSkills.map((skill) => (
                          <span key={skill} className="pill-chip">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to="/skill-gap"
                    className="rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800 transition hover:bg-teal-100"
                  >
                    Compare skill gaps
                  </Link>
                  <Link
                    to="/results"
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    View trajectory results
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="surface-card px-6 py-8 text-center">
              <h3 className="text-xl font-semibold text-slate-800">
                No posted jobs matched this search
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                Try a broader keyword, switch the occupation track filter, or adjust the location
                filter to see more employer-posted roles.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setTrackFilter("All occupation tracks");
                  setLocationFilter("All locations");
                }}
                className="mt-5 inline-flex rounded-full bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-700"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6">
            <div className="flex items-center gap-3">
              <BriefcaseBusiness className="h-5 w-5 text-accent-700" />
              <div>
                <p className="text-sm font-semibold text-slate-900">How this connects to ACTS</p>
                <p className="text-sm text-slate-500">
                  Job search is paired with trajectory modeling rather than replacing it.
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
              <p>
                This job board shows roles posted from the employer workspace. Students can search
                openings, then compare employer skill requirements against their ACTS readiness and
                simulation outputs.
              </p>
              <p>
                The goal is to show that ACTS does not stop at static vacancy matching. It combines
                open roles with pathway simulation, uncertainty modeling, and skill gap review.
              </p>
            </div>
          </div>

          <div className="surface-card p-6">
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="h-5 w-5 text-teal-700" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Your current search context</p>
                <p className="text-sm text-slate-500">
                  ACTS can help interpret which roles are closest to your current profile.
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
                <p className="text-sm text-slate-500">Target occupation</p>
                <p className="mt-2 font-semibold text-slate-900">{profile.targetOccupation}</p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
                <p className="text-sm text-slate-500">Preferred industry and region</p>
                <p className="mt-2 font-semibold text-slate-900">
                  {profile.preferredIndustry} | {profile.preferredRegion}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
                <p className="text-sm text-slate-500">Strongest encoded skills</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {skills
                    .slice()
                    .sort((left, right) => right.proficiency - left.proficiency)
                    .slice(0, 5)
                    .map((skill) => (
                      <span key={skill.id} className="pill-chip">
                        {skill.name} L{skill.proficiency}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {topPosting ? (
            <div className="surface-card p-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-plum-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Closest current opening</p>
                  <p className="text-sm text-slate-500">
                    Highest overlap with your present ACTS skill vector.
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-3xl border border-plum-100 bg-plum-100/40 p-5">
                <p className="text-lg font-semibold text-slate-900">{topPosting.title}</p>
                <p className="mt-2 text-sm text-slate-600">
                  {topPosting.companyName} | {topPosting.location} | {topPosting.workMode}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-600">{topPosting.summary}</p>
                <div className="mt-4">
                  <ProbabilityBar
                    label="Estimated fit against current skill profile"
                    value={topPosting.matchScore}
                    hint="Presentation-only fit estimate derived from required and preferred skill overlap."
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
