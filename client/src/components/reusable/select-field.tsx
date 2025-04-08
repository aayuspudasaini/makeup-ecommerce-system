"use client";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Control, useFormState } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command";
import { Button } from "../ui/button";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export enum SelectType {
    SELECT = "select",
    MULTISELECT = "multi-select",
    SEARCHABLE = "search",
}

interface SelectOptions {
    id: string;
    label: string;
    value: string;
}

interface iSelectProps {
    label: string;
    name: string;
    control: Control<any>;
    className?: string;
    type: SelectType;
    options: SelectOptions[];
    placeholder: string;
    disabled?: boolean;
    hidden?: boolean;
    required?: boolean;
}

const RenderSelectField = ({
    field,
    props,
}: {
    field: any;
    props: iSelectProps;
}) => {
    const { type, placeholder, options, name } = props;
    const [open, setOpen] = React.useState<boolean>(false);
    const { errors } = useFormState();
    switch (type) {
        case SelectType.SELECT:
            return (
                <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                >
                    <FormControl>
                        <SelectTrigger
                            className={cn(
                                "input-field data-[placeholder]:text-muted-foreground",
                                errors[name]
                                    ? "border-red-500 dark:border-red-500"
                                    : "border-gray-300/70 dark:border-gray-300/20"
                            )}
                        >
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel className="capitalize">
                                Select a {name}
                            </SelectLabel>
                            <SelectSeparator />
                            <ScrollArea className="min-h-32 h-52 max-h-[200px]">
                                {options.map((item, i) => (
                                    <SelectItem
                                        className="cursor-pointer"
                                        value={item.value}
                                        key={i}
                                    >
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </ScrollArea>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            );

        case SelectType.MULTISELECT:

        case SelectType.SEARCHABLE:
            return (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                                "w-full justify-between input-field text-muted-foreground font-normal hover:text-muted-foreground",
                                {
                                    "text-secondary-foreground hover:text-secondary-foreground":
                                        field.value,
                                }
                            )}
                        >
                            {field.value
                                ? options.find(
                                      (item) => item.value === field.value
                                  )?.label
                                : `Select ${name}...`}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Command>
                            <CommandInput
                                placeholder={`Search ${name}...`}
                                className="h-9"
                            />
                            <CommandList className="p-0">
                                <CommandEmpty>No {name} found.</CommandEmpty>
                                <CommandGroup>
                                    {options.map((item) => (
                                        <CommandItem
                                            key={item.value}
                                            value={item.value}
                                            onSelect={(currentValue) => {
                                                field.onChange(
                                                    currentValue === field.value
                                                        ? ""
                                                        : currentValue
                                                );
                                                setOpen(false);
                                            }}
                                        >
                                            {item.label}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    field.value === item.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            );

        default:
            break;
    }
};

export const SelectField = (props: iSelectProps) => {
    const { name, control, label, className } = props;
    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel
                        className="text-sm font-medium text-secondary-foreground"
                        htmlFor={name}
                    >
                        {label}
                    </FormLabel>
                    <RenderSelectField field={field} props={props} />
                    <FormMessage className="text-red-600 text-xs font-normal" />
                </FormItem>
            )}
        />
    );
};
