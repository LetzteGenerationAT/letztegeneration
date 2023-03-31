import { UserRole } from "@prisma/client";
import { withAuth } from "next-auth/middleware";

console.log("middleware.ts");

const middleware = withAuth({
  callbacks: {
    authorized: ({ token }) =>
      token?.role === UserRole.Ringer || token?.role === UserRole.Admin,
  },
});

export default middleware;

export const config = { matcher: ["/ringer/:path*"] };
