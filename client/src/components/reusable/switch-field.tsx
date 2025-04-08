"use client";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { ButtonType } from "@/types/button";
import { Control } from "react-hook-form";

interface iFieldProps {
    name: string;
    label?: string;
    type?: ButtonType;
    side?: "left" | "right";
    control: Control<any>;
    className?: string;
    inputClassName?: string;
    disabled?: boolean;
    required?: boolean;
}

export const SwitchField = (props: iFieldProps) => {
    const {
        label,
        name,
        type,
        control,
        className,
        inputClassName,
        disabled,
        required,
        side,
    } = props;
    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem className={cn("py-1.5", className)}>
                    <div
                        className={cn(
                            "flex items-center gap-2.5 w-fit",
                            inputClassName,
                            {
                                "flex-row-reverse": side === "right",
                                "flex-row": side === "left",
                            }
                        )}
                    >
                        {label && <FormLabel>{label}</FormLabel>}
                        <FormControl>
                            <Switch
                                type={type}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={disabled}
                                required={required}
                            />
                        </FormControl>
                    </div>
                </FormItem>
            )}
        />
    );
};
