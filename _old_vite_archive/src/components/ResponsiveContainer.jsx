export default function ResponsiveContainer({children}) {
  return (
    <div className="flex flex-col pt-28 lg:pt-32 xl:pt-36 px-6 w-full max-w-7xl mx-auto">{children}</div>
  );
}
