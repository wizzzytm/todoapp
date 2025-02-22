"use client";
import { ResetPasswordPreview } from "@/components/ui/auth-form";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

// Wrap the component in Suspense to handle client-side searchParams
function ResetPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token_hash");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        router.replace("/error?message=Missing token");
        return;
      }

      try {
        const response = await fetch(`/auth/verify-token?token_hash=${token}`);
        if (!response.ok) {
          router.replace("/error?message=Invalid token");
        }
      } catch (err) {
        console.log(err);
        router.replace("/error?message=Verification failed");
      }
    };

    verifyToken();
  }, [token, router]);

  if (!token) return null;

  return (
    <div className="mt-6">
      <ResetPasswordPreview />
    </div>
  );
}

// Main page component with Suspense boundary
export default function ResetPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPageContent />
    </Suspense>
  );
}
