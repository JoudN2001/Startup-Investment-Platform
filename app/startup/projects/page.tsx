import { fetchProjects } from "@/dal/projects";
import StartupProjectsClient from "./StartupProjectsClient";

export default async function StartupProjects() {
  const projects = await fetchProjects();

  return <StartupProjectsClient projects={projects} />;
}
