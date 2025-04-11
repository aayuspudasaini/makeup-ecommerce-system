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
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { Textarea } from "../ui/textarea";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { SmartDatetimeInput } from "@/components/extensions/smart-date-time-input";

export enum InputType {
    INPUT = "input",
    TEXTAREA = "textarea",
    COLOR = "color",
    EMAIL = "email",
    PHONENUMBER = "phone_number",
    NUMBER = "number",
}

export interface iInputFieldProps {
    name: string;
    label?: string;
    type: InputType;
    placeholder?: string;
    control: Control<any>;
    className?: string;
    inputclassname?: string;
    icon?: {
        icon: LucideIcon | IconType;
        className?: string;
    };
    disabled?: boolean;
    required?: boolean;
    button?: {
        label: string;
        size: "icon" | "sm" | "lg" | "default";
        onClick?: () => void;
        children?: React.ReactNode;
        className?: string;
    };
}

const RenderInput = ({
    field,
    props,
}: {
    field: any;
    props: iInputFieldProps;
}) => {
    const { errors } = useFormState();

    const { type, name, icon, placeholder, inputclassname, required } = props;

    switch (type) {
        case InputType.INPUT:
            return (
                <Input
                    {...props}
                    {...field}
                    type={InputType.INPUT}
                    placeholder={placeholder}
                    className={cn(
                        "text-sm block w-full truncate input-field placeholder:text-sm",
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
                />
            );

        case InputType.EMAIL:
            return (
                <Input
                    {...props}
                    {...field}
                    type={InputType.EMAIL}
                    placeholder={placeholder}
                    className={cn(
                        "text-sm block w-full truncate input-field placeholder:text-sm",
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
                />
            );

        case InputType.TEXTAREA:
            return (
                <Textarea
                    {...props}
                    {...field}
                    placeholder={placeholder}
                    className={cn(
                        "text-sm block w-full input-field placeholder:text-sm",
                        inputclassname,
                        errors[name]
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-300/70 dark:border-gray-300/20",
                        {
                            "ps-9": icon,
                        }
                    )}
                    cols={30}
                    rows={5}
                    required={props.required}
                    disabled={props.disabled}
                />
            );

        case InputType.PHONENUMBER:
            return (
                <FormControl>
                    <PhoneInput
                        className={cn(
                            "h-10 rounded-md px-3 border text-sm",
                            errors[name]
                                ? " border-red-500 dark:border-red-500"
                                : "border-gray-300/70 dark:border-gray-300/20"
                        )}
                        value={field.value}
                        onChange={field.onChange}
                        withCountryCallingCode
                        international
                        country="NP"
                        defaultCountry="NP"
                        countries={["NP"]}
                        addInternationalOption={false}
                    />
                </FormControl>
            );

        case InputType.NUMBER:
            return (
                <FormControl>
                    <Input
                        type="number"
                        {...field}
                        className={cn(
                            "input-field",
                            inputclassname,
                            errors[name]
                                ? "border-red-500"
                                : "border-gray-300/70 dark:border-gray-300/20"
                        )}
                        placeholder={placeholder}
                        required={required}
                        min={0}
                    />
                </FormControl>
            );

        default:
            break;
    }
};

export const InputField = (props: iInputFieldProps) => {
    const { label, name, type, control, className, icon, button } = props;

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
                    </div>
                    <div className="relative">
                        {type !== InputType.COLOR && icon && (
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
                            <RenderInput field={field} props={props} />
                        </FormControl>
                        {type !== InputType.COLOR && button && (
                            <Button
                                size={button?.size || "default"}
                                className={cn(
                                    "absolute end-1 bottom-1 h-8",
                                    button.className
                                )}
                                variant="default"
                                type="button"
                                onClick={button?.onClick}
                                disabled={props.disabled}
                            >
                                {button.children || button.label}
                            </Button>
                        )}
                    </div>
                    <FormMessage className="text-red-600  text-xs font-normal" />
                </FormItem>
            )}
        />
    );
};
