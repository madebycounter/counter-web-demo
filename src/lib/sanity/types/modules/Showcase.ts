import { CogIcon, ComposeIcon, ImagesIcon } from "@sanity/icons";
import { defineType } from "sanity";

import { blockToString } from "@/lib/sanity/preview";
import { RichText, richTextFragment } from "../objects/RichText";
import { SanityImage, sanityImageFragment } from "../objects/SanityImage";

export const showcaseSchema = defineType({
    name: "showcase",
    title: "Showcase",
    type: "object",
    icon: ImagesIcon,
    groups: [
        {
            name: "contentTop",
            title: "Top Content",
            default: true,
            icon: ComposeIcon,
        },
        {
            name: "contentBottom",
            title: "Bottom Content",
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
            name: "imageTop",
            title: "Top Image",
            type: "image.captioned",
            group: "contentTop",
        },
        {
            name: "contentTop",
            title: "Top Content",
            type: "richText",
            group: "contentTop",
        },
        {
            name: "imageBottom",
            title: "Bottom Image",
            type: "image.captioned",
            group: "contentBottom",
        },
        {
            name: "contentBottom",
            title: "Bottom Content",
            type: "richText",
            group: "contentBottom",
        },
        {
            name: "title",
            title: "Display Name",
            description: "Display name for internal use",
            type: "string",
            group: "settings",
        },
        {
            name: "aspectRatio",
            title: "Image Aspect Ratio",
            type: "number",
            options: {
                list: [
                    { title: "16:9", value: 16 / 9 },
                    { title: "4:3", value: 4 / 3 },
                    { title: "1:1", value: 1 },
                ],
                layout: "radio",
            },
            initialValue: 16 / 9,
            group: "settings",
            validation: (Rule: any) => Rule.required(),
        },
    ],
    preview: {
        select: {
            title: "title",
            imageTop: "imageTop",
            contentTop: "contentTop",
            imageBottom: "imageBottom",
            contentBottom: "contentBottom",
        },
        prepare(selection: any) {
            return {
                title: selection.title || "Showcase",
                subtitle:
                    blockToString(selection.contentTop) +
                    " " +
                    blockToString(selection.contentBottom),
            };
        },
    },
});

export const showcaseFragment = `
    _id,
    _type,
    imageTop {
        ${sanityImageFragment}
    },
    contentTop[] {
        ${richTextFragment}
    },
    imageBottom {
        ${sanityImageFragment}
    },
    contentBottom[] {
        ${richTextFragment}
    }
`;

export interface Showcase {
    _type: "showcase";
    _id: string;
    imageTop?: SanityImage;
    contentTop: RichText;
    imageBottom?: SanityImage;
    contentBottom: RichText;
}
