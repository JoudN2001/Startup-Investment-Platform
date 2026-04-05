export default function SummarCard({ title = "title", value = 0 }) {
  // TODO : DYNAMIC NUMBERS AND COLORS FOR PERSENTAGE
  return (
    <div className={"bg-neutral-900/50 rounded-2xl py-3 px-7 mt-6 lg:mt-0"}>
      <span
        className={
          "text-neutral-400 font-bold text-xs tracking-widest font-secondary"
        }
      >
        {title.toUpperCase()}
      </span>
      <h1 className={`text-3xl font-bold my-2 `}>{value}</h1>
    </div>
  );
}
