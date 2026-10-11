"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function investInProjectAction(projectId: string, amount: number) {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { success: false, message: "Unauthorized: Please log in." };
  }

  const { error: investError } = await supabase.from("invest").insert([
    {
      projectId: projectId,
      userId: userId,
      amount: amount,
    },
  ]);

  if (investError) {
    console.error("Investment Error:", investError);
    return { success: false, message: "Failed to process investment." };
  }

  const { data: project } = await supabase
    .from("project")
    .select("currentRaised")
    .eq("projectId", projectId)
    .single();

  const newRaised = (Number(project?.currentRaised) || 0) + amount;

  const { error: updateError } = await supabase
    .from("project")
    .update({ currentRaised: newRaised })
    .eq("projectId", projectId);

  if (updateError) {
    console.error("Update Raised Error:", updateError);
    return { success: false, message: "Failed to update project total." };
  }

  revalidatePath(`/investor/projects/project-details/${projectId}`);
  return { success: true };
}

export async function updateProjectStatusAction(
  projectId: string,
  status: string,
  adminFeedback: string
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("project")
    .update({
      status: status,
      adminFeedback: adminFeedback,
      updatedAt: new Date().toISOString(),
    })
    .eq("projectId", projectId);

  if (error) {
    console.error("Update Status Error:", error);
    return { success: false, message: "Failed to update status." };
  }

  revalidatePath("/admin/approvals");
  return { success: true };
}