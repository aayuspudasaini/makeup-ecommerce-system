import React from "react";
import { ClassBookingForm } from "../../_components/class-booking-form";
import { getClassById } from "@/lib/api";

type Params = { params: Promise<{ id: string }> };

export default async function ClassEditPage({ params }: Params) {
    const { id } = await params;
    const { data } = await getClassById(id);
    return (
        <React.Fragment>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-xl font-bold">Class Bookings</h3>
                    <p className="text-muted-foreground text-md font-normal">
                        Add a new booking for class
                    </p>
                </div>
            </div>
            <ClassBookingForm type="edit" res={data?.data} id={id} />
        </React.Fragment>
    );
}
