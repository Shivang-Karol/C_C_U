'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AnalyticsPanel from '@/components/AnalyticsPanel';
import { api } from '@/lib/api';
import type { Convoy } from '@/types/convoy';
import type { OperationEvent } from '@/types/event';

const fetchConvoys = () => api.getConvoys();

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/events', label: 'Events' },
  { href: '/conflicts', label: 'Conflicts' },
  { href: '/mobile', label: 'Mobile View' },
];

const AnalyticsPage = () => {
  const pathname = usePathname();
  const { data: convoys = [] } = useSWR<Convoy[]>('/api/convoys', fetchConvoys, { refreshInterval: 20000 });
  const mockEvents: OperationEvent[] = convoys
    .flatMap((convoy) =>
      convoy.assignedRoute?.checkpoints.map((checkpoint) => {
        const severity: OperationEvent['payload']['severity'] = checkpoint.status === 'CLEARED' ? 'LOW' : 'MEDIUM';
        return {
          id: `${convoy.id}-${checkpoint.id}`,
          convoyId: convoy.id,
          type: 'CHECKPOINT' as OperationEvent['type'],
          triggeredAt: checkpoint.loggedAt ?? checkpoint.eta,
          payload: {
            severity,
            notes: checkpoint.name,
          },
        } satisfies OperationEvent;
      }) ?? [],
    )
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-slateDepth text-textNeutral">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-panelNight/40 bg-panelNight/40 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-textNeutral/60">AICC · Fleet Intelligence</p>
            <h1 className="text-2xl font-semibold text-textNeutral">Analytics and Readiness</h1>
            <p className="text-sm text-textNeutral/70">
              Summarises convoy utilisation, congestion avoided, and weather impact for commanders and mobility planners.
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

        <section className="rounded-3xl border border-panelNight/40 bg-panelNight/50 p-6">
          <AnalyticsPanel convoys={convoys} events={mockEvents} />
          <p className="mt-4 text-xs text-textNeutral/60">
            TODO: Replace mock analytics aggregation with live telemetry feeds, weather APIs, and OR-Tools outputs.
          </p>
        </section>

        <section className="grid gap-4 rounded-3xl border border-panelNight/40 bg-panelNight/40 p-6 md:grid-cols-3">
          {[{
            label: 'Road-space utilisation',
            detail: 'Highlights which corridors are saturated, recommending staggered launches to avoid choke points.',
          },
          {
            label: 'Weather impact score',
            detail: 'Blends IMD feeds with convoy ETAs to flag missions likely to be delayed by fog, rain, or snowfall.',
          },
          {
            label: 'Fuel savings tracker',
            detail: 'Estimates litres saved through load consolidation and backhaul pairing suggestions.',
          }].map((item) => (
            <div key={item.label} className="rounded-2xl border border-panelNight/50 bg-slateDepth/70 p-4 text-sm text-textNeutral/80">
              <p className="text-[11px] uppercase text-textNeutral/50">{item.label}</p>
              <p className="mt-2">{item.detail}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default AnalyticsPage;
