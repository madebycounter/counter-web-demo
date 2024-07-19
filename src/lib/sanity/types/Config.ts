import { UlistIcon, SplitHorizontalIcon, EarthGlobeIcon } from "@sanity/icons";
import { defineType } from "sanity";

import { Recipe } from "@/lib/sanity/types/Recipe";

import { Page } from "./Page";
import { FooterLink, footerLinkFragment } from "./objects/FooterLink";
import { SanityImage, sanityImageFragment } from "./objects/SanityImage";
import { SocialLink, socialLinkFragment } from "./objects/SocialLink";

export const configSchema = defineType({
    name: "config",
    title: "Config",
    type: "document",
    groups: [
        {
            name: "site",
            title: "Global",
            default: true,
            icon: EarthGlobeIcon,
        },
        {
            name: "footer",
            title: "Footer",
            icon: SplitHorizontalIcon,
        },
        {
            name: "nav",
            title: "Navbar",
            icon: UlistIcon,
        },
    ],
    fields: [
        {
            name: "siteTitle",
            title: "Title",
            type: "string",
            group: "site",
        },
        {
            name: "siteLogo",
            title: "Logo",
            type: "image",
            group: "site",
        },
        {
            name: "companyName",
            title: "Company Name",
            type: "string",
            group: "site",
        },
        {
            name: "socialLinks",
            title: "Social Media Links",
            type: "array",
            of: [{ type: "socialLink" }],
            group: "footer",
        },
        {
            name: "footerLinks",
            title: "Footer Links",
            type: "array",
            of: [{ type: "footerLink" }],
            group: "footer",
        },
        {
            name: "navLinks",
            title: "Navbar Links",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "page" }],
                },
            ],
            group: "nav",
        },
    ],
});

export const configFragment = `
    _id,
    _type,
    siteTitle,
    siteLogo {
        ${sanityImageFragment}
    },
    companyName,
    socialLinks[] {
        ${socialLinkFragment}
    },
    footerLinks[] {
        ${footerLinkFragment}
    },
    navLinks[]->{
        title,
        slug,
    },
    "latestRecipes": *[_type == "recipe"] | order(_createdAt desc) [0...3] {
        title,
        slug
    }
`;

export interface Config {
    _id: string;
    _type: string;
    siteTitle: string;
    siteLogo: SanityImage;
    companyName: string;
    socialLinks: SocialLink[];
    footerLinks: FooterLink[];
    navLinks: Page[];
    latestRecipes: Recipe[];
}
