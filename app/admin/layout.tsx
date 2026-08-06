import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

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

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const userRole = cookieStore.get("userRole")?.value || "admin";

  let userName = "User";

  if (userId) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("users")
      .select("name")
      .eq("userId", userId)
      .single();

    if (data?.name) {
      userName = data.name;
    }
  }

  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <Header userName={userName} role={userRole} />
      <DesktopAdminHeader userName={userName} />{" "}
      <DesktopNavBar title="investment portal" role="admin" />
      <ResponsiveContainer>{children}</ResponsiveContainer>
      <MobileNavBar role="admin" />
    </div>
  );
}
