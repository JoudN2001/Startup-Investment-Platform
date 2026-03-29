export default function ProgressBar({ percentageBar, percentage, title = "FUNDING GOAL" }) {
  return (
    <>
      <div className={"flex justify-between pt-4 pb-2.5 font-secondary"}>
        <h5 className={"text-xs font-bold tracking-widest"}>{title.toLocaleUpperCase()}</h5>
        <span className={"text-xs font-bold tracking-widest"}>{percentage}</span>
      </div>
      <div className={"w-full bg-neutral rounded-full h-1.5 mb-4 "}>
        <div
          className={
            "bg-linear-to-r from-tertiary-200 to-tertiary-600 h-1.5 rounded-full"
          }
          style={{ width: `${percentageBar}%` }}
        ></div>
      </div>
    </>
  );
}
