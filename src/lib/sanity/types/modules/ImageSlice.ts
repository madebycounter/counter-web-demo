import { BlockElementIcon, CogIcon, ComposeIcon } from "@sanity/icons";
import { defineType } from "sanity";

import { blockToString } from "@/lib/sanity/preview";
import { RichText, richTextFragment } from "../objects/RichText";
import { SanityImage, sanityImageFragment } from "../objects/SanityImage";

export const imageSliceSchema = defineType({
    name: "imageSlice",
    title: "Image Slice",
    type: "object",
    icon: BlockElementIcon,
    groups: [
        {
            name: "content",
            title: "Content",
            default: true,
            icon: ComposeIcon,
        },
        {
            name: "settings",
            title: "Settings",
            icon: CogIcon,
        },
    ],
    fields: [
        {
            name: "content",
            title: "Content",
            type: "richText",
            group: "content",
        },
        {
            name: "image",
            title: "Background Image",
            type: "image",
            group: "content",
        },
        {
            name: "title",
            title: "Display Name",
            description: "Display name for internal use",
            type: "string",
            group: "settings",
        },
    ],
    preview: {
        select: {
            title: "title",
            content: "content",
        },
        prepare(sel) {
            return {
                title: sel.title || "Image Slice",
                subtitle: blockToString(sel.content),
            };
        },
    },
});

export const imageSliceFragment = `
    _id,
    _type,
    content[] {
        ${richTextFragment}
    },
    image {
        ${sanityImageFragment}
    }
`;

export type ImageSlice = {
    _id: string;
    _type: "imageSlice";
    content: RichText;
    image?: SanityImage;
};
