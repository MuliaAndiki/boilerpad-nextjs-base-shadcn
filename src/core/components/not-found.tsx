"use client";

import { Button } from "@/components/ui/button";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
    const router: AppRouterInstance = useRouter();

    return (
        <div className="flex items-center justify-center min-bs-[100dvh] relative p-6 overflow-x-hidden">
            <div className="flex items-center flex-col text-center gap-10">
                <div className="flex flex-col gap-2 is-[90vw] sm:is-[unset]">
                    <h1 className="font-medium text-8xl">404</h1>
                    <h2 className="text-2xl">Page Not Found ⚠️</h2>
                    <p>We couldn&apos;t find the page you are looking for.</p>
                </div>
                <Image
                    alt="error-illustration"
                    src="/illustrations/3.png"
                    className="object-cover bs-[400px]"
                    width={300}
                    height={300}
                />

                <Button variant="default" onClick={() => router.push("/")}>
                    Back to Home
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
