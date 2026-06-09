import type { Metadata } from "next";

// COMPONENTS
import Header from "@/components/layout/Header";
import MobileNavBar from "@/components/layout/MobileNavBar";
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";

export const metadata: Metadata = {
  title: "Investor Dashboard | Startup Investment Platform",
  description:
    "Discover, evaluate, and invest in vetted architectural capital projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <Header title={"Investor Dashboard"} role={"investor"} />
      {/* MAIN CONTENT */}
      <ResponsiveContainer>{children}</ResponsiveContainer>
      {/* ====== MAIN CONTENT ===== */}
      <MobileNavBar role="investor" />
    </div>
  );
}
