import { draftMode } from "next/headers";

import { createClient } from "next-sanity";

export const SANITY_API_VERSION =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
    process.env.SANITY_STUDIO_API_VERSION ||
    "2024-06-03";
export const SANITY_PROJECT_ID =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.SANITY_STUDIO_PROJECT_ID;
export const SANITY_DATASET =
    process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET;

console.log(SANITY_API_VERSION, SANITY_PROJECT_ID, SANITY_DATASET);

export const client = createClient({
    apiVersion: SANITY_API_VERSION,
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    useCdn: false,
    perspective: "published",
    stega: {
        enabled: false,
        studioUrl: "/studio",
    },
});

export async function query<T>(
    query: string,
    params?: any,
    tags?: string[],
): Promise<T> {
    const preview = draftMode().isEnabled;

    return client.fetch(query, params || {}, {
        token: process.env.SANITY_READ_TOKEN,
        ...(preview && {
            perspective: "previewDrafts",
            stega: true,
        }),
        next: {
            ...(preview && {
                revalidate: 0,
            }),
            tags,
        },
    });
}
