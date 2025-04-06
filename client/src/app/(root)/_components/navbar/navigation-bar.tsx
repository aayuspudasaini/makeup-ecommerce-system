import { AppLogo } from "@/components/app-logo";
import { Container } from "@/components/global/container";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Button } from "@/components/ui/button";
import { CgShoppingBag } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa6";
import React from "react";
import { LuUserRound } from "react-icons/lu";
import Link from "next/link";

export const NavigationBar = () => {
    return (
        <nav className="top-0 sticky z-50 bg-background h-[4rem] flex items-center justify-between border-b">
            <Container className="flex items-center justify-between h-full">
                <AppLogo />
                <div className=" hidden md:flex items-center gap-10 h-full">
                    {["Best Sellers", "New", "Products"].map((item, i) => (
                        <ListItem key={i} title={item} />
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-2.5">
                    <ThemeSwitcher />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 cursor-pointer hover:bg-transparent dark:hover:bg-transparent"
                        title="Wishlist"
                    >
                        <FaRegHeart className="size-4" />
                    </Button>
                    <Link passHref href="/signin">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 cursor-pointer hover:bg-transparent dark:hover:bg-transparent"
                            title="Account"
                        >
                            <LuUserRound className="size-4" />
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 cursor-pointer hover:bg-transparent dark:hover:bg-transparent"
                        title="Shopping Bag"
                    >
                        <CgShoppingBag className="size-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer border-dashed border-secondary-foreground"
                    >
                        Join Class
                    </Button>
                </div>
            </Container>
        </nav>
    );
};

interface iListItemProps {
    title: string;
    href?: string;
}

const ListItem: React.FC<iListItemProps> = ({ title, href }) => {
    return (
        <Link
            href={href ? href : "#"}
            className="relative w-fit flex items-center h-full font-semibold capitalize text-md group"
        >
            {title}
            <span className="absolute -bottom-0.5 h-[2px] w-full bg-primary hidden group-hover:block transition-all duration-700" />
        </Link>
    );
};
