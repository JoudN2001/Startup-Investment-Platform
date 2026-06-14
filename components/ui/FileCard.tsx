// ICONS
import { FileText } from "lucide-react";

export default function FileCard({ fileName }: { fileName: string }) {
  return (
    <div className="flex items-center bg-neutral-900 py-4 px-5 gap-2.5 rounded-lg">
      <FileText className="w-6 h-6 stroke-2" />
      <h1 className="font-semibold text-md truncate">{fileName}</h1>
    </div>
  );
}
