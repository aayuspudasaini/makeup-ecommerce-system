import { cn } from "@/lib/utils";

export const TailwindIndicator = ({
    position,
}: {
    position: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
}) => {
    if (process.env.NODE_ENV === "production") return null;
    return (
        <div
            className={cn(
                "font-medium fixed z-50  border-2 border-black dark:border-gray-400 rounded-full bg-black/80 dark:bg-black/90  text-secondary dark:text-gray-50 text-sm h-9 w-9 shadow-md hover:bg-black/70 dark:hover:bg-black/90 cursor-pointer",
                {
                    "left-4 bottom-4": position === "bottomLeft",
                    "right-4 bottom-4": position === "bottomRight",
                    "left-4 top-4": position === "topLeft",
                    "right-4 top-4": position === "topRight",
                }
            )}
        >
            <div className="border-2 rounded-full border-gray-300/10 dark:border-gray-50/10 w-full h-full flex items-center justify-center">
                <div className="block sm:hidden">xs</div>
                <div className="hidden sm:block md:hidden">sm</div>
                <div className="hidden md:block  lg:hidden">md</div>
                <div className="hidden lg:block xl:hidden">lg</div>
                <div className="hidden xl:block 2xl:hidden">xl</div>
                <div className="hidden 2xl:block">2xl</div>
            </div>
        </div>
    );
};
