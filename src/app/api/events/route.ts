import { NextResponse } from 'next/server';
import type { OperationEvent } from '@/types/event';
import type { EventRequestPayload } from '@/lib/api';

export async function POST(request: Request) {
  const payload = (await request.json()) as EventRequestPayload;
  const event: OperationEvent = {
    id: `EVT-${Date.now()}`,
    convoyId: payload.convoyId,
    type: payload.type,
    triggeredAt: new Date().toISOString(),
    payload: {
      severity: payload.severity,
      notes: payload.notes ?? 'Simulated event',
    },
  };

  return NextResponse.json(event, { status: 201 });
}
