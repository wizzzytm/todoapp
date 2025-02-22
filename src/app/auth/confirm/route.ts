import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const createErrorUrl = (message: string) => {
    const errorUrl = new URL("/error", request.url);
    errorUrl.searchParams.set("message", message);
    return errorUrl.toString();
  };

  if (!token_hash || !type) {
    return NextResponse.redirect(createErrorUrl("Invalid token or type"));
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (error) {
      console.error("Token verification error:", error.message);
      return NextResponse.redirect(createErrorUrl(error.message));
    }

    const redirectUrl = new URL(next, request.url);
    redirectUrl.searchParams.set("token_hash", token_hash);
    return NextResponse.redirect(redirectUrl.toString());
  } catch (err) {
    console.error("Unexpected error during token verification:", err);
    return NextResponse.redirect(createErrorUrl("Unexpected error"));
  }
}
