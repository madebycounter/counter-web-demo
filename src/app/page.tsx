import Footer from "@/site/components/Footer";
import Nav from "@/site/components/Nav";
import HeroModule from "@/site/components/modules/Hero";
import ImageSliceModule from "@/site/components/modules/ImageSlice";
import ShowcaseModule from "@/site/components/modules/Showcase";
import TextBlockModule from "@/site/components/modules/TextBlock";
import TwoColumnModule from "@/site/components/modules/TwoColumn";

import { useConfig, usePage } from "@/lib/sanity";

export default async function Home() {
    const config = await useConfig();
    const page = await usePage("test-page");

    console.log(page);

    return (
        <main className="bg-white">
            <Nav config={config} />

            {page.content?.map((module) => (
                <>
                    {module._type === "hero" && <HeroModule src={module} />}

                    {module._type === "twoColumn" && (
                        <TwoColumnModule src={module} />
                    )}

                    {module._type === "textBlock" && (
                        <TextBlockModule src={module} />
                    )}

                    {module._type === "imageSlice" && (
                        <ImageSliceModule src={module} />
                    )}

                    {module._type === "showcase" && (
                        <ShowcaseModule src={module} />
                    )}
                </>
            ))}

            <Footer siteConfig={config} inverted />
        </main>
    );
}
