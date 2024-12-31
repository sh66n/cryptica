export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnLoginPage = request.nextUrl.pathname.startsWith("/login");
      const isOnPasswordsPage =
        request.nextUrl.pathname.startsWith("/passwords");

      if (isOnPasswordsPage && !user) {
        return false;
      }

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }
      return true;
    },
  },
};
