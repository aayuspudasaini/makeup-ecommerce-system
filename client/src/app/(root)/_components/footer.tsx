import React from "react";
import { AppLogo } from "@/components/app-logo";
import { Container } from "@/components/global/container";
import Link from "next/link";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { FaInstagram } from "react-icons/fa6";

interface iSocialProps {
    title: string;
    icon: IconType;
    href?: string;
}

const socialMedia: iSocialProps[] = [
    {
        title: "Facebook",
        icon: FaFacebookF,
        href: "https://facebook.com",
    },
    { title: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
    {
        title: "TikTok",
        icon: FaTiktok,
        href: "https://tiktok.com",
    },
];

interface iFooterItemProps {
    title: string;
    items: {
        title: string;
        href?: string;
    }[];
}

const footerItems: iFooterItemProps[] = [
    {
        title: "Shop",
        items: [
            {
                title: "Best Sellers",
                href: "/collections/best-sellers",
            },
            {
                title: "New Arrivals",
                href: "/collections/new-arrival",
            },
            {
                title: "Shop All",
                href: "/collections/shop",
            },
            {
                title: "Special Offers",
                href: "/collections/offer",
            },
        ],
    },
    {
        title: "Quick Links",
        items: [
            {
                title: "Who are we?",
                href: "/about-us",
            },
            {
                title: "Contact Us",
                href: "/contact-us",
            },
            {
                title: "Privacy Policy",
                href: "/pages/privacy-policy",
            },
            {
                title: "Terms & Conditons",
                href: "/pages/terms-and-conditions",
            },
        ],
    },

    {
        title: "Contact",
        items: [
            {
                title: "Kathmandu, Nepal",
                href: "",
            },
            {
                title: "info@example.com",
                href: "mailto:info@example.com",
            },
            {
                title: "+977-9800000000",
                href: "tel:+977-9800000000",
            },
        ],
    },
];

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100/90 dark:bg-inherit  border-t">
            <Container>
                <div className=" w-full p-4 py-6 lg:py-8">
                    <div className="md:flex md:justify-between md:gap-12">
                        <div className="mb-6 md:mb-0 space-y-2.5 max-w-md">
                            <AppLogo />
                            <p className="text-muted-foreground">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Ipsa, a dolorem hic culpa est
                                sapiente repudiandae
                            </p>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                            {footerItems.map((item, i) => (
                                <div key={i}>
                                    <h2 className="mb-6 text-sm font-bold uppercase ">
                                        {item.title}
                                    </h2>
                                    <ul className="text-md font-normal text-muted-foreground">
                                        {item.items.map((item, i) => (
                                            <li key={i} className="mb-4">
                                                <Link
                                                    href={
                                                        item.href
                                                            ? item.href
                                                            : "#"
                                                    }
                                                    className="hover:underline"
                                                >
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className="my-6 border-t sm:mx-auto  lg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm  sm:text-center text-muted-foreground">
                            © {new Date().getFullYear()}{" "}
                            <Link href="/" className="hover:underline">
                                Cosmetics
                            </Link>
                            . All Rights Reserved.
                        </span>
                        <div className="flex mt-4 sm:justify-center sm:mt-0 gap-4">
                            {socialMedia.map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.href ? item.href : "#"}
                                    className="text-muted-foreground hover:text-secondary-foreground"
                                    target="_blank"
                                >
                                    <item.icon className="size-4" />
                                    <span className="sr-only">
                                        {item.title}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
