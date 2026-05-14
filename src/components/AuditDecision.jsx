// COMPONENTS
import TextArea from "./TextArea";

// ICONS
import { Check, X, SquarePen } from "lucide-react";

const AuditDecision = ({
  role,
  handleDecision,
  selectedProject,
  feedback,
  setFeedback,
}) => {
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
            description="Provide detailed reasons if rejecting or requesting revisions..."
            hint="OPTIONAL"
            bgColor="bg-neutral-950"
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          />
          <div className="flex flex-col gap-3 mb-4">
            <button
              type="button"
              onClick={() => handleDecision("published")}
              className="flex items-center justify-center gap-2 text-neutral font-semibold bg-success py-2 mt-3 w-full rounded-lg"
            >
              <Check />
              Approve Project
            </button>
            <div className="flex gap-2 justify-between w-full">
              <button
                type="button"
                onClick={() => handleDecision("pending")}
                className="flex flex-1 items-center justify-center gap-2 text-error font-semibold bg-neutral border-warning border-2 py-2 px-2 rounded-lg"
              >
                <SquarePen />
                Revision
              </button>
              <button
                type="button"
                onClick={() => handleDecision("rejected")}
                className="flex flex-1 items-center justify-center gap-2 text-neutral font-semibold bg-error py-2 px-2 rounded-lg"
              >
                <X />
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
