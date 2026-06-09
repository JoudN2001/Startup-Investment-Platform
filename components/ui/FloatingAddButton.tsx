// ICONS
import { Plus } from "lucide-react";

// COMPONENTS
import LinkButton from "./LinkButton";

export default function FloatingAddButton() {
  return (
    <LinkButton
      href={"/startup/creation-form"}
      className="fixed md:hidden bottom-35 right-5 bg-primary text-neutral rounded-full p-4 active:bg-secondary-200 z-50"
    >
      <Plus className={" text-neutral rounded-full w-8 h-8 stroke-3 "} />
    </LinkButton>
  );
}
