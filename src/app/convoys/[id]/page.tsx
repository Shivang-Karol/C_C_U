import { notFound } from 'next/navigation';
import convoys from '@/data/mock/convoys.json';
import type { Convoy } from '@/types/convoy';
import MapContainer from '@/components/Map/MapContainer';

export default function ConvoyDetailPage({ params }: { params: { id: string } }) {
  const convoy = (convoys as Convoy[]).find((entry) => entry.id === params.id.toUpperCase());
  if (!convoy) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-slateDepth px-6 py-8 text-textNeutral">
      <div>
        <p className="text-xs uppercase text-textNeutral/60">Convoy detail</p>
        <h1 className="text-3xl font-semibold">{convoy.name}</h1>
        <p className="text-sm text-textNeutral/70">
          Route {convoy.assignedRoute?.name ?? 'unassigned'} · Priority {convoy.priority}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-panelNight/40 bg-panelNight/70 p-4 text-sm">
          <h2 className="text-lg font-semibold">Mission briefing</h2>
          <dl className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <dt className="text-xs uppercase text-textNeutral/50">Origin</dt>
              <dd className="text-textNeutral">{convoy.origin.name}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-textNeutral/50">Destination</dt>
              <dd className="text-textNeutral">{convoy.destination.name}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-textNeutral/50">Vehicles</dt>
              <dd>{convoy.vehicleCount}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-textNeutral/50">Speed</dt>
              <dd>{convoy.speedKmph} km/h</dd>
            </div>
          </dl>
          <div className="mt-6">
            <h3 className="text-xs uppercase text-textNeutral/50">Checkpoints</h3>
            <ul className="mt-2 space-y-2">
              {convoy.assignedRoute?.checkpoints.map((checkpoint) => (
                <li key={checkpoint.id} className="rounded-xl border border-panelNight/40 bg-slateDepth/70 px-3 py-2">
                  <p className="text-sm font-semibold">{checkpoint.name}</p>
                  <p className="text-xs text-textNeutral/60">ETA {new Date(checkpoint.eta).toLocaleTimeString()}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="h-[420px] rounded-2xl border border-panelNight/40 bg-panelNight/80">
          <MapContainer convoys={[convoy]} selectedConvoy={convoy} />
        </section>
      </div>
    </div>
  );
}
