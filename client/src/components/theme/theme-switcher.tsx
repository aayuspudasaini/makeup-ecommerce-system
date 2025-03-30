"use client";

import * as React from "react";
import { Check, LaptopMinimal, LucideIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface iThemeModeProps {
    theme: string;
    icon: LucideIcon;
}

const themeMode: iThemeModeProps[] = [
    {
        theme: "light",
        icon: Sun,
    },
    {
        theme: "dark",
        icon: Moon,
    },
    {
        theme: "system",
        icon: LaptopMinimal,
    },
];

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const [isMounted, setIsMounted] = React.useState<boolean>(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 h-9">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    {theme !== "system" ? (
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    ) : (
                        <LaptopMinimal className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-4" align="end">
                {themeMode.map((mode) => (
                    <DropdownMenuItem
                        className={cn("cursor-pointer capitalize font-medium", {
                            "bg-secondary": theme === mode.theme,
                        })}
                        key={mode.theme}
                        onClick={() => setTheme(mode.theme)}
                    >
                        <mode.icon className="size-4 mr-1" />
                        {mode.theme}
                        {theme === mode.theme && (
                            <Check className="size-4 ml-auto" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
