import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { visionTool } from "@sanity/vision";
import {
    SANITY_API_VERSION,
    SANITY_DATASET,
    SANITY_PROJECT_ID,
} from "@/lib/sanity";

export default defineConfig({
    basePath: "/studio",
    projectId: SANITY_PROJECT_ID || "",
    dataset: SANITY_DATASET || "",

    schema: {
        types: [],
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
