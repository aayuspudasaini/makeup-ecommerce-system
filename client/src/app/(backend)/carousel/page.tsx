import React from "react";
import { carouselColumn } from "./_components/column";
import { DataTable } from "@/components/table/data-table";
import { getAllCarousel } from "@/lib/api";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function CarouselPage() {
    const { data: res } = await getAllCarousel();

    return (
        <React.Fragment>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-xl font-bold">Carousel</h3>
                    <p className="text-muted-foreground text-md font-normal">
                        List of all carousel
                    </p>
                </div>
                <Link
                    href="/carousel/create"
                    className={cn(
                        buttonVariants({
                            size: "sm",
                            className: "rounded-md",
                        })
                    )}
                >
                    <PlusCircle className="size-4" />
                    Create
                </Link>
            </div>
            <DataTable
                columns={carouselColumn}
                data={res?.data as []}
                filterBy="title"
            />
        </React.Fragment>
    );
}
