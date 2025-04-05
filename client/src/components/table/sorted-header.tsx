import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import type { Column } from "@tanstack/react-table";

interface iSortedSiteHeaderProps {
    column: Column<any, unknown>;
    label: string;
}

export const SortedSiteHeader: React.FC<iSortedSiteHeaderProps> = ({
    column,
    label,
}) => {
    const isSorted = column.getIsSorted();
    const SortingIcon =
        isSorted === "asc"
            ? ChevronUp
            : isSorted === "desc"
              ? ChevronDown
              : ChevronsUpDown;
    return (
        <button
            className="flex items-center cursor-pointer"
            aria-label={`Sort by ${label}`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {label}
            <SortingIcon className="ml-2 h-3 w-3" />
        </button>
    );
};
