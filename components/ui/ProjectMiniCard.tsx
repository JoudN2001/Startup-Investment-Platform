// PROPS TYPES
interface ProjectMiniCardProps {
  projectId: string;
  thumbnailUrl?: string;
  status: string;
  title: string;
  formattedGoal: string;
  fundedPercentage: number;
}

export default function ProjectMiniCard({
  thumbnailUrl,
  status,
  title,
  formattedGoal,
  fundedPercentage,
}: ProjectMiniCardProps) {
  return (
    <div className="flex bg-neutral max-[360px]:rounded-xl rounded-2xl p-3 max-[360px]:mt-2 mt-3 md:mt-0 shadow-xs">
      {/* IMAGE */}
      {thumbnailUrl && (
        <div className="max-[360px]:hidden shrink-0 w-20 h-20 p-3 pl-1">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={thumbnailUrl}
            alt="Project Thumbnail"
          />
        </div>
      )}
      {/* ===== IMAGE ===== */}

      <div className="flex-1 min-w-0 mr-4">
        {/* TITLE & STATUS */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg truncate max-w-2/3 font-bold my-2">{title}</h1>
          <span className="shrink-0 bg-neutral-900/60 text-neutral-400 backdrop-blur-xl max-[360px]:py-0.5 py-1 max-[360px]:px-1 px-1.5 text-[10px] font-semibold rounded-full">
            {status.toUpperCase()}
          </span>
        </div>
        {/* ===== TITLE & STATUS ===== */}

        {/* PROGRESS BAR & FUND TARGET */}
        <div className="w-full bg-neutral rounded-full max-[360px]:h-1 h-1.5 max-[360px]:mb-3 mb-4 mt-0.5 ">
          <div
            className="bg-linear-to-r from-tertiary-200 to-tertiary-600 max-[360px]:h-1 h-1.5 rounded-full max-w-full"
            style={{ width: `${fundedPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between font-secondary max-[360px]:text-[11px] text-xs font-bold">
          <h5 className="text-neutral-400">{`Target: ${formattedGoal}`}</h5>
          <span>{`${fundedPercentage}% Funded`}</span>
        </div>
        {/* ===== PROGRESS BAR & FUND TARGET ===== */}
      </div>
    </div>
  );
}
