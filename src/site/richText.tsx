import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

type AsType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "a";

interface BlockProps {
    children?: ReactNode;
}

interface ListProps {
    children?: ReactNode;
    value: any;
}

export function normal(className?: string, as?: AsType) {
    const Component = as || "p";

    return ({ children }: BlockProps) => (
        <Component className={clsx(className, "my-4 text-xl leading-normal")}>
            {children}
        </Component>
    );
}

export function h1(className?: string, as?: AsType) {
    const Component = as || "h1";

    return ({ children }: BlockProps) => (
        <Component
            className={clsx(
                className,
                "my-4 text-8xl font-bold tracking-tighter",
            )}
        >
            {children}
        </Component>
    );
}

export function h2(className?: string, as?: AsType) {
    const Component = as || "h2";

    return ({ children }: BlockProps) => (
        <Component
            className={clsx(
                className,
                "my-4 text-5xl font-bold tracking-tight",
            )}
        >
            {children}
        </Component>
    );
}

export function h3(className?: string, as?: AsType) {
    const Component = as || "h3";

    return ({ children }: BlockProps) => (
        <Component
            className={clsx(
                className,
                "my-4 text-3xl font-bold tracking-tight",
            )}
        >
            {children}
        </Component>
    );
}

export function strong(className?: string) {
    return ({ children }: BlockProps) => (
        <strong className={clsx(className, "font-bold")}>{children}</strong>
    );
}

export function code(className?: string) {
    return ({ children }: BlockProps) => (
        <code className={clsx(className, "bg-gray-200")}>{children}</code>
    );
}

export function bullet(className?: string) {
    return ({ children, value }: ListProps) => (
        <ul
            className={clsx(className, "ml-[2em]", {
                "my-4 list-decimal": value.level === 1,
                "list-[lower-alpha]": value.level === 2,
            })}
        >
            {children}
        </ul>
    );
}

export function number(className?: string) {
    return ({ children, value }: ListProps) => (
        <ol
            className={clsx(className, "ml-[2em]", {
                "my-4 list-disc": value.level === 1,
                "list-[circle]": value.level === 2,
            })}
        >
            {children}
        </ol>
    );
}

export function link(className?: string) {
    return (props: any) => (
        <Link
            className={clsx(className, "text-blue-500")}
            href={props.value.href}
        >
            {props.text}
        </Link>
    );
}
