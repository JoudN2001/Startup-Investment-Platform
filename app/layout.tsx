import type { Metadata } from "next";
import "./globals.css";
import { ProjectsProvider } from "@/contexts/ProjectsContext";

export const metadata: Metadata = {
  title: "Startup Investment Platform",
  description:
    "Start your own project or invest in interesting ideas on our platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ProjectsProvider>{children}</ProjectsProvider>
      </body>
    </html>
  );
}
