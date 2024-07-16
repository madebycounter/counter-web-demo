"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

import Image from "@/lib/components/Image";
import { useScrollPosition } from "@/lib/hooks";
import { Config } from "@/lib/sanity/types";

export interface NavProps {
    config: Config;
}

export default function Nav({ config }: NavProps) {
    const [scrolled, setScrolled] = useState(false);
    const scrollPosition = useScrollPosition();

    useEffect(() => {
        if (scrollPosition > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }, [scrollPosition]);

    return (
        <>
            <div
                className={clsx(
                    "fixed left-0 top-0 z-50 h-20 w-full bg-white transition-shadow duration-300",
                    {
                        "shadow-md": scrolled,
                    },
                )}
            >
                <div className="text-md flex h-full items-center justify-center gap-16 px-4 py-4 uppercase tracking-wider">
                    <div className="flex justify-end gap-8">
                        <p>
                            <Link href="#">Visit</Link>
                        </p>
                        <p>
                            <Link href="#">Destinations</Link>
                        </p>
                        <p>
                            <Link href="#">Lodging</Link>
                        </p>
                    </div>
                    <div className="h-full">
                        <Image
                            src={config.siteLogo}
                            mode="cover"
                            width={200}
                            className="h-full w-auto py-2"
                            alt="Counter Logo"
                        />
                    </div>
                    <div className="flex justify-end gap-8">
                        <p>
                            <Link href="#">Explore</Link>
                        </p>
                        <p>
                            <Link href="#">Community</Link>
                        </p>
                        <p>
                            <Link href="#">Updates</Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-20" />
        </>
    );
}
