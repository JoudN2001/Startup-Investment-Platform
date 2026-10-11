"use client"; 

import React, { createContext, useContext, useEffect, useState } from "react";
import { Project } from "@/types/project"; 

interface ProjectsContextType {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

interface ProjectsProviderProps {
  children: React.ReactNode;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
    try {
      const localData = localStorage.getItem("projects");
      if (localData) {
        setProjects(JSON.parse(localData));
      }
    } catch (error) {
      console.error("Corrupted localStorage data, resetting to default:", error);
      localStorage.removeItem("projects");
    }
  }, []); 

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects, isMounted]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};