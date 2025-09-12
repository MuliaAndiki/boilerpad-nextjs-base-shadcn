import React from 'react';
// import { redirect } from 'next/navigation';
// import { authValidator } from '@/services/auth/auth.store';

export default async function Authproviders({ children }: { children: React.ReactNode }) {
  // const isAuth = await authValidator();

  // if (isAuth) {
  //   redirect('/home');
  // }

  return <>{children}</>;
}
