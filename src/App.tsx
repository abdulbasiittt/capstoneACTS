import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { NotificationBanner } from "./components/common/NotificationBanner";
import { PublicNavbar } from "./components/layout/PublicNavbar";
import { AppShell } from "./components/layout/AppShell";
import { useActs } from "./context/AppContext";
import { AboutPage } from "./pages/AboutPage";
import { AccountPage } from "./pages/AccountPage";
import { EmployerDashboardPage } from "./pages/EmployerDashboardPage";
import { HistoryPage } from "./pages/HistoryPage";
import { JobSearchPage } from "./pages/JobSearchPage";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProcessingPage } from "./pages/ProcessingPage";
import { ProfileSetupPage } from "./pages/ProfileSetupPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ResultsPage } from "./pages/ResultsPage";
import { RunSimulationPage } from "./pages/RunSimulationPage";
import { SkillGapPage } from "./pages/SkillGapPage";
import { SkillTrendsPage } from "./pages/SkillTrendsPage";
import { SkillVectorPage } from "./pages/SkillVectorPage";
import { StudentDashboardPage } from "./pages/StudentDashboardPage";
import { TalentInsightsPage } from "./pages/TalentInsightsPage";
import { CompanySetupPage } from "./pages/CompanySetupPage";
import { SplashPage } from "./pages/SplashPage";
import { WelcomePage } from "./pages/WelcomePage";

function PublicLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-ink">
      <PublicNavbar />
      <NotificationBanner />
      <main className={location.pathname === "/home" ? "" : "px-4 pb-16 pt-8 md:px-8"}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function StudentLayout() {
  const { role } = useActs();

  if (role && role !== "student") {
    return <Navigate to="/employer" replace />;
  }

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppShell variant="student">
      <NotificationBanner />
      <Outlet />
    </AppShell>
  );
}

function EmployerLayout() {
  const { role } = useActs();

  if (role && role !== "employer") {
    return <Navigate to="/dashboard" replace />;
  }

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppShell variant="employer">
      <NotificationBanner />
      <Outlet />
    </AppShell>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route element={<PublicLayout />}>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      <Route element={<StudentLayout />}>
        <Route path="/profile-setup" element={<ProfileSetupPage />} />
        <Route path="/dashboard" element={<StudentDashboardPage />} />
        <Route path="/jobs" element={<JobSearchPage />} />
        <Route path="/skill-vector" element={<SkillVectorPage />} />
        <Route path="/run-simulation" element={<RunSimulationPage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/skill-gap" element={<SkillGapPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Route>

      <Route element={<EmployerLayout />}>
        <Route path="/employer" element={<EmployerDashboardPage />} />
        <Route path="/employer/company-setup" element={<CompanySetupPage />} />
        <Route path="/employer/talent-insights" element={<TalentInsightsPage />} />
        <Route path="/employer/skill-trends" element={<SkillTrendsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
