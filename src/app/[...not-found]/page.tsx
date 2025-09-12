import NotFound from "@/core/components/not-found";
import BlankLayout from "@/core/layouts/blank.layout";

const NotFoundPage = async () => {
    return (
        <BlankLayout>
            <NotFound />
        </BlankLayout>
    );
};

export default NotFoundPage;
