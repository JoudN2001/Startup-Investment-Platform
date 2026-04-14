// ICONS
import { LayoutDashboard, Settings, ListTodo } from "lucide-react";

// REACT ROUTER
import { Link, useLocation } from "react-router-dom";

const navLinks = [
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

const DesktopNavBar = ({ title }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <nav className="hidden lg:flex flex-col fixed left-7 top-24 h-dvh w-64 z-50">
      {/* DESKTOP NAVBAR TITLE */}
      <h2 className="font-semibold mb-5 tracking-widest">
        {title.toUpperCase()}
      </h2>
      {/* ===== DESKTOP NAVBAR TITLE ===== */}
      {/* DESKTOP NAVBAR LINK */}
      <ul className="flex flex-col justify-center gap-y-3 w-1/5">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = currentPath === link.path;
          return (
            <Link
              key={link.id}
              to={link.path}
              className={
                isActive
                  ? "flex-1 flex gap-5 justify-start items-center border-r-primary border-r-2 w-64 bg-neutral text-primary py-2.5 px-4.5 transition-colors duration-500 ease-in-out"
                  : "flex-1 flex gap-5 justify-start items-center text-neutral-500 w-64 py-2.5 px-4.5"
              }
            >
              <Icon className="w-6 h-6 stroke-2.5" />
              <span className="font-bold text-[12px] select-none">
                {link.label.toUpperCase()}
              </span>
            </Link>
          );
        })}
      </ul>
      {/* ===== DESKTOP NAVBAR LINK ===== */}
    </nav>
  );
};

export default DesktopNavBar;
