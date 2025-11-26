import { NextResponse } from 'next/server';
import type { OptimizerRequestPayload } from '@/lib/api';
import type { Route } from '@/types/route';
import convoys from '@/data/mock/convoys.json';
import type { Convoy } from '@/types/convoy';

export async function POST(request: Request) {
  const body = (await request.json()) as OptimizerRequestPayload;
  const convoy = (convoys as Convoy[]).find((entry) => entry.id === body.convoyId);
  if (!convoy) {
    return NextResponse.json({ error: 'Convoy not found' }, { status: 404 });
  }

  const baseRoute = convoy.assignedRoute;
  const optimizedRoute: Route = baseRoute
    ? {
        ...baseRoute,
        etaHours: Math.max(1, baseRoute.etaHours - 2),
        distanceKm: Math.max(1, baseRoute.distanceKm - 30),
        riskScore: Math.max(5, baseRoute.riskScore - 8),
      }
    : {
        id: `RTE-${body.convoyId}`,
        name: 'Optimizer Draft',
        etaHours: 10,
        distanceKm: 200,
        riskScore: 20,
        polyline: [
          [convoy.origin.lng, convoy.origin.lat],
          [convoy.destination.lng, convoy.destination.lat],
        ],
        checkpoints: [],
        segments: [],
      };

  if (body.destinationOverride) {
    optimizedRoute.polyline = [
      [convoy.origin.lng, convoy.origin.lat],
      [body.destinationOverride.lng, body.destinationOverride.lat],
    ];
  }

  return NextResponse.json({
    route: optimizedRoute,
    notes: [
      'Simulated OR-Tools optimizer response.',
      'TODO: Replace with backend service call once available.',
    ],
  });
}
