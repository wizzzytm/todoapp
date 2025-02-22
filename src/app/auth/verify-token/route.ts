import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const token_hash = searchParams.get("token_hash");

  if (!token_hash) {
    return NextResponse.json({ error: "Token missing" }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      type: "recovery",
      token_hash,
    });

    if (error) {
      console.error("Recovery token error:", error.message);
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Unexpected error during recovery:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
