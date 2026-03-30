import { User } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    accessToken: string;
    user: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      gender: string;
      phone: string;
      photo: string;
      role: string;
      wishlist: string[];
      addresses: string[];
      createdAt: string;
    };
    rememberMe: 'true' | 'false';
  }

  interface Session {
    user: User['user'];
    rememberMe: 'true' | 'false';
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface JWT extends User {}
}
