// REACT
import { createContext, useContext } from "react";

// INITIAL TEST DATA
import { dummyProjects } from "../data/dummyData";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  return (
    <ProjectsContext.Provider value={dummyProjects}>
      {children}
    </ProjectsContext.Provider>
  );
};

const useProjects = () => {
  return useContext(ProjectsContext);
};

export { ProjectsProvider, useProjects };
