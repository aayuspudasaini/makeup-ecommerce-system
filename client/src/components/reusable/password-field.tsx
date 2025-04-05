"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Control, useFormState } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

interface iFieldProps {
    name: string;
    label: string;
    placeholder?: string;
    control: Control<any>;
    className?: string;
    inputclassname?: string;
    icon?: {
        icon: LucideIcon | IconType;
        className?: string;
    };
    forgetpassword?: {
        label: string;
        href: string;
        className?: string;
    };
    disabled?: boolean;
    required?: boolean;
}

export const PasswordField = (props: iFieldProps) => {
    const {
        label,
        name,
        placeholder,
        control,
        className,
        inputclassname,
        icon,
        forgetpassword,
    } = props;

    const [showPassword, setShowPassword] = React.useState(false);

    const { errors } = useFormState();
    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem className={cn("space-y-0.5", className)}>
                    <div className="flex items-center justify-between">
                        <FormLabel
                            className="text-sm font-medium text-secondary-foreground"
                            htmlFor={name}
                        >
                            {label}
                        </FormLabel>
                        {forgetpassword && (
                            <Link
                                href={forgetpassword.href ?? "#"}
                                className={cn(
                                    "text-xs text-primary hover:underline",
                                    forgetpassword.className
                                )}
                            >
                                {forgetpassword.label ?? "Forget Password?"}
                            </Link>
                        )}
                    </div>
                    <div className="relative ">
                        {icon && (
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <icon.icon
                                    className={cn(
                                        "size-4 text-gray-500 dark:text-gray-400",
                                        icon.className
                                    )}
                                />
                            </div>
                        )}
                        <FormControl>
                            <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder={placeholder}
                                className={cn(
                                    "block w-full truncate text-sm placeholder:text-sm",
                                    inputclassname,
                                    errors[name]
                                        ? "border-red-500 dark:border-red-500"
                                        : "border-gray-300/70 dark:border-gray-300/20",
                                    {
                                        "ps-9": icon,
                                    }
                                )}
                                required={props.required}
                                disabled={props.disabled}
                                {...props}
                            />
                        </FormControl>
                        <Button
                            size="icon"
                            className="h-8 w-8 absolute end-1 bottom-1 hover:bg-transparent"
                            variant="ghost"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={props.disabled || field.value === ""}
                        >
                            {showPassword ? (
                                <FaRegEye className="size-4" />
                            ) : (
                                <FaRegEyeSlash className="size-4" />
                            )}
                        </Button>
                    </div>
                    <FormMessage className="text-red-600 text-xs font-normal" />
                </FormItem>
            )}
        />
    );
};
