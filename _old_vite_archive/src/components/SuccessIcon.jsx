export default function SuccessIcon() {
  return (
    <div className="absolute inset-y-0 end-0 flex items-start p-5 pointer-events-none pe-3">
      <svg
        className="shrink-0 size-4 text-success"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}
