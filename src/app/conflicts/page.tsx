'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import { api } from '@/lib/api';
import type { Convoy } from '@/types/convoy';
import type { RouteSegment } from '@/types/route';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/events', label: 'Events' },
  { href: '/conflicts', label: 'Conflicts' },
  { href: '/mobile', label: 'Mobile View' },
];

const fetchConvoys = () => api.getConvoys();

const getSegmentBadge = (segment: RouteSegment) => {
  if (segment.status === 'BLOCKED') return 'bg-red-500/20 text-red-200 border-red-500/40';
  if (segment.status === 'HIGH_RISK') return 'bg-amberCommand/10 text-amberCommand border-amberCommand/40';
  return 'bg-emerald-400/10 text-emerald-200 border-emerald-400/40';
};

const ConflictsPage = () => {
  const pathname = usePathname();
  const { data: convoys = [] } = useSWR<Convoy[]>('/api/convoys', fetchConvoys, { refreshInterval: 20000 });
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});

  const highRiskConvoys = useMemo(() => {
    return convoys
      .map((convoy) => {
        const segments = convoy.assignedRoute?.segments ?? [];
        return {
          convoy,
          score: convoy.assignedRoute?.riskScore ?? 0,
          blockedSegments: segments.filter((segment) => segment.status === 'BLOCKED'),
        };
      })
      .filter((entry) => entry.score > 55 || entry.blockedSegments.length > 0);
  }, [convoys]);

  const blockedSegments = useMemo(() => {
    return convoys.flatMap((convoy) => {
      const segments = convoy.assignedRoute?.segments ?? [];
      return segments
        .filter((segment) => segment.status !== 'CLEAR')
        .map((segment) => ({ ...segment, convoyName: convoy.name }));
    });
  }, [convoys]);

  const awaitingAck = highRiskConvoys.filter((entry) => !acknowledged[entry.convoy.id]).length;

  return (
    <div className="min-h-screen bg-slateDepth text-textNeutral">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-panelNight/40 bg-panelNight/40 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-textNeutral/60">AICC · Conflict Desk</p>
            <h1 className="text-2xl font-semibold text-textNeutral">Resolve routing conflicts before they cascade</h1>
            <p className="text-sm text-textNeutral/70">
              Monitor high-risk convoys, blocked corridors, and consolidation advisories. Acknowledge issues to push updates back to the command log.
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

        <section className="grid gap-4 rounded-3xl border border-panelNight/40 bg-panelNight/60 p-6 text-sm md:grid-cols-3">
          <div className="rounded-2xl border border-panelNight/40 bg-panelNight/80 p-4">
            <p className="text-xs uppercase text-textNeutral/50">Active conflicts</p>
            <p className="mt-3 text-3xl font-semibold text-amberCommand">{highRiskConvoys.length}</p>
            <p className="text-textNeutral/60">Convoys over risk threshold or facing blocked roads.</p>
          </div>
          <div className="rounded-2xl border border-panelNight/40 bg-panelNight/80 p-4">
            <p className="text-xs uppercase text-textNeutral/50">Awaiting acknowledgement</p>
            <p className="mt-3 text-3xl font-semibold text-oliveAux">{awaitingAck}</p>
            <p className="text-textNeutral/60">Conflicts not yet logged back to HQ.</p>
          </div>
          <div className="rounded-2xl border border-panelNight/40 bg-panelNight/80 p-4">
            <p className="text-xs uppercase text-textNeutral/50">Blocked segments</p>
            <p className="mt-3 text-3xl font-semibold text-red-300">{blockedSegments.length}</p>
            <p className="text-textNeutral/60">Corridors requiring clearance or reroute.</p>
          </div>
        </section>

        <section className="rounded-3xl border border-panelNight/40 bg-panelNight/70 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase text-textNeutral/50">Convoy conflict queue</p>
              <h2 className="text-xl font-semibold text-textNeutral">Prioritize by severity, then acknowledge</h2>
            </div>
            <button
              type="button"
              className="rounded-full border border-amberCommand/40 px-4 py-2 text-xs text-amberCommand"
              onClick={() => setAcknowledged({})}
            >
              Reset acknowledgements
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {highRiskConvoys.length === 0 && <p className="text-sm text-textNeutral/60">No conflicts flagged. Continue monitoring.</p>}
            {highRiskConvoys.map(({ convoy, score, blockedSegments: segments }) => (
              <div key={convoy.id} className="rounded-2xl border border-panelNight/50 bg-slateDepth/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase text-textNeutral/50">{convoy.priority} priority</p>
                    <h3 className="text-lg font-semibold">{convoy.name}</h3>
                    <p className="text-sm text-textNeutral/70">
                      Route risk score {score.toFixed(0)} · {segments.length} blocked segments · Status {convoy.status}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      className="rounded-full bg-amberCommand px-4 py-2 font-semibold text-black"
                      onClick={() => setAcknowledged((prev) => ({ ...prev, [convoy.id]: true }))}
                    >
                      {acknowledged[convoy.id] ? 'Acknowledged' : 'Acknowledge'}
                    </button>
                    <Link
                      href={`/dashboard?convoy=${convoy.id}`}
                      className="rounded-full border border-panelNight/40 px-4 py-2 text-textNeutral"
                    >
                      Open in dashboard
                    </Link>
                  </div>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-panelNight/40 bg-panelNight/80 p-3 text-xs">
                    <p className="text-[10px] uppercase text-textNeutral/50">Merge advisory</p>
                    <p className="text-sm text-textNeutral">
                      {convoy.mergeSuggestion
                        ? `Merge with ${convoy.mergeSuggestion.withConvoyId} to save ${convoy.mergeSuggestion.payloadSavingsTons}t payload.`
                        : 'No merge recommendation available.'}
                    </p>
                  </div>
                  <div className="rounded-xl border border-panelNight/40 bg-panelNight/80 p-3 text-xs">
                    <p className="text-[10px] uppercase text-textNeutral/50">Next checkpoint</p>
                    <p className="text-sm text-textNeutral">
                      {convoy.assignedRoute?.checkpoints?.[0]?.name ?? '—'} · ETA {convoy.assignedRoute?.checkpoints?.[0]?.eta ?? '—'}
                    </p>
                  </div>
                </div>
                {segments.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs uppercase text-textNeutral/50">Blocked segments</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {segments.map((segment) => (
                        <span
                          key={segment.id}
                          className={`rounded-full border px-3 py-1 text-xs ${getSegmentBadge(segment)}`}
                        >
                          {segment.id} · {segment.terrain}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-textNeutral/60">
            TODO: Replace client-side acknowledgement state with secure mutation to /api/conflicts so logs persist for shift handover.
          </p>
        </section>

        <section className="rounded-3xl border border-panelNight/40 bg-panelNight/60 p-6">
          <p className="text-xs uppercase text-textNeutral/50">Segment watchlist</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {blockedSegments.slice(0, 6).map((segment) => (
              <div key={`${segment.convoyName}-${segment.id}`} className="rounded-2xl border border-panelNight/50 bg-panelNight/80 p-4 text-sm">
                <p className="text-textNeutral/60">{segment.convoyName}</p>
                <p className="text-lg font-semibold text-textNeutral">Segment {segment.id}</p>
                <p className="text-textNeutral/70">Terrain {segment.terrain} · Difficulty {segment.difficulty}</p>
                <p className="text-xs text-textNeutral/60">Status {segment.status}</p>
                <button type="button" className="mt-3 text-xs text-amberCommand underline">
                  Share with engineering battalion
                </button>
              </div>
            ))}
            {blockedSegments.length === 0 && <p className="text-sm text-textNeutral/60">No segments on watchlist.</p>}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ConflictsPage;
