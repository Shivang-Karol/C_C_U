'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import MapContainer from '@/components/Map/MapContainer';
import NotificationToast, { type Toast } from '@/components/NotificationToast';
import OptimizerModal from '@/components/OptimizerModal';
import ConvoyList from '@/components/ConvoyList';
import { api } from '@/lib/api';
import { createSimulationEngine } from '@/lib/simulate';
import type { Convoy } from '@/types/convoy';
import type { OperationEvent } from '@/types/event';

const fetchConvoys = () => api.getConvoys();

const DashboardPage = () => {
  const { data: convoys = [], isLoading, mutate } = useSWR<Convoy[]>('/api/convoys', fetchConvoys, {
    refreshInterval: 15000,
  });
  const pathname = usePathname();
  const [selectedConvoy, setSelectedConvoy] = useState<Convoy | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const speedMultiplier = 1;
  const [livePositions, setLivePositions] = useState<Record<string, [number, number]>>({});
  const [optimizerOpen, setOptimizerOpen] = useState(false);
  const [optimizerLoading, setOptimizerLoading] = useState(false);
  const [optimizerResult, setOptimizerResult] = useState<Awaited<ReturnType<typeof api.requestOptimizerRoute>> | null>(null);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    if (!convoys.length) return;
    setSelectedConvoy((current) => current ?? convoys[0]);
  }, [convoys]);

  useEffect(() => {
    if (!convoys.length) return;
    const engine = createSimulationEngine(convoys, { speedMultiplier, tickMs: 2500 });
    engine.start(({ convoyId, coordinate }) => {
      setLivePositions((prev) => ({ ...prev, [convoyId]: coordinate }));
    });
    return () => engine.stop();
  }, [convoys, speedMultiplier]);

  useEffect(() => {
    const highRiskConvoy = convoys.find((convoy) => convoy.assignedRoute?.riskScore && convoy.assignedRoute.riskScore > 50);
    if (highRiskConvoy) {
      const toastId = `risk-${highRiskConvoy.id}`;
      setToasts((prev) =>
        prev.some((toast) => toast.id === toastId)
          ? prev
          : [
              ...prev,
              {
                id: toastId,
                title: 'Conflict risk detected',
                description: `${highRiskConvoy.name} exceeds risk threshold. Consider reroute.`,
                tone: 'warning',
                actionLabel: 'Open details',
                onAction: () => setSelectedConvoy(highRiskConvoy),
              },
            ],
      );
    }
  }, [convoys]);

  const handleReroute = async (override?: { lat: number; lng: number }) => {
    if (!selectedConvoy) return;
    setOptimizerLoading(true);
    try {
      const response = await api.requestOptimizerRoute({ convoyId: selectedConvoy.id, destinationOverride: override });
      setOptimizerResult(response);
      setToasts((prev) => [
        ...prev,
        {
          id: `optimizer-${Date.now()}`,
          title: 'Route optimized',
          description: `New ETA ${response.route.etaHours}h · distance ${response.route.distanceKm}km`,
          tone: 'success',
          actionLabel: 'Undo reroute',
          onAction: () => setOptimizerResult(null),
        },
      ]);
      await mutate();
    } finally {
      setOptimizerLoading(false);
    }
  };

  const dismissToast = (id: string) => setToasts((prev) => prev.filter((toast) => toast.id !== id));

  const timelineItems = useMemo(() => {
    return (
      selectedConvoy?.assignedRoute?.checkpoints.map((checkpoint) => ({
        id: checkpoint.id,
        type: 'CHECKPOINT' as OperationEvent['type'],
        convoyId: selectedConvoy?.id,
        triggeredAt: checkpoint.loggedAt ?? checkpoint.eta,
        payload: { severity: checkpoint.status === 'CLEARED' ? 'LOW' : 'MEDIUM', notes: checkpoint.name },
      })) ?? []
    );
  }, [selectedConvoy]);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/events', label: 'Events' },
    { href: '/conflicts', label: 'Conflicts' },
    { href: '/mobile', label: 'Mobile View' },
  ];

  return (
    <div className="flex h-screen flex-col bg-slateDepth text-textNeutral lg:flex-row">
      <div className="hidden lg:block">
        <Sidebar
          convoys={convoys}
          loading={isLoading}
          selectedId={selectedConvoy?.id}
          onSelect={(convoy) => setSelectedConvoy(convoy)}
        />
      </div>

      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-panelNight/40 bg-panelNight/40 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-textNeutral/60">AICC Command Center</p>
            <h1 className="text-2xl font-semibold text-textNeutral">Operational picture</h1>
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
          <div className="flex items-center gap-4 text-xs">
            <div className="rounded-xl border border-panelNight/40 px-4 py-2 text-center">
              <p className="text-textNeutral/50">Connected</p>
              <p className="text-emerald-300">Secure mesh</p>
            </div>
            <div className="rounded-xl border border-panelNight/40 px-4 py-2 text-center">
              <p className="text-textNeutral/50">Sim speed</p>
              <p className="text-amberCommand">{speedMultiplier.toFixed(2)}x</p>
            </div>
            <button
              type="button"
              onClick={() => setHighContrast((prev) => !prev)}
              className="rounded-full border border-amberCommand/40 px-3 py-2 text-xs"
            >
              {highContrast ? 'Standard mode' : 'High contrast'}
            </button>
            <div className="flex items-center gap-2 rounded-full border border-panelNight/40 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
              <span>Commander</span>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 overflow-hidden p-4">
          <div className="lg:hidden">
            <ConvoyList
              convoys={convoys}
              loading={isLoading}
              selectedId={selectedConvoy?.id}
              onSelect={(convoy) => setSelectedConvoy(convoy)}
            />
          </div>

          <div className="flex flex-1 flex-col gap-4 lg:flex-row">
            <div className="flex-1 overflow-hidden">
              <MapContainer
                convoys={convoys}
                selectedConvoy={selectedConvoy ?? undefined}
                livePositions={livePositions}
                highContrast={highContrast}
                onRouteClick={(segmentId) =>
                  setToasts((prev) => [
                    ...prev,
                    {
                      id: `segment-${segmentId}`,
                      title: 'Segment inspected',
                      description: `Segment ${segmentId} clicked`,
                    },
                  ])
                }
              />
            </div>
            <aside className="w-full rounded-2xl border border-panelNight/40 bg-panelNight/80 p-4 lg:w-96">
              {selectedConvoy ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase text-textNeutral/50">Selected convoy</p>
                    <h2 className="text-xl font-semibold">{selectedConvoy.name}</h2>
                    <p className="text-sm text-textNeutral/70">ETA {selectedConvoy.etaHours ?? '—'}h · Risk {selectedConvoy.assignedRoute?.riskScore ?? '—'}</p>
                  </div>
                  <button
                    type="button"
                    className="w-full rounded-full bg-amberCommand px-4 py-2 text-sm font-semibold text-black"
                    onClick={() => setOptimizerOpen(true)}
                  >
                    Request reroute
                  </button>
                  <div className="space-y-3 text-sm">
                    <div className="rounded-xl border border-panelNight/40 bg-slateDepth/70 p-3">
                      <p className="text-xs uppercase text-textNeutral/50">Route segments</p>
                      <ul className="mt-2 space-y-2">
                        {selectedConvoy.assignedRoute?.segments.map((segment) => (
                          <li key={segment.id} className="flex items-center justify-between text-xs">
                            <span>{segment.terrain}</span>
                            <span className="text-textNeutral/60">{segment.recommendedSpeedKmph} km/h</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-oliveAux/30 bg-oliveAux/10 p-3">
                      <p className="text-xs uppercase text-oliveAux">Merge suggestion</p>
                      <p className="text-sm text-textNeutral">
                        {selectedConvoy.mergeSuggestion
                          ? `Merge with ${selectedConvoy.mergeSuggestion.withConvoyId} to save ${selectedConvoy.mergeSuggestion.payloadSavingsTons} tons.`
                          : 'No consolidation required.'}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-textNeutral/70">Select a convoy to inspect details.</p>
              )}
            </aside>
          </div>

        </div>

        <footer className="border-t border-panelNight/40 bg-panelNight/60 px-6 py-4 text-xs">
          <p className="text-[11px] uppercase text-textNeutral/50">Live timeline</p>
          <div className="mt-2 flex gap-3 overflow-x-auto">
            {timelineItems.length === 0 && <p>No events yet.</p>}
            {timelineItems.map((item) => (
              <div key={item.id} className="min-w-[160px] rounded-xl border border-panelNight/40 bg-slateDepth/70 p-3">
                <p className="font-semibold">{item.type}</p>
                <p className="text-textNeutral/60">{new Date(item.triggeredAt).toLocaleTimeString()}</p>
                <p className="text-textNeutral/70">{item.payload.notes ?? 'Autogenerated'}</p>
              </div>
            ))}
          </div>
        </footer>
      </main>

      <NotificationToast toasts={toasts} onDismiss={dismissToast} />
      <OptimizerModal
        open={optimizerOpen}
        isLoading={optimizerLoading}
        result={optimizerResult ?? undefined}
        onClose={() => setOptimizerOpen(false)}
        onSubmit={handleReroute}
      />
    </div>
  );
};

export default DashboardPage;
