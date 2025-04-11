"use client";

import React from "react";
import { DropzoneOptions } from "react-dropzone";
import { CustomButton } from "@/components/reusable/custom-button";
import { FileUploaderField } from "@/components/reusable/file-uploader-field";
import { InputField, InputType } from "@/components/reusable/input-field";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
    createCategoryMutationFn,
    getAllCategory,
    updateCategoryMutationFn,
} from "@/lib/api";
import { categorySchema, productSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { SelectField, SelectType } from "@/components/reusable/select-field";

interface iFormProps {
    type: "create" | "edit";
    res?: any;
    id?: string;
}

type ProductFormType = z.infer<typeof productSchema>;

export const ProductForm: React.FC<iFormProps> = ({ type, res, id }) => {
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn:
            type === "create"
                ? createCategoryMutationFn
                : (formData: FormData) =>
                      updateCategoryMutationFn(id as string, formData),
    });

    const { data: catData, isLoading: catLoading } = useQuery({
        queryKey: ["category"],
        queryFn: getAllCategory,
    });

    const form = useForm<ProductFormType>({
        defaultValues: {
            name: "",
            description: "",
            category: "",
            price: "",
            discountPrice: "",
            image: undefined,
        },
        resolver: zodResolver(productSchema),
    });

    const dropzoneConfig = {
        accept: {
            "image/*": [".jpg", ".jpeg", ".png"],
        },
        multiple: false,
        maxSize: 10 * 1024 * 1024,
    } satisfies DropzoneOptions;

    // React.useEffect(() => {
    //     form.reset(res);
    //     form.setValue("image", "");
    // }, [form, res]);

    const onSubmit = (data: ProductFormType) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("image", data.image ? data.image[0] : null);

        mutate(formData, {
            onSuccess: ({ data }) => {
                router.replace("/product");
                form.reset();
                toast.success(data?.message);
            },
            onError: (error) => {
                toast.error(error?.message || "Something went wrong");
            },
        });
    };

    console.log(form.watch("category"));

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
                        <InputField
                            label="Price"
                            control={form.control}
                            name="price"
                            type={InputType.NUMBER}
                            placeholder="10000"
                            disabled={isPending}
                        />
                        <InputField
                            label="Discount Price"
                            control={form.control}
                            name="discountPrice"
                            type={InputType.NUMBER}
                            placeholder="10000"
                            disabled={isPending}
                        />
                        {!catLoading && (
                            <SelectField
                                type={SelectType.SELECT}
                                label="Category"
                                name="category"
                                control={form.control}
                                placeholder="Select a category"
                                options={catData?.data.data.map(
                                    (item: any) => ({
                                        id: item._id,
                                        label: item.name,
                                        value: item._id,
                                    })
                                )}
                            />
                        )}
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
                                {type === "edit" ? "Update" : "Submit"}
                            </CustomButton>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
