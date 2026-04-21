// ICONS
import { FileText } from "lucide-react";

const FileCard = ({ fileName }) => {
  return (
    <div className="flex items-center bg-neutral-900 py-4 px-5 gap-2.5 rounded-lg">
      <FileText className="w-6 h-6 stroke-2" />
      <h1 className="font-semibold text-md">{fileName}</h1>
    </div>
  );
};

export default FileCard;
