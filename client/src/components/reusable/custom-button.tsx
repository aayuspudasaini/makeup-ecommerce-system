import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { ButtonType } from "@/types/button";
import { cn } from "@/lib/utils";
interface iButtonProps {
    isExecuting?: boolean;
    type?: ButtonType;
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    size?: "default" | "sm" | "lg" | "icon";
    variant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link";
}
export const CustomButton = ({
    isExecuting,
    className,
    children,
    onClick,
    disabled,
    size = "sm",
    variant = "default",
    type = "button",
}: iButtonProps) => {
    return (
        <Button
            type={type}
            className={cn("cursor-pointer", className)}
            size={size}
            variant={variant}
            onClick={onClick}
            disabled={disabled || isExecuting}
        >
            {isExecuting ? (
                <div className="flex items-center justify-center gap-1.5">
                    <Loader2 className="size-4 animate-spin" />
                    Please Wait
                </div>
            ) : (
                children
            )}
        </Button>
    );
};
