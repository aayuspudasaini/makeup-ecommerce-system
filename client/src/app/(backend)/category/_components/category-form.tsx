"use client";

import React from "react";
import { DropzoneOptions } from "react-dropzone";
import { CustomButton } from "@/components/reusable/custom-button";
import { FileUploaderField } from "@/components/reusable/file-uploader-field";
import { InputField, InputType } from "@/components/reusable/input-field";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { createCategoryMutationFn } from "@/lib/api";
import { categorySchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

interface iFormProps {
    type: "create" | "edit";
    res?: any;
}

type CategoryFormData = z.infer<typeof categorySchema>;

export const CategoryForm: React.FC<iFormProps> = ({ type, res }) => {
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: createCategoryMutationFn,
    });

    const form = useForm<CategoryFormData>({
        defaultValues: {
            name: "",
            description: "",
            image: undefined,
        },
        resolver: zodResolver(categorySchema),
    });

    const dropzoneConfig = {
        accept: {
            "image/*": [".jpg", ".jpeg", ".png"],
        },
        multiple: false,
        maxSize: 10 * 1024 * 1024,
    } satisfies DropzoneOptions;

    const onSubmit = (data: CategoryFormData) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("image", data.image[0]);

        mutate(formData, {
            onSuccess: ({ data }) => {
                router.replace("/category");
                form.reset();
                toast.success(data?.message);
            },
            onError: (error) => {
                toast.error(error?.message || "Something went wrong");
            },
        });
    };

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
                            placeholder="Face"
                            disabled={isPending}
                        />
                        <InputField
                            label="Description"
                            control={form.control}
                            name="description"
                            type={InputType.TEXTAREA}
                            placeholder="Write something..."
                            disabled={isPending}
                        />
                        <FileUploaderField
                            control={form.control}
                            name="image"
                            label="Image"
                            dropzoneConfig={dropzoneConfig}
                            disabled={isPending}
                        />
                        <div className="col-span-full flex justify-end gap-x-4 border-t pt-4">
                            <CustomButton
                                variant="secondary"
                                onClick={() => router.back()}
                            >
                                Cancel
                            </CustomButton>
                            <CustomButton isExecuting={isPending} type="submit">
                                Submit
                            </CustomButton>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
