import { Metadata } from "next";

import { urlFor } from "@/lib/sanity";
import { RichText, SanityImage } from "@/lib/sanity/types";

export function blocksToText(blocks: RichText) {
    if (blocks === null || blocks === undefined) {
        return "";
    }

    return blocks
        .map((block: any) => {
            if (block._type !== "block" || !block.children) {
                return "";
            }

            return block.children.map((child: any) => child.text).join("");
        })
        .join("\n\n");
}

export function makeSeoData(
    title?: string,
    description?: string,
    image?: SanityImage,
): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            ...(image && {
                images: [
                    {
                        url: urlFor(image)
                            .width(600)
                            .height(315)
                            .quality(50)
                            .format("jpg")
                            .url(),
                        width: 600,
                        height: 315,
                    },
                ],
            }),
        },
    };
}
