// ICONS
import { Bell, Search } from "lucide-react";

const DesktopAdminHeader = () => (
  <header className="hidden lg:flex top-0 left-0 justify-between fixed w-full px-7 py-5">
    <h1 className="text-4xl font-semibold">Naya</h1>
    {/* RIGHT ICONS GROUP */}
    <div className="flex items-center gap-5">
      <Search className="w-6 h-6 stroke-2" />
      <Bell className="w-6 h-6 stroke-2" />
      <div className="flex justify-center items-center rounded-full w-10 h-10 bg-neutral-800">
        <span className="font-semibold text-xl select-none">N</span>
      </div>
    </div>
    {/* ===== RIGHT ICONS GROUP ===== */}
  </header>
);

export default DesktopAdminHeader;
