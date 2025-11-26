export type EventType = 'BLOCK_ROAD' | 'RAINFALL' | 'LANDSLIDE' | 'CONGESTION' | 'CHECKPOINT';

export type EventPayload = {
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  affectedSegmentId?: string;
  notes?: string;
};

export type OperationEvent = {
  id: string;
  type: EventType;
  triggeredAt: string; // ISO timestamp
  convoyId?: string;
  payload: EventPayload;
};
