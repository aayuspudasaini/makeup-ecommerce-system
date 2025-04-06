import {
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface iAppProps {
    children: React.ReactNode;
    text: string;
    className?: string;
    side?: "top" | "right" | "bottom" | "left";
}

export const ToolTip = ({
    children,
    text,
    className,
    side = "top",
}: iAppProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className={className} asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    side={side}
                    className="m-2 text-wrap w-fit max-w-md"
                >
                    <p className="text-sm">{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
