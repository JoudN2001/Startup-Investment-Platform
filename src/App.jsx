// COMPONENTS
import StartupDashboard from "./pages/StartupDashboard";
import CreateProjectForm from "./pages/CreateProjectForm";
import SubmitProject from "./pages/SubmitProject";
import NotFound404 from "./pages/NotFound404";

// REACT ROUTERs
import { Route, Routes } from "react-router-dom";

// CONTEXTS
import { ProjectsProvider } from "./contexts/ProjectsContext";

function App() {
  return (
    <ProjectsProvider>
      <Routes>
        <Route path="/" element={<StartupDashboard />} />
        <Route path="/creation-form">
          <Route index element={<CreateProjectForm />} />
          <Route path="submit" element={<SubmitProject />} />
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </ProjectsProvider>
  );
}

export default App;
