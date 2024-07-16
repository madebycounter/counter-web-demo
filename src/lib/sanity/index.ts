import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import { draftMode } from "next/headers";

import {
    SanityImage,
    Config,
    configFragment,
    Page,
    pageFragment,
} from "@/lib/sanity/types";

export const SANITY_API_VERSION =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
    process.env.SANITY_STUDIO_API_VERSION ||
    "2024-06-03";
export const SANITY_PROJECT_ID =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.SANITY_STUDIO_PROJECT_ID;
export const SANITY_DATASET =
    process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET;

export const client = createClient({
    apiVersion: SANITY_API_VERSION,
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    useCdn: false,
    perspective: "published",
});

export const imageBuilder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
    return imageBuilder.image(source.id);
}

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

export async function usePage(slug: string): Promise<Page> {
    console.log(pageFragment);

    return query(
        `
        *[_type == "page" && slug.current == $slug][0] {
            ${pageFragment}
        }
    `,
        { slug },
        ["page", "reusableModule"],
    );
}

export async function useConfig(): Promise<Config> {
    return query(
        `
        *[_type == "config"][0] {
            ${configFragment}
        }`,
        {},
        ["config"],
    );
}
