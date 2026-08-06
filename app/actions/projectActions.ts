"use server";

import { createClient } from "@/utils/supabase/server";

export async function submitProjectAction(formData: any) {
  const supabase = await createClient();

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("userId")
    .limit(1)
    .single();

  if (userError || !user) {
    throw new Error("No user found to attach the project to.");
  }

  const { error } = await supabase.from("project").insert([
    {
      title: formData.title,
      description: formData.description,
      goal: formData.fundingGoal,
      minInvest: formData.minmumInvestement,
      status: "pending",
      currentRaised: 0,
      userId: user.userId, 
    },
  ]);

  if (error) {
    console.error("Error inserting project:", error);
    throw new Error("Failed to create project");
  }

  return { success: true };
}