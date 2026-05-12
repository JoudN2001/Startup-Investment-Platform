// COMPONENTS
import MobileNavBar from "../components/MobileNavBar";
import Header from "../components/Header";
import ResponsiveContainer from "../components/ResponsiveContainer";
import ProjectCard from "../components/ProjectCard";
import DesktopNavBar from "../components/DesktopNavBar";
import DesktopAdminHeader from "../components/DesktopAdminHeader";

// REACT
import { useState, useMemo } from "react";

// CONTEXTS
import { useProjects } from "../contexts/ProjectsContext";

// ICON
import { Search, ListFilter } from "lucide-react";

const AdminApprovals = () => {
  const { projects } = useProjects();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter = filter === "all" || p.status === filter;

      const matchesSearch = p.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [projects, filter, searchQuery]);

  const projectsCards = filteredProjects.map((p) => {
    const formattedGoal = new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(p.goal));
    const fundPercent = (Number(p.currentRaised) / Number(p.goal)) * 100 || 0;
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
        role={"admin"}
      />
    );
  });
  return (
    <div className={"bg-neutral-950 w-full min-h-dvh lg:pl-72"}>
      <Header title={"Admin Dashboard"} role={"admin"} />
      <DesktopAdminHeader />
      <DesktopNavBar title="investment portal" role="admin" />
      {/* MAIN CONTENT */}
      <ResponsiveContainer>
        {/* SEARCH + FILTERATION  */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          {/* SEARCH FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="w-full md:max-w-md "
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
                className="w-full h-12 pl-12 pr-4 bg-neutral border-2 border-transparent rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-neutral-800 text-primary font-medium"
              />
            </div>
          </form>

          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "flex items-center gap-2 h-10 px-4 bg-neutral-900 text-primary border-2 border-transparent rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-neutral-900 hover:text-primary"
                  : "flex items-center gap-2 h-10 px-4 bg-neutral-950 text-neutral-500 border-2 border-transparent rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-neutral-900 hover:text-primary"
              }
            >
              <ListFilter className="w-4 h-4" /> All Projects
            </button>

            <button
              onClick={() => setFilter("published")}
              className={
                filter === "published"
                  ? "flex items-center gap-2 h-10 px-4 bg-success/10 text-success border-2 border-success/20 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-success/10 hover:text-success hover:border-success/20"
                  : "flex items-center gap-2 h-10 px-4 bg-neutral-950 text-neutral-500 border-2 border-transparent rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-success/10 hover:text-success hover:border-success/20"
              }
            >
              Published
            </button>

            <button
              onClick={() => setFilter("pending")}
              className={
                filter === "pending"
                  ? "flex items-center gap-2 h-10 px-4 bg-warning/10 text-warning border-2 border-warning/20 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-warning/10 hover:text-warning hover:border-warning/20"
                  : "flex items-center gap-2 h-10 px-4 bg-neutral-950 text-neutral-500 border-2 border-transparent rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-warning/10 hover:text-warning hover:border-warning/20"
              }
            >
              Pending
            </button>

            <button
              onClick={() => setFilter("rejected")}
              className={
                filter === "rejected"
                  ? "flex items-center gap-2 h-10 px-4 bg-error-bg text-error border-2 border-error/20 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-error-bg hover:text-error hover:border-error/20"
                  : "flex items-center gap-2 h-10 px-4 bg-neutral-950 text-neutral-500 border-2 border-transparent rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-error-bg hover:text-error hover:border-error/20"
              }
            >
              Rejected
            </button>
          </div>
        </div>
        {/* ===== SEARCH + FILTERATION =====  */}

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
      <MobileNavBar role="admin" />
    </div>
  );
};

export default AdminApprovals;
