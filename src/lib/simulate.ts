import type { Convoy } from '@/types/convoy';
import type { Route } from '@/types/route';

export type SimulationTick = {
  convoyId: string;
  coordinate: [number, number];
  progressPercent: number;
};

const interpolate = (start: [number, number], end: [number, number], t: number) => [
  start[0] + (end[0] - start[0]) * t,
  start[1] + (end[1] - start[1]) * t,
] as [number, number];

const coordinateAlongRoute = (route: Route, distancePercent: number): [number, number] => {
  if (!route.polyline.length) return [0, 0] as [number, number];
  const totalSegments = route.polyline.length - 1;
  if (totalSegments <= 0) return route.polyline[0];

  const scaled = distancePercent * totalSegments;
  const segmentIndex = Math.min(Math.floor(scaled), totalSegments - 1);
  const localT = scaled - segmentIndex;
  return interpolate(route.polyline[segmentIndex], route.polyline[segmentIndex + 1], localT);
};

export const createSimulationEngine = (
  convoys: Convoy[],
  options?: { speedMultiplier?: number; tickMs?: number },
) => {
  let tickHandle: NodeJS.Timeout | null = null;
  let progressMap = new Map<string, number>();
  const tickMs = options?.tickMs ?? 2500;
  const speedMultiplier = options?.speedMultiplier ?? 1;

  const start = (onTick: (update: SimulationTick) => void) => {
    tickHandle = setInterval(() => {
      convoys.forEach((convoy) => {
        if (!convoy.assignedRoute) return;
        const prev = progressMap.get(convoy.id) ?? Math.random() * 0.15;
        const increment = 0.01 * speedMultiplier;
        const next = prev + increment > 1 ? 0.02 : prev + increment;
        progressMap.set(convoy.id, next);
        onTick({
          convoyId: convoy.id,
          coordinate: coordinateAlongRoute(convoy.assignedRoute, next * convoy.speedKmph * 0.01),
          progressPercent: Number((next * 100).toFixed(1)),
        });
      });
    }, tickMs);
  };

  const stop = () => {
    if (tickHandle) {
      clearInterval(tickHandle);
      tickHandle = null;
    }
    progressMap = new Map();
  };

  return { start, stop };
};
