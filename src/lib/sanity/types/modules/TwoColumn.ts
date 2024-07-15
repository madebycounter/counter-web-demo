import {
    InlineIcon,
    PanelRightIcon,
    PanelLeftIcon,
    CogIcon,
    ComposeIcon,
} from "@sanity/icons";
import { defineType } from "sanity";

import { blockToString } from "@/lib/sanity/preview";
import { RichText, richTextFragment } from "../objects/RichText";

export const twoColumnSchema = defineType({
    name: "twoColumn",
    title: "Two Column",
    type: "object",
    icon: InlineIcon,
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
            name: "left",
            title: "Left Column",
            type: "richText",
            group: "content",
        },
        {
            name: "right",
            title: "Right Column",
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
        {
            name: "mode",
            title: "Column Type",
            type: "string",
            options: {
                list: [
                    { title: "Even Columns", value: "even" },
                    { title: "Left Sidebar", value: "left" },
                    { title: "Right Sidebar", value: "right" },
                ],
                layout: "radio",
            },
            initialValue: "even",
            group: "settings",
        },
    ],
    preview: {
        select: {
            left: "left",
            right: "right",
            mode: "mode",
            title: "title",
        },
        prepare({ left, right, mode, title }: any) {
            var icon = InlineIcon;
            var displayTitle = `Two Columns${mode === "left" ? " (Left Sidebar)" : ""}${mode === "right" ? " (Right Sidebar)" : ""}`;

            if (mode === "left") {
                icon = PanelLeftIcon;
            }

            if (mode === "right") {
                icon = PanelRightIcon;
            }

            if (title) {
                displayTitle = title;
            }

            return {
                title: displayTitle,
                subtitle: blockToString(left) + " " + blockToString(right),
                media: icon,
            };
        },
    },
});

export const twoColumnFragment = `
    _id,
    _type,
    left[] {
        ${richTextFragment}
    },
    right[] {
        ${richTextFragment}
    },
    mode
`;

export interface TwoColumn {
    _id: string;
    _type: "twoColumn";
    left: RichText;
    right: RichText;
    mode: "even" | "left" | "right";
}
