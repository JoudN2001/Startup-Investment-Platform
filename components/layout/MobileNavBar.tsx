"use client";

// COMPONENTS
import LinkButton from "../ui/LinkButton";

// ROUTERS
import { usePathname } from "next/navigation";

// REACT
import { useMemo } from "react";

// NAV LINKS GROUP
import { getNavLinks } from "@/config/navLinks";

export default function MobileNavBar({ role }: { role: string }) {
  const pathname = usePathname();
  const navLinks = useMemo(() => {
    return getNavLinks(role);
  }, [role]);

  return (
    // NAVIGATION BAR
    <nav className="md:hidden fixed gap-2 px-4 bottom-0 pb-8 pt-4 bg-neutral/80 backdrop-blur-md w-full shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
      <div className={"flex justify-around "}>
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isRoot =
            link.path === "/admin" ||
            link.path === "/startup" ||
            link.path === "/investor";
          const isActive = isRoot
            ? pathname === link.path
            : pathname.startsWith(link.path);
          return (
            <LinkButton
              key={link.id}
              href={link.path}
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
            </LinkButton>
          );
        })}
      </div>
    </nav>
  );
}
