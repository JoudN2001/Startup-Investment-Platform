// COMPONENTS
import MobileNavBar from "../components/MobileNavBar";
import Header from "../components/Header";
import ResponsiveContainer from "../components/ResponsiveContainer";
import DesktopAdminHeader from "../components/DesktopAdminHeader";
import DesktopNavBar from "../components/DesktopNavBar";

const AdminSetting = () => {
  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <Header title={"Admin Dashboard"} role={"admin"} />
      <DesktopAdminHeader />
      <DesktopNavBar title="investment portal"/>
      {/* MAIN CONTENT */}
      <ResponsiveContainer></ResponsiveContainer>
      {/* ====== MAIN CONTENT ===== */}
      <MobileNavBar role="admin" />
    </div>
  );
};

export default AdminSetting;
