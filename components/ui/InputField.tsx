// COMPONENTS
import ErrorIcon from "./ErrorIcon";

// REACT
import { forwardRef, InputHTMLAttributes } from "react";

// TYPES
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  placeholder: string;
  hint?: string;
  error?: { message?: string };
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { type = "text", title, placeholder, hint, error, ...rest },
    ref,
  ) => {
    const baseInputClasses =
      "block w-full lg:h-16 bg-neutral rounded-lg font-semibold sm:text-xs lg:text-sm text-primary placeholder:text-neutral-700 disabled:opacity-50 disabled:pointer-events-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb transition-colors duration-200";

    const stateClasses = error
      ? "border-2 border-error focus:border-error focus:ring-error"
      : "border-2 border-transparent focus:border-tertiary-500 focus:ring-tertiary-500";

    const paddingClasses = "py-4 sm:py-5 px-4";

    return (
      <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full space-y-4 my-3.5 md:my-5">
        <div>
          {/* INPUT FIELD LABEL */}
          <div className="mb-2 flex flex-wrap justify-between items-center gap-2">
            <label
              htmlFor={error ? "hs-validation-name-error" : "hs-validation-name-success"}
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

          {/* INPUT FIELD CONTAINER */}
          <div className="relative flex items-center">
            <input
              type={type}
              placeholder={placeholder}
              ref={ref}
              {...rest}
              id={error ? "hs-validation-name-error" : "hs-validation-name-success"}
              className={`${baseInputClasses} ${stateClasses} ${paddingClasses}`}
              aria-describedby={error ? "hs-validation-name-error-helper" : "hs-validation-name-sucess-helper"}
              aria-invalid={error ? "true" : "false"}
            />

            {/* ERROR ICON */}
            {error && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                <ErrorIcon />
              </div>
            )}
          </div>

          {/* ERROR MESSAGE */}
          <p
            className="text-sm text-error mt-2 h-4"
            id={error ? "hs-validation-name-error-helper" : "hs-validation-name-success-helper"}
          >
            {error?.message}
          </p>
        </div>
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;