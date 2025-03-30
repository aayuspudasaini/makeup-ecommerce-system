import { cn } from "@/lib/utils";
import React from "react";

interface iAppProps {
    children: React.ReactNode;
    className?: string;
}

export const Container: React.FC<iAppProps> = ({ children, className }) => {
    return (
        <div className={cn("w-full max-w-7xl mx-auto px-6 lg:px-0", className)}>
            {children}
        </div>
    );
};
