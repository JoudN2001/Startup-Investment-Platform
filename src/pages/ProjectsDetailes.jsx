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
import Textarea from "../components/Textarea";

// REACT ROUTER
import { useParams } from "react-router-dom";

// CONTEXTS
import { useProjects } from "../contexts/ProjectsContext";

// ICONS
import { TextAlignStart, Check, X, SquarePen, History } from "lucide-react";

// REACT
import { useState } from "react";

// REACT ROUTER
import { useNavigate } from "react-router-dom";

// EXTERNAL LIBRARYS
import { v4 as uuidv4 } from "uuid";

const ProjectsDetailes = () => {
  const { projectId } = useParams();
  const { projects } = useProjects();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const selectedProject = projects.find((p) => p.id === projectId);

  // FORMATED DATA
  const formattedGoal = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(selectedProject.goal));
  const formattedMinInvest = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(selectedProject.minInvest));
  const fundPercent =
    selectedProject.currentRaised !== 0
      ? (Number(selectedProject.currentRaised) / Number(selectedProject.goal)) *
        100
      : false;
  const lastUpdate = selectedProject.updatedAt
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(selectedProject.updatedAt))
    : "Not updated yet";

  // HANDEL FORM EVENTS
  const handelOnSubmit = (e) => {
    e.preventDefault();
    const updatedProjects = projects.map((p) => {
      if (p.id === selectedProject.id)
        return {
          ...selectedProject,
          status: "approved",
          adminFeedback: feedback,
          updatedAt: new Date().toISOString(),
        };
      else return p;
    });
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    navigate("/admin/approvals");
  };
  const handelOnReject = () => {
    const updatedProjects = projects.map((p) => {
      if (p.id === selectedProject.id)
        return {
          ...selectedProject,
          status: "reject",
          adminFeedback: feedback,
          updatedAt: new Date().toISOString(),
        };
      else return p;
    });
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    navigate("/admin/approvals");
  };
  const handelOnRevision = () => {
    const updatedProjects = projects.map((p) => {
      if (p.id === selectedProject.id)
        return {
          ...selectedProject,
          adminFeedback: feedback,
          updatedAt: new Date().toISOString(),
        };
      else return p;
    });
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    navigate("/admin/approvals");
  };

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
              src={selectedProject.thumbnailUrl}
              alt={"Project thumbnail"}
              className={
                selectedProject.thumbnailUrl
                  ? "rounded-xl h-80 w-full object-cover shrink-0"
                  : "hidden"
              }
            />
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
            {/* TODO: some data must be <HighlightedCard />  */}
            <DetailsCard
              label={"finding goal"}
              goal={formattedGoal}
              funded={fundPercent}
            />
            {/* TODO: more data must cumming from form */}
            <DetailsCard
              label={"minimum investement"}
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
                {selectedProject.attachedFilesUrls.map((f) => {
                  return <FileCard key={uuidv4()} fileName={f} />;
                })}
              </div>
            </div>
            {/* ====== ATTACHED FILES ====== */}
            <div className="max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto w-full bg-neutral rounded-2xl py-2 sm:py-3 px-5 sm:px-7 mt-6 lg:mt-0 mb-5">
              <h1 className={`text-3xl font-bold my-2 pb-1 `}>
                Audit Decision
              </h1>
              <p className="mt-3 mb-5 text-neutral-600 font-bold text-sm font-secondary">
                Review all materials before making a final determination.
                Feedback will be visible to the project lead.
              </p>
              <form onSubmit={handelOnSubmit}>
                <Textarea
                  title="ADMIN NOTES & PUBLIC FEEDBACK"
                  description="Provide detailed reasons if rejecting or requesting revisions..."
                  hint="OPTIONAL"
                  bgColor="bg-neutral-950"
                  value={feedback}
                  onChange={(e) => {
                    setFeedback(e.target.value);
                  }}
                />
                <div className="flex flex-col gap-3 mb-4">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 text-neutral font-semibold bg-success py-2 mt-3 w-full rounded-lg"
                  >
                    <Check />
                    Approve Project
                  </button>
                  <div className="flex gap-2 justify-between w-full">
                    <button
                      type="button"
                      onClick={handelOnRevision}
                      className="flex flex-1 items-center justify-center gap-2 text-error font-semibold bg-neutral border-amber-500 border-2 py-2 px-2 rounded-lg"
                    >
                      <SquarePen />
                      Revision
                    </button>
                    <button
                      type="button"
                      onClick={handelOnReject}
                      className="flex flex-1 items-center justify-center gap-2 text-neutral font-semibold bg-error py-2 px-2 rounded-lg"
                    >
                      <X />
                      Reject
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <LastAction lastUpdate={lastUpdate} />
          </div>

          {/* DESKTOP AND TABLET DECISITION + FILES */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            <div className="my-7.5">
              <h1 className="text-md text-neutral-400 tracking-wide font-semibold mb-6">
                VERIFIED DOCUMENTATION
              </h1>
              <div className="flex flex-col gap-3">
                {selectedProject.attachedFilesUrls.map((f) => {
                  return <FileCard key={uuidv4()} fileName={f} />;
                })}
                <LastAction lastUpdate={lastUpdate} />
              </div>
            </div>
            {/* <AuditDecision /> */}
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
