'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import SimulationControls from '@/components/Controls/SimulationControls';
import { api } from '@/lib/api';
import type { Convoy } from '@/types/convoy';
import type { EventType, OperationEvent } from '@/types/event';

const fetchConvoys = () => api.getConvoys();

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/events', label: 'Events' },
  { href: '/conflicts', label: 'Conflicts' },
  { href: '/mobile', label: 'Mobile View' },
];

const EventsPage = () => {
  const pathname = usePathname();
  const { data: convoys = [] } = useSWR<Convoy[]>('/api/convoys', fetchConvoys, { refreshInterval: 15000 });
  const [selectedConvoyId, setSelectedConvoyId] = useState<string | null>(null);
  const selectedConvoy = useMemo(() => {
    if (!convoys.length) return null;
    if (selectedConvoyId) {
      return convoys.find((entry) => entry.id === selectedConvoyId) ?? convoys[0];
    }
    return convoys[0];
  }, [convoys, selectedConvoyId]);
  const [events, setEvents] = useState<OperationEvent[]>([]);
  const [isSimRunning, setIsSimRunning] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const handleTriggerEvent = async (type: EventType) => {
    const severity = type === 'LANDSLIDE' || type === 'BLOCK_ROAD' ? 'HIGH' : 'MEDIUM';
    const notes = selectedConvoy
      ? `Simulated impact for ${selectedConvoy.name}`
      : 'Global training injection';
    const payload = await api.triggerEvent({ type, severity, convoyId: selectedConvoy?.id, notes });
    setEvents((prev) => [payload, ...prev].slice(0, 12));
  };

  return (
    <div className="min-h-screen bg-slateDepth text-textNeutral">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-panelNight/40 bg-panelNight/40 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-textNeutral/60">AICC · Event Lab</p>
            <h1 className="text-2xl font-semibold text-textNeutral">Event Simulation &amp; Reroute Drills</h1>
            <p className="text-sm text-textNeutral/70">
              Inject weather, blockage, and congestion events to observe how convoys respond before pushing to live ops.
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full border px-4 py-2 transition ${
                  pathname === link.href
                    ? 'border-amberCommand text-amberCommand'
                    : 'border-panelNight/40 text-textNeutral/70 hover:border-amberCommand/40 hover:text-textNeutral'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>

        <section className="grid gap-6 rounded-3xl border border-panelNight/40 bg-panelNight/50 p-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase text-textNeutral/50">Convoy under test</p>
              <select
                value={selectedConvoy?.id ?? ''}
                onChange={(event) => {
                  const convoyId = event.target.value || null;
                  setSelectedConvoyId(convoyId);
                }}
                className="mt-2 w-full rounded-xl border border-panelNight/60 bg-slateDepth/80 px-3 py-2 text-sm text-textNeutral"
                disabled={!convoys.length}
              >
                {!convoys.length && <option value="">Loading convoys...</option>}
                {convoys.map((convoy) => (
                  <option key={convoy.id} value={convoy.id} className="bg-panelNight text-textNeutral">
                    {convoy.name} · {convoy.status}
                  </option>
                ))}
              </select>
            </div>

            <SimulationControls
              isRunning={isSimRunning}
              speedMultiplier={speedMultiplier}
              onToggle={() => setIsSimRunning((prev) => !prev)}
              onSpeedChange={setSpeedMultiplier}
              onTriggerEvent={handleTriggerEvent}
            />

            <p className="text-xs text-textNeutral/60">
              TODO: Replace mock trigger with real SSE/WebSocket publication so backend optimisation services receive the event stream.
            </p>
          </div>

          <div className="rounded-2xl border border-panelNight/40 bg-slateDepth/70 p-4">
            <p className="text-xs uppercase text-textNeutral/50">Recent injections</p>
            <div className="mt-3 flex max-h-72 flex-col gap-3 overflow-y-auto">
              {events.length === 0 && <p className="text-sm text-textNeutral/60">No events triggered yet. Inject an event to view the impact log.</p>}
              {events.map((event) => (
                <div key={event.id} className="rounded-xl border border-panelNight/40 bg-panelNight/70 p-3 text-sm">
                  <p className="font-semibold text-textNeutral">{event.type}</p>
                  <p className="text-xs text-textNeutral/60">{new Date(event.triggeredAt).toLocaleString()}</p>
                  <p className="text-textNeutral/80">Severity: {event.payload.severity}</p>
                  {event.convoyId && (
                    <p className="text-textNeutral/70">Convoy: {event.convoyId}</p>
                  )}
                  <p className="text-textNeutral/70">Notes: {event.payload.notes ?? 'n/a'}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EventsPage;
