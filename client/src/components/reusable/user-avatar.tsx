import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserAvatarProps {
    name: string | null | undefined;
    src?: string | null | undefined;
    className?: string;
}

export const UserAvatar = ({ name, src, className }: UserAvatarProps) => {
    return (
        <Avatar
            className={cn(
                "w-8 h-8 border border-gray-300 dark:border-slate-800",
                className
            )}
        >
            <AvatarImage
                src={src as string}
                alt={name as string}
                className="object-cover"
            />
            <AvatarFallback className="uppercase text-sm">
                {name?.split(" ").map((n) => n[0])}
            </AvatarFallback>
        </Avatar>
    );
};
