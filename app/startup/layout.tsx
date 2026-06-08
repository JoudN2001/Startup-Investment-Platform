import type { Metadata } from "next";

// COMPONENTS
import Header from "@/components/layout/Header";
import MobileNavBar from "@/components/layout/MobileNavBar";
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";

export const metadata: Metadata = {
  title: "Startup Dashboard | Startup Investment Platform",
  description:
    "Submit new ventures, track funding progress, and manage your projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <div className={"bg-neutral-950 w-full min-h-dvh"}>
          <Header title={"Startup Dashboard"} role={"startup"} />
          {/* MAIN CONTENT */}
          <ResponsiveContainer>{children}</ResponsiveContainer>
          {/* ====== MAIN CONTENT ===== */}
          <MobileNavBar role="startup" />
        </div>
      </body>
    </html>
  );
}
