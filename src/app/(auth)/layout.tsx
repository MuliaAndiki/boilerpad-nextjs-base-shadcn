import BlankLayout from '@/core/layouts/blank.layout';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full">
      <BlankLayout>{children}</BlankLayout>
    </main>
  );
}
