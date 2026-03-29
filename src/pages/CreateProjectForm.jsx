// COMPONENTS
import ResponsiveContainer from "../components/ResponsiveContainer";
import InputFiled from "../components/InputField";
import TextArea from "../components/TextArea";
import FileInput from "../components/FileInput";

// ICONS
import { ArrowLeft } from "lucide-react";

// PAGES LINKS
import { Link } from "react-router-dom";

export default function CreateProjectForm() {
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
        <form className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full">
          <InputFiled
            title="project name"
            placeholder="e.g. Skyline Residency Phase I"
          />
          <TextArea />
          <InputFiled title="funding goal ($)" placeholder="5,000,000$" />
          <InputFiled title="minimum investement ($)" placeholder="10,000$" />
          <FileInput />
          {/* SUBMIT & CANCEL BUTTONS  */}
          <Link
            to={"./submit"}
            className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full mt-5.5 mb-2.5 bg-primary text-neutral rounded-xl p-4 active:bg-secondary-200"
          >
            <span className={"font-bold lg:text-lg"}>Submit for Approval</span>
          </Link>
          <Link
            to={"/"}
            className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full mb-2.5 text-primary rounded-xl p-4"
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
