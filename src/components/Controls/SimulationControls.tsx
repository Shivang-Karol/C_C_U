import type { EventType } from '@/types/event';

export type SimulationControlsProps = {
  isRunning: boolean;
  speedMultiplier: number;
  onToggle: () => void;
  onSpeedChange: (multiplier: number) => void;
  onTriggerEvent: (event: EventType) => void;
};

const events: { label: string; type: EventType }[] = [
  { label: 'Block Road', type: 'BLOCK_ROAD' },
  { label: 'Rain', type: 'RAINFALL' },
  { label: 'Landslide', type: 'LANDSLIDE' },
  { label: 'Congestion', type: 'CONGESTION' },
];

export const SimulationControls = ({
  isRunning,
  speedMultiplier,
  onToggle,
  onSpeedChange,
  onTriggerEvent,
}: SimulationControlsProps) => (
  <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-panelNight/40 bg-panelNight/80 px-4 py-3 text-xs">
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onToggle}
        className="rounded-full bg-amberCommand px-4 py-2 text-xs font-semibold text-black"
      >
        {isRunning ? 'Pause Sim' : 'Start Sim'}
      </button>
      <div>
        <p className="text-[10px] uppercase text-textNeutral/50">Speed</p>
        <input
          type="range"
          min={0.5}
          max={2}
          step={0.25}
          value={speedMultiplier}
          onChange={(event) => onSpeedChange(Number(event.target.value))}
          className="accent-amberCommand"
        />
        <span className="ml-2 text-textNeutral/70">{speedMultiplier.toFixed(2)}x</span>
      </div>
    </div>

    <div className="flex flex-wrap gap-2">
      {events.map((event) => (
        <button
          key={event.type}
          type="button"
          onClick={() => onTriggerEvent(event.type)}
          className="rounded-full border border-oliveAux/40 px-3 py-1 text-[11px] text-textNeutral"
        >
          {event.label}
        </button>
      ))}
    </div>
  </div>
);

export default SimulationControls;
