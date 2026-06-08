// TYPES
interface DetailsCardProps {
  label: string;
  description?: string;
  formattedGoal: string;
  fundedPercentage?: number | boolean;
}
export default function DetailsCard({
  label,
  description,
  formattedGoal,
  fundedPercentage,
}: DetailsCardProps) {
  return (
    <div className="bg-neutral rounded-2xl py-2 sm:py-3 px-5 sm:px-7 mt-6 lg:mt-0">
      <span className="flex mt-3.5 text-neutral-600 font-bold text-xs tracking-widest font-secondary">
        {label.toUpperCase()}
      </span>
      <h1 className={`text-3xl font-bold my-2 pb-2`}>{formattedGoal}</h1>
      {fundedPercentage && (
        <div
          className={`${fundedPercentage !== 0 ? "block" : "hidden"} w-full bg-neutral-900 rounded-full h-1.5 mb-2`}
        >
          <div
            className="bg-linear-to-r from-tertiary-200 to-tertiary-600 h-1.5 rounded-full max-w-full"
            style={{ width: `${fundedPercentage}%` }}
          ></div>
        </div>
      )}
      <p className="text-xs text-neutral-400 font-semibold mb-3 font-secondary">
        {fundedPercentage
          ? `${fundedPercentage}% committed by anchor partners`
          : `${description}`}
      </p>
    </div>
  );
}
