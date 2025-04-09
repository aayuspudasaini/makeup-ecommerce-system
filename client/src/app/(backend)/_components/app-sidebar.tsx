"use client";

import * as React from "react";

import { ChevronRight } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLinkItems } from "./app-sidebar-items";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { GiLipstick } from "react-icons/gi";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    return (
        <Sidebar {...props}>
            <SidebarHeader className="h-[3.6rem] border-b flex justify-center w-full">
                <Link href="/dashboard" passHref>
                    <SidebarMenuButton
                        size="lg"
                        className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                            <GiLipstick className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <h1 className="text-xl font-extrabold truncate">
                                Cosmetics
                            </h1>
                        </div>
                    </SidebarMenuButton>
                </Link>
            </SidebarHeader>
            <SidebarContent className="gap-0">
                <ScrollArea className="h-full">
                    {NavLinkItems.map((item) =>
                        item.items ? (
                            <Collapsible
                                key={item.title}
                                title={item.title}
                                defaultOpen={item.items.some(
                                    (item) => item.href === pathname
                                )}
                                className="group/collapsible"
                            >
                                <SidebarGroup>
                                    <SidebarGroupLabel
                                        asChild
                                        className={cn(
                                            "mb-1.5 group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center",
                                            {
                                                "bg-sidebar-accent text-sidebar-accent-foreground":
                                                    item.items.some(
                                                        (item) =>
                                                            item.href ===
                                                            pathname
                                                    ),
                                            }
                                        )}
                                    >
                                        <CollapsibleTrigger className="cursor-pointer">
                                            {item.icon && (
                                                <item.icon className="mr-2 stroke-2" />
                                            )}
                                            {item.title}
                                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                        </CollapsibleTrigger>
                                    </SidebarGroupLabel>
                                    {item.items && (
                                        <CollapsibleContent className="ml-6">
                                            <SidebarGroupContent>
                                                <SidebarMenu>
                                                    {item.items.map((item) => (
                                                        <SidebarMenuItem
                                                            key={item.title}
                                                        >
                                                            <SidebarMenuButton
                                                                className="group/label font-medium"
                                                                isActive={
                                                                    item.href ===
                                                                    pathname
                                                                }
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={
                                                                        item.href
                                                                    }
                                                                >
                                                                    {item.icon && (
                                                                        <item.icon className="mr-2" />
                                                                    )}
                                                                    {item.title}
                                                                </Link>
                                                            </SidebarMenuButton>
                                                        </SidebarMenuItem>
                                                    ))}
                                                </SidebarMenu>
                                            </SidebarGroupContent>
                                        </CollapsibleContent>
                                    )}
                                </SidebarGroup>
                            </Collapsible>
                        ) : (
                            <SidebarGroup className="m-0" key={item.title}>
                                <SidebarGroupLabel
                                    asChild
                                    className={cn(
                                        "group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                        {
                                            "bg-sidebar-accent text-sidebar-accent-foreground":
                                                pathname.includes(item.href) ||
                                                pathname.startsWith(item.href),
                                        }
                                    )}
                                >
                                    <Link href={item.href}>
                                        {item.icon && (
                                            <item.icon className="mr-2" />
                                        )}
                                        {item.title}
                                    </Link>
                                </SidebarGroupLabel>
                            </SidebarGroup>
                        )
                    )}
                </ScrollArea>
            </SidebarContent>
        </Sidebar>
    );
}
