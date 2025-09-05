import DashboardLayout from '@/src/core/layout/dashboard-layout';
import DashboardHeroSection from '@/src/core/section/dashboard/hero-section';
const DashboardContainer = () => {
  return (
    <DashboardLayout>
      <main className="w-full min-h-screen flex flex-col">
        <DashboardHeroSection />
      </main>
    </DashboardLayout>
  );
};

export default DashboardContainer;
