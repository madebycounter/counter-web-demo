import { stegaClean } from "@sanity/client/stega";
import { FaGithub } from "react-icons/fa";
import {
    FaYoutube,
    FaInstagram,
    FaLinkedinIn,
    FaRegEnvelope,
    FaFacebook,
    FaXTwitter,
} from "react-icons/fa6";

export interface SocialIconProps {
    className?: string;
    platform?:
        | "instagram"
        | "facebook"
        | "twitter"
        | "linkedin"
        | "youtube"
        | "email"
        | "github";
}

export default function SocialIcon({ platform, className }: SocialIconProps) {
    const iconMap = {
        instagram: FaInstagram,
        facebook: FaFacebook,
        twitter: FaXTwitter,
        linkedin: FaLinkedinIn,
        youtube: FaYoutube,
        email: FaRegEnvelope,
        github: FaGithub,
    };

    const Icon = iconMap[stegaClean(platform) || "instagram"];

    return <Icon className={className} />;
}
