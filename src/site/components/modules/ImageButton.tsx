import clsx from "clsx";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import Image from "@/lib/components/Image";
import { ImageButton } from "@/lib/sanity/types";

export interface ImageButtonProps {
    src: ImageButton;
}

export default function ImageButtonModule({ src }: ImageButtonProps) {
    return (
        <Link
            className="group relative my-4 block aspect-video w-full transition-all duration-300"
            href={(src.type === "url" ? src.link : src.reference) || ""}
        >
            <Image src={src.image} sizes="30vw" />
            <div
                className={clsx("absolute left-0 top-0 flex h-full w-full", {
                    "items-center justify-center": src.style === "centered",
                    "items-end justify-start": src.style === "title",
                })}
            >
                <div className="bg-white px-2 py-1">
                    <p className="float-left text-2xl font-bold tracking-tight text-black">
                        {src.text}
                    </p>

                    <FaArrowRight className="float-right ml-1 mt-[7px] w-0 text-xl opacity-0 transition-all duration-200 group-hover:w-[21px] group-hover:opacity-100" />
                </div>
            </div>
        </Link>
    );
}
