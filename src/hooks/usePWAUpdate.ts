"use client";

import { useEffect, useState } from "react";

export function usePWAUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
  );

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    if (process.env.NODE_ENV === "development") {
      void navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });

      void caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          void caches.delete(cacheName);
        });
      });

      setUpdateAvailable(false);
      setWaitingWorker(null);
      return;
    }

    let activeRegistration: ServiceWorkerRegistration | null = null;

    const handleWaitingWorker = (registration: ServiceWorkerRegistration) => {
      if (registration.waiting) {
        setWaitingWorker(registration.waiting);
        setUpdateAvailable(true);
      }
    };

    void navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        activeRegistration = registration;
        handleWaitingWorker(registration);

        registration.addEventListener("updatefound", () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          installingWorker.addEventListener("statechange", () => {
            if (
              installingWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setWaitingWorker(installingWorker);
              setUpdateAvailable(true);
            }
          });
        });
      });

    const handleControllerChange = () => {
      if (activeRegistration?.waiting) {
        setWaitingWorker(activeRegistration.waiting);
      }
      setUpdateAvailable(false);
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange,
    );

    // Check for updates periodically
    const interval = setInterval(() => {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.update();
        });
      });
    }, 60000); // Check every 60 seconds

    return () => {
      clearInterval(interval);
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange,
      );
    };
  }, []);

  const updateApp = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
      // Reload after service worker has taken control
      const onControllerChange = () => {
        window.location.reload();
        navigator.serviceWorker.removeEventListener(
          "controllerchange",
          onControllerChange,
        );
      };
      navigator.serviceWorker.addEventListener(
        "controllerchange",
        onControllerChange,
      );
    }
  };

  const skipUpdate = () => {
    setUpdateAvailable(false);
  };

  return {
    updateAvailable,
    updateApp,
    skipUpdate,
  };
}
