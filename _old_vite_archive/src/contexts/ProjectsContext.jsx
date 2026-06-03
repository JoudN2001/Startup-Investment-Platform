// REACT
import { createContext, useContext, useEffect, useState } from "react";

// INITIAL TEST DATA
import { dummyProjects } from "../data/dummyData";

const ProjectsContext = createContext();

// TRY CATCH LOCAL STORAGE
const getInitialProjects = () => {
  try {
    const localData = localStorage.getItem("projects");
    return localData ? JSON.parse(localData) : dummyProjects;
  } catch (error) {
    console.error("Corrupted localStorage data, resetting to default:", error);
    localStorage.removeItem("projects");
    return dummyProjects;
  }
};

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(getInitialProjects);
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);
  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProjects = () => {
  return useContext(ProjectsContext);
};
export { ProjectsProvider };
