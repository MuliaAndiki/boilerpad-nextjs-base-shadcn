import NotFound from '@/core/components/not-found';
import BlankLayout from '@/core/layouts/blank.layout';

const NotFoundPage = async () => {
  return (
    <main className="w-full">
      <BlankLayout>
        <NotFound />
      </BlankLayout>
    </main>
  );
};

export default NotFoundPage;
