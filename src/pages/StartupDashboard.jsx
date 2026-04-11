// COMPONENTS
import MobileNavBar from "../components/MobileNavBar";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import SummaryCard from "../components/SummaryCard";
import ResponsiveContainer from "../components/ResponsiveContainer";
import FloatingAddButton from "../components/FloatingAddButton";

// ICONS
import { Plus } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
// PAGES LINKS
import { Link } from "react-router-dom";

// HOOKS
import { useProjects } from "../contexts/ProjectsContext";

export default function StartupDashboard() {
  const data = useProjects();
  const projectsCards = data.map((p) => {
    return (
      <ProjectCard
        key={p.id}
        thumbnail={p.thumbnail}
        status={p.status}
        title={p.title}
        description={p.description}
        goal={p.goal}
        funded={p.funded}
      />
    );
  });
  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <Header title={"Startup Dashboard"} />
      {/* MAIN CONTENT */}
      <ResponsiveContainer>
        <div className={"lg:flex lg:items-center lg:justify-between lg:mb-8  "}>
          {/* OVERVIEW */}
          <div>
            <span
              className={
                "text-neutral-700 font-medium text-xs lg:text-sm tracking-widest"
              }
            >
              OVERVIEW
            </span>
            <h1 className={"text-4xl font-bold my-2 lg:text-5xl"}>
              Naya Portfolio
            </h1>
            <p
              className={
                "text-neutral-400 font-semibold text-base lg:text-lg max-w-xl"
              }
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              alias illo dolorem, voluptatem asperiores obcaecati rerum voluptas
              dolores similique iste reprehenderit saepe, quasi voluptatibus,
              earum non! Aliquid tenetur deserunt incidunt!
            </p>
          </div>
          {/* ===== OVERVIEW ===== */}
          {/* ADD NEW PROJECT BUTTON  */}
          <Link
            to={"/startup/creation-form"}
            className="flex items-center justify-center space-x-2.5 mt-5.5 mb-2.5 bg-primary text-neutral rounded-xl p-4 active:bg-secondary-200"
          >
            <Plus
              className={
                " text-neutral rounded-full w-6 h-6 stroke-3 lg:w-8 lg:h-8 "
              }
            />
            <span className={"font-bold lg:text-lg"}>Create New Project</span>
          </Link>
          {/* ===== ADD NEW PROJECT BUTTON  ===== */}
        </div>
        {/* SUMMARY CARDS */}
        <div className={"flex flex-col md:grid md:grid-cols-2 md:gap-5"}>
          <SummaryCard title={"active deals"} value={"12"} />
          <SummaryCard title={"total funding"} value={"$4.2M"} />
          <SummaryCard title={"avg. growth"} value={"+24.8%"} />
        </div>
        {/* ====== SUMMARY CARDAS ===== */}

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
      <MobileNavBar groupPage="startup" />
      <FloatingAddButton />
    </div>
  );
}
