"use client";

import clsx from "clsx";
import { useState } from "react";

import { Ingredient } from "@/lib/sanity/types";

import styles from "./IngredientList.module.css";

export interface IngredientListProps {
    className?: string;
    ingredients: Ingredient[];
}

export default function IngredientList({
    ingredients,
    className,
}: IngredientListProps) {
    const [checked, setChecked] = useState<Map<string, boolean>>();

    const toggleItem = (key: string) => () => {
        setChecked((prev) => {
            const copy = new Map(prev);
            copy.set(key, !copy.get(key));

            return copy;
        });
    };

    const isChecked = (key: string) => checked?.get(key) ?? false;

    return (
        <ul className={className}>
            {ingredients.map((ingredient) => (
                <li
                    className="mt-4 cursor-pointer"
                    onClick={toggleItem(ingredient._key)}
                    key={ingredient._key}
                >
                    <span
                        className={clsx(styles.Strike, {
                            [styles.Strike__active]: isChecked(ingredient._key),
                        })}
                    >
                        <strong>{ingredient.quantity}</strong>
                        {ingredient.ingredient && " "}
                        {ingredient.ingredient}
                    </span>
                </li>
            ))}
        </ul>
    );
}
