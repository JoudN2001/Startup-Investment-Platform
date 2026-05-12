// COMPONENTS
import MobileNavBar from "../components/MobileNavBar";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import SummaryCard from "../components/SummaryCard";
import HighlightedCard from "../components/HighlightedCard";
import ResponsiveContainer from "../components/ResponsiveContainer";
import FloatingAddButton from "../components/FloatingAddButton";

// ICONS
import { LayoutDashboard } from "lucide-react";
// PAGES LINKS
import { Link } from "react-router-dom";

// HOOKS
import { useProjects } from "../contexts/ProjectsContext";
import { useMemo } from "react";

export default function StartupDashboard() {
  const { projects } = useProjects();
  const projectsCards = projects
    .filter((p) => p.status === "published")
    .map((p) => {
      const formattedGoal = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(Number(p.goal));
      const fundPercent = (Number(p.currentRaised) / Number(p.goal)) * 100 || 0;
      return (
        <ProjectCard
          key={p.id}
          projectId={p.id}
          title={p.title}
          description={p.description}
          status={p.status}
          thumbnail={p.thumbnailUrl}
          goal={formattedGoal}
          funded={fundPercent}
          role={"investor"}
        />
      );
    });

  // DYNAMIC DATA
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
      trendString = `${sign}${percentageChange.toFixed(1)}%`;
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
      <Header title={"Investor Dashboard"} role={"investor"} />
      {/* MAIN CONTENT */}
      <ResponsiveContainer>
        <div className={"lg:flex lg:items-center lg:justify-between lg:mb-8  "}>
          {/* OVERVIEW */}
          <div>
            <span
              className={
                "text-neutral-700 font-medium text-xs lg:text-sm tracking-widest"
              }
            >
              OVERVIEW
            </span>
            <h1 className={"text-4xl font-bold my-2 lg:text-5xl"}>
              Naya Portfolio
            </h1>
            <p
              className={
                "text-neutral-400 font-semibold text-base lg:text-lg max-w-xl"
              }
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              alias illo dolorem, voluptatem asperiores obcaecati rerum voluptas
              dolores similique iste reprehenderit saepe, quasi voluptatibus,
              earum non! Aliquid tenetur deserunt incidunt!
            </p>
          </div>
          {/* ===== OVERVIEW ===== */}
        </div>
        {/* SUMMARY CARDS */}
        <HighlightedCard
          title="Monthly Funds Requested"
          value={formattedFundsRequested}
          trend={fundsTrend}
        />
        <div className={"flex flex-col md:grid md:grid-cols-2 md:gap-5"}>
          <SummaryCard title={"number of investments"} value={totalApproved} />
        </div>
        {/* ====== SUMMARY CARDAS ===== */}

        {/* PROJECTS CARDS */}
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-5 last:pb-36 md:last:pb-8 md:mt-8 ">
          {projectsCards}
        </div>
        {/* ===== PROJECTS CARDS ===== */}
      </ResponsiveContainer>
      {/* ====== MAIN CONTENT ===== */}
      <MobileNavBar role="investor" />
    </div>
  );
}
