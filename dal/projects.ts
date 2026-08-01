// dal/projects.ts
import { createClient } from "@/utils/supabase/server";

export async function fetchProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("project").select("*");
  if (error) return [];
  return data;
}

export async function getProjectById(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project")
    .select("*")
    .eq("projectId", projectId)
    .single();
  if (error) {
    console.error("Error fetching project details:", error);
    return null;
  }

  return data;
}
