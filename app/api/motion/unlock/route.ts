import { NextResponse } from 'next/server';
import {
  createMotionAccessToken,
  isMotionPasswordProtected,
  motionAccessCookieOptions,
  MOTION_ACCESS_COOKIE,
  verifyMotionPassword,
} from '@/lib/motionAccess';

export async function POST(request: Request) {
  if (!isMotionPasswordProtected()) {
    return NextResponse.json({ ok: true });
  }

  let password = '';

  try {
    const body = (await request.json()) as { password?: string };
    password = body.password?.trim() ?? '';
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!verifyMotionPassword(password)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    MOTION_ACCESS_COOKIE,
    createMotionAccessToken(),
    motionAccessCookieOptions(),
  );

  return response;
}
