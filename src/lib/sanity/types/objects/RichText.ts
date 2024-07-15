import { defineType } from "sanity";

import { buttonFragment } from "./Button";
import { imageButtonFragment } from "./ImageButton";
import { sanityImageFragment } from "./SanityImage";

export const richTextSchema = defineType({
    name: "richText",
    title: "Rich Text",
    type: "array",
    of: [
        {
            type: "block",
            styles: [
                { title: "Normal", value: "normal" },
                { title: "Heading 1", value: "h1" },
                { title: "Heading 2", value: "h2" },
                { title: "Heading 3", value: "h3" },
            ],
            marks: {
                decorators: [
                    { title: "Strong", value: "strong" },
                    { title: "Emphasis", value: "em" },
                ],
            },
        },
        {
            type: "image.captioned",
        },
        {
            type: "button",
        },
        {
            type: "imageButton",
        },
    ],
});

export const richTextFragment = `
    _type == "block" => {
        ...
    },
    _type == "image.captioned" => {
        ${sanityImageFragment}
    },
    _type == "button" => {
        ${buttonFragment}
    },
    _type == "imageButton" => {
        ${imageButtonFragment}
    }
`;

export type RichText = any;
