import { ComposeIcon, CogIcon, BoltIcon } from "@sanity/icons";
import { defineType } from "sanity";

import { SanityImage, sanityImageFragment } from "./SanityImage";

export const imageButtonSchema = defineType({
    name: "imageButton",
    title: "Image Button",
    type: "object",
    icon: BoltIcon,
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
            name: "text",
            title: "Button Text",
            type: "string",
            group: "content",
        },
        {
            name: "link",
            title: "Button Link",
            type: "url",
            group: "content",
            hidden: ({ parent }) => parent?.type !== "url",
        },
        {
            name: "reference",
            title: "Button Reference",
            type: "reference",
            to: [{ type: "page" }],
            group: "content",
            hidden: ({ parent }) => parent?.type !== "reference",
        },
        {
            name: "image",
            title: "Button Image",
            type: "image.crop",
            group: "content",
        },
        {
            name: "style",
            title: "Button Style",
            type: "string",
            options: {
                list: [
                    { title: "Centered", value: "centered" },
                    { title: "Title", value: "title" },
                ],
                layout: "radio",
            },
            initialValue: "centered",
            group: "settings",
        },
        {
            name: "type",
            title: "Link Type",
            type: "string",
            options: {
                list: [
                    { title: "URL", value: "url" },
                    { title: "Reference", value: "reference" },
                ],
                layout: "radio",
            },
            initialValue: "url",
            group: "settings",
        },
    ],
    preview: {
        select: {
            title: "text",
            url: "link",
            reference: "reference.slug.current",
            type: "type",
        },
        prepare(sel) {
            return {
                title: sel.title,
                subtitle: sel.type === "url" ? sel.url : sel.reference,
            };
        },
    },
});

export const imageButtonFragment = `
    _id,
    _type,
    text,
    link,
    image {
        ${sanityImageFragment}
    },
    "reference": reference->slug.current,
    style,
    type,
`;

export interface ImageButton {
    _id: string;
    _type: "button";
    text?: string;
    link?: string;
    reference?: string;
    image?: SanityImage;
    style: "centered" | "title";
    type: "url" | "reference";
}
