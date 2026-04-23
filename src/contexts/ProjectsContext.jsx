// REACT
import { createContext, useContext, useEffect, useState } from "react";

// INITIAL TEST DATA
import { dummyProjects } from "../data/dummyData";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) return JSON.parse(savedProjects);
    else {
      localStorage.setItem("projects", JSON.stringify(dummyProjects));
      return dummyProjects;
    }
  });
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);
  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

const useProjects = () => useContext(ProjectsContext);
export { ProjectsProvider, useProjects };
