import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { UserRole } from "./lib/generated/prisma/enums";
import { unauthorized } from "next/navigation";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
    if (!session) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    } else if (session && session.user.role !== UserRole.ADMIN) {
        return NextResponse.redirect(new URL("/not-authorized", request.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: ["/admin/:path*"], // Specify the routes the middleware applies to
};
