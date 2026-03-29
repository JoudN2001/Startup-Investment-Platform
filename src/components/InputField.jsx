// COMPONENTS
import SuccessIcon from "./SuccessIcon";
import ErrorIcon from "./ErrorIcon";

export default function InputField({
  title = "project name",
  placeholder = "e.g. Skyline Residency Phase I",
  isValid = true,
  //   TODO: DOLAR SIGN IN SAME INPUT FIELD (E.G. CORNER HINT FOR OPTIONAL )
}) {
  // TODO: VALIDATION STYLE ON CORRECT AND WRONG
  //   "Looks good!";
  const hint = isValid ? "" : "This field is required.";
  return (
    <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full space-y-4 my-3.5 md:my-5">
      <div>
        {/* INPUT FILED LABEL */}
        <div className="mb-2 flex flex-wrap justify-between items-center gap-2">
          <label
            // TODO: VALIDATION
            // htmlFor="hs-validation-name-error"
            className="block text-sm lg:text-base font-semibold text-primary"
          >
            {title.toUpperCase()}
          </label>
          <span className="block text-xs lg:text-sm text-neutral-500">
            {/* TODO: ADD Corner hint */}
          </span>
        </div>
        {/* ===== INPUT FILED LABEL ===== */}
        {/* INPUT FIELD */}
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder}
            maxLength={100}
            // id="hs-validation-name-error"
            // name="hs-validation-name-error"
            // TODO: VALIDATION BORDER INPUT
            // border-2 border-error focus:border-error focus:ring-error || sucess
            className="py-4 sm:py-5 px-4 block w-full lg:h-16 bg-neutral rounded-lg font-semibold sm:text-xs lg:text-sm text-primary placeholder:text-neutral-700 disabled:opacity-50 disabled:pointer-events-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb"
            required
            // aria-describedby="hs-validation-name-error-helper"
          />
          {/* ICON INPUT FIELD */}
          {isValid ? (
            // TODO: VALIDATION STYLE ON CORRECT AND WRONG
            <>{/* <SuccessIcon/> */}</>
          ) : (
            <ErrorIcon />
          )}
          {/* ===== ICON INPUT FIELD ===== */}
        </div>
        {/* ===== INPUT FIELD ===== */}
        {/* HINT INPUT FIELD */}
        <p
          // TODO: VALIDATION WITH ID, ARIA-DESCRIBEDBY ETC...
          className="text-sm text-error mt-2"
          // id="hs-validation-name-error-helper"
        >
          {hint}
        </p>
        {/* ===== HINT INPUT FIELD ===== */}
      </div>
    </div>
  );
}
