"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-xl font-bold">Sign-up successful!</h1>
        <p className="mt-4">
          Just one more step! Check your email for a confirmation link to
          complete your registration
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Redirecting you to the login page in 3 seconds...
        </p>
      </div>
    </div>
  );
}
