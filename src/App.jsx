import { Route, Routes, Link } from "react-router-dom";

// COMPONENTS
import StartupDashboard from "./Component/StartupDashboard";
import CreateProjectForm from "./Component/StartupDashboard";
import SubmitProject from "./Component/StartupDashboard";

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
