// COMPONENTS
import ProgressBar from "./ProgressBar";

// ICONS
import { ArrowRight } from "lucide-react";

// REACT ROUTER
import { Link, useParams } from "react-router-dom";

export default function ProjectCard({
  thumbnail = "https://hips.hearstapps.com/hmg-prod/images/edc100123egan-002-6500742f5feb7.jpg?crop=0.9136xw:1xh;center,top&resize=1200:*",
  status = "published",
  title = "Architecture Office",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit alias illo dolorem.",
  goal = "$1,200,000",
  funded = 45,
}) {
  // TODO: DYNAMIC LINK FOR DETAILS OF EACH PROJECT
  const { projectId } = useParams();
  return (
    <div className={"bg-neutral rounded-2xl py-3 px-6 mt-6 md:mt-0 shadow-xs"}>
      {/* IMAGE & STATUS */}
      <div className={"relative w-full h-48 mb-4"}>
        <img
          className={"w-full h-full object-cover rounded-xl"}
          src={thumbnail}
          alt="Project Thumbnail"
        />
        <span
          className={
            "absolute top-3 right-3 bg-neutral-900/60 text-neutral-400 backdrop-blur-xl py-1 px-2 text-xs font-semibold rounded-full"
          }
        >
          {/* TODO: STATUS CIRCLE AND OTHER STATUS (DONE, PENDDING, REJECTED, ETC...) */}
          {status.toUpperCase()}
        </span>
      </div>
      {/* ===== IMAGE & STATUS ===== */}
      {/* TITEL & DESCREOPTION + PROGRESS BAR & DETAILS */}
      <h1 className={"text-3xl font-bold my-2"}>{title}</h1>
      <p className={"text-neutral-400 font-medium text-base/6"}>
        {description}
      </p>
      <ProgressBar percentageBar={funded} percentage={goal} />
      <hr className={"border-tertiary-900/75 border-x rounded-4xl my-1 "} />
      <div
        className={
          "flex justify-between items-center pt-0.5 pb-1.5 font-secondary"
        }
      >
        <span className={"text-neutral-500 font-semibold text-sm"}>
          {funded}% Fundend
        </span>
        <Link
          to={"/project-details/:projectId"}
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
