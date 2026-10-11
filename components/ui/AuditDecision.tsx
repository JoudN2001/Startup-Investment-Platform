"use client";

// COMPONENTS
import TextArea from "./TextArea";

// TYPES
import { Project, ProjectStatus } from "@/types/project";

// ICONS
import { Check, X, SquarePen } from "lucide-react";

// REACT
import { Dispatch, SetStateAction } from "react";

interface AuditDecisionProps {
  role: string;
  handleDecision: (newStatus: ProjectStatus) => void;
  selectedProject: Project;
  feedback: string;
  setFeedback: Dispatch<SetStateAction<string>>;
  isPending?: boolean;
}

const AuditDecision = ({
  role,
  handleDecision,
  selectedProject,
  feedback,
  setFeedback,
  isPending,
}: AuditDecisionProps) => {
  return (
    <div className="max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto w-full bg-neutral rounded-2xl py-2 sm:py-3 px-5 sm:px-7 mt-6 lg:mt-0 mb-5">
      <h1 className={`text-3xl font-bold my-2 pb-1 `}>
        {role === "admin" ? "Audit Decision" : "Admin Feedback"}
      </h1>
      <p className="mt-3 mb-5 text-neutral-600 font-bold text-sm font-secondary">
        {role === "admin"
          ? "Review all materials before making a final determination. Feedback will be visible to the project lead."
          : selectedProject.adminFeedback
            ? selectedProject.adminFeedback
            : "No feedback on your project "}
      </p>

      {role === "admin" && (
        <>
          <TextArea
            title="ADMIN NOTES & PUBLIC FEEDBACK"
            placeholder="Provide detailed reasons if rejecting or requesting revisions..."
            hint="OPTIONAL"
            bgColor="bg-neutral-950"
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          />
          <div className="flex flex-col gap-3 mb-4">
            {/* APPROVE BUTTON */}
            <button
              type="button"
              disabled={isPending}
              onClick={() => handleDecision("published")}
              className={`flex items-center justify-center gap-2 text-neutral font-semibold py-2 mt-3 w-full rounded-lg transition-colors ${
                isPending
                  ? "bg-success/50 cursor-not-allowed"
                  : "bg-success active:bg-success/80"
              }`}
            >
              <Check className={isPending ? "opacity-50" : ""} />
              {isPending ? "Processing..." : "Approve Project"}
            </button>

            <div className="flex gap-2 justify-between w-full">
              {/* REVISION BUTTON */}
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleDecision("pending")}
                className={`flex flex-1 items-center justify-center gap-2 font-semibold bg-neutral border-2 py-2 px-2 rounded-lg transition-colors ${
                  isPending
                    ? "text-error/50 border-warning/50 cursor-not-allowed"
                    : "text-error border-warning active:bg-warning/10"
                }`}
              >
                <SquarePen className={isPending ? "opacity-50" : ""} />
                Revision
              </button>

              {/* REJECT BUTTON */}
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleDecision("rejected")}
                className={`flex flex-1 items-center justify-center gap-2 text-neutral font-semibold py-2 px-2 rounded-lg transition-colors ${
                  isPending
                    ? "bg-error/50 cursor-not-allowed"
                    : "bg-error active:bg-error/80"
                }`}
              >
                <X className={isPending ? "opacity-50" : ""} />
                Reject
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuditDecision;
