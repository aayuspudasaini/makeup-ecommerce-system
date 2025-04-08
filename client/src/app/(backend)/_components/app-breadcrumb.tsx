"use client";

import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export const AppBreadCrumb = () => {
    const pathname = usePathname();

    const path = pathname.split("/").filter((p) => p !== "");

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {!pathname.includes("dashboard") && (
                    <React.Fragment>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/dashboard">
                                Dashboard
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                    </React.Fragment>
                )}
                {path.map((item, index) => (
                    <React.Fragment key={item}>
                        <BreadcrumbItem className="capitalize max-w-28 w-fit truncate">
                            {item}
                        </BreadcrumbItem>
                        {index < path.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
