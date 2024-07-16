import { stegaClean } from "@sanity/client/stega";
import clsx from "clsx";
import { PortableText } from "next-sanity";

import ButtonModule from "@/site/components/modules/Button";
import ImageButtonModule from "@/site/components/modules/ImageButton";
import { h1, h2, h3, normal, strong, link } from "@/site/richText";

import Image from "@/lib/components/Image";
import {
    TwoColumn,
    Button,
    ImageButton,
    SanityImage,
} from "@/lib/sanity/types";

import styles from "./TwoColumn.module.css";

export interface TwoColumnProps {
    src: TwoColumn;
}

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
            <div className="my-8 text-center">
                <ButtonModule src={value} />
            </div>
        ),
        "image.captioned": ({ value }: { value: SanityImage }) => (
            <Image src={value} sizes="50vw" />
        ),
        imageButton: ({ value }: { value: ImageButton }) => (
            <ImageButtonModule src={value} />
        ),
    },
};

export default function TwoColumnModule({ src }: TwoColumnProps) {
    console.log(src);

    return (
        <div
            className={clsx(
                styles.TwoColumn,
                "mx-auto max-w-screen-xl gap-8 px-4",
                {
                    [styles.TwoColumn__even]: stegaClean(src.mode) === "even",
                    [styles.TwoColumn__left]: stegaClean(src.mode) === "left",
                    [styles.TwoColumn__right]: stegaClean(src.mode) === "right",
                },
            )}
        >
            <div>
                <PortableText
                    value={src.left}
                    components={richTextComponents}
                />
            </div>
            <div>
                <PortableText
                    value={src.right}
                    components={richTextComponents}
                />
            </div>
        </div>
    );
}
