import { Control, useFormState } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { SmartDatetimeInput } from "../extensions/smart-date-time-input";

export interface iInputFieldProps {
    name: string;
    label?: string;
    placeholder?: string;
    control: Control<any>;
    className?: string;
    inputclassname?: string;
    disabled?: boolean;
    required?: boolean;
}

export const DateTimePicker = (props: iInputFieldProps) => {
    const { label, name, control, className } = props;

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
                    </div>

                    <FormControl>
                        <SmartDatetimeInput
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={props.disabled}
                            className={cn(
                                "h-10",
                                errors[name]
                                    ? "border-red-500 dark:border-red-500"
                                    : "border-gray-300/70 dark:border-gray-300/20"
                            )}
                        />
                    </FormControl>

                    <FormMessage className="text-red-600  text-xs font-normal" />
                </FormItem>
            )}
        />
    );
};
