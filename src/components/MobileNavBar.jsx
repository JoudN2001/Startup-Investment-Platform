// ICONS
import { LayoutDashboard, Settings, FolderTree } from "lucide-react";

// HOOKS
import { useState } from "react";

// PAGES LINKS
import { Link } from "react-router-dom";

export default function MobileNavBar({page = "dashboard"}) {
  const [selectedNav, setSelectedNav] = useState(page);
  return (
    <>
      {/* NAVIGATION BAR */}
      <nav
        className={
          "md:hidden fixed gap-2 px-4 bottom-0 pb-8 pt-4 bg-neutral/80 backdrop-blur-md w-full shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50"
        }
      >
        <div className={"flex justify-around "}>
          <Link
            to={"/"}
            onClick={() => {
              setSelectedNav("dashboard");
            }}
            className={
              selectedNav === "dashboard"
                ? "flex-1 flex flex-col justify-center items-center bg-primary  text-neutral py-2.5 px-4.5 rounded-xl transition-colors duration-500 ease-in-out"
                : "flex-1 flex flex-col justify-center items-center text-primary-600 py-2.5 px-4.5 "
            }
          >
            <LayoutDashboard className={"w-6 h-6 stroke-3 mb-1"} />
            <span className={"font-bold text-[12px] select-none"}>
              DASHBOARD
            </span>
          </Link>
          <Link
            to={"/projects"}
            onClick={() => {
              setSelectedNav("projects");
            }}
            className={
              selectedNav === "projects"
                ? "flex-1 flex flex-col justify-center items-center bg-primary  text-neutral py-2.5 px-4.5 rounded-xl transition-colors duration-500 ease-in-out"
                : "flex-1 flex flex-col justify-center items-center text-primary-600 py-2.5 px-4.5 "
            }
          >
            <FolderTree className={"w-6 h-6 stroke-3 mb-1"} />
            <span className={"font-bold text-[12px] select-none"}>
              PROJECTS
            </span>
          </Link>
          <Link
            to={"/setting"}
            onClick={() => {
              setSelectedNav("settings");
            }}
            className={
              selectedNav === "settings"
                ? "flex-1 flex flex-col justify-center items-center bg-primary  text-neutral py-2.5 px-4.5 rounded-xl transition-colors duration-500 ease-in-out"
                : "flex-1 flex flex-col justify-center items-center text-primary-600 py-2.5 px-4.5 "
            }
          >
            <Settings className={"w-6 h-6 stroke-3 mb-1"} />
            <span className={"font-bold text-[12px] select-none"}>
              SETTINGS
            </span>
          </Link>
        </div>
      </nav>
      {/* ===== NAVIGATION BAR ===== */}
    </>
  );
}
