import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/site/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        fontFamily: {
            sans: [
                "HelveticaNeue-Light",
                "Helvetica Neue Light",
                "Helvetica Neue",
                "Helvetica",
                "Arial",
                "Lucida Grande",
                "sans-serif",
            ],
            serif: [
                "Georgia",
                "Cambria",
                '"Times New Roman"',
                "Times",
                "serif",
            ],
        },
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            dropShadow: {
                heavy: ["0px 0px 5px rgba(0, 0, 0, 0.5)"],
                "2xl": ["0px 0px 10px rgba(0, 0, 0, 0.3)"],
            },
            blur: {
                xs: "2px",
            },
            height: {
                hero: "calc(100vh - 5rem)",
            },
            transitionProperty: {
                width: "width",
            },
        },
    },
    plugins: [],
};
export default config;
