import Header from "../components/Header";
import MobileNavBar from "../components/MobileNavBar";
import ResponsiveContainer from "../components/ResponsiveContainer";

const AdminDashboard = () => {
  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <Header title={"Admin Dashboard"} responsive={false} />
      <ResponsiveContainer></ResponsiveContainer>
      <MobileNavBar groupPage="admin" />{" "}
    </div>
  );
};

export default AdminDashboard;
