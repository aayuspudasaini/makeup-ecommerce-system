import React from "react";
import { sliderColumn } from "./_components/column";
import { DataTable } from "@/components/table/data-table";
import { getAllCarousel } from "@/lib/api";

export default async function SliderPage() {
    const { data: res } = await getAllCarousel();

    return (
        <React.Fragment>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-xl font-bold">Slider</h3>
                    <p className="text-muted-foreground text-md font-normal">
                        List of all Slider
                    </p>
                </div>
            </div>
            <DataTable
                columns={sliderColumn}
                data={res?.data as []}
                filterBy="title"
            />
        </React.Fragment>
    );
}
