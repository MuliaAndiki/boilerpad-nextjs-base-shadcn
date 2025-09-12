import PrivateProviders from '@/core/providers/private.provider';

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <PrivateProviders>{children}</PrivateProviders>;
}
