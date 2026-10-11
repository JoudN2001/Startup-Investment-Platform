import { getProjectById } from "@/dal/projects";
import ProjectDetailsView from "@/components/ui/ProjectDetailsView";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = await params;

  const project = await getProjectById(resolvedParams.projectId);

  if (!project) {
    return notFound();
  }

  const cookieStore = await cookies();
  const userRoleCookie = cookieStore.get("userRole")?.value;

  const currentRole = (userRoleCookie || "investor") as
    | "admin"
    | "startup"
    | "investor";

  return <ProjectDetailsView project={project} role={currentRole} />;
}
