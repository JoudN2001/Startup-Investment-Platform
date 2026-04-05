// COMPONENTS
import ErrorIcon from "./ErrorIcon";

// REACT
import { forwardRef } from "react";

const InputField = forwardRef(
  ({ type = "text", title, placeholder, hint, error, ...rest }, ref) => {
    return (
      <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full space-y-4 my-3.5 md:my-5">
        <div>
          {/* INPUT FILED LABEL */}
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
          {/* ===== INPUT FILED LABEL ===== */}
          {/* INPUT FIELD */}
          <div className="relative">
            <input
              type={type}
              placeholder={placeholder}
              ref={ref}
              {...rest}
              id={
                error
                  ? "hs-validation-name-error"
                  : "hs-validation-name-success"
              }
              className={
                error
                  ? "border-2 border-error focus:border-error focus:ring-error py-4 sm:py-5 px-4 block w-full lg:h-16 bg-neutral rounded-lg font-semibold sm:text-xs lg:text-sm text-primary placeholder:text-neutral-700 disabled:opacity-50 disabled:pointer-events-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb"
                  : "py-4 sm:py-5 px-4 block w-full lg:h-16 bg-neutral rounded-lg font-semibold sm:text-xs lg:text-sm text-primary placeholder:text-neutral-700 disabled:opacity-50 disabled:pointer-events-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb"
              }
              required
              aria-describedby={
                error
                  ? "hs-validation-name-error-helper"
                  : "hs-validation-name-sucess-helper"
              }
              aria-invalid={error ? "true" : "false"}
            />
            {/* ICON INPUT FIELD */}
            {error && <ErrorIcon />}
            {/* ===== ICON INPUT FIELD ===== */}
          </div>
          {/* ===== INPUT FIELD ===== */}
          {/* HINT INPUT FIELD */}
          {error && (
            <p
              className="text-sm text-error mt-2"
              id={
                error
                  ? "hs-validation-name-error-helper"
                  : "hs-validation-name-sucess-helper"
              }
            >
              {error?.message}
            </p>
          )}
          {/* ===== HINT INPUT FIELD ===== */}
        </div>
      </div>
    );
  },
);

export default InputField;
