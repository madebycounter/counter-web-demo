import clsx from "clsx";
import Link from "next/link";

import { Button } from "@/lib/sanity/types";

export interface ButtonProps {
    src: Button;
    className?: string;
}

export default function ButtonModule({ src, className }: ButtonProps) {
    return (
        <Link
            className={clsx(
                className,
                "rounded-lg p-4 text-xl font-bold text-white",
                {
                    "bg-black": src.style === "primary",
                    "bg-slate-700": src.style === "secondary",
                },
            )}
            href={(src.type === "url" ? src.link : src.reference) || ""}
        >
            {src.text}
        </Link>
    );
}
