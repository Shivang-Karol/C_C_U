import { useMemo, useState } from 'react';
import type { Convoy } from '@/types/convoy';
import { ConvoyCard } from './ConvoyCard';

export type ConvoyListProps = {
  convoys: Convoy[];
  loading?: boolean;
  selectedId?: string;
  onSelect: (convoy: Convoy) => void;
};

const SkeletonCard = () => (
  <div className="skeleton-pulse h-32 w-full rounded-xl bg-panelNight/40" />
);

export const ConvoyList = ({ convoys, loading, selectedId, onSelect }: ConvoyListProps) => {
  const [search, setSearch] = useState('');

  const filteredConvoys = useMemo(() => {
    if (!search) return convoys;
    return convoys.filter(
      (convoy) =>
        convoy.name.toLowerCase().includes(search.toLowerCase()) ||
        convoy.id.toLowerCase().includes(search.toLowerCase()),
    );
  }, [convoys, search]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-panelNight/50 bg-panelNight/60 p-2">
        <label htmlFor="convoy-search" className="sr-only">
          Search convoys
        </label>
        <input
          id="convoy-search"
          type="search"
          value={search}
          placeholder="Search by ID or codename"
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-md border border-transparent bg-panelNight px-3 py-2 text-sm text-textNeutral placeholder:text-textNeutral/40 focus:border-amberCommand focus:outline-none"
        />
      </div>

      {filteredConvoys.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-oliveAux/40 bg-panelNight/40 p-6 text-center">
          <div className="mb-4 text-4xl">🛰️</div>
          <p className="text-sm font-semibold text-textNeutral">No convoys match the filter.</p>
          <p className="mt-1 text-xs text-textNeutral/60">Adjust filters or create a new convoy to see activity here.</p>
          <button
            type="button"
            className="mt-4 rounded-full bg-amberCommand px-4 py-2 text-xs font-semibold text-black"
          >
            Create Convoy
          </button>
        </div>
      ) : (
        <div className="scrollbar-stealth flex max-h-[60vh] flex-col gap-3 overflow-y-auto pr-1">
          {filteredConvoys.map((convoy) => (
            <ConvoyCard
              key={convoy.id}
              convoy={convoy}
              isActive={convoy.id === selectedId}
              onClick={() => onSelect(convoy)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ConvoyList;
