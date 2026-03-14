"use client";

import { useEffect } from "react";
import { usePWAUpdate } from "@/hooks/usePWAUpdate";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function PWAUpdatePrompt() {
  const { updateAvailable, updateApp, skipUpdate } = usePWAUpdate();

  const showToastInstead = false;

  useEffect(() => {
    if (updateAvailable && showToastInstead) {
    }
  }, [updateAvailable]);

  return (
    <AlertDialog open={updateAvailable && !showToastInstead}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <span className="text-lg">✨</span> Versi Baru Tersedia
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Aplikasi telah diperbarui dengan fitur dan perbaikan terbaru.
            Silakan perbarui sekarang untuk mendapatkan pengalaman terbaik.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2 rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
            Apa yang berubah:
          </p>
          <ul className="list-inside space-y-1 text-xs text-blue-800 dark:text-blue-200">
            <li>• Peningkatan performa aplikasi</li>
            <li>• Perbaikan bug dan keamanan</li>
            <li>• Fitur dan UI improvements</li>
          </ul>
        </div>

        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              onClick={skipUpdate}
              className="sm:w-auto"
            >
              Nanti
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={updateApp} className="sm:w-auto">
              Perbarui Sekarang
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function PWAUpdateToast() {
  const { updateAvailable, updateApp } = usePWAUpdate();

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm space-y-2 rounded-lg border border-green-200 bg-green-50 p-4 shadow-lg dark:border-green-900 dark:bg-green-950/30">
      <div className="space-y-1">
        <h3 className="font-semibold text-green-900 dark:text-green-100">
          ✨ Versi baru tersedia
        </h3>
        <p className="text-sm text-green-800 dark:text-green-200">
          Aplikasi telah diperbarui. Perbarui sekarang untuk mendapatkan fitur
          dan perbaikan terbaru.
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={updateApp}
          className="rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700"
        >
          Update
        </button>
      </div>
    </div>
  );
}
