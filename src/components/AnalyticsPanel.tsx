import type { Convoy } from '@/types/convoy';
import type { OperationEvent } from '@/types/event';

export type AnalyticsPanelProps = {
  convoys: Convoy[];
  events: OperationEvent[];
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[11px] uppercase text-textNeutral/60">{label}</p>
    <p className="text-xl font-semibold text-textNeutral">{value}</p>
  </div>
);

export const AnalyticsPanel = ({ convoys, events }: AnalyticsPanelProps) => {
  const active = convoys.filter((convoy) => convoy.status === 'EN_ROUTE');
  const delayed = convoys.filter((convoy) => convoy.status === 'DELAYED');
  const conflictsPrevented = events.filter((event) => event.payload.severity === 'HIGH').length;

  const fleetEfficiency = active.length
    ? `${Math.round((active.length / convoys.length) * 100)}%`
    : '0%';

  return (
    <section className="rounded-2xl border border-panelNight/40 bg-panelNight/80 p-4 text-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-textNeutral">Fleet Analytics</h3>
        <span className="text-xs text-textNeutral/60">Live</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Stat label="Fleet efficiency" value={fleetEfficiency} />
        <Stat label="Conflicts prevented" value={conflictsPrevented.toString()} />
        <Stat label="Delayed convoys" value={delayed.length.toString()} />
        <Stat label="Active missions" value={active.length.toString()} />
      </div>
    </section>
  );
};

export default AnalyticsPanel;
