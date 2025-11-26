'use client';

import { useEffect } from 'react';
import clsx from 'clsx';

export type Toast = {
  id: string;
  title: string;
  description?: string;
  tone?: 'success' | 'warning' | 'info';
  actionLabel?: string;
  onAction?: () => void;
};

const toneClasses: Record<NonNullable<Toast['tone']>, string> = {
  success: 'border-emerald-400 text-emerald-200',
  warning: 'border-amberCommand text-amberCommand',
  info: 'border-sky-400 text-sky-200',
};

export type NotificationToastProps = {
  toasts: Toast[];
  onDismiss: (id: string) => void;
};

export const NotificationToast = ({ toasts, onDismiss }: NotificationToastProps) => {
  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => {
        onDismiss(toast.id);
      }, 6000),
    );
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toasts, onDismiss]);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            'w-64 rounded-xl border bg-panelNight/90 p-4 text-sm shadow-command',
            toneClasses[toast.tone ?? 'info'],
          )}
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold">{toast.title}</p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="text-xs text-textNeutral/70"
            >
              ✕
            </button>
          </div>
          {toast.description && <p className="text-xs text-textNeutral/70">{toast.description}</p>}
          {toast.actionLabel && toast.onAction && (
            <button
              type="button"
              className="mt-2 text-xs font-semibold text-amberCommand"
              onClick={() => toast.onAction?.()}
            >
              {toast.actionLabel}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;
