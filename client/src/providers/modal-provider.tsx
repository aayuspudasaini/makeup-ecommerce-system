import React from "react";
import { AlertDeleteDialog } from "@/components/table/alert-dialog";
import { AppointmentSchedulingDialog } from "@/app/(backend)/bookings/appointment/_components/appointment-scheduling-dialog";

export const ModalProvider = () => {
    return (
        <React.Fragment>
            <AlertDeleteDialog />
            <AppointmentSchedulingDialog />
        </React.Fragment>
    );
};
