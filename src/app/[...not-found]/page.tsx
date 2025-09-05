import BlankLayout from '@/src/core/layout/blank.layout';
import NotFound from '@/src/core/components/not-found';
const NotFoundPage = async () => {
  return (
    <BlankLayout>
      <NotFound />
    </BlankLayout>
  );
};
export default NotFoundPage;
