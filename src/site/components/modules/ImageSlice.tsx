import clsx from "clsx";
import { PortableText } from "next-sanity";
import { CSSProperties } from "react";

import ButtonModule from "@/site/components/modules/Button";
import { h1, h2, h3, link, normal, strong } from "@/site/richText";

import Image from "@/lib/components/Image";
import { urlFor } from "@/lib/sanity";
import { ImageSlice, Button, SanityImage } from "@/lib/sanity/types";

import styles from "./ImageSlice.module.css";

export interface ImageSliceProps {
    src: ImageSlice;
}

const richTextComponents = {
    block: {
        normal: normal(),
        h1: h1("text-center"),
        h2: h2("text-center"),
        h3: h3("text-center"),
    },
    marks: {
        strong: strong(),
        link: link(),
    },
    types: {
        button: ({ value }: { value: Button }) => (
            <div className="my-8 text-center">
                <ButtonModule src={value} />
            </div>
        ),
        "image.captioned": ({ value }: { value: SanityImage }) => (
            <Image src={value} />
        ),
    },
};

export default function ImageSliceModule({ src }: ImageSliceProps) {
    return (
        <div
            className={clsx(styles.ImageSlice, "relative my-8 w-full")}
            style={
                src.image &&
                ({
                    "--background-image": `url(${urlFor(src.image).width(1920).quality(50).url()})`,
                } as CSSProperties)
            }
        >
            <div className="drop-shadow-heavy mx-auto max-w-screen-md px-4 py-8 text-white">
                <PortableText
                    value={src.content}
                    components={richTextComponents}
                />
            </div>
        </div>
    );
}
