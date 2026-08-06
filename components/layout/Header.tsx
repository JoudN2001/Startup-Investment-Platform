"use client";

// COMPONENTS
import LinkButton from "../ui/LinkButton";

// ICONS
import { Bell } from "lucide-react";

// ROUTERS
import { usePathname } from "next/navigation";

// REACT
import { useMemo } from "react";

// NAV LINKS GROUP
import { getNavLinks } from "@/config/navLinks";

interface HeaderProps {
  userName: string;
  role: string;
}

export default function Header({ userName, role }: HeaderProps) {
  const pathname = usePathname();

  const navLinks = useMemo(() => {
    return getNavLinks(role);
  }, [role]);

  const firstName = userName ? userName.split(" ")[0] : "User";

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "U";

  return (
    <header
      className={`flex ${role === "admin" ? "lg:hidden" : "lg:"} fixed w-full justify-between items-center py-3 px-4 lg:py-6 lg:px-8 bg-neutral shadow-[0_4px_10px_rgba(0,0,0,0.05)] z-50`}
    >
      {/* PROFILE & TITLE */}
      <div className={" flex items-center space-x-3"}>
        <div className="flex justify-center items-center rounded-full w-11 h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-neutral-800">
          <span className={"font-semibold text-2xl xl:text-3xl select-none"}>
            {firstLetter}
          </span>
        </div>

        <LinkButton
          href={
            role === "admin"
              ? "/admin"
              : role === "startup"
                ? "/startup"
                : role === "investor" 
                  ? "/investor"
                  : "/"
          }
        >
          <span
            className={
              "text-xl xl:text-2xl font-bold select-none cursor-pointer"
            }
          >
            Hi, {firstName}
          </span>
        </LinkButton>
      </div>
      {/* ===== PROFILE & TITLE ===== */}

      {/* NAVIGATION DESCKTOP */}
      <nav className="hidden md:flex space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12 text-neutral-500 font-semibold">
        {navLinks.map((link) => {
          let isRoot =
            link.path === "/admin" ||
            link.path === "/startup" ||
            link.path === "/investor";
          let isActive = isRoot
            ? pathname === link.path
            : pathname.startsWith(link.path);
          return (
            <LinkButton href={link.path} key={link.id}>
              <h1
                className={`hover:text-neutral-300 ${isActive ? "text-neutral-100" : ""} select-none lg:text-lg transition-all duration-300`}
              >
                {link.label.toUpperCase()}
              </h1>
            </LinkButton>
          );
        })}
      </nav>
      {/* ===== NAVIGATION DESCKTOP ===== */}
      <Bell className={"md:hidden"} />
    </header>
  );
}
