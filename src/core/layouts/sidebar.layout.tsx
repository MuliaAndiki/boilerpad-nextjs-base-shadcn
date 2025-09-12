'use client';

import { AppSidebar } from '@/core/components/app-sidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';

import ThemeToggle from '../components/theme-toggle';
import LanguageDropdown from '../components/language.dropdown';
import NotificationDropdown from '../components/notification.dropdown';
// import UserDropdown from '../components/user.dropdown';

// import AppBar from "../components/app-bar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function SidebarLayout({ children }: AppLayoutProps) {
  //   const [isScrolled, setIsScrolled] = useState(false);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       if (window.scrollY > 0) {
  //         setIsScrolled(true);
  //       } else {
  //         setIsScrolled(false);
  //       }
  //     };

  //     window.addEventListener('scroll', handleScroll);
  //     return () => window.removeEventListener('scroll', handleScroll);
  //   }, []);

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="flex h-full flex-col w-full">
            <div className="flex p-4 items-center gap-2 border-b w-full h-20">
              <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
                <SidebarTrigger />
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <LanguageDropdown />
                  <NotificationDropdown />
                  {/* <UserDropdown /> */}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto w-full">
              <div className="container h-full max-w-7xl w-full mx-auto p-[1rem]">{children}</div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
