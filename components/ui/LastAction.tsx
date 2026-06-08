import { History } from "lucide-react";

export default function LastAction ({ lastUpdate }: { lastUpdate: string }) {
  return (
    lastUpdate && (
      <div className="flex items-center py-1 px-5 gap-3.5 rounded-lg mb-35">
        <div className="bg-neutral-900 p-3 rounded-full">
          <History className=" w-6.5 h-6.5 stroke-2" />
        </div>
        <div>
          <h1 className="font-semibold text-base">Last Modified</h1>
          <p className="font-medium text-sm">{lastUpdate} by System Admin</p>
        </div>
      </div>
    )
  );
};
