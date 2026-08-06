// ICONS
import { Bell, Search } from "lucide-react";

// COMPONENTS
import LinkButton from "@/components/ui/LinkButton";

interface DesktopAdminHeaderProps {
  userName: string;
}

export default function DesktopAdminHeader({
  userName,
}: DesktopAdminHeaderProps) {
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "N";

  return (
    <header className="hidden lg:flex top-0 left-0 justify-between fixed w-full px-7 py-5 z-40">
      <LinkButton href="/admin">
        <h1 className="text-4xl font-semibold select-none cursor-pointer">
          Naya
        </h1>
      </LinkButton>
      {/* RIGHT ICONS GROUP */}
      <div className="flex items-center gap-5">
        <Search className="w-6 h-6 stroke-2 cursor-pointer" />
        <Bell className="w-6 h-6 stroke-2 cursor-pointer" />
        <div className="flex justify-center items-center rounded-full w-10 h-10 bg-neutral-800">
          <span className="font-semibold text-xl select-none">
            {firstLetter}
          </span>
        </div>
      </div>
      {/* ===== RIGHT ICONS GROUP ===== */}
    </header>
  );
}
