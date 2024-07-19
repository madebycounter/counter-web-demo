import { BillIcon, CogIcon, ComposeIcon, CheckmarkIcon } from "@sanity/icons";
import { defineType } from "sanity";

import { SanityImage, sanityImageFragment } from "./objects/SanityImage";

export const recipeSchema = defineType({
    name: "recipe",
    title: "Recipe",
    type: "document",
    groups: [
        {
            name: "content",
            title: "Content",
            default: true,
            icon: ComposeIcon,
        },
        {
            name: "details",
            title: "Details",
            icon: BillIcon,
        },
        {
            name: "settings",
            title: "Settings",
            icon: CogIcon,
        },
    ],
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            group: "content",
        },
        {
            name: "thumbnail",
            title: "Thumbnail",
            type: "image",
            group: "content",
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            group: "content",
        },
        {
            name: "method",
            title: "Method",
            type: "array",
            of: [{ type: "text", rows: 2 }],
            group: "content",
        },
        {
            name: "prepTime",
            title: "Prep Time",
            type: "string",
            options: {
                list: ["25 min", "45 min"],
            },
            group: "details",
        },
        {
            name: "servings",
            title: "Servings",
            type: "object",
            fields: [
                {
                    name: "min",
                    title: "Min",
                    type: "number",
                },
                {
                    name: "max",
                    title: "Max",
                    type: "number",
                },
            ],
            options: { columns: 2 },
            group: "details",
        },
        {
            name: "dietary",
            title: "Dietary Info",
            type: "array",
            of: [
                {
                    type: "string",
                    options: {
                        list: [
                            "Vegetarian",
                            "Vegan",
                            "Gluten-Free",
                            "Low Sugar",
                        ],
                    },
                },
            ],
            group: "details",
        },
        {
            name: "ingredients",
            title: "Ingredients",
            type: "array",
            of: [
                {
                    type: "object",
                    icon: CheckmarkIcon,
                    fields: [
                        {
                            name: "ingredient",
                            title: "Ingredient",
                            type: "string",
                        },
                        {
                            name: "quantity",
                            title: "Quantity",
                            type: "string",
                        },
                    ],
                    preview: {
                        select: {
                            title: "ingredient",
                            subtitle: "quantity",
                        },
                    },
                },
            ],
            group: "details",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
            },
            group: "settings",
            validation: (Rule) => Rule.required(),
        },
    ],
});

export interface Ingredient {
    _key: string;
    ingredient: string;
    quantity: string;
}

export interface Servings {
    min: number;
    max: number;
}

export type DietaryInfo = "Vegetarian" | "Vegan" | "Gluten-Free" | "Low Sugar";

export interface Recipe {
    _id: string;
    _type: "recipe";
    title: string;
    thumbnail: SanityImage;
    description: string;
    method: string[];
    prepTime: string;
    servings: Servings;
    dietary: DietaryInfo[];
    ingredients: Ingredient[];
    slug: {
        current: string;
    };
}

export const recipeFragment = `
    _id,
    _type,
    title,
    thumbnail {
        ${sanityImageFragment}
    },
    description,
    method,
    prepTime,
    servings,
    dietary,
    ingredients[] {
        _key,
        ingredient,
        quantity,
    },
    slug,
`;
