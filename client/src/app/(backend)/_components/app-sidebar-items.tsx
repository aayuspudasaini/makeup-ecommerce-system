import { Home, Settings, LucideIcon, UserRound } from "lucide-react";
import { IconType } from "react-icons";
import { BiCategoryAlt } from "react-icons/bi";
import { LuBookText } from "react-icons/lu";
import { LuCalendarRange } from "react-icons/lu";
import { RiUserAddLine } from "react-icons/ri";
import { BsBoxSeam } from "react-icons/bs";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { TbShoppingCartCheck } from "react-icons/tb";
import { IoCashOutline } from "react-icons/io5";
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
        title: "Bookings",
        href: "/bookings",
        icon: LuBookText,
        items: [
            {
                title: "Appointment",
                href: "/bookings/appointment",
                icon: LuCalendarRange,
            },
            {
                title: "Class",
                href: "/bookings/class",
                icon: RiUserAddLine,
            },
        ],
    },
    {
        title: "Product",
        href: "/product",
        icon: BsBoxSeam,
    },
    {
        title: "Category",
        href: "/category",
        icon: BiCategoryAlt,
    },
    {
        title: "Order",
        href: "/order",
        icon: TbShoppingCartCheck,
    },
    {
        title: "Payment",
        href: "/payment",
        icon: IoCashOutline,
    },

    {
        title: "Users",
        href: "/settings/users",
        icon: UserRound,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        items: [
            {
                title: "Carousel",
                href: "/carousel",
                icon: TfiLayoutSliderAlt,
            },
        ],
    },
];
