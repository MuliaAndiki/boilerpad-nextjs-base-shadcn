import { appConfig } from "@/configs/app.config";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function AppFooter() {
    return (
        <footer>
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <Image src={appConfig.logo} alt="Logo" width={100} height={100} />
                        <div className="mt-4">
                            <h1 className="text-xl lg:text-2xl font-bold">Follow us on</h1>
                            <div className="flex items-center gap-2">
                                {Object.entries(appConfig.social_media).map(([key, value]) => (
                                    <Link href={value.url} key={key}>
                                        <Icon icon={value.icon} width={24} height={24} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
