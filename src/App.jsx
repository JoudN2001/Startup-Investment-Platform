import { Route, Routes } from "react-router-dom";

// COMPONENTS
import StartupDashboard from "./pages/StartupDashboard";
import CreateProjectForm from "./pages/CreateProjectForm";
import SubmitProject from "./pages/SubmitProject";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartupDashboard />} />
        <Route path="/creation-form" element={<CreateProjectForm />} />
        <Route path="/creation-form/submit" element={<SubmitProject />} />
      </Routes>
    </>
  );
}

export default App;
