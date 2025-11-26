import { NextResponse } from 'next/server';
import type { CheckpointLogPayload } from '@/lib/api';

export async function POST(request: Request) {
  const payload = (await request.json()) as CheckpointLogPayload;
  return NextResponse.json({ ok: true, checkpointId: payload.checkpointId });
}
