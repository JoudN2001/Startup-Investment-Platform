import { History } from "lucide-react";

const LastAction = () => {
  return (
    <div className="flex items-center py-1 px-5 gap-3.5 rounded-lg mb-35">
      <div className="bg-neutral-900 p-3 rounded-full">
        <History className=" w-6.5 h-6.5 stroke-2" />
      </div>
      <div>
        <h1 className="font-semibold text-base">Last Modified</h1>
        <p className="font-medium text-sm">Oct 24, 2025 by System Admin</p>
      </div>
    </div>
  );
};

export default LastAction;
