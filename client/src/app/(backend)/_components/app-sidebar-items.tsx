import { Home, Settings, LucideIcon, UserRound } from "lucide-react";
import { IconType } from "react-icons";
import { TfiLayoutSlider } from "react-icons/tfi";
import { BiCategoryAlt } from "react-icons/bi";

interface iNavProps {
    title: string;
    href: string;
    icon?: LucideIcon | IconType;
}

interface iNavGroupProps {
    title: string;
    href: string;
    icon?: LucideIcon | IconType;
    items?: iNavProps[];
}

export const NavLinkItems: iNavGroupProps[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
    },

    {
        title: "Slider",
        href: "/slider",
        icon: TfiLayoutSlider,
    },

    {
        title: "Category",
        href: "/category",
        icon: BiCategoryAlt,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        items: [
            {
                title: "Users",
                href: "/settings/users",
                icon: UserRound,
            },
        ],
    },
];
