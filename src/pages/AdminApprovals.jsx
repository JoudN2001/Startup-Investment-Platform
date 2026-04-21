// COMPONENTS
import MobileNavBar from "../components/MobileNavBar";
import Header from "../components/Header";
import ResponsiveContainer from "../components/ResponsiveContainer";
import ProjectCard from "../components/ProjectCard";
import DesktopNavBar from "../components/DesktopNavBar";
import DesktopAdminHeader from "../components/DesktopAdminHeader";

// HOOKS
import { useProjects } from "../contexts/ProjectsContext";

const AdminApprovals = () => {
  const data = useProjects();
  const projectsCards = data.map((p) => {
    return (
      <ProjectCard
        key={p.id}
        projectId={p.id}
        thumbnail={p.thumbnail}
        status={p.status}
        title={p.title}
        description={p.description}
        goal={p.goal}
        funded={p.funded}
        role={"admin"}
      />
    );
  });
  return (
    <div className={"bg-neutral-950 w-full min-h-dvh lg:pl-72"}>
      <Header title={"Admin Dashboard"} role={"admin"} />
      <DesktopAdminHeader />
      <DesktopNavBar title="investment portal" role={"admin"}/>
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
      <MobileNavBar role="admin" />
    </div>
  );
};

export default AdminApprovals;
