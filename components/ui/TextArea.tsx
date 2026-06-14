// COMPONENTS
import ErrorIcon from "./ErrorIcon";

// REACT
import { forwardRef, TextareaHTMLAttributes } from "react";

// TYPES
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  title?: string;
  placeholder?: string;
  hint?: string;
  error?: { message?: string };
  bgColor?: string;
}

const TextArea = forwardRef <HTMLTextAreaElement, TextAreaProps>(
  (
    {
      title = "description",
      placeholder = "Provide a detailed overview of the investment opportunity...",
      hint = "",
      error,
      bgColor = "bg-neutral",
      ...rest
    },
    ref,
  ) => {
    return (
      <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full space-y-5">
        <div>
          {/* TEXTAREA LABEL */}
          <div className="mb-2 flex flex-wrap justify-between items-center gap-2">
            <label
              htmlFor={
                error
                  ? "hs-validation-name-error"
                  : "hs-validation-name-success"
              }
              className="block text-sm lg:text-base font-semibold text-primary"
            >
              {title.toUpperCase()}
            </label>
            <span className="block text-xs lg:text-sm text-neutral-500">
              {hint.toUpperCase()}
            </span>
          </div>
          {/* ===== TEXTAREA LABEL ===== */}
          <div className="relative">
            <textarea
              placeholder={placeholder}
              rows={3}
              ref={ref}
              {...rest}
              // aria-invalid={error ? "true" : "false"}
              id={
                error
                  ? "hs-validation-name-error"
                  : "hs-validation-name-success"
              }
              className={
                error
                  ? `border-2 border-error focus:border-error focus:ring-error py-4 sm:py-5 px-4 block w-full lg:h-16 ${bgColor} rounded-lg font-semibold sm:text-xs lg:text-sm text-primary placeholder:text-neutral-700 disabled:opacity-50 disabled:pointer-events-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb`
                  : `py-4 sm:py-5 px-4 block w-full lg:h-16 ${bgColor} rounded-lg font-semibold sm:text-xs lg:text-sm text-primary placeholder:text-neutral-700 disabled:opacity-50 disabled:pointer-events-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb`
              }
              required
              aria-describedby={
                error
                  ? "hs-validation-name-error-helper"
                  : "hs-validation-name-sucess-helper"
              }
            ></textarea>
            {/* ICON TEXTAREA */}
            {error && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                <ErrorIcon />
              </div>
            )}
            {/* ===== ICON TEXTAREA ===== */}
          </div>
          <p
            className="text-sm text-red-600 mt-2"
            id={
              error
                ? "hs-validation-name-error-helper"
                : "hs-validation-name-sucess-helper"
            }
          >
            {error?.message}
          </p>
        </div>
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
