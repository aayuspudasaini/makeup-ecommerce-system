import { cn } from "@/lib/utils";

interface iAppProps {
    color: string;
    className?: string;
    content?: string;
}

const ColorMarkBadge = ({ color, className, content }: iAppProps) => {
    return (
        <div
            className={cn(
                "rounded-full text-xs max-w-24 truncate text-center py-0.5 font-semibold px-1.5",
                className
            )}
            title={color}
            style={{
                backgroundColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
                    color.slice(3, 5),
                    16
                )}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`,
                color: color,
                border: `2px solid ${color}`,
            }}
        >
            {content}
        </div>
    );
};

export { ColorMarkBadge };
