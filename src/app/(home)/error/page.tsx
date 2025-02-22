// app/error/page.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const message =
    searchParams.get("message") ?? "An unexpected error occurred.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-600">Error</h1>
      <p className="mt-4">{message}</p>
      <a href="/" className="mt-6 text-blue-500">
        Go back home
      </a>
    </div>
  );
}
