"use client";

import {
    BadgeCheck,
    CreditCard,
    HelpCircle,
    LogOut,
    Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserAvatar } from "@/components/reusable/user-avatar";

export function NavUser({
    user,
}: {
    user: {
        name: string;
        email: string;
        avatar?: string;
    };
}) {
    const shortName = user.name
        .split(" ")
        .map((n) => n[0])
        .join("");
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="sm"
                            className="cursor-pointer p-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground relative h-8 w-8 aspect-square rounded-full border border-gray-200 dark:border-gray-700"
                        >
                            <UserAvatar
                                name={user.name}
                                src={
                                    user.avatar
                                        ? user.avatar
                                        : `https://avatar.vercel.sh/rauchg.svg?text=${shortName}`
                                }
                            />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg mt-4"
                        side="bottom"
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-full">
                                    <AvatarImage
                                        src={
                                            user.avatar
                                                ? user.avatar
                                                : `https://avatar.vercel.sh/rauchg.svg?text=${shortName}`
                                        }
                                        alt={user.name}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {shortName}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user.name}
                                    </span>
                                    <span className="truncate text-xs">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkles />
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <HelpCircle />
                                Help & Support
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <button className="w-full">
                                <LogOut />
                                Log out
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
