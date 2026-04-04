// HOOKS
import { useState } from "react";

// ICONS
import { Bell } from "lucide-react";

// PAGES LINKS
import { Link } from "react-router-dom";

export default function Header({page = "dashboard"}) {
  const [selectedNav, setSelectedNav] = useState(page);
  return (
    <header className="flex fixed w-full justify-between items-center py-3 px-4 lg:py-6 lg:px-8 bg-neutral shadow-[0_4px_10px_rgba(0,0,0,0.05)] z-50">
      {/* PROFILE & TITLE */}
      <div className={" flex items-center space-x-3"}>
        <div
          className={
            "flex justify-center items-center rounded-full w-11 h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-neutral-800"
          }
        >
          <span className={"font-semibold text-2xl xl:text-3xl select-none"}>
            N
          </span>
        </div>
        <span className={"text-xl xl:text-2xl font-bold"}>
          Startup Dashboard
        </span>
      </div>
      {/* ===== PROFILE & TITLE ===== */}
      {/* NAVIGATION DESCKTOP */}
      <nav
        className={
          "hidden md:flex space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12 text-neutral-500 font-semibold"
        }
      >
        <Link to={"/"}>
          <h1
            onClick={() => {
              setSelectedNav("dashboard");
            }}
            className={`hover:text-neutral-300 ${selectedNav === "dashboard" ? "text-neutral-100" : ""} select-none lg:text-lg transition-all duration-300`}
          >
            DASHBOARD
          </h1>
        </Link>
        <Link to={"/projects"}>
          <h1
            onClick={() => {
              setSelectedNav("projects");
            }}
            className={`hover:text-neutral-300 ${selectedNav === "projects" ? "text-neutral-100" : ""} select-none lg:text-lg transition-all duration-300`}
          >
            PROJECTS
          </h1>
        </Link>
        <Link to={"/setting"}>
          <h1
            onClick={() => {
              setSelectedNav("setting");
            }}
            className={`hover:text-neutral-300 ${selectedNav === "setting" ? "text-neutral-100" : ""} select-none lg:text-lg transition-all duration-300`}
          >
            SETTINGS
          </h1>
        </Link>
      </nav>
      {/* ===== NAVIGATION DESCKTOP ===== */}
      <Bell className={"md:hidden"} />
    </header>
  );
}
