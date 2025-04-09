"use client";
import { CustomButton } from "@/components/reusable/custom-button";
import { DateTimePicker } from "@/components/reusable/date-time-picker";
import { SelectField, SelectType } from "@/components/reusable/select-field";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useDataStore } from "@/hooks/use-data-store";
import { updateAppointmentMutationFn } from "@/lib/api";
import { ScheduleType, scheduleValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const AppointmentSchedulingDialog = () => {
    const router = useRouter();

    const { type, isOpen, onClose, data: fetchedData } = useDataStore();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: ScheduleType) =>
            updateAppointmentMutationFn(fetchedData?.id as string, data),
    });

    const form = useForm<ScheduleType>({
        defaultValues: {
            status: undefined,
            preferredDateTime: undefined,
        },
        resolver: zodResolver(scheduleValidation),
    });

    React.useEffect(() => {
        if (fetchedData) {
            form.setValue("status", fetchedData.data.status);
            form.setValue(
                "preferredDateTime",
                new Date(fetchedData.data.preferredDateTime)
            );
        }
    }, [form, fetchedData]);

    const onSubmit = (data: ScheduleType) => {
        mutate(data, {
            onSuccess: ({ data }) => {
                router.refresh();
                onClose();
                form.reset();
                toast.success(data?.message);
            },
            onError: (error) => {
                toast.error(error?.message || "Something went wrong");
            },
        });
    };

    if (type !== "appointmentModal") return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose} defaultOpen={true}>
            <DialogContent className="gap-2.5">
                <DialogTitle>Schedule an appointment</DialogTitle>
                <DialogDescription aria-description={undefined} />
                <Form {...form}>
                    <form
                        className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <SelectField
                            type={SelectType.SELECT}
                            name="status"
                            control={form.control}
                            label="Status"
                            placeholder="Select a status"
                            options={[
                                "pending",
                                "not confirmed",
                                "confirmed",
                            ].map((item) => ({
                                id: item,
                                label: item,
                                value: item,
                            }))}
                            disabled={isPending}
                        />
                        <DateTimePicker
                            control={form.control}
                            name="preferredDateTime"
                            label="Preferred Date and Time"
                            disabled={isPending}
                        />
                        <div className="col-span-full flex justify-end gap-x-4 border-t pt-4">
                            <CustomButton variant="secondary" onClick={onClose}>
                                Cancel
                            </CustomButton>
                            <CustomButton type="submit" isExecuting={isPending}>
                                Update
                            </CustomButton>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
