// TODO: SERVER SIDE RENDERING WHEN CONNECT WITH DATABASE & PRISMA
"use client";

// COMPONENTS
import DetailsCard from "@/components/ui/DetailsCard";
import FileCard from "@/components/ui/FileCard";
import LastAction from "@/components/ui/LastAction";
import AuditDecision from "@/components/ui/AuditDecision";
import InputField from "@/components/ui/InputField";

// NEXT ROUTERS
import { useParams, useRouter, notFound } from "next/navigation";

// CONTEXTS
import { useProjects } from "@/contexts/ProjectsContext";

// ICONS
import { TextAlignStart, ArrowRight } from "lucide-react";

// REACT
import { useMemo, useState } from "react";

// UTILS & TYPES
import { saveProjectsToStorage } from "@/utils/storage";
import { ProjectStatus } from "@/types/project";

// SCHEMA VALIDATION LIBRARY
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// FORM LIBRARY
import { useForm } from "react-hook-form";

// EXTERNAL LIBRARYS
import { v4 as uuidv4 } from "uuid";

export default function ProjectDetailsView({ role }: { role: string }) {
  const { projectId } = useParams();
  const { projects, setProjects } = useProjects();
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const selectedProject = projects.find((p) => p.id === projectId);

  if (!selectedProject) {
    return notFound();
  }

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
    .refine((data) => data.minmumInvestement >= selectedProject.minInvest, {
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

  // HANDLE SUBMIT FORM
  const onSubmit = (data: any) => {
    // TODO: add username by each account in phase 4
    let newinvest = [];
    if (selectedProject.investors) {
      newinvest = [
        ...selectedProject.investors,
        { id: uuidv4(), name: "Naya", amount: data.minmumInvestement },
      ];
    } else {
      newinvest = [
        { id: uuidv4(), name: "Naya", amount: data.minmumInvestement },
      ];
    }

    const newProject = {
      ...selectedProject,
      investors: newinvest,
      currentRaised: selectedProject.currentRaised + data.minmumInvestement,
    };
    const updatedProjects = projects.map((p) =>
      p.id === selectedProject.id ? newProject : p,
    );
    const isSaved = saveProjectsToStorage(updatedProjects);
    if (isSaved) {
      setProjects(updatedProjects);
      router.push(`/investor/projects/project-details/${projectId}/submit`);
    }
  };

  // FORMATED DATA
  const { formattedGoal, formattedMinInvest, fundPercent, lastUpdate } =
    useMemo(() => {
      if (!selectedProject) {
        return {
          formattedGoal: "",
          formattedMinInvest: "",
          fundPercent: false,
          lastUpdate: "",
        };
      }

      const goal = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(Number(selectedProject.goal));

      const minInvest = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(Number(selectedProject.minInvest));

      const percent =
        selectedProject.currentRaised !== 0
          ? Math.round(
              (Number(selectedProject.currentRaised) /
                Number(selectedProject.goal)) *
                100,
            )
          : false;

      const updated = selectedProject.updatedAt
        ? new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(selectedProject.updatedAt))
        : "Not updated yet";

      return {
        formattedGoal: goal,
        formattedMinInvest: minInvest,
        fundPercent: percent,
        lastUpdate: updated,
      };
    }, [selectedProject]);

  // HANDLE FORM EVENTS
  const handleDecision = (newStatus: ProjectStatus) => {
    const updatedProjects = projects.map((p) => {
      if (p.id === selectedProject.id)
        return {
          ...p,
          status: newStatus,
          adminFeedback: feedback,
          updatedAt: new Date().toISOString(),
        };
      else return p;
    });
    const isSaved = saveProjectsToStorage(updatedProjects);
    if (isSaved) {
      setProjects(updatedProjects);
      router.push("/admin/approvals");
    }
  };

  return (
    <main className={`${role === "admin" ? "lg:pl-72" : ""}`}>
      {/* IMAGE + TITLE */}
      <div className="flex relative max-h-1/6">
        {selectedProject.thumbnailUrl && (
          <img
            src={selectedProject.thumbnailUrl}
            alt={"Project thumbnail"}
            className={
              selectedProject.thumbnailUrl
                ? "rounded-xl h-80 w-full object-cover shrink-0"
                : "hidden"
            }
          />
        )}
        <div className="flex justify-between items-center absolute right-1 md:right-3 lg:right-4 top-3 md:top-4 lg:top-5">
          <span className="shrink-0 bg-neutral-900/60 text-neutral-400 backdrop-blur-xl max-[360px]:py-1.5 py-2.5 max-[360px]:px-3 px-3.5 text-xs font-semibold rounded-full">
            {selectedProject.status.toUpperCase()}
          </span>
        </div>
        <h1
          className={
            selectedProject.thumbnailUrl
              ? "absolute bottom-0 md:bottom-1 lg:bottom-2 left-3 md:left-4 lg:left-5 text-3xl font-bold my-2 lg:text-4xl text-neutral "
              : "text-4xl font-bold my-2 lg:text-5xl truncate max-w-2/3"
          }
        >
          {selectedProject.title}
        </h1>
      </div>
      {/* ===== IMAGE + TITLE ===== */}
      <h2 className="flex items-center gap-2.5 text-2xl font-semibold mb-3 mt-6 lg:text-3xl">
        <TextAlignStart className="w-5 h-5 stroke-3" /> Full Description
      </h2>
      <p className="text-neutral-400 font-semibold text-base lg:text-lg max-w-xl">
        {selectedProject.description}
      </p>
      {/* DETAILS CARDS */}
      <div className="md:grid grid-cols-2 gap-5 my-5">
        {/* EXTRA FEAT: some data must be <HighlightedCard />  */}
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
              {selectedProject.attachedFilesUrls
                ? selectedProject.attachedFilesUrls.map((f, index) => {
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
              className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full mt-2.5 mb-2.5 cursor-pointer bg-primary text-neutral rounded-xl p-4 active:bg-secondary-200 transition-colors"
            >
              <span className="font-bold lg:text-lg flex justify-center gap-2.5 items-center">
                INVEST NOW
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
              {selectedProject.attachedFilesUrls
                ? selectedProject.attachedFilesUrls.map((f, index) => {
                    return <FileCard key={index} fileName={f} />;
                  })
                : ""}
            </div>
          </div>
          {/* ====== ATTACHED FILES ====== */}

          {/* AUDIT DECISION FORM */}
          <AuditDecision
            role={role}
            handleDecision={handleDecision}
            selectedProject={selectedProject}
            feedback={feedback}
            setFeedback={setFeedback}
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
              {selectedProject.attachedFilesUrls
                ? selectedProject.attachedFilesUrls.map((f, index) => {
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
            handleDecision={handleDecision}
            selectedProject={selectedProject}
            feedback={feedback}
            setFeedback={setFeedback}
          />
          {/* ===== AUDIT DECISION FORM ===== */}
        </div>
      )}
      {/* ===== DESKTOP STARTUP & ADMIN ===== */}
    </main>
  );
}
