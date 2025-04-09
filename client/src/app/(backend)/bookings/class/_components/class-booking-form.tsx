"use client";

import { CustomButton } from "@/components/reusable/custom-button";
import { InputField, InputType } from "@/components/reusable/input-field";
import { SelectField, SelectType } from "@/components/reusable/select-field";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { createClassMutationFn, updateClassMutationFn } from "@/lib/api";
import { classBookingSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ClassBookingType = z.infer<typeof classBookingSchema>;

interface iFormProps {
    type: "create" | "edit";
    res?: any;
    id?: string | undefined;
}

export const ClassBookingForm: React.FC<iFormProps> = ({ type, res, id }) => {
    const router = useRouter();
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
        mutationFn:
            type === "create"
                ? createClassMutationFn
                : (data: ClassBookingType) =>
                      updateClassMutationFn(id as string, data),
    });

    const onSubmit = (data: ClassBookingType) => {
        mutate(data, {
            onSuccess: ({ data }) => {
                router.replace("/bookings/class");
                form.reset();
                toast.success(data?.message);
            },
            onError: (error) => {
                toast.error(error?.message || "Something went wrong");
            },
        });
    };

    React.useEffect(() => {
        if (res) {
            form.setValue("name", res.name);
            form.setValue("email", res.email);
            form.setValue("phone", res.phone);
            form.setValue("experience", res.experience);
            form.setValue("makeupStyle", res.makeupStyle);
            form.setValue("shift", res.shift);
        }
    }, [form, res]);
    return (
        <Card className="rounded-lg p-0">
            <CardContent className="p-4">
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
                                "Beginner",
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

                        <div className="col-span-full flex justify-end gap-x-4 border-t pt-4">
                            <CustomButton
                                variant="secondary"
                                onClick={() => router.back()}
                            >
                                Cancel
                            </CustomButton>
                            <CustomButton isExecuting={isPending} type="submit">
                                {type === "edit" ? "Update" : "Submit"}
                            </CustomButton>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
