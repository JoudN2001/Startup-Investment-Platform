import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="flex fixed w-full justify-between items-center py-3 px-4 bg-neutral shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
      <div className={" flex items-center space-x-3"}>
        <div
          className={
            "flex justify-center items-center rounded-full w-11 h-11 bg-neutral-800"
          }
        >
          <span className={"font-semibold text-2xl"}>N</span>
        </div>
        <span className={"text-xl font-bold"}>Startup Dashboard</span>
      </div>
      <Bell className={"md:hidden"}/>
    </header>
  );
}
