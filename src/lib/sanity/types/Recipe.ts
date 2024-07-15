import { defineType } from "sanity";

export const recipeSchema = defineType({
    name: "recipe",
    title: "Recipe",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "prepTime",
            title: "Prep Time",
            type: "string",
            options: {
                list: ["25 min"],
            },
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
        },
        {
            name: "description",
            title: "Description",
            type: "text",
        },
        {
            name: "thumbnail",
            title: "Thumbnail",
            type: "image",
        },
    ],
});
