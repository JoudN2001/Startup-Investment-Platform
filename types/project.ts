export type ProjectStatus =
  | "pending"
  | "review"
  | "rejected"
  | "done"
  | "published";

export interface ProjectInvestor {
  id: string;
  name: string;
  amount: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  thumbnailUrl?: string;
  attachedFilesUrls?: string[];
  goal: number;
  minInvest: number;
  currentRaised: number;
  createdAt: string;
  updatedAt: string;
  adminFeedback?: string;
  investors?: ProjectInvestor[];
}
