import type { Metadata } from "next";

// COMPONENTS
import Header from "@/components/layout/Header";
import MobileNavBar from "@/components/layout/MobileNavBar";
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";
import DesktopAdminHeader from "@/components/layout/DesktopAdminHeader";
import DesktopNavBar from "@/components/layout/DesktopNavBar";

export const metadata: Metadata = {
  title: "Admin Dashboard | Startup Investment Platform",
  description: "Manage projects, users, and investments securely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <Header title={"Admin Dashboard"} role={"admin"} />
      <DesktopAdminHeader />
      <DesktopNavBar title="investment portal" role="admin" />
      <ResponsiveContainer>{children}</ResponsiveContainer>
      <MobileNavBar role="admin" />
    </div>
  );
}
