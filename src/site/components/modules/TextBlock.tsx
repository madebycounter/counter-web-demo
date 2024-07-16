import { PortableText } from "next-sanity";

import ButtonModule from "@/site/components/modules/Button";
import { h1, h2, h3, normal, strong, link } from "@/site/richText";

import Image from "@/lib/components/Image";
import { TextBlock, Button, SanityImage } from "@/lib/sanity/types";

export interface TextBlockProps {
    src: TextBlock;
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
            <Image src={value} />
        ),
    },
};

export default function TextBlockModule({ src }: TextBlockProps) {
    return (
        <div className="mx-auto max-w-screen-lg px-4">
            <PortableText value={src.content} components={richTextComponents} />
        </div>
    );
}
