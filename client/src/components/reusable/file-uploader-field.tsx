import React from "react";
import { Control, useFormState } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import {
    FileInput,
    FileUploader,
    FileUploaderContent,
    FileUploaderItem,
} from "../extensions/file-uploader";
import { DropzoneOptions } from "react-dropzone";
import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
interface iFieldProps {
    name: string;
    label: string;
    placeholder?: string;
    control: Control<any>;
    className?: string;
    inputclassname?: string;
    disabled?: boolean;
    required?: boolean;
    dropzoneConfig: DropzoneOptions;
}

export const FileUploaderField: React.FC<iFieldProps> = ({
    control,
    name,
    label,
    dropzoneConfig,
}) => {
    const { errors } = useFormState();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel
                        className="text-sm font-medium text-secondary-foreground"
                        htmlFor={name}
                    >
                        {label}
                    </FormLabel>
                    <FormControl>
                        <FileUploader
                            value={field.value}
                            onValueChange={field.onChange}
                            dropzoneOptions={dropzoneConfig}
                        >
                            {field.value && field.value.length > 0 && (
                                <FileUploaderContent className="w-full rounded-b-none rounded-t-md flex-row gap-2 ">
                                    {field.value.map((file: any, i: number) => {
                                        return (
                                            <FileUploaderItem
                                                key={i}
                                                index={i}
                                                aria-roledescription={`file ${i + 1} containing ${
                                                    file.name
                                                }`}
                                                className="p-0 size-20"
                                            >
                                                {file.type.includes("video") ? (
                                                    <div className="size-full  relative">
                                                        <video
                                                            className="h-full w-auto object-cover rounded-md"
                                                            width={600}
                                                            height={400}
                                                            src={URL.createObjectURL(
                                                                file
                                                            )}
                                                            autoPlay
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="size-full relative">
                                                        <Image
                                                            src={URL.createObjectURL(
                                                                file
                                                            )}
                                                            alt={file.name}
                                                            className="object-cover rounded-md"
                                                            fill
                                                            priority
                                                        />
                                                    </div>
                                                )}
                                            </FileUploaderItem>
                                        );
                                    })}
                                </FileUploaderContent>
                            )}
                            <FileInput>
                                <div
                                    className={cn(
                                        "flex flex-col items-center justify-center h-32 w-full border bg-background rounded-md",
                                        errors[name]
                                            ? "border-red-500 dark:border-red-500"
                                            : "border-gray-300/70 dark:border-gray-300/20"
                                    )}
                                >
                                    <UploadCloud className="size-6 text-muted-foreground" />
                                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">
                                            Click to upload
                                        </span>
                                        &nbsp; or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG or GIF,MP4
                                    </p>
                                </div>
                            </FileInput>
                        </FileUploader>
                    </FormControl>
                    <FormMessage className="text-red-600 text-xs font-normal" />
                </FormItem>
            )}
        />
    );
};
