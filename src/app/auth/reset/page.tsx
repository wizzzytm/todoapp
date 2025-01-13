"use client";
import { ResetPasswordPreview } from "@/components/ui/auth-form";
import { notFound, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token_hash");

  if (!token) {
    notFound();
  }
  const verifyToken = async () => {
    const response = await fetch(`/api/verify-token?token_hash=${token}`);
    if (!response.ok) {
      notFound();
    }
  };

  verifyToken();

  return <ResetPasswordPreview />;
}
