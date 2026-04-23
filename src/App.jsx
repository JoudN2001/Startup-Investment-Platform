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
import ProjectsDetailes from "./pages/ProjectsDetailes";

// REACT ROUTERs
import { Route, Routes, Link } from "react-router-dom";

// CONTEXTS
import { ProjectsProvider } from "./contexts/ProjectsContext";

function App() {
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
            <Route path="project-details/:projectId" element={<ProjectsDetailes role="startup" />} />
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
              element={<ProjectsDetailes role="admin" />}
            />
          </Route>
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        {/* ===== ADMIN PAGES ===== */}

        <Route
          path="/"
          element={
            <div className="flex flex-col justify-center items-center text-3xl gap-10 font-bold h-lvh">
              <Link to="/admin">Admin</Link>
              <Link to="/startup">Startup</Link>
            </div>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </ProjectsProvider>
  );
}

export default App;
