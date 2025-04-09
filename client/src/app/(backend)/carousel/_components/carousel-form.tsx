"use client";
import { CustomButton } from "@/components/reusable/custom-button";
import { FileUploaderField } from "@/components/reusable/file-uploader-field";
import { InputField, InputType } from "@/components/reusable/input-field";
import { SelectField, SelectType } from "@/components/reusable/select-field";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { createCarouselMutationFn } from "@/lib/api";
import { carouselSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { DropzoneOptions } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface iFormProps {
    type: "create" | "edit";
    res?: any;
    id?: string;
}

type CarouselFormType = z.infer<typeof carouselSchema>;

export const CarouselForm: React.FC<iFormProps> = ({ type, res, id }) => {
    const router = useRouter();
    const form = useForm<CarouselFormType>({
        defaultValues: {
            title: "",
            description: "",
            type: undefined,
            content: "",
        },
        resolver: zodResolver(carouselSchema),
    });
    const { mutate, isPending } = useMutation({
        mutationFn: createCarouselMutationFn,
    });

    const dropzoneConfig: DropzoneOptions = {
        multiple: false,
        maxFiles: 1,
        accept: {
            "image/*": [".jpg", ".jpeg", ".png"],
            "video/*": [".mp4", ".mkv"],
        },
    };

    React.useEffect(() => {
        form.reset(res);
        form.setValue("type", res.type);
        form.setValue("content", "");
    }, [form, res]);

    const onSubmit = (data: CarouselFormType) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("type", data.type);
        formData.append("content", data.content ? data.content[0] : null);

        mutate(formData, {
            onSuccess: ({ data }) => {
                router.replace("/carousel");
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
                            label="Title"
                            control={form.control}
                            name="title"
                            type={InputType.INPUT}
                            placeholder="Make yourself better than others"
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
                        <SelectField
                            control={form.control}
                            type={SelectType.SELECT}
                            label="Type"
                            className="w-full"
                            name="type"
                            placeholder="Select a content type"
                            options={["Image", "Video"].map((item) => ({
                                id: item,
                                label: item,
                                value: item.toLowerCase(),
                            }))}
                        />
                        <FileUploaderField
                            control={form.control}
                            name="content"
                            label="Image / Video Content"
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
