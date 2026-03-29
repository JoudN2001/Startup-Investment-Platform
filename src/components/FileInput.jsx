export default function FileInput({
  title = "upload cover image",
  hint = "optional",
  isValid = true,
}) {
  return (
    <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto w-full space-y-3">
      {/* ===== FILE LABEL ===== */}
      <div className="mb-2 lg:mb-4 flex flex-wrap justify-between items-center gap-2">
        <label
          // htmlFor="hs-validation-name-error" TODO: what is supported file and validation
          className="block text-sm lg:text-base font-semibold text-primary"
        >
          {title.toUpperCase()}
        </label>
        <span className="block text-xs lg:text-sm text-neutral-500">
          {hint.toUpperCase()}
        </span>
      </div>
      {/* ===== FILE LABEL ===== */}
      
      <label className="block">
        <span className="sr-only">Choose profile photo</span>
        
        <input
          type="file"
          className="block w-full text-sm text-neutral-500 focus:outline-none
          file:me-4 lg:file:me-5 
          file:py-2 lg:file:py-3 
          file:px-4 lg:file:px-5
          file:rounded-lg file:border-0
          file:text-sm lg:file:text-base file:font-semibold
          file:cursor-pointer
          file:bg-primary file:text-neutral hover:file:bg-secondary-200 transition-colors duration-500
          file:disabled:opacity-50 file:disabled:pointer-events-none"
        />
      </label>
    </div>
  );
}