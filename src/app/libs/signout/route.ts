import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error.message);
        return NextResponse.json(
          { error: "Failed to sign out" },
          { status: 500 }
        );
      }

      const cookieStore = await cookies();
      cookieStore.delete("sb-access-token");
      cookieStore.delete("sb-refresh-token");
      console.log("User signed out successfully.");
    }

    revalidatePath("/", "layout");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  } catch (err) {
    console.error("Unexpected error during sign out:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
