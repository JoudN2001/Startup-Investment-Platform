// ICONS
import { Bell } from "lucide-react";

// PAGES LINKS
import { Link, useLocation } from "react-router-dom";

// NAV LINKS GROUP
import { getNavLinks } from "../config/navLinks";

export default function Header({ title, role }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const navLinks = getNavLinks(role)

  return (
    <header
      className={`flex ${role === "admin" ? "lg:hidden" : "lg:"} fixed w-full justify-between items-center py-3 px-4 lg:py-6 lg:px-8 bg-neutral shadow-[0_4px_10px_rgba(0,0,0,0.05)] z-50`}
    >
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
        <span className={"text-xl xl:text-2xl font-bold"}>{title}</span>
      </div>
      {/* ===== PROFILE & TITLE ===== */}
      {/* NAVIGATION DESCKTOP */}
      <nav className="hidden md:flex space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12 text-neutral-500 font-semibold">
        {navLinks.map((link) => {
          let isRoot = link.path === "/admin" || link.path === "/startup";
          let isActive = isRoot
            ? currentPath === link.path
            : currentPath.startsWith(link.path);
          return (
            <Link to={link.path} key={link.id}>
              <h1
                className={`hover:text-neutral-300 ${isActive ? "text-neutral-100" : ""} select-none lg:text-lg transition-all duration-300`}
              >
                {link.label.toUpperCase()}
              </h1>
            </Link>
          );
        })}
      </nav>
      {/* ===== NAVIGATION DESCKTOP ===== */}
      <Bell className={"md:hidden"} />
    </header>
  );
}
