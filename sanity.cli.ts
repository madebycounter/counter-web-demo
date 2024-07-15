import { SANITY_DATASET, SANITY_PROJECT_ID } from "@/lib/sanity";
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
    api: {
        projectId: SANITY_PROJECT_ID,
        dataset: SANITY_DATASET,
    },
    vite: {
        resolve: {
            alias: {
                "@": "./src",
            },
        },
    },
});
