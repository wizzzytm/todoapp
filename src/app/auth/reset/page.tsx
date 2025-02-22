"use client";

import { ResetPasswordPreview } from "@/components/ui/auth-form";
import { notFound, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token_hash");

  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        notFound();
        return;
      }

      try {
        const response = await fetch(`/api/verify-token?token_hash=${token}`);
        if (!response.ok) {
          setIsValid(false);
        } else {
          setIsValid(true);
        }
      } catch (error) {
        console.error("Failed to verify token:", error);
        setIsValid(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isValid === null) {
    return <p>Loading...</p>;
  }

  if (!isValid) {
    notFound();
  }

  return (
    <div className="mt-6">
      <ResetPasswordPreview />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading reset form...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
