import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/auth") &&
    !request.nextUrl.pathname.startsWith("/auth/reset");

  if (request.nextUrl.pathname === "/auth/signout") {
    return NextResponse.next();
  }

  // if (request.nextUrl.pathname === "/auth/reset") {
  //   const token_hash = request.nextUrl.searchParams.get("token_hash");
  //   if (!token_hash) {
  //     const url = request.nextUrl.clone();
  //     url.pathname = "/404";
  //     return NextResponse.redirect(url);
  //   }
  //   const { data, error } = await supabase.auth.verifyOtp({
  //     type: "recovery",
  //     token_hash,
  //   });
  //   if (error || !data) {
  //     console.error("Invalid token in middleware:", error?.message);
  //     const url = request.nextUrl.clone();
  //     url.pathname = "/404";
  //     return NextResponse.redirect(url);
  //   }
  // }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (!user && !isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
