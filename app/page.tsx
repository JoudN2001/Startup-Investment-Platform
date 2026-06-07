// COMPONENTS
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";
import FeatureCard from "@/components/ui/FeatureCard";
import SectionTitle from "@/components/ui/SectionTitle";
import PublishedProjects from "@/components/ui/PublishedProjects";
import LinkButton from "@/components/ui/LinkButton";

// ICONS
import { ArrowRight, Compass, Lock, ChartNoAxesCombined } from "lucide-react";

// DUMMY DATA
const companies = [
  "AURA.",
  "MATREX",
  "QUANTUM",
  "NEXUS",
  "VENTURE X",
  "ZENITH",
  "ORBITAL",
  "LUMINA",
  "ECLIPSE",
  "VERTEX",
  "STRATOS",
  "NOVA CAPITAL",
  "AXIOM",
  "PULSE",
  "INFINITY",
  "CORESTONE",
  "ALPHA GRID",
  "SKYLINE",
  "TITAN",
  "EVEREST",
  "VANGUARD",
  "ASTRAL",
  "MONARCH",
  "HEXAGON",
  "SYNAPSE",
  "VELOCITY",
  "NORTHSTAR",
  "CATALYST",
  "PRIME EDGE",
  "BLUEWAVE",
];

export default function Home() {
  const year = new Date().getFullYear();
  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      {/* HEADER */}
      <header className="fixed flex justify-between items-center gap-2 px-6 md:px-10 lg:px-20 top-0 py-5 bg-neutral/80 backdrop-blur-md w-full shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
        <h1 className="truncate font-bold text-2xl">Investment Platform</h1>
        <LinkButton
          href = "/sign-in"
          className="p-3 max-w-1/3 bg-primary text-neutral font-medium text-[15px] rounded-xl cursor-pointer hover:bg-primary-100 transition-colors duration-200"
        >
          Sign In
        </LinkButton>
      </header>
      {/* ===== HEADER ===== */}

      {/* MAIN CONTENT */}
      <ResponsiveContainer>
        {/* OVERVIEW */}
        <div className="mt-8">
          <h1 className="text-4xl font-bold my-5 md:my-0 lg:text-5xl">
            Invest in the Next Generation of Startups.
          </h1>
          <p className="text-neutral-400 font-semibold text-base lg:text-lg max-w-2xl mb-8">
            Access highly curated, early-stage investment opportunities. A
            sovereign framework for institutional and accredited capital
            allocation.
          </p>
        </div>
        {/* ===== OVERVIEW ===== */}

        {/* ACTION LinkButtonS */}
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-5 md:my-8 md:items-center">
          <LinkButton
            href = "/sign-in"
            className="mx-auto w-full mt-2.5 mb-2.5 md:my-0 cursor-pointer bg-primary text-neutral rounded-xl p-4 hover:bg-primary-100 active:bg-secondary-200 transition-colors"
          >
            <span className="font-bold lg:text-lg flex justify-center gap-2.5 items-center">
              Get Started
              <ArrowRight className="w-6 h-6 stroke-3" />
            </span>
          </LinkButton>

          <LinkButton
            href = "/sign-in"
            className="mx-auto w-full mt-2.5 mb-10  md:my-0 cursor-pointer bg-neutral text-primary rounded-xl p-4 hover:bg-neutral-50 active:bg-neutral-900 transition-colors"
          >
            <span className="font-bold lg:text-lg flex justify-center gap-2.5 items-center">
              Explore Projects
            </span>
          </LinkButton>
        </div>
        {/* ===== ACTION LinkButtonS ====== */}

        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-12 items-center">
          <div className="relative w-full aspect-square md:aspect-square rounded-xl overflow-hidden bg-surface-container-lowest ghost-border mb-5 shadow-[0px_20px_40px_rgba(12,20,39,0.05)]">
            <img
              alt="Architectural Abstract"
              className="w-full h-full object-cover mix-blend-luminosity opacity-90"
              data-alt="A striking digital installation art piece featuring glowing, generative geometric shapes suspended in a vast, minimalist gallery space. The room is illuminated by high-key, soft white lighting that creates a bright, modern light-mode aesthetic. The artwork relies on a sophisticated palette of deep blacks and pristine whites, punctuated by intense accents of vibrant red. The mood is serene yet technologically advanced."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJrWzoDMQbMomR4JswdsRpYqigfSOyPSH5EahmeevEcckdD7T7sGCo5lL5r-7192V93pqfwQX6Bkwz7FrFtVtV9fhKOtmXm_fIw54oXfPqMW1aBYkr4RYBoin1kFT5M6jDUhQr4HKn0zT110593U0HD8xlQtgO63uo2jcw_IzJtBXVglvrLcuMWMCcOmv0xwBsvVFhxFMJ3hGzDaWGd5P509iSX52LzwaydHWvoBbqvP8uitoYsrQpWBeQZ27pEh5MvwPeti09hAE"
            />
            <div className="absolute inset-0 `bg-gradient-to-t` from-surface/80 to-transparent mix-blend-multiply"></div>
          </div>

          <div className="w-full my-15 ">
            {/* VERIFIED BY */}
            <h1 className="text-sm md:text-base font-semibold text-neutral-400 tracking-widest uppercase mb-8">
              Trusted by institutional allocators
            </h1>
            <div className="flex flex-wrap lg:justify-start justify-center lg:items-start items-center gap-x-12 gap-y-6">
              {companies.map((company) => (
                <p
                  key={company}
                  className="text-neutral-400 font-bold text-xl md:text-2xl"
                >
                  {company}
                </p>
              ))}
            </div>
            {/* ===== VERIFIED BY ===== */}
          </div>
        </div>

        {/* FEATURES CARDS */}
        <SectionTitle
          title="The Allocation Process."
          description="A streamlined, secure pathway from discovery to liquidity."
        />

        <div className="flex flex-col gap-y-8 mb-15 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 md:mt-8">
          <FeatureCard
            title="01. Discover"
            description="Access curated memorandums and diligence reports on pre-vetted startups."
            icon={Compass}
          />
          <FeatureCard
            title="02. Commit"
            description="Execute commitments securely through our institutional-grade legal framework."
            icon={Lock}
          />
          <FeatureCard
            title="03. Track"
            description="Monitor portfolio performance, receive updates, and manage distributions."
            icon={ChartNoAxesCombined}
          />
        </div>
        {/* ===== FEATURES CARDS ===== */}

        {/* PROJECTS EXAMPLE */}
        <SectionTitle
          title="Active Exhibitions."
          description="Currently open for capital allocation."
        />
        <PublishedProjects />
        <LinkButton
          href = "/sign-in"
          className="w-full my-10 cursor-pointer bg-neutral text-primary rounded-xl p-4 hover:bg-neutral-50 active:bg-neutral-900 transition-colors"
        >
          <span className="font-bold lg:text-lg flex justify-center gap-2.5 items-center">
            View All Exhibitions
            <ArrowRight className="w-6 h-6 stroke-3" />
          </span>
        </LinkButton>
        {/* ===== PROJECTS EXAMPLE ===== */}
      </ResponsiveContainer>
      {/* ====== MAIN CONTENT ===== */}

      {/* FOOTER */}
      <footer className="px-6 py-5 mt-5 md:flex md:justify-between md:items-center md:px-10 lg:px-20">
        <h1 className="font-semibold text-xl mb-1">Investment Platform</h1>
        <p className="font-light text-sm">
          © {year} INVESTMENT PLATFORM.
          <br /> SOVEREIGN INVESTMENT FRAMEWORK
        </p>
      </footer>
      {/* ===== FOOTER ===== */}
    </div>
  );
}
