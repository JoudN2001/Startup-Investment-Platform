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

// REACT ROUTER
import { Route, Routes } from "react-router-dom";

// CONTEXTS
import { ProjectsProvider } from "./contexts/ProjectsContext";

function App() {
  // TODO (Phase 3 - Backend Integration):
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

        {/* Admin UserName = "admin"
        Admin Password = "1234"
        Startup UserName = "startup"
        Startup Password = "1234" */}
        <Route path="/" element={<SignInPage />} />
        <Route path="*" element={<NotFound404 role="startup" />} />
      </Routes>
    </ProjectsProvider>
  );
}

export default App;
