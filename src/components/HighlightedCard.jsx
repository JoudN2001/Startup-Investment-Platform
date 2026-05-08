// ICON
import { ChartNoAxesCombined, Landmark } from "lucide-react";

const HighlightedCard = ({ title = "", value, trend }) => {
  return (
    <div className="relative overflow-hidden flex flex-col bg-primary rounded-2xl sm:rounded-5xl py-4 sm:py-5 px-5 sm:px-9 mt-6 lg:my-2">
      {/* CARD INFO */}
      <div className="z-10">
        <span className="text-neutral-700 font-bold text-[10px] sm:text-xs tracking-widest font-secondary">
          {title.toUpperCase()}
        </span>
        <h1 className="text-neutral text-4xl sm:text-5xl font-bold my-2 ">{value}</h1>
        <div className="flex items-center gap-2.5 max-w-max text-tertiary text-xs sm:text-sm font-semibold bg-tertiary-100 px-2.5 py-1 sm:px-3 sm:py-1.5 mt-3 rounded-xl">
          <ChartNoAxesCombined className="w-4 h-4 sm:w-5 sm:h-5 stroke-2" />
          <span>{trend}</span>
        </div>
      </div>
      {/* ===== CARD INFO ===== */}
      {/* BACKGROUND ICON */}
      <Landmark className="absolute z-0 -bottom-2 -right-4 w-28 h-auto sm:-bottom-2 sm:-right-7 sm:w-36 text-neutral-700 opacity-12" />
    </div>
  );
};

export default HighlightedCard;
