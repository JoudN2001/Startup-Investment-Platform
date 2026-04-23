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

// eslint-disable-next-line react-refresh/only-export-components
export const useProjects = () => {
  return useContext(ProjectsContext);
};export { ProjectsProvider };
