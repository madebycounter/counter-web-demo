import { PresentationIcon, CogIcon, ComposeIcon } from "@sanity/icons";
import { defineType } from "sanity";

import { MuxVideo, muxVideoFragment } from "../objects/MuxVideo";
import { SanityImage, sanityImageFragment } from "../objects/SanityImage";

export const heroSchema = defineType({
    name: "hero",
    title: "Hero",
    type: "object",
    icon: PresentationIcon,
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
            name: "header",
            title: "Header Text",
            type: "string",
            group: "content",
        },
        {
            name: "image",
            title: "Background Image",
            group: "content",
            type: "image.captioned",
            hidden: ({ parent }) => parent?.backgroundType !== "image",
        },
        {
            name: "video",
            title: "Background Video",
            group: "content",
            type: "mux.video",
            hidden: ({ parent }) => parent?.backgroundType !== "video",
        },
        {
            name: "title",
            title: "Display Name",
            description: "Display name for internal use",
            type: "string",
            group: "settings",
        },
        {
            name: "backgroundType",
            title: "Background Type",
            type: "string",
            group: "settings",
            options: {
                list: [
                    { title: "Image", value: "image" },
                    { title: "Video", value: "video" },
                ],
                layout: "radio",
            },
            initialValue: "image",
        },
        {
            name: "heroType",
            title: "Hero Type",
            type: "string",
            group: "settings",
            options: {
                list: [
                    { title: "Full Height", value: "full" },
                    { title: "Half Height", value: "half" },
                ],
                layout: "radio",
            },
            initialValue: "full",
        },
    ],
    preview: {
        select: {
            subtitle: "header",
            image: "image",
            video: "video.asset.playbackId",
            backgroundType: "backgroundType",
            title: "title",
        },
        prepare(selection) {
            return {
                title: selection.title || "Hero",
                subtitle: selection.subtitle,
            };
        },
    },
});

export const heroFragment = `
    _id,
    _type,
    header,
    image {
        ${sanityImageFragment}
    },
    video {
        ${muxVideoFragment}
    },
    backgroundType,
    heroType
`;

export interface Hero {
    _id: string;
    _type: "hero";
    header?: string;
    image?: SanityImage;
    video?: MuxVideo;
    backgroundType: "image" | "video";
    heroType: "full" | "half";
}
