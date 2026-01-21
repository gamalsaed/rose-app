import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginResponse } from '@/lib/types/auth';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        const response = await fetch(`${process.env.BASE_API}/auth/signin`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const payload: ApiResponse<LoginResponse> = await response.json();

        if ('error' in payload) {
          throw new Error(payload.error);
        }

        return {
          id: payload.user?._id, // * authorize must return an object with an id property
          accessToken: payload.token,
          user: payload.user,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => ({
      // * user & token provided by authorize callback return
      ...token,
      ...(user ? { accessToken: user?.accessToken, user: user.user } : {}),
    }),
    session: ({ session, token }) => {
      return {
        ...session,
        // * don't pass the accessToken to the session as it could be vulnerable on the client side
        user: token.user,
      };
    },
  },
};
