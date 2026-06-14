"use client"

// REACT
import { forwardRef, InputHTMLAttributes } from "react";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  hint?: string;
  supportedFiles?: string;
  hasFile: boolean;
  onClear: () => void;
  error: any;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      title = "upload cover image",
      hint = "optional",
      supportedFiles = "Only JPG, PNG, and WebP are supported.",
      hasFile,
      onClear,
      error,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full space-y-3 mb-6">
        {/* ===== FILE LABEL ===== */}
        <div className="mb-3 lg:mb-4 flex flex-wrap justify-between items-center gap-2">
          <label
            htmlFor={
              error ? "hs-validation-name-error" : "hs-validation-name-sucess"
            }
            className="block text-sm lg:text-base font-semibold text-primary"
          >
            {title.toUpperCase()}
          </label>

          <div className="flex items-center gap-3">
            {hasFile && onClear && (
              <button
                type="button"
                onClick={onClear}
                className="text-xs lg:text-sm text-error font-bold underline hover:text-error/80 cursor-pointer transition-colors"
              >
                REMOVE
              </button>
            )}
            <span className="block text-xs lg:text-sm text-neutral-500">
              {hint.toUpperCase()}
            </span>
          </div>
        </div>
        {/* ===== FILE LABEL ===== */}
        {/* FILE INPUT */}
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input
            ref={ref}
            {...rest}
            aria-invalid={error ? "true" : "false"}
            type="file"
            className={`block w-full text-sm text-neutral-500 focus:outline-none
          file:me-4 lg:file:me-5 
          file:py-2 lg:file:py-3 
          file:px-4 lg:file:px-5
          file:rounded-lg file:border-0
          file:text-sm lg:file:text-base file:font-semibold
          file:cursor-pointer
          file:bg-primary file:text-neutral hover:file:bg-secondary-200 transition-colors duration-500
          file:disabled:opacity-50 file:disabled:pointer-events-none ${
            error
              ? "text-error file:bg-error file:text-neutral hover:file:bg-error/80"
              : "text-neutral-500 file:bg-primary file:text-neutral hover:file:bg-secondary-200"
          } `}
          />
        </label>
        {/* ===== FILE INPUT ===== */}
        {/* HINT */}
        <p
          className={`text-sm mt-1 ${error ? "text-error" : "text-secondary"}`}
          id="hs-validation-name-error-helper"
        >
          {error ? error.message : supportedFiles}
        </p>
        {/* ===== HINT ===== */}
      </div>
    );
  },
);

export default FileInput;
