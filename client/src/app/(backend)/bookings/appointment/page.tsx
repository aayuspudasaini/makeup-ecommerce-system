import React from "react";
import { getAllAppointment } from "@/lib/api";
import { DataTable } from "@/components/table/data-table";
import { appointmentColumn } from "./_components/column";

export default async function AppointmentPage() {
    const { data: res } = await getAllAppointment();

    return (
        <React.Fragment>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-xl font-bold">Appointment</h3>
                    <p className="text-muted-foreground text-md font-normal">
                        List of all appointment
                    </p>
                </div>
            </div>
            <DataTable
                columns={appointmentColumn}
                data={res?.data as []}
                filterBy="name"
            />
        </React.Fragment>
    );
}
