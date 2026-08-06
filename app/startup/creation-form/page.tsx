"use client";

// COMPONENTS
import InputFiled from "@/components/ui/InputField";
import TextArea from "@/components/ui/TextArea";
import FileInput from "@/components/ui/FileInput";
import LinkButton from "@/components/ui/LinkButton";

// LINK ROUTER
import { useRouter } from "next/navigation";

// SCHEMA VALIDATION LIBRARY
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// FORM LIBRARY
import { useForm, useWatch } from "react-hook-form";

// REACT
import { useTransition } from "react";

// SERVER ACTION
import { submitProjectAction } from "@/app/actions/projectActions";

// VALIDATION DATA FIELD CHECK
const createProjectFormSchema = z
  .object({
    title: z
      .string({
        message: "Project name is required and must be text.",
      })
      .min(4, "Too short! Must be at least 4 characters."),

    description: z
      .string({
        message: "Description is required!",
      })
      .min(100, "Too short! Must be more than 100 characters.")
      .max(10000, "Too long! Must be less than 10000 characters."),

    fundingGoal: z.coerce
      .number({
        message: "Funding goal is required and must be a valid number.",
      })
      .positive("Amount must be greater than zero!"),

    minmumInvestement: z.coerce
      .number({
        message: "Minimum investment is required and must be a valid number.",
      })
      .positive("Amount must be greater than zero!"),
      
    thumbnail: z
      .any()
      .refine(
        (files) => !files || files.length === 0 || files[0]?.size <= 5242880,
        "Max file size is 5MB."
      )
      .refine(
        (files) =>
          !files ||
          files.length === 0 ||
          ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type),
        "Only .jpg, .png and .webp formats are supported."
      )
      .optional(),
      
    files: z
      .any()
      .refine(
        (files) => !files || files.length === 0 || files[0]?.size <= 26214400,
        "Max file size is 25MB."
      )
      .optional(),
  })
  .refine((data) => data.minmumInvestement < data.fundingGoal, {
    message: "Minimum investment must be strictly less than the funding goal.",
    path: ["minmumInvestement"],
  });

type CreateProjectFormValues = z.infer<typeof createProjectFormSchema>;

export default function CreateProjectForm() {
  const router = useRouter();
  
  const [isPending, startTransition] = useTransition();

  // USEFORM HOOK WITH SECHEMA VALIDATION
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    resetField,
  } = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectFormSchema) as any,
  });

  const thumbnailFile = useWatch({ control, name: "thumbnail" });
  const documentsFile = useWatch({ control, name: "files" });
  const hasThumbnail = thumbnailFile && thumbnailFile.length > 0;
  const hasDocuments = documentsFile && documentsFile.length > 0;

  // HANDLE SUBMIT FORM
  const onSubmit = (data: CreateProjectFormValues) => {
    startTransition(async () => {
      try {
        // TODO: برمجة رفع الملفات والصور لاحقاً باستخدام Supabase Storage
        
        await submitProjectAction(data);
        
        router.push("/startup/creation-form/submit");
      } catch (error) {
        console.error("Failed to submit project:", error);
        alert("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <>
      {/* TITLE & DESCREPTION */}
      <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
        <span className="text-neutral-700 font-medium text-xs lg:text-sm tracking-widest">
          NEW VENTURE
        </span>
        <h1 className="text-4xl font-bold my-2 lg:text-5xl">
          Project Details
        </h1>
        <p className="text-neutral-400 font-semibold text-base lg:text-lg max-w-xl">
          Define your architectural capital project and set your investment
          parameters for institutional review.
        </p>
      </div>
      {/* ===== TITLE & DESCREPTION ===== */}
      
      {/* FORM */}
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full"
      >
        <InputFiled
          type="text"
          title="project name"
          placeholder="e.g. Skyline Residency Phase I"
          hint=""
          error={errors.title}
          {...register("title")}
        />
        <TextArea error={errors.description} {...register("description")} />
        <InputFiled
          type="number"
          title="funding goal ($)"
          placeholder="5,000,000$"
          hint="USD"
          error={errors.fundingGoal}
          {...register("fundingGoal")}
        />
        <InputFiled
          type="number"
          title="minimum investment ($)"
          placeholder="10,000$"
          hint="USD"
          error={errors.minmumInvestement}
          {...register("minmumInvestement")}
        />
        <FileInput
          error={errors.thumbnail}
          {...register("thumbnail")}
          hasFile={hasThumbnail}
          onClear={() => resetField("thumbnail")}
        />
        <FileInput
          title="SUPPORTING DOCUMENTS"
          supportedFiles="Attach any relevant documentation for the admin review."
          error={errors.files}
          {...register("files")}
          hasFile={hasDocuments}
          onClear={() => resetField("files")}
        />
        
        {/* SUBMIT & CANCEL BUTTONS  */}
        <button
          type="submit"
          disabled={isPending}
          className={`max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full mt-2.5 mb-2.5 text-neutral rounded-xl p-4 transition-colors ${
            isPending ? "bg-neutral-600 cursor-not-allowed" : "bg-primary active:bg-secondary-200"
          }`}
        >
          <span className="font-bold lg:text-lg">
            {isPending ? "Submitting..." : "Submit for Approval"}
          </span>
        </button>
        <LinkButton
          href={"/startup"}
          className="flex justify-center max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full mb-2.5 text-primary rounded-xl p-3"
        >
          <span className="font-bold lg:text-lg">Cancel</span>
        </LinkButton>
        {/* ===== SUBMIT & CANCEL BUTTONS  ===== */}
      </form>
      {/* ===== FORM ===== */}
    </>
  );
}