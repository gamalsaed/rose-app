import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default async function middleWare(request: NextRequest) {
  // TODO: Add our custom middleware logic here like NextAuth
  // TODO: when integrating NextAuth, check for this integration example: https://next-intl.dev/docs/routing/middleware#example-auth-js
  const response = createMiddleware(routing)(request);

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
