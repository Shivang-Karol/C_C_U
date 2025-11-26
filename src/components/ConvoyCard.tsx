import type { Convoy } from '@/types/convoy';
import clsx from 'clsx';

const statusColor: Record<Convoy['status'], string> = {
  PLANNED: 'text-oliveAux',
  EN_ROUTE: 'text-amberCommand',
  COMPLETED: 'text-emerald-300',
  DELAYED: 'text-dangerAlert',
};

const priorityLabel: Record<Convoy['priority'], string> = {
  ALPHA: 'Alpha',
  BRAVO: 'Bravo',
  CHARLIE: 'Charlie',
};

export type ConvoyCardProps = {
  convoy: Convoy;
  isActive?: boolean;
  onClick?: () => void;
};

export const ConvoyCard = ({ convoy, isActive, onClick }: ConvoyCardProps) => (
  <button
    type="button"
    className={clsx(
      'w-full rounded-xl border border-transparent bg-panelNight/70 p-4 text-left transition focus:outline-none',
      'hover:border-oliveAux/40 hover:bg-panelNight focus-visible:ring-2 focus-visible:ring-amberCommand/70',
      isActive && 'border-amberCommand/60 bg-panelNight shadow-command',
    )}
    onClick={onClick}
    aria-label={`Select convoy ${convoy.name}`}
  >
    <div className="flex items-center justify-between text-xs uppercase tracking-wide text-textNeutral/70">
      <span className="font-semibold">{convoy.id}</span>
      <span className={clsx('rounded-full px-2 py-0.5 text-[10px]', statusColor[convoy.status])}>
        {convoy.status.replace('_', ' ')}
      </span>
    </div>
    <p className="mt-2 text-base font-semibold text-textNeutral">{convoy.name}</p>
    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-textNeutral/70">
      <div>
        <p className="text-[11px] uppercase tracking-wide">Priority</p>
        <p className="text-sm text-textNeutral">{priorityLabel[convoy.priority]}</p>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wide">Vehicles</p>
        <p className="text-sm text-textNeutral">{convoy.vehicleCount}</p>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wide">Origin</p>
        <p className="text-sm text-textNeutral">{convoy.origin.name ?? '—'}</p>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wide">Destination</p>
        <p className="text-sm text-textNeutral">{convoy.destination.name ?? '—'}</p>
      </div>
    </div>
    {convoy.mergeSuggestion && (
      <div className="mt-3 rounded-lg border border-oliveAux/40 bg-oliveAux/10 p-2 text-xs">
        <p className="text-oliveAux">Load consolidation</p>
        <p className="text-textNeutral/80">
          Merge with {convoy.mergeSuggestion.withConvoyId} · save {convoy.mergeSuggestion.payloadSavingsTons}t
        </p>
      </div>
    )}
  </button>
);

export default ConvoyCard;
