// COMPONENTS
import ResponsiveContainer from "../components/ResponsiveContainer";
import InputFiled from "../components/InputField";
import TextArea from "../components/TextArea";
import FileInput from "../components/FileInput";

// ICONS
import { ArrowLeft } from "lucide-react";

// REACT ROUTER
import { Link, useNavigate } from "react-router-dom";

// CONTEXTS
import { useProjects } from "../contexts/ProjectsContext";

// SHEMA VALIDATION LIBRARY
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// FORM LIBRARY
import { useForm, useWatch } from "react-hook-form";

// EXTERNAL LIBRARYS
import { v4 as uuidv4 } from "uuid";

// VALIDATION DATA FIELD CHECK
const createProjectFormSchema = z.object(
  {
    title: z
      .string({
        required_error: "Project name is required!",
        invalid_type_error: "Project name must be text.",
      })
      .min(4, { message: "Too short! Must be at least 4 characters." }),
    description: z
      .string({
        required_error: "Description is required!",
      })
      .min(100, "Too short! Must be more than 100 characters.")
      .max(10000, "Too long! Must be less than 10000 characters."),
    fundingGoal: z.coerce
      .number({
        required_error: "Funding goal is required.",
        invalid_type_error: "Please enter a valid number.",
      })
      .positive("Amount must be greater than zero!"),
    minmumInvestement: z.coerce
      .number({
        required_error: "Minimum investment is required.",
        invalid_type_error: "Please enter a valid number.",
      })
      .positive("Amount must be greater than zero!"),
    thumbnail: z
      .any()
      .refine(
        (files) => !files || files.length === 0 || files[0]?.size <= 5242880,
        "Max file size is 5MB.",
      )
      .refine(
        (files) =>
          !files ||
          files.length === 0 ||
          ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type),
        "Only .jpg, .png and .webp formats are supported.",
      )
      .optional(),
    files: z
      .any()
      .refine(
        (files) => !files || files.length === 0 || files[0]?.size <= 26214400,
        "Max file size is 25MB.",
      )
      .optional(),
  }).refine((data) => data.minmumInvestement < data.fundingGoal, {
    message: "Minimum investment must be strictly less than the funding goal.",
    path: ["minmumInvestement"],
  });

export default function CreateProjectForm() {
  const navigate = useNavigate();
  const { projects } = useProjects();
  // USEFORM HOOK WITH SECHEMA VALIDATION
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    resetField,
  } = useForm({
    resolver: zodResolver(createProjectFormSchema),
  });

  const thumbnailFile = useWatch({ control, name: "thumbnail" });
  const documentsFile = useWatch({ control, name: "files" });
  const hasThumbnail = thumbnailFile && thumbnailFile.length > 0;
  const hasDocuments = documentsFile && documentsFile.length > 0;


  // HANDEL SUBMIT FORM
  const onSubmit = (data) => {
    // TODO: Files and thumbnail must be as link or create backend
    const newProject = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      status: "pending",
      thumbnailUrl: "",
      attachedFilesUrls: [],
      goal: data.fundingGoal,
      minInvest: data.minmumInvestement,
      currentRaised: 0,
      createdAt: new Date().toISOString(),
      updatedAt: "",
      adminFeedback: "",
      investors: [],
    };
    console.log("Form data validated and ready to send!");
    navigate("./submit");
    localStorage.setItem("projects", JSON.stringify([...projects, newProject]));
  };

  // SHOW ERROR FORM
  const onError = (errors) => {
    console.error(errors);
  };

  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      {/* HEADER & BACK BUTTON */}
      <header className="flex fixed w-full justify-between items-center py-3 px-4 lg:py-6 lg:px-8 bg-neutral shadow-[0_4px_10px_rgba(0,0,0,0.05)] z-50">
        <div className={" flex items-center space-x-3"}>
          <Link to={"/startup"}>
            <ArrowLeft
              className={"w-5.5 h-5.5 md:w-6.5 md:h-6.5 lg:w-7 lg:h-7 stroke-3"}
            />
          </Link>
          <span className={"text-xl lg:text-2xl font-bold"}>
            Create Project
          </span>
        </div>
        <div
          className={
            "flex justify-center items-center rounded-full w-11 h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-neutral"
          }
        >
          <span className="font-semibold text-2xl xl:text-3xl select-none text-neutral">
            N
          </span>
        </div>
      </header>
      {/* ===== HEADER & BACK BUTTON ===== */}
      {/* MAIN CONTENT */}
      <ResponsiveContainer>
        {/* TITLE & DESCREPTION */}
        <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          <span
            className={
              "text-neutral-700 font-medium text-xs lg:text-sm tracking-widest"
            }
          >
            NEW VENTURE
          </span>
          <h1 className={"text-4xl font-bold my-2 lg:text-5xl"}>
            Project Details
          </h1>
          <p
            className={
              "text-neutral-400 font-semibold text-base lg:text-lg max-w-xl"
            }
          >
            Define your architectural capital project and set your investment
            parameters for institutional review.
          </p>
        </div>
        {/* ===== TITLE & DESCREPTION ===== */}
        {/* FORM */}
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit, onError)}
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
            className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full mt-2.5 mb-2.5 bg-primary text-neutral rounded-xl p-4 active:bg-secondary-200"
          >
            <span className={"font-bold lg:text-lg"}>Submit for Approval</span>
          </button>
          <Link
            to={"/startup/creation-form/submit"}
            className="flex justify-center max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full mb-2.5 text-primary rounded-xl p-3"
          >
            <span className={"font-bold lg:text-lg"}>Cancel</span>
          </Link>
          {/* ===== SUBMIT & CANCEL BUTTONS  ===== */}
        </form>
        {/* ===== FORM ===== */}
      </ResponsiveContainer>
      {/* ===== MAIN CONTENT ===== */}
    </div>
  );
}
