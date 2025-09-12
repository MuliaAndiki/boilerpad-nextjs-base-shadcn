import BlankLayout from '@/core/layouts/blank.layout';
import Authproviders from '@/core/providers/auth.provider';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Authproviders>
      <BlankLayout>{children}</BlankLayout>
    </Authproviders>
  );
}
