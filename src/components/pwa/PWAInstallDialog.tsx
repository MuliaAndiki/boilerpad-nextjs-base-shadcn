'use client';

import { useState } from 'react';

import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface PWAInstallDialogProps {
  trigger: React.ReactNode;
}

export const PWAInstallDialog = ({ trigger }: PWAInstallDialogProps) => {
  const { canInstall, promptInstall, isStandalone } = usePWAInstall();
  const [open, setOpen] = useState(false);

  const handleInstall = async () => {
    await promptInstall();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg">Download NutriPlate</AlertDialogTitle>
          <AlertDialogDescription className="text-sm">
            {isStandalone
              ? 'NutriPlate sudah terpasang di perangkat kamu.'
              : canInstall
                ? 'Pasang NutriPlate sebagai aplikasi agar akses lebih cepat dan nyaman.'
                : 'Untuk memasang aplikasi, buka menu browser lalu pilih “Add to Home Screen” atau “Install App”.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel asChild>
            <Button variant="outline">Tutup</Button>
          </AlertDialogCancel>
          {canInstall && !isStandalone ? (
            <AlertDialogAction asChild>
              <Button onClick={handleInstall}>Pasang Aplikasi</Button>
            </AlertDialogAction>
          ) : null}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
