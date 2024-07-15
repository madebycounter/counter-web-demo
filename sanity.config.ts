import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { visionTool } from "@sanity/vision";
import {
    SANITY_API_VERSION,
    SANITY_DATASET,
    SANITY_PROJECT_ID,
} from "@/lib/sanity";
import { recipeSchema } from "@/lib/sanity/types/Recipe";
import { configSchema } from "@/lib/sanity/types/Config";
import { heroSchema } from "@/lib/sanity/types/modules/Hero";
import { imageSliceSchema } from "@/lib/sanity/types/modules/ImageSlice";
import { reusableModuleSchema } from "@/lib/sanity/types/modules/ReusableModule";
import { showcaseSchema } from "@/lib/sanity/types/modules/Showcase";
import { textBlockSchema } from "@/lib/sanity/types/modules/TextBlock";
import { twoColumnSchema } from "@/lib/sanity/types/modules/TwoColumn";
import { buttonSchema } from "@/lib/sanity/types/objects/Button";
import { contentSchema } from "@/lib/sanity/types/objects/Content";
import { footerLinkSchema } from "@/lib/sanity/types/objects/FooterLink";
import { imageButtonSchema } from "@/lib/sanity/types/objects/ImageButton";
import { richTextSchema } from "@/lib/sanity/types/objects/RichText";
import {
    sanityImageSchema,
    sanityImageCropSchema,
} from "@/lib/sanity/types/objects/SanityImage";
import { socialLinkSchema } from "@/lib/sanity/types/objects/SocialLink";
import { pageSchema } from "@/lib/sanity/types/Page";

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
    ],
});
