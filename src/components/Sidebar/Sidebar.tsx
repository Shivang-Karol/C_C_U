'use client';

import { useMemo, useState } from 'react';
import type { Convoy, Priority, ConvoyStatus } from '@/types/convoy';
import { ConvoyList } from '@/components/ConvoyList';
import clsx from 'clsx';

const priorityOptions: Priority[] = ['ALPHA', 'BRAVO', 'CHARLIE'];
const statusOptions: ConvoyStatus[] = ['PLANNED', 'EN_ROUTE', 'DELAYED', 'COMPLETED'];

export type SidebarProps = {
  convoys: Convoy[];
  loading?: boolean;
  selectedId?: string;
  onSelect: (convoy: Convoy) => void;
};

export const Sidebar = ({ convoys, loading, selectedId, onSelect }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<Priority[]>([]);
  const [statusFilter, setStatusFilter] = useState<ConvoyStatus[]>([]);

  const filteredConvoys = useMemo(() => {
    return convoys.filter((convoy) => {
      const priorityMatch = priorityFilter.length ? priorityFilter.includes(convoy.priority) : true;
      const statusMatch = statusFilter.length ? statusFilter.includes(convoy.status) : true;
      return priorityMatch && statusMatch;
    });
  }, [convoys, priorityFilter, statusFilter]);

  const toggleSelection = <T extends Priority | ConvoyStatus>(
    value: T,
    list: T[],
    setter: (next: T[]) => void,
  ) => {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  return (
    <aside
      className={clsx(
        'relative flex h-full flex-col border-r border-panelNight/40 bg-slateDepth/80 transition-all',
        collapsed ? 'w-16' : 'w-80',
      )}
    >
      <button
        type="button"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute -right-4 top-6 z-10 rounded-full border border-panelNight/40 bg-panelNight px-2 py-1 text-xs"
        onClick={() => setCollapsed((prev) => !prev)}
      >
        {collapsed ? '→' : '←'}
      </button>

      <div className={clsx('flex flex-1 flex-col gap-6 p-5', collapsed && 'p-3')}>
        {!collapsed && (
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-textNeutral/60">AICC</p>
            <p className="text-lg font-semibold text-textNeutral">Convoy Directory</p>
            <p className="text-xs text-textNeutral/60">Live logistics picture</p>
          </div>
        )}

        {!collapsed && (
          <div className="space-y-4">
            <div>
              <p className="text-[11px] uppercase text-textNeutral/50">Priority</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {priorityOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => toggleSelection(option, priorityFilter, setPriorityFilter)}
                    className={clsx(
                      'rounded-full border px-3 py-1 text-xs',
                      priorityFilter.includes(option)
                        ? 'border-amberCommand text-amberCommand'
                        : 'border-panelNight text-textNeutral/70',
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase text-textNeutral/50">Status</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => toggleSelection(status, statusFilter, setStatusFilter)}
                    className={clsx(
                      'rounded-lg border px-2 py-1 text-left',
                      statusFilter.includes(status)
                        ? 'border-oliveAux text-oliveAux'
                        : 'border-panelNight text-textNeutral/70',
                    )}
                  >
                    {status.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex-1">
          <ConvoyList
            convoys={filteredConvoys}
            loading={loading}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
