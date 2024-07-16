"use client";

import { SanityImage as SanityImageComponent } from "sanity-image";

import { SanityImage } from "@/lib/sanity/types";

export type ImageProps = Omit<
    React.ComponentProps<typeof SanityImageComponent>,
    "baseUrl" | "dataset" | "projectId" | "hotspot" | "crop" | "id" | "alt"
> & {
    src?: SanityImage;
};

export default function Image(props: ImageProps) {
    const { src, ...rest } = props;

    if (!src) return null;

    return (
        <SanityImageComponent
            id={src.id}
            alt={src.caption}
            crop={src.crop}
            hotspot={src.hotspot}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            {...rest}
        />
    );
}
