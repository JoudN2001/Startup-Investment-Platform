import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

// COMPONENTS
import Header from "@/components/layout/Header";
import MobileNavBar from "@/components/layout/MobileNavBar";
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";

export const metadata: Metadata = {
  title: "Startup Dashboard | Startup Investment Platform",
  description:
    "Submit new ventures, track funding progress, and manage your projects.",
};

export default async function StartupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const userRole = cookieStore.get("userRole")?.value || "startup";

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
      
      {/* MAIN CONTENT */}
      <ResponsiveContainer>{children}</ResponsiveContainer>
      {/* ====== MAIN CONTENT ===== */}
      
      <MobileNavBar role="startup" />
    </div>
  );
}