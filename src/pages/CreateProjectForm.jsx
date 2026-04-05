// COMPONENTS
import ResponsiveContainer from "../components/ResponsiveContainer";
import InputFiled from "../components/InputField";
import TextArea from "../components/TextArea";
import FileInput from "../components/FileInput";

// ICONS
import { ArrowLeft } from "lucide-react";

// REACT ROUTER
import { Link, useNavigate } from "react-router-dom";

// SHEMA VALIDATION LIBRARY
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// FORM LIBRARY
import { useForm } from "react-hook-form";

// const project = z.object({
//   id: z.uuid(),
//   title: ,
//   description: ,
//   status: ,
//   fundingGoal: ,
//   fundedPersentage: ,
//   minmumInvestement: ,
//   thumbnail:
// })

// VALIDATION DATA FIELD CHECK
const createProjectFormSchema = z.object({
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
    .min(50, "Too short! Must be more than 50 characters.")
    .max(1000, "Too long! Must be less than 1000 characters."),
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
});

export default function CreateProjectForm() {
  const navigate = useNavigate();
  // USEFORM HOOK WITH SECHEMA VALIDATION
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
  } = useForm({
    resolver: zodResolver(createProjectFormSchema),
  });

  const thumbnailFile = watch("thumbnail");
  const hasFile = thumbnailFile && thumbnailFile.length > 0;

  // HANDEL SUBMIT FORM
  const onSubmit = (data) => {
    console.log("Form data validated and ready to send!");
    navigate("./submit");
    console.log(data);
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
          <Link to={"/"}>
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
            title="minimum investement ($)"
            placeholder="10,000$"
            hint="USD"
            error={errors.minmumInvestement}
            {...register("minmumInvestement")}
          />
          <FileInput
            error={errors.thumbnail}
            {...register("thumbnail")}
            hasFile={hasFile}
            onClear={() => resetField("thumbnail")}
          />
          {/* SUBMIT & CANCEL BUTTONS  */}
          <button
            type="submit"
            className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full mt-5.5 mb-2.5 bg-primary text-neutral rounded-xl p-4 active:bg-secondary-200"
          >
            <span className={"font-bold lg:text-lg"}>Submit for Approval</span>
          </button>
          <Link
            to={"/"}
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
