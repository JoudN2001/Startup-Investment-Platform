// COMPONENTS
import AnimatedSpaceman from "@/components/ui/AnimatedSpaceman";
import GoBackButton from "@/components/ui/GoBackButton";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 font-sans relative overflow-hidden">
      {/* ===== MAIN CONTENT ===== */}
      <main className="w-full max-w-6xl mx-auto px-6 py-16 flex flex-col-reverse md:flex-row items-center justify-between">
        {/* TEXT & BUTTON */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4 mt-10 md:mt-0">
          <h1 className="text-7xl md:text-[8rem] font-bold leading-none my-4 text-primary">
            404
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold">
            UH OH! You're lost.
          </h2>
          <p className="text-lg md:text-xl font-medium max-w-md text-neutral-400 mb-4">
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            dashboard.
          </p>
          <GoBackButton />
        </div>
        {/* SVG ILLUSTRATION */}
        <div className="w-full md:w-1/2">
          <AnimatedSpaceman />
        </div>
      </main>
    </div>
  );
}
