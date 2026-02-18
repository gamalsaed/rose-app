'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
export function SessionGuard({ children }: { children: React.ReactNode }) {
  // Session
  const { data } = useSession();

  // Variables
  const rememberMe = data?.rememberMe;

  // Effect
  useEffect(() => {
    // Fetching Local Storage
    const isAlive = sessionStorage.getItem('isAlive');

    // Check if the session still alive or not

    if (rememberMe === 'false' && isAlive === null) {
      signOut({ redirect: false });
    }
  }, [rememberMe]);

  return <>{children}</>;
}
