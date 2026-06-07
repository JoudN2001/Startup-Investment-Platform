"use client";

// COMPONENTS
import ProjectCard from "@/components/ui/ProjectCard";

// CONTEXT
import { useProjects } from "@/contexts/ProjectsContext";

export default function PublishedProjects() {
  const { projects } = useProjects();
  const projectsCards = projects
    .filter((p) => p.status === "published")
    .map((p) => {
      const formattedGoal = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(Number(p.goal));
      const fundPercent =
        Math.round((Number(p.currentRaised) / Number(p.goal)) * 100) || 0;
      return (
        <ProjectCard
          key={p.id}
          projectId={p.id}
          title={p.title}
          description={p.description}
          status={p.status}
          thumbnail={p.thumbnailUrl}
          goal={formattedGoal}
          funded={fundPercent}
          role={"visitor"}
        />
      );
    });
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 md:mt-8 ">
      {projectsCards}
    </div>
  );
}
