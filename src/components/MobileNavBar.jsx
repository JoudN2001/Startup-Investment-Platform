// ICONS
import { LayoutDashboard, Settings, FolderTree, ListTodo } from "lucide-react";

// REACT ROUTER
import { Link, useLocation } from "react-router-dom";

export default function MobileNavBar({ role }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // NAV LINKS GROUP
  let navLinks = [];
  switch (role) {
    case "startup":
      navLinks = [
        {
          id: "dashboard",
          label: "dashboard",
          icon: LayoutDashboard,
          path: "/startup",
        },
        {
          id: "projects",
          label: "projects",
          icon: FolderTree,
          path: "/startup/projects",
        },
        {
          id: "settings",
          label: "settings",
          icon: Settings,
          path: "/startup/settings",
        },
      ];
      break;
    case "admin":
      navLinks = [
        {
          id: "dashboard",
          label: "overview",
          icon: LayoutDashboard,
          path: "/admin",
        },
        {
          id: "approvals",
          label: "approvals",
          icon: ListTodo,
          path: "/admin/approvals",
        },
        {
          id: "settings",
          label: "settings",
          icon: Settings,
          path: "/admin/settings",
        },
      ];
      break;
    default:
      navLinks = [];
  }

  return (
    // NAVIGATION BAR
    <nav
      className={
        "md:hidden fixed gap-2 px-4 bottom-0 pb-8 pt-4 bg-neutral/80 backdrop-blur-md w-full shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50"
      }
    >
      <div className={"flex justify-around "}>
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isRoot = link.path === "/admin" || link.path === "/startup";
          const isActive = isRoot
            ? currentPath === link.path
            : currentPath.startsWith(link.path);
          return (
            <Link
              key={link.id}
              to={link.path}
              className={
                isActive
                  ? "flex-1 flex flex-col justify-center items-center bg-primary text-neutral py-2.5 px-4.5 rounded-xl transition-colors duration-500 ease-in-out"
                  : "flex-1 flex flex-col justify-center items-center text-primary-600 py-2.5 px-4.5"
              }
            >
              <Icon className="w-6 h-6 stroke-3 mb-1" />
              <span className="font-bold text-[12px] select-none">
                {link.label.toUpperCase()}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
