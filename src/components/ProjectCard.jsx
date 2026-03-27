import { ArrowRight } from "lucide-react";

export default function ProjectCard({
  thumbnail = "https://hips.hearstapps.com/hmg-prod/images/edc100123egan-002-6500742f5feb7.jpg?crop=0.9136xw:1xh;center,top&resize=1200:*",
  status = "published",
  title = "Architecture Office",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit alias illo dolorem.",
  goal = "$1,200,000",
  funded = 45,
}) {
  return (
    <div className={"bg-neutral rounded-2xl py-3 px-6 mt-6 md:mt-0"}>
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
      <div className={"flex justify-between pt-4 pb-2.5 font-secondary"}>
        <h5 className={"text-xs font-bold tracking-widest"}>FUNDING GOAL</h5>
        <span className={"text-xs font-bold tracking-widest"}>{goal}</span>
      </div>
      <div className={"w-full bg-neutral rounded-full h-1.5 mb-4 "}>
        <div
          className={
            "bg-linear-to-r from-tertiary-200 to-tertiary-600 h-1.5 rounded-full"
          }
          style={{ width: `${funded}%` }}
        ></div>
      </div>
      <hr className={"border-tertiary-900/75 border-x rounded-4xl my-1 "} />
      <div
        className={
          "flex justify-between items-center pt-0.5 pb-1.5 font-secondary"
        }
      >
        <span className={"text-neutral-500 font-semibold text-sm"}>
          {funded}% Fundend
        </span>
        <button
          className={
            "flex items-center gap-1 font-extrabold hover:text-tertiary-600 transition-colors"
          }
        >
          View Details
          <ArrowRight className={"w-4 h-4 stroke-3"} />
        </button>
      </div>
      {/* ===== TITEL & DESCREOPTION + PROGRESS BAR & DETAILS ===== */}
    </div>
  );
}
