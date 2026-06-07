import Link from "next/link";

interface LinkButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}
export default function LinkButton({
  href,
  className = "",
  children,
}: LinkButtonProps) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
