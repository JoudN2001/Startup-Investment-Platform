"use client";

// COMPONENTS
import DetailsCard from "@/components/ui/DetailsCard";
import FileCard from "@/components/ui/FileCard";
import LastAction from "@/components/ui/LastAction";
import AuditDecision from "@/components/ui/AuditDecision";
import InputField from "@/components/ui/InputField";

// NEXT ROUTERS
import { useRouter } from "next/navigation";

// ICONS
import { TextAlignStart, ArrowRight } from "lucide-react";

// REACT
import { useMemo, useState, useTransition } from "react";

// TYPES
import { ProjectStatus, Project } from "@/types/project";

// SCHEMA VALIDATION LIBRARY
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// FORM LIBRARY
import { useForm } from "react-hook-form";

// SERVER ACTIONS
import {
  investInProjectAction,
  updateProjectStatusAction,
} from "@/app/actions/projectMutations";

interface ProjectDetailsViewProps {
  project: Project;
  role: string;
}

export default function ProjectDetailsView({ project, role }: ProjectDetailsViewProps) {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  
  const [isPending, startTransition] = useTransition();

  // VALIDATION DATA FIELD CHECK
  const createProjectFormSchema = z
    .object({
      minmumInvestement: z.coerce
        .number({
          message: "Minimum investment is required and must be a valid number.",
        })
        .min(1, "Minimum investment is required.")
        .positive("Amount must be greater than zero!"),
    })
    .refine((data) => data.minmumInvestement >= project.minInvest, {
      message: "Your investment must be greater than the minimum investment",
      path: ["minmumInvestement"],
    });

  // USEFORM HOOK WITH SECHEMA VALIDATION
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProjectFormSchema),
  });

  // HANDLE SUBMIT FORM (INVESTMENT)
  const onSubmit = (data: any) => {
    startTransition(async () => {
      try {
        const result = await investInProjectAction(
          project.projectId,
          data.minmumInvestement
        );

        if (result.success) {
          router.push(`/investor/projects/project-details/${project.projectId}/submit`);
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error(error);
        alert("An unexpected error occurred.");
      }
    });
  };

  // HANDLE FORM EVENTS (ADMIN AUDIT)
  const handleDecision = (newStatus: ProjectStatus) => {
    startTransition(async () => {
      try {
        const result = await updateProjectStatusAction(
          project.projectId,
          newStatus,
          feedback
        );

        if (result.success) {
          router.push("/admin/approvals");
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error(error);
        alert("An unexpected error occurred.");
      }
    });
  };

  // FORMATED DATA
  const { formattedGoal, formattedMinInvest, fundPercent, lastUpdate } =
    useMemo(() => {
      const goal = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(Number(project.goal));

      const minInvest = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(Number(project.minInvest));

      const percent =
        project.currentRaised !== 0
          ? Math.round((Number(project.currentRaised) / Number(project.goal)) * 100)
          : false;

      const updated = project.updatedAt
        ? new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(project.updatedAt))
        : "Not updated yet";

      return {
        formattedGoal: goal,
        formattedMinInvest: minInvest,
        fundPercent: percent,
        lastUpdate: updated,
      };
    }, [project]);

  return (
    <main className={`${role === "admin" ? "lg:pl-72" : ""}`}>
      {/* IMAGE + TITLE */}
      <div className="flex relative max-h-1/6">
        {project.thumbnailUrl && (
          <img
            src={project.thumbnailUrl}
            alt={"Project thumbnail"}
            className={
              project.thumbnailUrl
                ? "rounded-xl h-80 w-full object-cover shrink-0"
                : "hidden"
            }
          />
        )}
        <div className="flex justify-between items-center absolute right-1 md:right-3 lg:right-4 top-3 md:top-4 lg:top-5">
          <span className="shrink-0 bg-neutral-900/60 text-neutral-400 backdrop-blur-xl max-[360px]:py-1.5 py-2.5 max-[360px]:px-3 px-3.5 text-xs font-semibold rounded-full">
            {project.status.toUpperCase()}
          </span>
        </div>
        <h1
          className={
            project.thumbnailUrl
              ? "absolute bottom-0 md:bottom-1 lg:bottom-2 left-3 md:left-4 lg:left-5 text-3xl font-bold my-2 lg:text-4xl text-neutral "
              : "text-4xl font-bold my-2 lg:text-5xl truncate max-w-2/3"
          }
        >
          {project.title}
        </h1>
      </div>
      {/* ===== IMAGE + TITLE ===== */}
      <h2 className="flex items-center gap-2.5 text-2xl font-semibold mb-3 mt-6 lg:text-3xl">
        <TextAlignStart className="w-5 h-5 stroke-3" /> Full Description
      </h2>
      <p className="text-neutral-400 font-semibold text-base lg:text-lg max-w-xl">
        {project.description}
      </p>
      {/* DETAILS CARDS */}
      <div className="md:grid grid-cols-2 gap-5 my-5">
        <DetailsCard
          label={"funding goal"}
          formattedGoal={formattedGoal}
          fundedPercentage={fundPercent}
        />
        <DetailsCard
          label={"minimum investment"}
          formattedGoal={formattedMinInvest}
          description="Designed for institutional and accredited high-net-worth individuals."
        />
      </div>
      {/* ===== DETAILS CARDS ===== */}

      {/* INVESTORS */}
      {role === "investor" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* ATTACHED FILES */}
          <div className="my-7.5">
            <h1 className="text-md text-neutral-400 tracking-wide font-semibold mb-6">
              VERIFIED DOCUMENTATION
            </h1>
            <div className="flex flex-col gap-3">
              {project.attachedFilesUrls && Array.isArray(project.attachedFilesUrls)
                ? project.attachedFilesUrls.map((f, index) => {
                    return <FileCard key={index} fileName={f} />;
                  })
                : ""}
            </div>
          </div>
          {/* ====== ATTACHED FILES ====== */}

          {/* INVESTMENT FIELD FOR INVESTORS */}
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full mb-35"
          >
            <InputField
              type="number"
              title="minimum investment ($)"
              placeholder={formattedMinInvest}
              hint="USD"
              error={errors.minmumInvestement}
              {...register("minmumInvestement")}
            />
            <button
              type="submit"
              disabled={isPending}
              className={`max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full mt-2.5 mb-2.5 bg-primary text-neutral rounded-xl p-4 transition-colors ${
                isPending ? "opacity-70 cursor-not-allowed" : "cursor-pointer active:bg-secondary-200"
              }`}
            >
              <span className="font-bold lg:text-lg flex justify-center gap-2.5 items-center">
                {isPending ? "PROCESSING..." : "INVEST NOW"}
                <ArrowRight className="w-6 h-6 stroke-3" />
              </span>
            </button>
          </form>
          {/* ===== INVESTMENT FIELD FOR INVESTORS ===== */}
        </div>
      )}
      {/* ===== INVESTORS ===== */}

      {/* STARTUP & ADMIN */}
      {role !== "investor" && (
        <div className="md:hidden">
          {/* ATTACHED FILES */}
          <div className="my-7.5">
            <h1 className="text-md text-neutral-400 tracking-wide font-semibold mb-6">
              VERIFIED DOCUMENTATION
            </h1>
            <div className="flex flex-col gap-3">
              {project.attachedFilesUrls && Array.isArray(project.attachedFilesUrls)
                ? project.attachedFilesUrls.map((f, index) => {
                    return <FileCard key={index} fileName={f} />;
                  })
                : ""}
            </div>
          </div>
          {/* ====== ATTACHED FILES ====== */}

          {/* AUDIT DECISION FORM */}
          <AuditDecision
            role={role}
            handleDecision={(status) => handleDecision(status as ProjectStatus)}
            selectedProject={project}
            feedback={feedback}
            setFeedback={setFeedback}
            isPending={isPending} 
          />
          {/* ===== AUDIT DECISION FORM ===== */}

          <LastAction lastUpdate={lastUpdate} />
        </div>
      )}
      {/* ===== STARTUP & ADMIN ===== */}

      {/* ===== DESKTOP STARTUP & ADMIN ===== */}
      {role !== "investor" && (
        <div className="hidden md:grid grid-cols-2 gap-6">
          {/* ATTACHED FILES */}
          <div className="my-7.5">
            <h1 className="text-md text-neutral-400 tracking-wide font-semibold mb-6">
              VERIFIED DOCUMENTATION
            </h1>
            <div className="flex flex-col gap-3">
              {project.attachedFilesUrls && Array.isArray(project.attachedFilesUrls)
                ? project.attachedFilesUrls.map((f, index) => {
                    return <FileCard key={index} fileName={f} />;
                  })
                : ""}
              <LastAction lastUpdate={lastUpdate} />
            </div>
          </div>
          {/* ===== ATTACHED FILES ===== */}

          {/* AUDIT DECISION FORM */}
          <AuditDecision
            role={role}
            handleDecision={(status) => handleDecision(status as ProjectStatus)}
            selectedProject={project}
            feedback={feedback}
            setFeedback={setFeedback}
            isPending={isPending} 
          />
          {/* ===== AUDIT DECISION FORM ===== */}
        </div>
      )}
      {/* ===== DESKTOP STARTUP & ADMIN ===== */}
    </main>
  );
}