import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const MOTION_ACCESS_COOKIE = 'motion_access';

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function readMotionPassword(): string {
  return process.env.MOTION_ACCESS_PASSWORD?.trim() ?? '';
}

function readMotionSecret(): string {
  return (
    process.env.MOTION_ACCESS_SECRET?.trim() ||
    process.env.IMAGEKIT_PRIVATE_KEY?.trim() ||
    'motion-access-dev-secret'
  );
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

/** True when `MOTION_ACCESS_PASSWORD` is set — Motion requires a password. */
export function isMotionPasswordProtected(): boolean {
  return readMotionPassword().length > 0;
}

export function verifyMotionPassword(candidate: string): boolean {
  const expected = readMotionPassword();
  if (!expected) return true;
  return safeEqual(candidate, expected);
}

export function createMotionAccessToken(): string {
  return createHmac('sha256', readMotionSecret())
    .update(`motion-access:${readMotionPassword()}`)
    .digest('hex');
}

export function hasValidMotionAccess(cookieValue: string | undefined): boolean {
  if (!isMotionPasswordProtected()) return true;
  if (!cookieValue) return false;
  return safeEqual(cookieValue, createMotionAccessToken());
}

export async function getMotionAccessFromCookies(): Promise<boolean> {
  const cookieStore = await cookies();
  return hasValidMotionAccess(cookieStore.get(MOTION_ACCESS_COOKIE)?.value);
}

export function motionAccessCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: COOKIE_MAX_AGE_SECONDS,
  };
}
