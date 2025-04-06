import React from "react";
import { DataTable } from "@/components/table/data-table";
import { userColumns } from "./_components/column";
import { getAllUser } from "@/lib/api";

export default async function UserPage() {
    const { data: res } = await getAllUser();

    return (
        <React.Fragment>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-xl font-bold">User</h3>
                    <p className="text-muted-foreground text-md font-normal">
                        List of all user
                    </p>
                </div>
            </div>
            <DataTable
                columns={userColumns}
                data={res?.data as []}
                filterBy="name"
            />
        </React.Fragment>
    );
}
