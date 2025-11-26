'use client';

import useSWR from 'swr';
import MapContainer from '@/components/Map/MapContainer';
import { api } from '@/lib/api';
import CheckpointButton from '@/components/Mobile/CheckpointButton';
import type { Convoy } from '@/types/convoy';

const MobilePage = () => {
  const { data: convoys = [] } = useSWR<Convoy[]>('/api/convoys', api.getConvoys);
  const convoy = convoys[0];
  const pendingCheckpoint = convoy?.assignedRoute?.checkpoints.find((checkpoint) => checkpoint.status === 'PENDING') ??
    convoy?.assignedRoute?.checkpoints[0];

  return (
    <div className="relative min-h-screen bg-slateDepth pb-24 text-textNeutral">
      <header className="px-4 pt-6">
        <p className="text-xs uppercase text-textNeutral/60">AICC Mobile</p>
        <h1 className="text-2xl font-semibold">Convoy leader view</h1>
      </header>

      <div className="mt-4 h-[60vh] px-4">
        <MapContainer convoys={convoy ? [convoy] : []} selectedConvoy={convoy} />
      </div>

      <section className="mt-4 rounded-t-3xl border border-panelNight/40 bg-panelNight/90 px-4 py-6">
        {convoy ? (
          <div>
            <p className="text-xs uppercase text-textNeutral/60">Mission</p>
            <h2 className="text-xl font-semibold">{convoy.name}</h2>
            <p className="text-sm text-textNeutral/70">
              {convoy.origin.name} → {convoy.destination.name}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-panelNight/40 bg-slateDepth/60 p-3">
                <p className="text-xs uppercase text-textNeutral/50">Status</p>
                <p className="text-base font-semibold">{convoy.status}</p>
              </div>
              <div className="rounded-2xl border border-panelNight/40 bg-slateDepth/60 p-3">
                <p className="text-xs uppercase text-textNeutral/50">Speed</p>
                <p className="text-base font-semibold">{convoy.speedKmph} km/h</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-oliveAux/30 bg-oliveAux/10 p-3 text-sm">
              <p className="text-xs uppercase text-oliveAux">Next checkpoint</p>
              <p className="text-base font-semibold text-textNeutral">{pendingCheckpoint?.name ?? 'Assigned soon'}</p>
              <p className="text-xs text-textNeutral/60">ETA {pendingCheckpoint ? new Date(pendingCheckpoint.eta).toLocaleTimeString() : '—'}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-textNeutral/70">No convoy assigned. HQ will push tasks shortly.</p>
        )}
      </section>

      {convoy && pendingCheckpoint && (
        <CheckpointButton
          convoyId={convoy.id}
          checkpointId={pendingCheckpoint.id}
          onSubmit={async (payload) => {
            await api.logCheckpoint(payload);
          }}
        />
      )}
    </div>
  );
};

export default MobilePage;
