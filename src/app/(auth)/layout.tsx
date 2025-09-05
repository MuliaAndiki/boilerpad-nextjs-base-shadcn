import BlankLayout from '@/src/core/layout/blank.layout';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <BlankLayout>{children}</BlankLayout>
    </main>
  );
}
