import AppFooter from '../components/app-footer';
import AppHeader from '../components/app-header';

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <AppHeader />
      <div className="flex-1">{children}</div>
      <AppFooter />
    </main>
  );
}
