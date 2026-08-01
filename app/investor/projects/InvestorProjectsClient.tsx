"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Project } from "@/types/project";

interface InvestorProjectsClientProps {
  projects: Project[];
}

const InvestorProjectsClient = ({ projects }: InvestorProjectsClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      return p.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [projects, searchQuery]);

  const projectsCards = filteredProjects.map((p) => {
    const formattedGoal = new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(p.goal));
    
    const fundPercent =
      Math.round((Number(p.currentRaised) / Number(p.goal)) * 100) || 0;
      
    return (
      <ProjectCard
        key={p.projectId}     
        projectId={p.projectId}
        title={p.title}
        description={p.description}
        status={p.status}
        thumbnailUrl={p.thumbnailUrl}
        formattedGoal={formattedGoal}
        fundedPercentage={fundPercent}
        role={"investor"}
      />
    );
  });

  return (
    <>
      {/* SEARCH  */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        {/* SEARCH FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="w-full md:max-w-md lg:max-w-lg xl:max-w-xl"
        >
          <div className="relative group flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-neutral-500 group-focus-within:text-primary transition-colors" />
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              type="search"
              placeholder="Search by project name..."
              className="w-full h-12 pl-12 pr-4 bg-neutral border-2 border-transparent rounded-lg outline-none transition-all duration-300 focus:bg-neutral focus:border-neutral-800 text-primary font-medium"
            />
          </div>
        </form>
      </div>
      {/* ===== SEARCH FORM =====  */}

      {/* PROJECTS CARDS */}
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-5 last:pb-36 md:last:pb-8 md:mt-8 ">
        {projectsCards}
      </div>
      {/* ===== PROJECTS CARDS ===== */}
    </>
  );
};

export default InvestorProjectsClient; 