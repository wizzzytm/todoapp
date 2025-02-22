import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (!token_hash || !type) {
    return NextResponse.redirect("/error?message=Invalid token or type");
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (error) {
      console.error("Token verification error:", error.message);
      return NextResponse.redirect(
        "/error?message=" + encodeURIComponent(error.message)
      );
      //Converting spaces and characters in error message, so the url doesnt break
    }

    const redirectUrl = new URL(next, request.url);

    return NextResponse.redirect(redirectUrl.toString());
  } catch (err) {
    console.error("Unexpected error during token verification:", err);
    return NextResponse.redirect("/error?message=Unexpected+error");
  }
}
