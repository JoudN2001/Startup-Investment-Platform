// COMPONENTS
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";
import ProgressBar from "@/components/ui/ProgressBar";
import LinkButton from "@/components/ui/LinkButton";

// ICONS
import { ArrowLeft } from "lucide-react";

export default function SubmitNewAccount() {
  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <ResponsiveContainer>
        <div className="flex flex-col rounded-2xl shadow-sm bg-neutral p-6 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          {/* TODO: loading icon and animaion */}
          <h1 className={"text-3xl font-bold my-2"}>Creating New Account...</h1>
          <p className={"text-neutral-400 font-medium text-base/6"}>
            We're preparing your account for investment. This process ensures
            all data compliance standars are met, check your email to confirm.
          </p>
          <ProgressBar
            title="verification syncing"
            percentageBar={75}
            percentage={"75%"}
          />
          <hr className="border-tertiary-900/75 border-x rounded-4xl mt-10 mb-2" />
          {/* 
          TODO: CHEKING POINT PROGRESS E.G.
          - ENCRYPTING ASSETS AND DOCUMENTATION
          - VALIDATING INVESTMENT TIERS
          - ROUTING TO COMPLIANCE COMMITTEE
          */}
          <LinkButton
            href="/"
            className="mx-auto w-full mt-5 cursor-pointer bg-primary text-neutral rounded-xl p-4 hover:bg-primary-100 active:bg-secondary-200 transition-colors"
          >
            <span className="font-bold lg:text-lg flex justify-center gap-2.5 items-center">
              <ArrowLeft className="w-6 h-6 stroke-3" />
              BACK TO HOME
            </span>
          </LinkButton>
        </div>
      </ResponsiveContainer>
    </div>
  );
}
