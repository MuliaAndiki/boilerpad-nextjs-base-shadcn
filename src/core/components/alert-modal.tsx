'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { ModalProps } from '@/src/types/ui';

const iconMap = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  question: '❓',
};

interface AlertModalInternalProps extends ModalProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  cancelText?: string;
  onCancel?: () => void;
}

export function AlertModal({
  open,
  setOpen,
  title,
  deskripsi,
  icon = 'info',
  confirmButtonText = 'OK',
  confirmButtonColor = 'bg-primary',
  cancelText,
  onConfirm,
  onCancel,
}: AlertModalInternalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm text-center [&>button]:hidden">
        <DialogHeader>
          <div className="text-4xl mb-2">{iconMap[icon]}</div>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            {deskripsi}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center gap-2 pt-4">
          {cancelText && (
            <button
              onClick={() => {
                onCancel?.();
                setOpen(false);
              }}
              className="px-4 py-2 text-sm rounded border border-gray-300 dark:border-gray-600"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={() => {
              onConfirm?.();
              setOpen(false);
            }}
            className={`${confirmButtonColor} text-white px-4 py-2 rounded text-sm`}
          >
            {confirmButtonText}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
