import ProjectCard from "@/components/ui/ProjectCard";
import SummaryCard from "@/components/ui/SummaryCard";
import HighlightedCard from "@/components/ui/HighlightedCard";

import { fetchProjects } from "@/dal/projects";

export default async function InvestorDashboard() {
  const projects = await fetchProjects();

  const publishedProjects = projects.filter((p) => p.status === "published");

  const projectsCards = publishedProjects.map((p) => {
    const formattedGoal = new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(p.goal));
    
    const fundPercent =
      Math.round((Number(p.currentRaised) / Number(p.goal)) * 100) || 0;
      
    return (
      <ProjectCard
        key={p.projectId}       
        projectId={p.projectId}
        title={p.title}
        description={p.description}
        status={p.status}
        thumbnailUrl={p.thumbnailUrl}
        formattedGoal={formattedGoal}
        fundedPercentage={fundPercent}
        role={"investor"}
      />
    );
  });

  // DYNAMIC DATA CALCULATIONS
  const totalApproved = publishedProjects.length;

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
      currentMonthTotal += Number(p.goal);
    } else if (pMonth === lastMonth && pYear === lastMonthYear) {
      lastMonthTotal += Number(p.goal);
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

  const monthlyFundsRequested = currentMonthTotal;
  const fundsTrend = trendString;

  const formattedFundsRequested = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(monthlyFundsRequested);

  return (
    <>
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
            Portfolio
          </h1>
          <p className="text-neutral-400 font-semibold text-base lg:text-lg max-w-xl">
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
    </>
  );
}