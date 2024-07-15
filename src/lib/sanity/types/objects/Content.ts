import { defineType } from "sanity";

import { Hero, heroFragment } from "../modules/Hero";
import { ImageSlice, imageSliceFragment } from "../modules/ImageSlice";
import { Showcase, showcaseFragment } from "../modules/Showcase";
import { TextBlock, textBlockFragment } from "../modules/TextBlock";
import { TwoColumn, twoColumnFragment } from "../modules/TwoColumn";

export const contentArray = [
    {
        type: "twoColumn",
    },
    {
        type: "hero",
    },
    {
        type: "showcase",
    },
    {
        type: "textBlock",
    },
    {
        type: "imageSlice",
    },
];

export const contentSchema = defineType({
    name: "content",
    title: "Content",
    type: "array",
    of: [
        ...contentArray,
        {
            type: "reference",
            title: "Reusable Module",
            to: [{ type: "reusableModule" }],
        },
    ],
});

export const contentArrayFragment = `
    _type == "twoColumn" => {
        ${twoColumnFragment}
    },
    _type == "hero" => {
        ${heroFragment}
    },
    _type == "showcase" => {
        ${showcaseFragment}
    },
    _type == "textBlock" => {
        ${textBlockFragment}
    },
    _type == "imageSlice" => {
        ${imageSliceFragment}
    }
`;

export const contentFragment = `
    defined(_ref) => {
        ...@->content[0] {
            ${contentArrayFragment}
        }
    },
    !defined(_ref) => {
        ${contentArrayFragment}
    }
`;

export type ContentModule =
    | TwoColumn
    | Hero
    | Showcase
    | TextBlock
    | ImageSlice;

export type Content = ContentModule[];
