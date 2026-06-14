"use client";

import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="group relative z-10 overflow-hidden border-2 border-primary text-primary font-bold text-lg tracking-[2px] px-12 py-3 rounded-full transition-colors duration-200 hover:text-neutral mt-4 cursor-pointer"
    >
      <span className="absolute inset-0 w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full -z-10"></span>
      Go Back
    </button>
  );
}
