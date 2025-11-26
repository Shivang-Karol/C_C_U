'use client';

import { useState } from 'react';
import type { OptimizerResponsePayload } from '@/lib/api';

export type OptimizerModalProps = {
  open: boolean;
  isLoading?: boolean;
  result?: OptimizerResponsePayload | null;
  onClose: () => void;
  onSubmit: (override?: { lat: number; lng: number }) => Promise<void>;
};

export const OptimizerModal = ({ open, isLoading, result, onClose, onSubmit }: OptimizerModalProps) => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async () => {
    setError(null);
    if (lat && isNaN(Number(lat))) {
      setError('Latitude must be numeric');
      return;
    }
    if (lng && isNaN(Number(lng))) {
      setError('Longitude must be numeric');
      return;
    }

    await onSubmit(lat && lng ? { lat: Number(lat), lng: Number(lng) } : undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-panelNight/60 bg-panelNight p-6 shadow-command">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-textNeutral/50">Optimizer</p>
            <h2 className="text-xl font-semibold text-textNeutral">Request dynamic reroute</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-panelNight px-3 py-1 text-sm"
            aria-label="Close optimizer"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <label className="flex flex-col gap-1">
            <span className="text-[11px] uppercase text-textNeutral/50">Lat override</span>
            <input
              value={lat}
              onChange={(event) => setLat(event.target.value)}
              placeholder="Optional"
              className="rounded-md border border-panelNight bg-slateDepth px-3 py-2 focus:border-amberCommand focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] uppercase text-textNeutral/50">Lng override</span>
            <input
              value={lng}
              onChange={(event) => setLng(event.target.value)}
              placeholder="Optional"
              className="rounded-md border border-panelNight bg-slateDepth px-3 py-2 focus:border-amberCommand focus:outline-none"
            />
          </label>
        </div>

        {error && <p className="mt-2 text-xs text-dangerAlert">{error}</p>}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-full bg-amberCommand px-4 py-2 text-sm font-semibold text-black"
            disabled={isLoading}
          >
            {isLoading ? 'Optimizing…' : 'Run Optimizer'}
          </button>
          {result && (
            <div className="text-xs text-textNeutral/70">
              <p>ETA: {result.route.etaHours}h · Distance: {result.route.distanceKm}km</p>
              <ul className="list-disc pl-5">
                {result.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptimizerModal;
