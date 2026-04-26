import Header from "../components/Header";
import HighlightedCard from "../components/HighlightedCard";
import MobileNavBar from "../components/MobileNavBar";
import ProjectMiniCard from "../components/ProjectMiniCard";
import ResponsiveContainer from "../components/ResponsiveContainer";
import SummaryCard from "../components/SummaryCard";
import DesktopAdminHeader from "../components/DesktopAdminHeader";
import DesktopNavBar from "../components/DesktopNavBar";

// REACT ROUTER
import { Link } from "react-router-dom";

// CONTEXTS
import { useProjects } from "../contexts/ProjectsContext";

// REACT
import { useMemo } from "react";

const AdminDashboard = () => {
  const { projects } = useProjects();

  // DYNAMIC DATA IN CARDS
  const totalPending = useMemo(() => {
    return projects.filter((p) => p.status === "pending").length;
  }, [projects]);

  const totalApproved = useMemo(() => {
    return projects.filter((p) => p.status === "published").length;
  }, [projects]);

  const { monthlyFundsRequested, fundsTrend } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    let currentMonthTotal = 0;
    let lastMonthTotal = 0;

    // Loop through projects exactly ONCE
    projects.forEach((p) => {
      if (!p.createdAt) return;
      const pDate = new Date(p.createdAt);
      const pMonth = pDate.getMonth();
      const pYear = pDate.getFullYear();

      if (pMonth === currentMonth && pYear === currentYear) {
        currentMonthTotal += p.goal;
      } else if (pMonth === lastMonth && pYear === lastMonthYear) {
        lastMonthTotal += p.goal;
      }
    });

    // Calculate Trend
    let trendString = "0.0% from last month";
    if (lastMonthTotal === 0) {
      trendString =
        currentMonthTotal > 0
          ? "+100.0% from last month"
          : "0.0% from last month";
    } else {
      const percentageChange =
        ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
      const sign = percentageChange >= 0 ? "+" : "";
      trendString = `${sign}${percentageChange.toFixed(1)}% from last month`;
    }

    // Return both values with their correct names
    return {
      monthlyFundsRequested: currentMonthTotal,
      fundsTrend: trendString,
    };
  }, [projects]);

  const formattedFundsRequested = useMemo(() => {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(monthlyFundsRequested);
  }, [monthlyFundsRequested]);

  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <Header title={"Admin Dashboard"} role={"admin"} />
      <DesktopAdminHeader />
      <DesktopNavBar title="investment portal" role="admin" />
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
            title="Monthly Funds Requested"
            value={formattedFundsRequested}
            trend={fundsTrend}
          />
          <div className={"grid grid-cols-2 gap-5"}>
            <SummaryCard title="total pending" value={totalPending} />
            <SummaryCard title="approved" value={totalApproved} />
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
            >
              VIEW ALL
            </Link>
          </div>
          {/* ===== SHOW ALL APPROVALS ===== */}

          {/* PROJECTS LIST MAX IS 6 */}
          <div className="flex flex-col gap-2 last:mb-36">
            {projects.map((p) => {
              const formattedGoal = new Intl.NumberFormat("en", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(Number(p.goal));
              const fundPercent =
                (Number(p.currentRaised) / Number(p.goal)) * 100 || 0;
              return (
                <ProjectMiniCard
                  key={p.id}
                  projectId={p.id}
                  title={p.title}
                  description={p.description}
                  status={p.status}
                  thumbnail={p.thumbnailUrl}
                  goal={formattedGoal}
                  funded={fundPercent}
                  role={"admin"}
                />
              );
            })}
          </div>
          {/* ===== PROJECTS LIST ===== */}
        </main>
      </ResponsiveContainer>
      <MobileNavBar role="admin" />
    </div>
  );
};

export default AdminDashboard;
