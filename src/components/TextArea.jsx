// COMPONENTS
import SuccessIcon from "./SuccessIcon";
import ErrorIcon from "./ErrorIcon";

export default function TextArea({
  title = "descreption",
  placeholder = "Provide a detailed overview of the investment opportunity...",
  isValid = true,
  //   TODO: DOLAR SIGN IN SAME ICON TEXTAREA FIELD (E.G. CORNER HINT FOR OPTIONAL )
}) {
  // TODO: VALIDATION STYLE ON CORRECT AND WRONG
  //   "Looks good!";
  const hint = isValid
    ? ""
    : "Your message should be at least 100 characters long.";
  return (
    // disabled:opacity-50 disabled:pointer-events-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb" rows="3" placeholder="Say hi..." aria-describedby="hs-validation-name-success-helper"
    <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full space-y-5">
      <div>
        {/* TEXTAREA LABEL */}
        <div className="mb-2 flex flex-wrap justify-between items-center gap-2">
          <label
            htmlFor="hs-validation-name-error"
            className="block text-sm lg:text-base font-semibold text-primary"
          >
            {title.toUpperCase()}
          </label>
          <span className="block text-xs lg:text-sm text-neutral-500">
            {/* TODO: ADD Corner hint */}
          </span>
        </div>
        {/* ===== TEXTAREA LABEL ===== */}
        <div className="relative">
          <textarea
            placeholder={placeholder}
            minLength={100}
            maxLength={1000}
            rows="3"
            // id="hs-validation-name-error"
            // name="hs-validation-name-error"
            // TODO: VALIDATION BORDER ICON TEXTAREA
            // border-2 border-error focus:border-error focus:ring-error || sucess
            className="py-4 sm:py-5 lg:h-32 row-auto resize-none px-4 block w-full bg-neutral rounded-lg font-semibold sm:text-xs lg:text-sm text-primary placeholder:text-neutral-700 disabled:opacity-50 disabled:pointer-events-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb"
            required
            // aria-describedby="hs-validation-name-error-helper"
          ></textarea>
          {/* ICON TEXTAREA */}
          {isValid ? (
            // TODO: VALIDATION STYLE ON CORRECT AND WRONG
            <>
              {/* <SuccessIcon /> */}
            </>
          ) : (
            <ErrorIcon />
          )}
          {/* ===== ICON TEXTAREA ===== */}
        </div>
        <p
          className="text-sm text-red-600 mt-2"
          //   id="hs-validation-name-error-helper"
        >
          {hint}
        </p>
      </div>
    </div>
  );
}
