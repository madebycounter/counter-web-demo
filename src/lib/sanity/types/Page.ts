import { ComposeIcon, CogIcon } from "@sanity/icons";
import { defineType } from "sanity";

import { Content, contentFragment } from "./objects/Content";

export const pageSchema = defineType({
    name: "page",
    title: "Page",
    type: "document",
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
            type: "content",
            name: "content",
            title: "Content",
            group: "content",
        },
        {
            type: "string",
            name: "title",
            title: "Title",
            group: "settings",
        },
        {
            type: "slug",
            name: "slug",
            title: "Slug",
            group: "settings",
            options: {
                source: "title",
            },
        },
        {
            type: "text",
            name: "seoDescription",
            title: "Page Description",
            description: "Description for search engines and embedded previews",
            group: "settings",
        },
        {
            type: "image.crop",
            name: "seoImage",
            title: "Page Thumbnail",
            description:
                "Image used for search engines and embedded previews. Image will be presented at 1200x630 resolution.",
            group: "settings",
        },
    ],
});

export const pageFragment = `
    _id,
    _type,
    title,
    content[] {
        ${contentFragment}
    },
    slug
`;

export interface Page {
    _id: string;
    _type: "page";
    title?: string;
    content?: Content;
    slug?: {
        _type: "slug";
        current: string;
    };
}
