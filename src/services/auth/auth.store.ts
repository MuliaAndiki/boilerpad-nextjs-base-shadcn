import { cookies } from 'next/headers';
import { APP_SESSION_COOKIE_KEY } from '@/configs/cookies.config';

// Server-only: validate if a session cookie exists
export async function authValidator(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(APP_SESSION_COOKIE_KEY);
  return Boolean(session && session.value);
}
