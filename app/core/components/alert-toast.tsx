import { ToastProps } from '@/app/types/ui';
import toast from 'react-hot-toast';
import { useRef } from 'react';

const iconMap: Record<string, { emoji: string; color: string }> = {
  success: {
    emoji: '✅',
    color: 'border-green-500 text-green-600 bg-background',
  },
  error: { emoji: '❌', color: 'border-red-500 text-red-600 bg-background' },
  warning: {
    emoji: '⚠️',
    color: 'border-yellow-500 text-yellow-600 bg-background',
  },
  info: { emoji: 'ℹ️', color: 'border-blue-500 text-blue-600 bg-background' },
  question: {
    emoji: '❓',
    color: 'border-purple-500 text-purple-600 bg-background',
  },
};

export const ToastEffect = ({ t, title, message, icon, onVoid }: ToastProps & { t: any }) => {
  const Run = useRef(false);

  if (t.visible && !Run.current) {
    Run.current = true;
    setTimeout(() => {
      onVoid?.();
      toast.dismiss(t.id);
    }, 2000);
  }

  const iconData = iconMap[icon || 'info'];

  return (
    <div
      className={`w-[90%] max-w-sm p-4 rounded-2xl border shadow-lg transition-all duration-300 transform ${
        t.visible ? 'animate-enter scale-100 opacity-100' : 'animate-leave scale-90 opacity-0'
      } ${iconData?.color || 'border-background bg-background text-foreground'}`}
    >
      <div className="flex flex-col items-center text-center space-y-1">
        <div className="text-4xl animate-pulse">{iconData?.emoji}</div>
        <p className="text-base font-semibold tracking-wide">{title}</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};
