import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Counter E-Commerce",
    description: "Shopify integration demo",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
