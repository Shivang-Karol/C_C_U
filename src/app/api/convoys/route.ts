import { NextResponse } from 'next/server';
import type { Convoy } from '@/types/convoy';
import seedConvoys from '@/data/mock/convoys.json';

const convoyStore: Convoy[] = (seedConvoys as Convoy[]).map((convoy) => ({ ...convoy }));

export async function GET() {
  return NextResponse.json(convoyStore);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<Convoy>;
  const newConvoy: Convoy = {
    id: payload.id ?? `CVY-${(convoyStore.length + 1).toString().padStart(3, '0')}`,
    name: payload.name ?? 'New Convoy',
    origin: payload.origin ?? { lat: 0, lng: 0 },
    destination: payload.destination ?? { lat: 0, lng: 0 },
    speedKmph: payload.speedKmph ?? 50,
    priority: payload.priority ?? 'BRAVO',
    vehicleCount: payload.vehicleCount ?? 10,
    status: payload.status ?? 'PLANNED',
    lastUpdated: new Date().toISOString(),
    assignedRoute: payload.assignedRoute,
    etaHours: payload.etaHours ?? 12,
    mergeSuggestion: payload.mergeSuggestion,
  };

  convoyStore.push(newConvoy);
  return NextResponse.json(newConvoy, { status: 201 });
}
