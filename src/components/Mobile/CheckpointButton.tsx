'use client';

import { useState } from 'react';
import type { CheckpointLogPayload } from '@/lib/api';

export type CheckpointButtonProps = {
  onSubmit: (payload: CheckpointLogPayload) => Promise<void>;
  convoyId: string;
  checkpointId: string;
};

export const CheckpointButton = ({ onSubmit, convoyId, checkpointId }: CheckpointButtonProps) => {
  const [busy, setBusy] = useState(false);
  const handlePress = async () => {
    setBusy(true);
    await onSubmit({
      convoyId,
      checkpointId,
      location: { lat: 0, lng: 0 }, // TODO: wire GPS once backend/mobile app is ready.
    });
    setBusy(false);
  };

  return (
    <button
      type="button"
      onClick={handlePress}
      disabled={busy}
      className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-amberCommand px-8 py-4 text-base font-semibold text-black shadow-command"
    >
      {busy ? 'Logging…' : 'Log Checkpoint'}
    </button>
  );
};

export default CheckpointButton;
