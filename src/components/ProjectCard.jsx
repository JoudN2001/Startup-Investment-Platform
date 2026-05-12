// COMPONENTS
import ProgressBar from "./ProgressBar";

// ICONS
import { ArrowRight } from "lucide-react";

// REACT ROUTER
import { Link } from "react-router-dom";

export default function ProjectCard({
  projectId,
  thumbnail,
  status = "published",
  title = "Architecture Office",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit alias illo dolorem.",
  goal = "$1,200,000",
  funded = 45,
  role,
}) {
  return (
    <div className={"bg-neutral rounded-2xl py-3 px-6 mt-6 md:mt-0 shadow-xs"}>
      {/* IMAGE & STATUS */}
      {thumbnail && (
        <div className={"relative w-full h-48 mb-4"}>
          <img
            className={"w-full h-full object-cover rounded-xl"}
            src={thumbnail}
            alt="Project Thumbnail"
          />
          <span className="absolute top-3 right-3 bg-neutral-900/60 text-neutral-400 backdrop-blur-xl py-1 px-2 text-xs font-semibold rounded-full">
            {status.toUpperCase()}
          </span>
        </div>
      )}
      {/* ===== IMAGE & STATUS ===== */}
      {/* TITEL & DESCREOPTION + PROGRESS BAR & DETAILS */}
      <div className="flex justify-between items-center">
        <h1 className={"text-3xl font-bold my-2 max-w-2/3 truncate"}>
          {title}
        </h1>
        {!thumbnail && (
          <span className="bg-neutral-900/60 text-neutral-400 backdrop-blur-xl py-1 px-2 text-xs font-semibold rounded-full">
            {status.toUpperCase()}
          </span>
        )}
      </div>
      <p className={"text-neutral-400 font-medium text-base/6 truncate"}>
        {description}
      </p>
      <ProgressBar percentageBar={funded} percentage={goal} />
      <hr className={"border-tertiary-900/75 border-x rounded-4xl my-1 "} />
      <div
        className={
          "flex justify-between items-center pt-2.5 pb-1.5 font-secondary"
        }
      >
        <span className={"text-neutral-500 font-semibold text-sm"}>
          {funded}% Fundend
        </span>
        <Link
          to={
            role === "admin"
              ? `/admin/approvals/project-details/${projectId}`
              : role === "startup"
                ? `/startup/projects/project-details/${projectId}`
                : `/investor/projects/project-details/${projectId}`
          }
          className={
            "flex items-center gap-1 font-extrabold hover:text-tertiary-600 transition-colors"
          }
        >
          View Details
          <ArrowRight className={"w-4 h-4 stroke-3"} />
        </Link>
      </div>
      {/* ===== TITEL & DESCREOPTION + PROGRESS BAR & DETAILS ===== */}
    </div>
  );
}
