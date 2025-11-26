import type { Convoy } from '@/types/convoy';
import type { OperationEvent } from '@/types/event';
import type { Route } from '@/types/route';

export const fetcher = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || 'Unable to reach API');
  }

  return response.json() as Promise<T>;
};

export type OptimizerRequestPayload = {
  convoyId: string;
  destinationOverride?: { lat: number; lng: number };
};

export type OptimizerResponsePayload = {
  route: Route;
  notes: string[];
};

export type EventRequestPayload = {
  convoyId?: string;
  type: OperationEvent['type'];
  severity: OperationEvent['payload']['severity'];
  notes?: string;
};

export type CheckpointLogPayload = {
  convoyId: string;
  checkpointId: string;
  location: { lat: number; lng: number };
};

export const api = {
  getConvoys: () => fetcher<Convoy[]>('/api/convoys'),
  createConvoy: (body: Partial<Convoy>) =>
    fetcher<Convoy>('/api/convoys', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  requestOptimizerRoute: (body: OptimizerRequestPayload) =>
    fetcher<OptimizerResponsePayload>('/api/optimizer/route', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  triggerEvent: (body: EventRequestPayload) =>
    fetcher<OperationEvent>('/api/events', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  logCheckpoint: (body: CheckpointLogPayload) =>
    fetcher<{ ok: boolean; checkpointId: string }>('/api/checkpoint', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};

/**
 * Minimal real-time abstraction: tries SSE, falls back to interval polling.
 * Replace with socket.io client wiring once a backend channel is ready.
 */
export const createRealtimeBridge = <T>(
  endpoint: string,
  options?: { intervalMs?: number; onError?: (error: Error) => void },
) => {
  const intervalMs = options?.intervalMs ?? 4000;
  let eventSource: EventSource | null = null;
  let interval: NodeJS.Timeout | null = null;

  const start = (onMessage: (payload: T) => void) => {
    if (typeof window !== 'undefined' && window.EventSource) {
      try {
        eventSource = new EventSource(endpoint);
        eventSource.onmessage = (evt) => {
          try {
            onMessage(JSON.parse(evt.data));
          } catch (error) {
            console.error('Realtime bridge parse error', error);
          }
        };
        eventSource.onerror = () => {
          options?.onError?.(new Error('SSE disconnected, using polling fallback.'));
          eventSource?.close();
          eventSource = null;
        };
      } catch (error) {
        options?.onError?.(error as Error);
      }
    }

    if (!eventSource) {
      interval = setInterval(async () => {
        try {
          const data = await fetcher<T>(endpoint);
          onMessage(data);
        } catch (error) {
          options?.onError?.(error as Error);
        }
      }, intervalMs);
    }
  };

  const stop = () => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  return { start, stop };
};
