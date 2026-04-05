// COMPONENTS
import MobileNavBar from "../components/MobileNavBar";
import Header from "../components/Header";
import ResponsiveContainer from "../components/ResponsiveContainer";

export default function StartupSetting() {
  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <Header page="settings" />
      {/* MAIN CONTENT */}
      <ResponsiveContainer></ResponsiveContainer>
      {/* ====== MAIN CONTENT ===== */}
      <MobileNavBar page="settings" />
    </div>
  );
}
