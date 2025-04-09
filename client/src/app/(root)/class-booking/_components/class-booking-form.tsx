"use client";

import { CustomButton } from "@/components/reusable/custom-button";
import { InputField, InputType } from "@/components/reusable/input-field";
import { SelectField, SelectType } from "@/components/reusable/select-field";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { createAppointmentMutationFn } from "@/lib/api";
import { classBookingSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ClassBookingType = z.infer<typeof classBookingSchema>;

export const ClassBookingForm = () => {
    const form = useForm<ClassBookingType>({
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            shift: undefined,
            makeupStyle: undefined,
            experience: undefined,
        },
        resolver: zodResolver(classBookingSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createAppointmentMutationFn,
    });

    const onSubmit = (data: any) => {
        mutate(data, {
            onSuccess: ({ data }) => {
                form.reset();
                toast.success(data?.message);
            },
            onError: (error) => {
                toast.error(error?.message || "Something went wrong");
            },
        });
    };
    return (
        <Card className="w-full h-auto">
            <CardContent>
                <Form {...form}>
                    <form
                        className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <InputField
                            label="Name"
                            control={form.control}
                            name="name"
                            type={InputType.INPUT}
                            placeholder="John Doe."
                            disabled={isPending}
                        />
                        <InputField
                            label="Email"
                            control={form.control}
                            name="email"
                            type={InputType.EMAIL}
                            placeholder="user@example.com"
                            disabled={isPending}
                        />
                        <InputField
                            label="Phone number"
                            control={form.control}
                            name="phone"
                            type={InputType.PHONENUMBER}
                            placeholder="98XXXXXXXX"
                            disabled={isPending}
                        />
                        <SelectField
                            type={SelectType.SELECT}
                            control={form.control}
                            label="Shift"
                            name="shift"
                            placeholder="Select a shift"
                            options={["Morning", "Day", "Evening"].map(
                                (item) => ({
                                    id: item.toLowerCase(),
                                    label: item,
                                    value: item,
                                })
                            )}
                        />
                        <SelectField
                            type={SelectType.SELECT}
                            control={form.control}
                            label="Experience"
                            name="experience"
                            placeholder="Select an experience"
                            options={[
                                "Begineer",
                                "Intermediate",
                                "Advanced",
                            ].map((item) => ({
                                id: item.toLowerCase(),
                                label: item,
                                value: item,
                            }))}
                        />
                        <SelectField
                            type={SelectType.SELECT}
                            control={form.control}
                            label="Makeup Style"
                            name="makeupStyle"
                            placeholder="Select a makeup style"
                            options={[
                                "Bridal",
                                "Everyday Makeup",
                                "Party Look",
                                "Professional Makeup",
                                "Custom",
                            ].map((item) => ({
                                id: item.toLowerCase(),
                                label: item,
                                value: item,
                            }))}
                        />

                        <CustomButton isExecuting={isPending} type="submit">
                            Submit
                        </CustomButton>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
