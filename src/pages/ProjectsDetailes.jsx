// COMPONENTS
import Header from "../components/Header";
import MobileNavBar from "../components/MobileNavBar";
import DesktopAdminHeader from "../components/DesktopAdminHeader";
import DesktopNavBar from "../components/DesktopNavBar";
import ResponsiveContainer from "../components/ResponsiveContainer";
import DetailsCard from "../components/DetailsCard";
import HighlightedCard from "../components/HighlightedCard";
import FileCard from "../components/FileCard";
import LastAction from "../components/LastAction";
import AuditDecision from "../components/AuditDecision";

// REACT ROUTER
import { useParams } from "react-router-dom";

// CONTEXTS
import { useProjects } from "../contexts/ProjectsContext";

// ICONS
import { TextAlignStart, Check, X, SquarePen, History } from "lucide-react";

const ProjectsDetailes = () => {
  const { projectId } = useParams();
  const data = useProjects();
  const selectedProject = data.find((p) => p.id === Number(projectId));
  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <Header title={"Project Details"} role={"admin"} />
      <DesktopAdminHeader />
      <DesktopNavBar title="investment portal" role={"admin"} />
      <ResponsiveContainer>
        {/* PROJECTS DETAILS */}
        <main className="lg:pl-72">
          {/* IMAGE + TITLE */}
          <div className="flex relative max-h-1/6">
            <img
              src={selectedProject.thumbnail ? selectedProject.thumbnail : ""}
              alt={selectedProject.thumbnail ? "Project Thumbnail" : ""}
              className={
                selectedProject.thumbnail
                  ? "rounded-xl h-80 w-full object-cover shrink-0"
                  : ""
              }
            />
            <div className="flex justify-between items-center absolute right-1 md:right-3 lg:right-4 top-3 md:top-4 lg:top-5">
              <span className="shrink-0 bg-neutral-900/60 text-neutral-400 backdrop-blur-xl max-[360px]:py-1.5 py-2.5 max-[360px]:px-3 px-3.5 text-xs font-semibold rounded-full">
                {/* TODO: STATUS CIRCLE AND OTHER STATUS (DONE, PENDDING, REJECTED, ETC...) */}
                {selectedProject.status.toUpperCase()}
              </span>
            </div>
            <h1
              className={
                selectedProject.thumbnail
                  ? "absolute bottom-0 md:bottom-1 lg:bottom-2 left-3 md:left-4 lg:left-5 text-3xl font-bold my-2 lg:text-4xl text-neutral "
                  : "text-4xl font-bold my-2 lg:text-5xl truncate max-w-2/3"
              }
            >
              {selectedProject.title}
            </h1>
          </div>
          {/* ===== IMAGE + TITLE ===== */}
          <h2 className="flex items-center gap-2.5 text-2xl font-semibold mb-3 mt-6 lg:text-3xl">
            <TextAlignStart className="w-5 h-5 stroke-3" /> Full Description
          </h2>
          <p className="text-neutral-400 font-semibold text-base lg:text-lg max-w-xl">
            {selectedProject.description}
          </p>
          {/* DETAILS CARDS */}
          <div className="md:grid grid-cols-2 gap-5 my-5">
            {/* TODO: some data must be <HighlightedCard />  */}
            <DetailsCard
              label={"finding goal"}
              goal={selectedProject.goal}
              funded={selectedProject.funded}
            />
            {/* TODO: more data must cumming from form */}
            <DetailsCard
              label={"minimum investement"}
              goal={"$10,000"}
              description="Designed for institutional and accredited high-net-worth individuaks."
            />
          </div>
          {/* ===== DETAILS CARDS ===== */}

          <div className="md:hidden">
            {/* ATTACHED FILES */}
            <div className="my-7.5">
              <h1 className="text-md text-neutral-400 tracking-wide font-semibold mb-6">
                VERIFIED DOCUMENTATION
              </h1>
              <div className="flex flex-col gap-3">
                <FileCard fileName="Environmental_impact.pdf" />
                <FileCard fileName="Tier_VI_Blueprint_V2.dwg" />
              </div>
            </div>
            {/* ====== ATTACHED FILES ====== */}
            <AuditDecision />
            <LastAction />
          </div>

          {/* DESKTOP AND TABLET DECISITION + FILES */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            <div className="my-7.5">
              <h1 className="text-md text-neutral-400 tracking-wide font-semibold mb-6">
                VERIFIED DOCUMENTATION
              </h1>
              <div className="flex flex-col gap-3">
                <FileCard fileName="Environmental_impact.pdf" />
                <FileCard fileName="Tier_VI_Blueprint_V2.dwg" />
                <LastAction />
              </div>
            </div>
            <AuditDecision />
          </div>
          {/* ===== DESKTOP AND TABLET DECISITION + FILES ===== */}
        </main>
        {/* ===== PROJECTS DETAILS ===== */}
      </ResponsiveContainer>
      <MobileNavBar role={"admin"} />
    </div>
  );
};

export default ProjectsDetailes;
