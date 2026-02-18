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
        rememberMe: {},
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
          rememberMe: credentials?.rememberMe,
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.token = user.accessToken;
        token.rememberMe = user.rememberMe;
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: token.user,
        rememberMe: token.rememberMe,
      };
    },
  },
};
