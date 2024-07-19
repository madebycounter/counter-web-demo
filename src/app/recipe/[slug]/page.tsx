import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { LuPrinter } from "react-icons/lu";

import Action from "@/lib/components/Action";
import Image from "@/lib/components/Image";
import SocialIcon from "@/lib/components/SocialIcon";
import { useConfig, useRecipe } from "@/lib/sanity";
import { makeSeoData } from "@/lib/seo";

import IngredientList from "@/app/recipe/[slug]/IngredientList";

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
        <main className="min-h-screen bg-gray-100">
            <div className="fixed z-50 w-full drop-shadow-lg">
                <div className="bg-emerald-900">
                    <div className="w-full px-4">
                        <div
                            className={clsx(
                                styles.NavGrid,
                                "mx-auto max-w-screen-xl gap-8",
                            )}
                        >
                            <div className="py-8">
                                <Image
                                    src={config.siteLogo}
                                    alt={config.siteTitle}
                                    className="h-8 w-auto invert"
                                    height={50}
                                />
                            </div>

                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search for recipes"
                                    className="h-10 w-full rounded-full p-4"
                                />
                                <IoIosSearch className="absolute right-3 h-5 w-5" />
                            </div>

                            <div className="white flex items-center gap-4 text-xl text-white">
                                <p>
                                    <Action href="#">
                                        <FaCartShopping className="inline align-text-top" />
                                        &nbsp;Cart
                                    </Action>
                                </p>
                                <p>
                                    <Action href="#">
                                        <FaUser className="inline align-text-top" />
                                        &nbsp;Account
                                    </Action>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white px-4">
                        <div className="mx-auto flex max-w-screen-xl items-center gap-12 py-3 font-bold text-emerald-900">
                            <p>
                                <Action href="#">New Recipes</Action>
                            </p>
                            <p>
                                <Action href="#">Popular Recipes</Action>
                            </p>
                            <p>
                                <Action href="#">Quick Recipes</Action>
                            </p>
                            <p>
                                <Action href="#">Healthy Recipes</Action>
                            </p>
                            <p>
                                <Action href="#">Vegetarian Recipes</Action>
                            </p>
                            <p>
                                <Action href="#">Vegan Recipes</Action>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-36"></div>

            <div className="mx-auto max-w-screen-xl">
                <div>
                    <Image
                        className="aspect-video w-full object-cover"
                        src={recipe.thumbnail}
                        alt={recipe.title}
                    />
                </div>

                <div className={clsx(styles.ContentGrid, "mx-8 my-8 gap-8")}>
                    <div>
                        <p className="font-semibold">
                            <span className="text-emerald-800">Home</span>
                            <span className="mx-2"> / </span>
                            <span className="text-emerald-800">Recipes</span>
                            <span className="mx-2"> / </span>
                            <span className="text-gray-600">
                                {recipe.title}
                            </span>
                        </p>

                        <h1 className="text-5xl font-bold tracking-tighter">
                            {recipe.title}
                        </h1>

                        <div className="my-2 w-fit text-sm">
                            <p className="inline-block border-y-2 border-r-2 border-gray-400 px-3 py-1">
                                Serves{" "}
                                {recipe.servings.min && recipe.servings.max
                                    ? `${recipe.servings.min} to ${recipe.servings.max}`
                                    : recipe.servings.min ||
                                      recipe.servings.max}
                            </p>

                            <p className="my-2 inline-block w-fit border-y-2 border-gray-400 px-3 py-1">
                                <span>
                                    Time <span>{recipe.prepTime}</span>
                                </span>
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-emerald-800 px-3 py-1 font-bold text-white">
                                <Action
                                    href={`/recipe/${recipe.slug.current}/print`}
                                    label="Print Recipe"
                                >
                                    <LuPrinter />
                                </Action>
                            </div>
                            {recipe.dietary.map((diet, index) => (
                                <div
                                    key={index}
                                    className="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-emerald-800 px-3 py-1 font-bold text-white"
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
                        </div>

                        <p className="font-serif my-8 text-xl text-zinc-700">
                            {recipe.description}
                        </p>

                        <div>
                            <h2 className="text-3xl font-bold tracking-tighter">
                                Method
                            </h2>

                            <ul className="font-serif my-4 list-outside list-decimal text-xl text-zinc-700">
                                {recipe.method.map((step, index) => (
                                    <>
                                        <li key={index} className="my-2">
                                            {step}
                                        </li>
                                        {index < recipe.method.length - 1 && (
                                            <hr className="my-4 border-zinc-300" />
                                        )}
                                    </>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="sticky top-44 w-full bg-white p-8">
                            <h2 className="mb-4 text-3xl font-bold tracking-tighter">
                                Ingredients
                            </h2>

                            <IngredientList ingredients={recipe.ingredients} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 bg-emerald-900 px-4 text-white">
                <div className="mx-auto max-w-screen-xl py-12">
                    <div className="flex">
                        <div className="flex-1">
                            <p className="mb-4 font-bold">Quick Links</p>
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
                            <p className="mb-4 font-bold">Explore</p>
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
                            <p className="mb-4 font-bold">Latest Recipes</p>
                            {config.latestRecipes.map((recipe, idx) => (
                                <p key={idx} className="my-2 text-sm">
                                    <Action
                                        href={`/recipe/${recipe.slug.current}`}
                                    >
                                        {recipe.title}
                                    </Action>
                                </p>
                            ))}
                        </div>

                        <div className="flex-1">
                            <p className="mb-4 font-bold">Newsletter</p>
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
                            <li className="mr-4 flex-grow border-t border-white sm:mr-8" />
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

                            <li className="ml-4 flex-grow border-t border-white sm:ml-8" />
                        </ul>
                    </div>

                    <div>
                        <div className="m-auto w-[150px] py-4">
                            <Image src={config.siteLogo} className="invert" />
                        </div>

                        <p className="text-center text-sm">
                            Site for demonstation purposes only.
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
