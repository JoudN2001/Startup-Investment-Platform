// COMPONENTS
import MobileNavBar from "../components/MobileNavBar";
import Header from "../components/Header";
import ResponsiveContainer from "../components/ResponsiveContainer";
import ProjectCard from "../components/ProjectCard";

// REACT
import { useState, useMemo } from "react";

// CONTEXTS
import { useProjects } from "../contexts/ProjectsContext";

// ICON
import { Search, ListFilter } from "lucide-react";

export default function InvestorProjects() {
  const { projects } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => p.status === "published")
      .filter((p) => {
        const matchesSearch = p.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesSearch;
      });
  }, [projects, searchQuery]);

  const projectsCards = filteredProjects
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
          role={"investor"}
        />
      );
    });

  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <Header title={"Startup Dashboard"} role={"investor"} />
      {/* MAIN CONTENT */}
      <ResponsiveContainer>
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
      <MobileNavBar role="investor" />
    </div>
  );
}
