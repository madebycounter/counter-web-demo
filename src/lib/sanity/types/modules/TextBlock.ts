import { BlockContentIcon, CogIcon, ComposeIcon } from "@sanity/icons";
import { defineType } from "sanity";

import { blockToString } from "@/lib/sanity/preview";
import { RichText, richTextFragment } from "../objects/RichText";

export const textBlockSchema = defineType({
    name: "textBlock",
    title: "Text Block",
    type: "object",
    icon: BlockContentIcon,
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
        prepare(selection) {
            return {
                title: selection.title || "Text Block",
                subtitle: blockToString(selection.content),
            };
        },
    },
});

export const textBlockFragment = `
    _id,
    _type,
    content[] {
        ${richTextFragment}
    }
`;

export type TextBlock = {
    _id: string;
    _type: "textBlock";
    content: RichText;
};
