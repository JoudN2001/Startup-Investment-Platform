import { Route, Routes, Link } from "react-router-dom";

// COMPONENTS
import StartupDashboard from "./pages/StartupDashboard";
import CreateProjectForm from "./pages/CreateProjectForm";
import SubmitProject from "./pages/StartupDashboard";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<StartupDashboard/>}/>
      <Route path="/CreateProjectForm" element={<CreateProjectForm/>}/>
      <Route path="/SubmitProject" element={<SubmitProject/>}/>
    </Routes>
    </>
  );
}

export default App;
