// COMPONENTS
import MobileNavBar from "../components/MobileNavBar";
import Header from "../components/Header";
import ResponsiveContainer from "../components/ResponsiveContainer";
import ProgressBar from "../components/ProgressBar";

export default function SubmitProjectInvestment() {
  return (
    <div className={"bg-neutral-950 w-full min-h-dvh"}>
      <Header title={"Investor Dashboard"} role={"investor"} />
      <ResponsiveContainer>
        <div className="flex flex-col rounded-2xl shadow-sm bg-neutral p-6 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          {/* TODO: loading icon and animaion */}
          <h1 className={"text-3xl font-bold my-2"}>
            Submitting your Invest...
          </h1>
          <p className={"text-neutral-400 font-medium text-base/6"}>
            We're preparing your investment for project. This process ensures
            all financial compliance standars are met.
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
        </div>
      </ResponsiveContainer>
      <MobileNavBar role="investor" />
    </div>
  );
}
