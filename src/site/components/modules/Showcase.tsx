import clsx from "clsx";
import { PortableText } from "next-sanity";

import ButtonModule from "@/site/components/modules/Button";
import { normal, h1, h2, h3, strong, link } from "@/site/richText";

import Image from "@/lib/components/Image";
import { Showcase, Button, SanityImage } from "@/lib/sanity/types";

import styles from "./Showcase.module.css";

const richTextComponents = {
    block: {
        normal: normal(),
        h1: h1(),
        h2: h2(),
        h3: h3(),
    },
    marks: {
        strong: strong(),
        link: link(),
    },
    types: {
        button: ({ value }: { value: Button }) => (
            <div className="mb-4 mt-8">
                <ButtonModule src={value} />
            </div>
        ),
        "image.captioned": ({ value }: { value: SanityImage }) => (
            <Image src={value} />
        ),
    },
};

export interface ShowcaseProps {
    src: Showcase;
}

export default function ShowcaseModule({ src }: ShowcaseProps) {
    return (
        <div className="relative z-0 mx-auto my-16 flex aspect-[1411/770] h-auto w-full max-w-screen-2xl flex-col gap-8 overflow-hidden px-4">
            <div className={clsx(styles.Row, "gap-8")}>
                <div className="z-10 aspect-video drop-shadow-2xl">
                    <Image
                        src={src.imageTop}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div>
                    <PortableText
                        value={src.contentTop}
                        components={richTextComponents}
                    />
                </div>
            </div>

            <div className={clsx(styles.Row__reversed, "gap-8")}>
                <div className="flex items-end text-right">
                    <div>
                        <PortableText
                            value={src.contentBottom}
                            components={richTextComponents}
                        />
                    </div>
                </div>

                <div className="aspect-video drop-shadow-2xl">
                    <Image
                        src={src.imageBottom}
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
