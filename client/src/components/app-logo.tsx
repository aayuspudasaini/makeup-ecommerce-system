import Link from "next/link";
import { GiLipstick } from "react-icons/gi";

export const AppLogo = () => {
    return (
        <Link
            href="/"
            className="flex items-center gap-2 self-center font-medium cursor-pointer"
        >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-sm">
                <GiLipstick className="size-4" />
            </div>
            <h1 className="text-xl font-extrabold truncate">Cosmetics</h1>
        </Link>
    );
};
