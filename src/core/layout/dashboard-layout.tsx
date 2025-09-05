import FooterApp from '../components/footer-app';
import HeaderApp from '../components/header-app';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col w-full">
      <HeaderApp />
      {children}
      <FooterApp />
    </main>
  );
}
