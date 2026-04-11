// COMPONENTS
import MobileNavBar from "../components/MobileNavBar";
import Header from "../components/Header";
import ResponsiveContainer from "../components/ResponsiveContainer";

const AdminSetting = () => {
  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <Header title={"Admin Dashboard"} responsive={false}/>
      {/* MAIN CONTENT */}
      <ResponsiveContainer></ResponsiveContainer>
      {/* ====== MAIN CONTENT ===== */}
      <MobileNavBar groupPage="admin" />
    </div>
  );
};

export default AdminSetting;
