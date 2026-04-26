// COMPONENTS
import Header from "../components/Header";
import MobileNavBar from "../components/MobileNavBar";
import DesktopAdminHeader from "../components/DesktopAdminHeader";
import DesktopNavBar from "../components/DesktopNavBar";
import ResponsiveContainer from "../components/ResponsiveContainer";
import DetailsCard from "../components/DetailsCard";
import FileCard from "../components/FileCard";
import LastAction from "../components/LastAction";
import AuditDecision from "../components/AuditDecision";
import NotFound404 from "./NotFound404";

// REACT ROUTER
import { useParams, useNavigate } from "react-router-dom";

// CONTEXTS
import { useProjects } from "../contexts/ProjectsContext";

// ICONS
import { TextAlignStart } from "lucide-react";

// REACT
import { useState } from "react";

// CHECK ERROR ON LOCAL STORAGE
import { saveProjectsToStorage } from "../utils/storage";

const ProjectDetails = ({ role }) => {
  const { projectId } = useParams();
  const { projects, setProjects } = useProjects();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const selectedProject = projects.find((p) => p.id === projectId);

  // FORMATED DATA
  let formattedGoal, formattedMinInvest, fundPercent, lastUpdate;
  if (selectedProject) {
    formattedGoal = new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(selectedProject.goal));

    formattedMinInvest = new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(selectedProject.minInvest));

    fundPercent =
      selectedProject.currentRaised !== 0
        ? (Number(selectedProject.currentRaised) /
            Number(selectedProject.goal)) *
          100
        : false;

    lastUpdate = selectedProject.updatedAt
      ? new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(selectedProject.updatedAt))
      : "Not updated yet";
  }

  // HANDLE FORM EVENTS
  const handleDecision = (newStatus) => {
    const updatedProjects = projects.map((p) => {
      if (p.id === selectedProject.id)
        return {
          ...p,
          status: newStatus,
          adminFeedback: feedback,
          updatedAt: new Date().toISOString(),
        };
      else return p;
    });
    const isSaved = saveProjectsToStorage(updatedProjects);
    if (isSaved) {
      setProjects(updatedProjects);
      navigate("/admin/approvals");
    }
  };

  return selectedProject ? (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <Header title={"Project Details"} role={role} />
      {role === "admin" && <DesktopAdminHeader />}
      {role === "admin" && (
        <DesktopNavBar title="investment portal" role={role} />
      )}
      <ResponsiveContainer>
        {/* PROJECTS DETAILS */}
        <main className={`${role === "admin" ? "lg:pl-72" : ""}`}>
          {/* IMAGE + TITLE */}
          <div className="flex relative max-h-1/6">
            {selectedProject.thumbnailUrl && (
              <img
                src={selectedProject.thumbnailUrl}
                alt={"Project thumbnail"}
                className={
                  selectedProject.thumbnailUrl
                    ? "rounded-xl h-80 w-full object-cover shrink-0"
                    : "hidden"
                }
              />
            )}
            <div className="flex justify-between items-center absolute right-1 md:right-3 lg:right-4 top-3 md:top-4 lg:top-5">
              <span className="shrink-0 bg-neutral-900/60 text-neutral-400 backdrop-blur-xl max-[360px]:py-1.5 py-2.5 max-[360px]:px-3 px-3.5 text-xs font-semibold rounded-full">
                {selectedProject.status.toUpperCase()}
              </span>
            </div>
            <h1
              className={
                selectedProject.thumbnailUrl
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
            {/* EXTRA FEAT: some data must be <HighlightedCard />  */}
            <DetailsCard
              label={"funding goal"}
              goal={formattedGoal}
              funded={fundPercent}
            />
            <DetailsCard
              label={"minimum investment"}
              goal={formattedMinInvest}
              description="Designed for institutional and accredited high-net-worth individuals."
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
                {selectedProject.attachedFilesUrls.map((f, index) => {
                  return <FileCard key={index} fileName={f} />;
                })}
              </div>
            </div>
            {/* ====== ATTACHED FILES ====== */}

            {/* AUDIT DECISION FORM */}
            <AuditDecision
              role={role}
              handleDecision={handleDecision}
              selectedProject={selectedProject}
              feedback={feedback}
              setFeedback={setFeedback}
            />
            {/* ===== AUDIT DECISION FORM ===== */}

            <LastAction lastUpdate={lastUpdate} />
          </div>

          {/* DESKTOP AND TABLET DECISITION + FILES */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            <div className="my-7.5">
              <h1 className="text-md text-neutral-400 tracking-wide font-semibold mb-6">
                VERIFIED DOCUMENTATION
              </h1>
              <div className="flex flex-col gap-3">
                {selectedProject.attachedFilesUrls.map((f, index) => {
                  return <FileCard key={index} fileName={f} />;
                })}
                <LastAction lastUpdate={lastUpdate} />
              </div>
            </div>
            {/* AUDIT DECISION FORM */}
            <AuditDecision
              role={role}
              handleDecision={handleDecision}
              selectedProject={selectedProject}
              feedback={feedback}
              setFeedback={setFeedback}
            />
            {/* ===== AUDIT DECISION FORM ===== */}
          </div>
          {/* ===== DESKTOP AND TABLET DECISITION + FILES ===== */}
        </main>
        {/* ===== PROJECTS DETAILS ===== */}
      </ResponsiveContainer>
      <MobileNavBar role={role} />
    </div>
  ) : (
    <NotFound404 role={role} />
  );
};

export default ProjectDetails;
