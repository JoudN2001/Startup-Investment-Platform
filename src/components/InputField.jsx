// COMPONENTS
import ErrorIcon from "./ErrorIcon";

// REACT
import { forwardRef } from "react";

const InputField = forwardRef(
  (
    { type = "text", title, placeholder, hint, error, icon: Icon, ...rest },
    ref,
  ) => {
    const baseInputClasses =
      "block w-full lg:h-16 bg-neutral rounded-lg font-semibold sm:text-xs lg:text-sm text-primary placeholder:text-neutral-700 disabled:opacity-50 disabled:pointer-events-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb transition-colors duration-200";

    const stateClasses = error
      ? "border-2 border-error focus:border-error focus:ring-error"
      : "border-2 border-transparent focus:border-tertiary-500 focus:ring-tertiary-500"; // Added subtle focus state for success/normal

    const paddingClasses = Icon
      ? "py-4 sm:py-5 pl-12 pr-4"
      : "py-4 sm:py-5 px-4";

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
              {title?.toUpperCase()}
            </label>
            {hint && (
              <span className="block text-xs lg:text-sm text-neutral-500">
                {hint.toUpperCase()}
              </span>
            )}
          </div>
          {/* ===== INPUT FILED LABEL ===== */}

          {/* INPUT FIELD CONTAINER */}
          <div className="relative flex items-center">
            {Icon && (
              <div className="absolute left-4 text-neutral-500 pointer-events-none">
                <Icon className="w-5 h-5" />
              </div>
            )}

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
              className={`${baseInputClasses} ${stateClasses} ${paddingClasses}`}
              required
              aria-describedby={
                error
                  ? "hs-validation-name-error-helper"
                  : "hs-validation-name-sucess-helper"
              }
              aria-invalid={error ? "true" : "false"}
            />

            {/* ERROR ICON INPUT FIELD */}
            {error && (
              <div className="absolute right-4 pointer-events-none">
                <ErrorIcon />
              </div>
            )}
            {/* ===== ERROR ICON INPUT FIELD ===== */}
          </div>
          {/* ===== INPUT FIELD CONTAINER ===== */}

          {/* HINT INPUT FIELD */}
          {error && (
            <p
              className="text-sm text-error mt-2"
              id="hs-validation-name-error-helper"
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
