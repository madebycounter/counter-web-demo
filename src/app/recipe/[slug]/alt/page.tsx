import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { LuPrinter } from "react-icons/lu";
import { PiCaretRightBold } from "react-icons/pi";

import Action from "@/lib/components/Action";
import Image from "@/lib/components/Image";
import SocialIcon from "@/lib/components/SocialIcon";
import { useConfig, useRecipe } from "@/lib/sanity";
import { makeSeoData } from "@/lib/seo";

import styles from "./page.module.css";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const recipe = await useRecipe(params.slug);

    if (!recipe) return {};

    return makeSeoData(recipe.title, recipe.description, recipe.thumbnail);
}

export default async function Page({ params }: { params: { slug: string } }) {
    const recipe = await useRecipe(params.slug);
    const config = await useConfig();

    if (!recipe) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-stone-100">
            <div className="w-full">
                <div className="w-full bg-white px-4">
                    <div
                        className={clsx(
                            styles.NavGrid,
                            "mx-auto max-w-screen-lg",
                        )}
                    >
                        <div className="py-8">
                            <Image
                                src={config.siteLogo}
                                alt={config.siteTitle}
                                className="h-8 w-auto"
                                height={50}
                            />
                        </div>

                        <div className="flex items-center justify-end gap-8 font-consul uppercase">
                            <Action href="#">Home</Action>
                            <Action href="#">About</Action>
                            <Action href="#">Recipes</Action>
                            <Action href="#">Contact</Action>
                            <Action href="#">
                                <FaSearch />
                            </Action>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-stone-200 px-4 drop-shadow-lg">
                <div className="mx-auto flex h-10 max-w-screen-lg items-center">
                    <p className="font-consul text-sm text-stone-600">
                        <Action href="#" className={styles.Arrow}>
                            Home
                        </Action>
                        <Action href="#" className={styles.Arrow}>
                            Recipes
                        </Action>
                        <Action href="#">{recipe.title}</Action>
                    </p>
                </div>
            </div>

            <div className="relative h-[700px] w-full">
                <Image
                    src={recipe.thumbnail}
                    alt={recipe.title}
                    className="h-full w-full object-cover"
                />

                <div className="absolute bottom-8 left-0 w-full">
                    <div className="mx-auto max-w-screen-lg">
                        <div className="font-bitter w-[800px] bg-white p-4 shadow-lg">
                            <h1 className="mb-4 text-5xl tracking-tighter">
                                {recipe.title}
                            </h1>

                            <p className="text-2xl">{recipe.description}</p>

                            <div className="mt-4 flex items-end justify-between gap-4">
                                <p className="font-consul text-stone-600">
                                    Serves {recipe.servings.min} | Prep Time{" "}
                                    {recipe.prepTime}{" "}
                                </p>

                                <div className="flex gap-1 font-sans">
                                    {recipe.dietary.map((diet, index) => (
                                        <div
                                            key={index}
                                            className="group relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-fuchsia-600 px-3 py-1 font-bold text-white"
                                        >
                                            {diet === "Vegetarian"
                                                ? "vg"
                                                : diet === "Vegan"
                                                  ? "v"
                                                  : diet === "Gluten-Free"
                                                    ? "gf"
                                                    : diet === "Low Sugar"
                                                      ? "ls"
                                                      : diet}
                                            <span className="absolute top-full hidden translate-y-2 whitespace-nowrap rounded-lg bg-slate-500 px-2 py-1 font-light group-hover:inline-block">
                                                {diet}
                                            </span>
                                        </div>
                                    ))}
                                    <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-fuchsia-600 px-3 py-1 font-bold text-white">
                                        <Action
                                            href={`/recipe/${recipe.slug.current}/print`}
                                            label="Print Recipe"
                                        >
                                            <LuPrinter />
                                        </Action>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-8 px-4">
                <div className="mx-auto flex max-w-screen-lg gap-12">
                    <div className="flex-1">
                        <h2 className="mt-8 font-consul text-3xl text-stone-700">
                            Method
                        </h2>

                        <ol className="font-bitter mt-4 list-decimal text-2xl text-stone-600">
                            {recipe.method.map((step, idx) => (
                                <li key={idx} className="mb-8">
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="max-w-[300px] flex-1">
                        <h2 className="mt-8 font-consul text-3xl text-stone-700">
                            Ingredients
                        </h2>

                        <ul className="font-bitter mt-4 text-2xl text-stone-600">
                            {recipe.ingredients.map((ingredient, idx) => (
                                <li key={idx} className="mb-4">
                                    {ingredient.ingredient}
                                    <br />
                                    <strong className="text-xl">
                                        {ingredient.quantity}
                                    </strong>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-16 bg-gray-100 px-4 text-stone-600">
                <div className="mx-auto max-w-screen-lg py-12">
                    <div className="flex">
                        <div className="flex-1">
                            <p className="mb-4 font-consul font-bold">
                                Quick Links
                            </p>
                            {config.footerLinks.map((link, idx) => (
                                <p key={idx} className="my-2 text-sm">
                                    <Action
                                        href={link.url}
                                        target={link.external ? "_blank" : ""}
                                    >
                                        {link.text}
                                    </Action>
                                </p>
                            ))}
                            {/* <p className="my-2 text-sm">Homepage</p>
                            <p className="my-2 text-sm">About Us</p>
                            <p className="my-2 text-sm">Get In Touch</p>
                            <p className="my-2 text-sm">Privacy Policy</p> */}
                        </div>

                        <div className="flex-1">
                            <p className="mb-4 font-consul font-bold">
                                Explore
                            </p>
                            <p className="my-2 text-sm">
                                <Action href="#">New Recipes</Action>
                            </p>
                            <p className="my-2 text-sm">
                                <Action href="#">Popular Recipes</Action>
                            </p>
                            <p className="my-2 text-sm">
                                <Action href="#">Quick Recipes</Action>
                            </p>
                            <p className="my-2 text-sm">
                                <Action href="#">Healthy Recipes</Action>
                            </p>
                        </div>

                        <div className="flex-1">
                            <p className="mb-4 font-consul font-bold">
                                Latest Recipes
                            </p>
                            {config.latestRecipes.map((recipe, idx) => (
                                <p key={idx} className="my-2 text-sm">
                                    <Action
                                        href={`/recipe/${recipe.slug.current}/alt`}
                                    >
                                        {recipe.title}
                                    </Action>
                                </p>
                            ))}
                        </div>

                        <div className="flex-1">
                            <p className="mb-4 font-consul font-bold">
                                Newsletter
                            </p>

                            <p className="my-2 text-sm">
                                Want the latest recipes direct to your inbox?
                                Subscribe to our monthly newsletter!
                            </p>

                            <div className="my-4">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="h-10 w-full rounded-full p-4"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="my-4">
                        <ul className="flex items-center justify-center text-3xl">
                            <li className="mr-4 flex-grow border-t border-stone-600 sm:mr-8" />
                            {config.socialLinks.map((social, idx) => (
                                <li key={idx}>
                                    <Action
                                        label={social.platform}
                                        href={social.link}
                                        target="_blank"
                                    >
                                        <SocialIcon
                                            platform={social.platform}
                                            className="m-[0.3em] h-[1em] w-[1em] md:m-[0.8em]"
                                        />
                                    </Action>
                                </li>
                            ))}

                            <li className="ml-4 flex-grow border-t border-stone-600 sm:ml-8" />
                        </ul>
                    </div>

                    <div>
                        <div className="m-auto w-[150px] py-4">
                            <Image src={config.siteLogo} />
                        </div>

                        <p className="text-center text-sm">
                            Site for demonstation purposes only.
                            <br />
                            Not designed for mobile use. Information may not be
                            accurate.
                        </p>

                        {/* <p className="text-center text-sm">
                            &copy; {new Date().getFullYear()}{" "}
                            {config.companyName}. All rights reserved.
                        </p> */}
                    </div>
                </div>
            </div>
        </main>
    );
}
