// COMPONENTS
import StartupDashboard from "./pages/StartupDashboard";
import CreateProjectForm from "./pages/CreateProjectForm";
import SubmitProject from "./pages/SubmitProject";
import NotFound404 from "./pages/NotFound404";
import StartupProjects from "./pages/StartupProjects";
import StartupSettings from "./pages/StartupSettings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminApprovals from "./pages/AdminApprovals";
import AdminSettings from "./pages/AdminSettings";
import ProjectDetails from "./pages/ProjectDetails";
import SignInPage from "./pages/SignInPage";
import InvestorDashboard from "./pages/InvestorDashboard";
import InvestorProjects from "./pages/InvestorProjects";
import InvestorSettings from "./pages/InvestorSettings";
import SubmitProjectInvestment from "./pages/SubmitProjectInvestment";

// REACT ROUTER
import { Route, Routes } from "react-router-dom";

// CONTEXTS
import { ProjectsProvider } from "./contexts/ProjectsContext";

function App() {
  // TODO (Phase 4 - Backend Integration):
  // Replace these public routes with <ProtectedRoute> wrappers.
  // Current implementation relies on UI-level role props (prototype only).
  // Needs real validation via Token/Session state once the Auth layer is built.
  return (
    <ProjectsProvider>
      <Routes>
        {/* STARTUP PAGES */}
        <Route path="/startup">
          <Route index element={<StartupDashboard />} />
          <Route path="creation-form">
            <Route index element={<CreateProjectForm />} />
            <Route path="submit" element={<SubmitProject />} />
          </Route>
          <Route path="projects">
            <Route index element={<StartupProjects />} />
            <Route
              path="project-details/:projectId"
              element={<ProjectDetails role="startup" />}
            />
          </Route>
          <Route path="settings" element={<StartupSettings />} />
        </Route>
        {/* ===== STARTUP PAGES ===== */}

        {/* INVESTOR PAGES */}
        <Route path="/investor">
          <Route index element={<InvestorDashboard />} />
          <Route path="projects">
            <Route index element={<InvestorProjects />} />
            <Route path="project-details/:projectId">
              <Route index element={<ProjectDetails role="investor" />} />
              <Route path="submit" element={<SubmitProjectInvestment />} />
            </Route>
          </Route>
          <Route path="settings" element={<InvestorSettings />} />
        </Route>
        {/* ===== INVESTOR PAGES ===== */}

        {/* ADMIN PAGES */}
        <Route path="/admin">
          <Route index element={<AdminDashboard />} />
          <Route path="approvals">
            <Route index element={<AdminApprovals />} />
            <Route
              path="project-details/:projectId"
              element={<ProjectDetails role="admin" />}
            />
          </Route>
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        {/* ===== ADMIN PAGES ===== */}

        <Route path="/" element={<SignInPage />} />
        <Route path="*" element={<NotFound404 role="startup" />} />
      </Routes>
    </ProjectsProvider>
  );
}

export default App;
