import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastNotification: React.FC = () => {
  const { notifications, removeNotification } = useStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="pointer-events-auto p-4 rounded-2xl bg-[#24201D] text-[#FAF8F5] shadow-2xl border border-[#3D3631] flex items-start justify-between gap-3 animate-in slide-in-from-bottom-4 duration-200"
        >
          <div className="flex items-start gap-3">
            {n.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#BEDBC3] shrink-0 mt-0.5" />
            ) : n.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-[#F2D2CC] shrink-0 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-[#C2D8EC] shrink-0 mt-0.5" />
            )}

            <div className="space-y-1">
              <p className="text-xs font-semibold leading-relaxed text-[#FAF8F5]">{n.message}</p>
              {n.actionLabel && n.onAction && (
                <button
                  onClick={() => {
                    n.onAction?.();
                    removeNotification(n.id);
                  }}
                  className="text-xs font-bold text-[#BEDBC3] hover:text-[#FAF8F5] underline cursor-pointer"
                >
                  {n.actionLabel} →
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => removeNotification(n.id)}
            className="p-1 text-[#8A8174] hover:text-[#FAF8F5] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
