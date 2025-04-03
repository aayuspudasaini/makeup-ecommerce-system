"use client";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryCard } from "../category-card";
import { ChevronDown } from "lucide-react";

export const ShopAll: React.FC = () => {
    return (
        <DropdownMenu defaultOpen>
            <DropdownMenuTrigger className="cursor-pointer h-full focus:outline-none">
                <div className="relative w-fit flex items-center h-full  group">
                    <div className="flex items-center gap-1.5">
                        <p className="font-semibold capitalize text-md">
                            Shop All
                        </p>
                        <ChevronDown className="size-4 stroke-3" />
                    </div>
                    <span className="absolute -bottom-0.5 h-[2px] w-full bg-primary hidden group-hover:block transition-all duration-700" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="pt-0 w-screen h-fit rounded-none">
                <div className="grid grid-cols-3 grid-flow-row">
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
