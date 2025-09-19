'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/stores/store';
import { usePathname, useRouter } from 'next/navigation';

/**
 * Client-side AuthProvider
 * - Watches auth state and pathname changes
 * - If token missing/expired (represented by missing currentUser), redirect to /login
 * - Prevents authenticated users from accessing /login and other auth pages
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  React.useEffect(() => {
    // Grouped routes become top-level routes; e.g. (auth)/login => /login
    const isAuthPage =
      pathname?.startsWith('/login') ||
      pathname?.startsWith('/register') ||
      pathname?.startsWith('/forgot-password') ||
      pathname?.startsWith('/reset-password') ||
      pathname?.startsWith('/verify-otp');

    const isAuthenticated = Boolean(currentUser?.user?.token);

    // If not authenticated and not already on an auth page, go to login
    if (!isAuthenticated && !isAuthPage) {
      router.replace('/login');
      return;
    }

    // If authenticated and on auth pages, redirect to a default private page
    if (isAuthenticated && isAuthPage) {
      router.replace('/home');
      return;
    }
  }, [pathname, currentUser, router]);

  return <>{children}</>;
}
