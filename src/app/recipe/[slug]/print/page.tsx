import { Metadata } from "next";
import { notFound } from "next/navigation";

import { useConfig, useRecipe } from "@/lib/sanity";
import { makeSeoData } from "@/lib/seo";

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

    if (!recipe) {
        notFound();
    }

    return (
        <main>
            <div className="mx-auto max-w-screen-md p-8">
                <h1 className="text-5xl font-bold tracking-tight">
                    {recipe.title}
                </h1>
                <div className="my-2 w-fit text-sm">
                    <p className="inline-block border-y-2 border-gray-400 px-3 py-1">
                        Serves{" "}
                        {recipe.servings.min && recipe.servings.max
                            ? `${recipe.servings.min} to ${recipe.servings.max}`
                            : recipe.servings.min || recipe.servings.max}
                    </p>

                    <p className="my-2 inline-block w-fit border-2 border-gray-400 px-3 py-1">
                        Time <span>{recipe.prepTime}</span>
                    </p>

                    <p className="my-2 inline-block w-fit border-y-2 border-gray-400 px-3 py-1">
                        {recipe.dietary.join(", ")}{" "}
                    </p>
                </div>

                <p className="font-serif my-8 text-xl text-zinc-700">
                    {recipe.description}
                </p>

                <div className="my-8">
                    <h2 className="text-3xl font-bold tracking-tighter">
                        Ingredients
                    </h2>

                    <ul className="font-serif list-inside text-xl text-zinc-700">
                        {recipe.ingredients.map((ingredient) => (
                            <li className="mt-4" key={ingredient._key}>
                                <span>
                                    ☐&nbsp;&nbsp;
                                    <strong className="text-black">
                                        {ingredient.quantity}
                                    </strong>
                                    {ingredient.ingredient && " "}
                                    {ingredient.ingredient}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="my-8">
                    <h2 className="text-3xl font-bold tracking-tighter">
                        Method
                    </h2>

                    <ul className="font-serif my-4 list-inside list-decimal text-xl text-zinc-700">
                        {recipe.method.map((step, index) => (
                            <>
                                <li key={index} className="my-4">
                                    {step}
                                </li>
                            </>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}
