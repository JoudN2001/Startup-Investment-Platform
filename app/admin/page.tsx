import HighlightedCard from "@/components/ui/HighlightedCard";
import ProjectMiniCard from "@/components/ui/ProjectMiniCard";
import SummaryCard from "@/components/ui/SummaryCard";
import LinkButton from "@/components/ui/LinkButton";

import { fetchProjects } from "@/dal/projects";

// الدالة الآن async لتتمكن من استخدام await لجلب البيانات
export default async function AdminDashboard() {
  // جلب البيانات من قاعدة البيانات عبر الـ DAL
  const projects = await fetchProjects();

  // DYNAMIC DATA IN CARDS - حساب البيانات مباشرة دون استخدام useMemo

  const totalPending = projects.filter((p) => p.status === "pending").length;
  const totalApproved = projects.filter((p) => p.status === "published").length;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  let currentMonthTotal = 0;
  let lastMonthTotal = 0;

  // Loop through projects exactly ONCE
  projects.forEach((p) => {
    // يجب الانتباه أن أسماء الحقول يجب أن تطابق أسماءها في قاعدة البيانات
    // مثلاً، إذا كان الحقل في DB هو 'created_at'، يجب تغييره هنا.
    // افترضنا هنا أن الحقل يسمى 'created_at' في قاعدة بيانات Supabase.
    if (!p.created_at) return;
    const pDate = new Date(p.created_at);
    const pMonth = pDate.getMonth();
    const pYear = pDate.getFullYear();

    // تأكد من تطابق اسم حقل الهدف (goal) مع قاعدة البيانات.
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
    trendString = `${sign}${percentageChange.toFixed(1)}% from last month`;
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
    <main className="lg:pl-72">
      {/* OVERVIEW */}
      <div className="lg:hidden">
        <h1 className="text-4xl font-bold my-2 lg:text-5xl">Portfolio</h1>
        <p className="text-neutral-400 font-semibold text-base lg:text-lg max-w-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit alias
          illo dolorem.
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
        <LinkButton
          href="/admin/approvals"
          className="max-[360px]:text-sm text-base font-semibold tracking-widest text-tertiary"
        >
          VIEW ALL
        </LinkButton>
      </div>
      {/* ===== SHOW ALL APPROVALS ===== */}

      {/* PROJECTS LIST MAX IS 6 */}
      <div className="flex flex-col gap-2 last:mb-36">
        {projects.slice(0, 6).map((p) => {
          const formattedGoal = new Intl.NumberFormat("en", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(Number(p.goal));
          
          // تأكد من تطابق اسم حقل currentRaised مع قاعدة البيانات
          const fundPercent =
            (Number(p.currentRaised) / Number(p.goal)) * 100 || 0;
          return (
            <ProjectMiniCard
              key={p.id}
              projectId={p.id}
              title={p.title}
              status={p.status}
              thumbnailUrl={p.thumbnailUrl} // تأكد من الاسم في DB
              formattedGoal={formattedGoal}
              fundedPercentage={fundPercent}
            />
          );
        })}
      </div>
      {/* ===== PROJECTS LIST ===== */}
    </main>
  );
}