// COMPONENTS
import ProgressBar from "@/components/ui/ProgressBar";

export default function SubmitProject() {
  return (
    <div className="flex flex-col rounded-2xl shadow-sm bg-neutral p-6 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
      {/* TODO: loading icon and animaion */}
      <h1 className={"text-3xl font-bold my-2"}>Submitting for Approval...</h1>
      <p className={"text-neutral-400 font-medium text-base/6"}>
        We're preparing your project for institutional review. This process
        ensures all financial compliance standars are met.
      </p>
      <ProgressBar
        title="verification syncing"
        percentageBar={75}
        percentage={"75%"}
      />
      <hr
        className={"border-tertiary-900/75 border-x rounded-4xl mt-10 mb-2 "}
      />
      {/* 
          TODO: CHEKING POINT PROGRESS E.G.
          - ENCRYPTING ASSETS AND DOCUMENTATION
          - VALIDATING INVESTMENT TIERS
          - ROUTING TO COMPLIANCE COMMITTEE
          */}
    </div>
  );
}
