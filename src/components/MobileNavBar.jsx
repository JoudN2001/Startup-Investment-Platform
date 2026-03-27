import { LayoutDashboard, Settings, FolderTree, Plus } from "lucide-react";
import { useState } from "react";

export default function MobileNavBar() {
  const [selectedNav, setSelectedNav] = useState("dashboard");
  return (
    <>
      {/* NAVIGATION BAR */}
      <nav
        className={
          "md:hidden fixed  bottom-0 pb-8 pt-4 bg-neutral/80 backdrop-blur-md w-full shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50"
        }
      >
        <div className={"flex justify-around "}>
          <div
            onClick={() => {
              setSelectedNav("dashboard");
            }}
            className={
              selectedNav === "dashboard"
                ? "flex flex-col justify-center items-center bg-primary min-w-2/7 text-neutral py-2.5 px-4.5 rounded-xl transition-colors duration-500 ease-in-out"
                : "flex flex-col justify-center items-center text-primary-600 py-2.5 px-4.5 min-w-2/7"
            }
          >
            <LayoutDashboard className={"w-6 h-6 stroke-3 mb-1"} />
            <span className={"font-bold text-[12px] select-none"}>
              DASHBOARD
            </span>
          </div>
          <div
            onClick={() => {
              setSelectedNav("projects");
            }}
            className={
              selectedNav === "projects"
                ? "flex flex-col justify-center items-center bg-primary min-w-2/7 text-neutral py-2.5 px-4.5 rounded-xl transition-colors duration-500 ease-in-out"
                : "flex flex-col justify-center items-center text-primary-600 py-2.5 px-4.5 min-w-2/7"
            }
          >
            <FolderTree className={"w-6 h-6 stroke-3 mb-1"} />
            <span className={"font-bold text-[12px] select-none"}>
              PROJECTS
            </span>
          </div>
          <div
            onClick={() => {
              setSelectedNav("settings");
            }}
            className={
              selectedNav === "settings"
                ? "flex flex-col justify-center items-center bg-primary min-w-2/7 text-neutral py-2.5 px-4.5 rounded-xl transition-colors duration-500 ease-in-out"
                : "flex flex-col justify-center items-center text-primary-600 py-2.5 px-4.5 min-w-2/7"
            }
          >
            <Settings className={"w-6 h-6 stroke-3 mb-1"} />
            <span className={"font-bold text-[12px] select-none"}>
              SETTINGS
            </span>
          </div>
        </div>
      </nav>
      {/* ===== NAVIGATION BAR ===== */}

      {/* ADD NEW PROJECT BUTTON  */}
      <button className="fixed md:hidden bottom-35 right-5 bg-primary text-neutral rounded-full p-4 active:bg-secondary-200 z-50">
        <Plus
          className={" text-neutral rounded-full w-8 h-8 stroke-3 "}
        />
      </button>
      {/* ===== ADD NEW PROJECT BUTTON  ===== */}
    </>
  );
}
