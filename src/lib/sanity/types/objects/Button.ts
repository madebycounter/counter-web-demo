import { ComposeIcon, CogIcon, BoltIcon } from "@sanity/icons";
import { defineType } from "sanity";

export const buttonSchema = defineType({
    name: "button",
    title: "Button",
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
            name: "style",
            title: "Button Style",
            type: "string",
            options: {
                list: [
                    { title: "Primary", value: "primary" },
                    { title: "Secondary", value: "secondary" },
                ],
                layout: "radio",
            },
            initialValue: "primary",
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

export const buttonFragment = `
    _id,
    _type,
    text,
    link,
    "reference": reference->slug.current,
    style,
    type,
`;

export interface Button {
    _id: string;
    _type: "button";
    text?: string;
    link?: string;
    reference?: string;
    style: "primary" | "secondary" | "image";
    type: "url" | "reference";
}
