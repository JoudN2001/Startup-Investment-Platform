import Header from "../components/Header";
import HighlightedCard from "../components/HighlightedCard";
import MobileNavBar from "../components/MobileNavBar";
import ProjectMiniCard from "../components/ProjectMiniCard";
import ResponsiveContainer from "../components/ResponsiveContainer";
import SummarCard from "../components/SummaryCard";
import DesktopAdminHeader from "../components/DesktopAdminHeader";
import DesktopNavBar from "../components/DesktopNavBar";

import { Link } from "react-router-dom";
import { useProjects } from "../contexts/ProjectsContext";

const AdminDashboard = () => {
  const data = useProjects();
  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <Header title={"Admin Dashboard"} responsive={false} />
      <DesktopAdminHeader />
      <DesktopNavBar title="investment portal" />
      <ResponsiveContainer>
        <main className="lg:pl-72">
          {/* OVERVIEW */}
          <div className="lg:hidden">
            <h1 className="text-4xl font-bold my-2 lg:text-5xl">
              Naya Portfolio
            </h1>
            <p className="text-neutral-400 font-semibold text-base lg:text-lg max-w-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              alias illo dolorem.
            </p>
          </div>
          {/* ===== OVERVIEW ===== */}

          {/* SUMMARY */}
          <HighlightedCard
            title="total funds requested"
            value="$12.4M"
            trend="+14.2% from last month"
          />
          <div className={"grid grid-cols-2 gap-5"}>
            <SummarCard title="total pending" value={28} />
            <SummarCard title="approvaed" value={156} />
          </div>
          {/* ===== SUMMARY ===== */}

          {/* SHOW ALL APPROVALS */}
          <div className="flex items-center justify-between mt-8 mb-5">
            <h1 className="font-bold max-[360px]:text-xl text-2xl ">
              Active Pipeline
            </h1>
            <Link
              to="/admin/approvals"
              className="max-[360px]:text-sm text-base font-semibold tracking-widest text-tertiary"
              onClick={console.log("333")}
            >
              VIEW ALL
            </Link>
          </div>
          {/* ===== SHOW ALL APPROVALS ===== */}

          {/* PROJECTS LIST MAX IS 6 */}
          <div className="flex flex-col gap-2 last:mb-36">
            {data.map((p) => {
              if (p.id <= 6) {
                return (
                  <ProjectMiniCard
                    key={p.id}
                    thumbnail={p.thumbnail}
                    status={p.status}
                    title={p.title}
                    description={p.description}
                    goal={p.goal}
                    funded={p.funded}
                  />
                );
              }
            })}
          </div>
          {/* ===== PROJECTS LIST ===== */}
        </main>
      </ResponsiveContainer>
      <MobileNavBar groupPage="admin" />
    </div>
  );
};

export default AdminDashboard;
