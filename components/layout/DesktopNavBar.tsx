"use client";

// COMPONENTS
import LinkButton from "../ui/LinkButton";

// ROUTERS
import { usePathname } from "next/navigation";

// REACT
import { useMemo } from "react";

// NAV LINKS
import { getNavLinks } from "@/config/navLinks";

interface DesktopNavBarProps {
  title: string;
  role: string;
}

export default function DesktopNavBar({ title, role }: DesktopNavBarProps) {
  const pathname = usePathname();
  const navLinks = useMemo(() => {
    return getNavLinks(role);
  }, [role]);
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
          const isRoot = link.path === "/admin" || link.path === "/startup";
          const isActive = isRoot
            ? pathname === link.path
            : pathname.startsWith(link.path);
          return (
            <LinkButton
              key={link.id}
              href={link.path}
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
            </LinkButton>
          );
        })}
      </ul>
      {/* ===== DESKTOP NAVBAR LINK ===== */}
    </nav>
  );
}
