'use server';

import { NextResponse } from 'next/server';

import { cookies } from 'next/headers';
import { APP_SESSION_COOKIE_KEY } from '@/src/config/cookies.config';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete(APP_SESSION_COOKIE_KEY);

  return NextResponse.json({ message: 'Session deleted' });
}
