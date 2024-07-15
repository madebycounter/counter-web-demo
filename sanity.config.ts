import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { muxInput } from "sanity-plugin-mux-input";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import {
    SANITY_API_VERSION,
    SANITY_DATASET,
    SANITY_PROJECT_ID,
} from "@/lib/sanity";
import "@/lib/sanity/style.css";
import {
    buttonSchema,
    configSchema,
    contentSchema,
    footerLinkSchema,
    heroSchema,
    imageButtonSchema,
    imageSliceSchema,
    pageSchema,
    recipeSchema,
    reusableModuleSchema,
    richTextSchema,
    sanityImageCropSchema,
    sanityImageSchema,
    showcaseSchema,
    socialLinkSchema,
    textBlockSchema,
    twoColumnSchema,
} from "@/lib/sanity/types";

export default defineConfig({
    basePath: "/studio",
    projectId: SANITY_PROJECT_ID || "",
    dataset: SANITY_DATASET || "",

    schema: {
        types: [
            richTextSchema,
            pageSchema,
            contentSchema,
            twoColumnSchema,
            configSchema,
            sanityImageSchema,
            sanityImageCropSchema,
            heroSchema,
            showcaseSchema,
            textBlockSchema,
            reusableModuleSchema,
            buttonSchema,
            imageSliceSchema,
            footerLinkSchema,
            socialLinkSchema,
            imageButtonSchema,
            recipeSchema,
        ],
    },

    plugins: [
        structureTool(),
        visionTool({
            defaultApiVersion: SANITY_API_VERSION,
        }),
        presentationTool({
            previewUrl: {
                draftMode: {
                    enable: "/api/draft",
                },
            },
        }),
        muxInput(),
    ],
});
