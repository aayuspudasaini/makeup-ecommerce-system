import React from "react";
import { getAllClass } from "@/lib/api";
import { DataTable } from "@/components/table/data-table";
import { classColumn } from "./_components/column";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default async function ClassPage() {
    const { data: res } = await getAllClass();

    return (
        <React.Fragment>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-xl font-bold">Class Bookings</h3>
                    <p className="text-muted-foreground text-md font-normal">
                        List of all bookings
                    </p>
                </div>
                <Link
                    href="/bookings/class/create"
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
                columns={classColumn}
                data={res?.data as []}
                filterBy="name"
            />
        </React.Fragment>
    );
}
