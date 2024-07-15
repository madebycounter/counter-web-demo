import { ComponentIcon } from "@sanity/icons";
import { defineType } from "sanity";

import { Content, contentArray, contentFragment } from "../objects/Content";

export const reusableModuleSchema = defineType({
    name: "reusableModule",
    title: "Reusable Module",
    icon: ComponentIcon,
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            description: "Display name for internal use",
        },
        {
            name: "content",
            title: "Content",
            type: "array",
            of: contentArray,
            validation: (Rule) => Rule.length(1),
        },
    ],
});

export const reusableModuleFragment = `
    _id,
    _type,
    title,
    content[] {
        ${contentFragment}
    }
`;

export interface ReusableModule {
    _id: string;
    _type: "reusableModule";
    title?: string;
    content?: Content;
}
