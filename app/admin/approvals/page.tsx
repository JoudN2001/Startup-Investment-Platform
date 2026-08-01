// app/admin/approvals/page.tsx
import { fetchProjects } from "@/dal/projects";
import ApprovalsClient from "./ApprovalsClient";

export default async function AdminApprovals() {
  const projects = await fetchProjects();

  return <ApprovalsClient projects={projects} />;
}