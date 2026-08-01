import { fetchProjects } from "@/dal/projects";
import InvestorProjectsClient from "./InvestorProjectsClient";

export default async function InvestorProjects() {
  const allProjects = await fetchProjects();

  const publishedProjects = allProjects.filter((p) => p.status === "published");

  return <InvestorProjectsClient projects={publishedProjects} />;
}
