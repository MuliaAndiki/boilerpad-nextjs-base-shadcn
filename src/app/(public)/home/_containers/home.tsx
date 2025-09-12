'use client';
import { themeConfig } from '@/configs/theme.config';
import NavLayout from '@/core/layouts/nav.layout';
import { useTheme } from '@/core/providers/theme.provider';

export default function ContainerHome() {
  const { theme } = useTheme();

  return (
    <NavLayout>
      <main className={`container  mx-auto bg-[${themeConfig[theme].primary.background}]`}>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">Home</h1>
        </div>
      </main>
    </NavLayout>
  );
}
