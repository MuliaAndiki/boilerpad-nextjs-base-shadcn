'use client';
import { store, persistor } from '@/app/stores/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import { AlertProvinder } from '@/app/hooks/use-alert';
import ReactQueryClientProvinder from '@/app/hooks/query/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@/app/hooks/theme/useTheme';
import { SidebarProvider } from '@/app/components/ui/sidebar';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider>
            <AlertProvinder>
              <ReactQueryClientProvinder>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
              </ReactQueryClientProvinder>
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 900,
                }}
              />
            </AlertProvinder>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SidebarProvider>
  );
}
