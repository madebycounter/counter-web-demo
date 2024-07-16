import MuxVideo from "@mux/mux-video-react";
import { stegaClean } from "@sanity/client/stega";
import clsx from "clsx";

import Image from "@/lib/components/Image";
import { Hero } from "@/lib/sanity/types";

export interface HeroProps {
    src: Hero;
}

export default function HeroModule({ src }: HeroProps) {
    return (
        <div
            className={clsx("relative mb-8 w-full", {
                "h-hero": src.heroType === "full",
                "h-[60vh]": src.heroType === "half",
            })}
        >
            {src.backgroundType === "image" && src.image && (
                <Image
                    src={src.image}
                    className="h-full w-full object-cover px-4 pb-4"
                    loading="eager"
                />
            )}

            {src.backgroundType === "video" && src.video && (
                <div className="h-full w-full px-4 pb-4">
                    <MuxVideo
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                        playbackId={stegaClean(src.video.asset.playbackId)}
                        controls={false}
                        autoPlay
                        loop
                        muted
                    />
                </div>
            )}

            {src.header && src.header.replace(" ", "").length !== 0 && (
                <div
                    className={clsx(
                        "absolute bottom-0 left-0 mb-4 bg-white px-8",
                        {
                            "text-8xl": src.heroType === "full",
                            "pr-5 text-6xl": src.heroType === "half",
                        },
                    )}
                >
                    <h1 className="my-1 font-bold tracking-tighter text-black">
                        {src.header}
                    </h1>
                </div>
            )}
        </div>
    );
}
