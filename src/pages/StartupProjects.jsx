// COMPONENTS
import MobileNavBar from "../components/MobileNavBar";
import Header from "../components/Header";
import ResponsiveContainer from "../components/ResponsiveContainer";
import ProjectCard from "../components/ProjectCard";

// HOOKS
import { useProjects } from "../contexts/ProjectsContext";

export default function StartupProjects() {
  const {projects} = useProjects();
  const projectsCards = projects.map((p) => {
    const formattedGoal = new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(p.goal));
    const fundPercent = (Number(p.currentRaised) / Number(p.goal) * 100) || 0;
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
        role={"startup"}
      />
    );
  });
  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <Header title={"Startup Dashboard"} role={"startup"} />
      {/* MAIN CONTENT */}
      <ResponsiveContainer>
        {/* PROJECTS CARDS */}
        <div
          className={
            "flex flex-col md:grid md:grid-cols-2 md:gap-5 last:pb-36 md:last:pb-8 md:mt-8 "
          }
        >
          {projectsCards}
        </div>
        {/* ===== PROJECTS CARDS ===== */}
      </ResponsiveContainer>
      {/* ====== MAIN CONTENT ===== */}
      <MobileNavBar role="startup" />
    </div>
  );
}
