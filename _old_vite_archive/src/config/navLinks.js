// ICONS
import { LayoutDashboard, Settings, FolderTree, ListTodo } from "lucide-react";

const getNavLinks = (role) => {
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
    case "investor":
      navLinks = [
        {
          id: "dashboard",
          label: "dashboard",
          icon: LayoutDashboard,
          path: "/investor",
        },
        {
          id: "projects",
          label: "projects",
          icon: FolderTree,
          path: "/investor/projects",
        },
        {
          id: "settings",
          label: "settings",
          icon: Settings,
          path: "/investor/settings",
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
  return navLinks
};

export { getNavLinks };
