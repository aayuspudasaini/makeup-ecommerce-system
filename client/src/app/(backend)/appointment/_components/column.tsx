"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { EllipsisIcon, Trash2 } from "lucide-react";

import {
    DropdownMenuContent,
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SortedSiteHeader } from "@/components/table/sorted-header";
import { useModalHook } from "@/hooks/use-modal-store";
import { useMutation } from "@tanstack/react-query";
import { deleteAppointmentMutationFn } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface iColumnProps {
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    address: string;
    makeupStyle: string;
    preferredDateTime: Date;
    createdAt: Date;
    updatedAt: Date;
}

const TableAction = ({ id }: { id: string }) => {
    const router = useRouter();
    const { mutate } = useMutation({
        mutationFn: deleteAppointmentMutationFn,
    });
    const { onOpen } = useModalHook();

    const DeleteData = async () => {
        mutate(id, {
            onSuccess: (data) => {
                toast.success(data?.data?.message);
                router.refresh();
            },
            onError: (error) => {
                toast.error(error?.message);
            },
        });
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="cursor-pointer">
                    <EllipsisIcon className="h-6 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem
                    variant="default"
                    className=" w-full cursor-pointer  text-blue-700 focus:text-blue-700 focus:bg-blue-700/20"
                    asChild
                >
                    <Link href={`/category/${id}/edit`}>
                        <SquarePen className="w-4 h-4 text-blue-700 focus:text-blue-700 focus:bg-blue-700/20" />
                        Edit
                    </Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem
                    className="w-full cursor-pointer text-red-600 focus:text-red-600  focus:bg-red-600/20"
                    asChild
                >
                    <button
                        className="w-full "
                        onClick={() => onOpen("deleteModal", DeleteData)}
                    >
                        <Trash2 className="size-4 text-red-600 focus:text-red-600  focus:bg-red-600/20" />
                        Delete
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const columnHelper = createColumnHelper<iColumnProps>();
export const appointmentColumn = [
    columnHelper.display({
        id: "select",
        header: ({ table }) => {
            return (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        table.getIsSomePageRowsSelected()
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            );
        },
        cell: ({ row }) => {
            return (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            );
        },
    }),

    columnHelper.accessor("name", {
        id: "name",
        header: ({ column }) => (
            <SortedSiteHeader column={column} label="Name" />
        ),
        cell: (props) => (
            <p className="text-sm font-medium text-secondary-foreground">
                {props.getValue()}
            </p>
        ),
    }),
    columnHelper.accessor("makeupStyle", {
        id: "makeupstyle",
        header: "Make Up",
        cell: (props) => (
            <p className="text-sm font-medium text-secondary-foreground">
                {props.getValue()}
            </p>
        ),
    }),
    columnHelper.accessor("email", {
        id: "email",
        header: ({ column }) => (
            <SortedSiteHeader column={column} label="Email" />
        ),
        cell: (props) => (
            <p className="text-sm font-medium text-secondary-foreground">
                {props.getValue()}
            </p>
        ),
    }),

    columnHelper.accessor("address", {
        id: "address",
        header: "Address",
        cell: (props) => (
            <p className="text-sm font-medium text-secondary-foreground">
                {props.getValue()}
            </p>
        ),
    }),

    columnHelper.accessor("phone", {
        id: "phone",
        header: "Phone",
        cell: (props) => (
            <p className="text-sm font-medium text-secondary-foreground">
                {props.getValue()}
            </p>
        ),
    }),

    columnHelper.accessor("status", {
        id: "status",
        header: "Status",
        cell: (props) => (
            <Badge
                className={cn(
                    "flex justify-center w-16 truncate rounded-full bg-transparent",
                    {
                        "bg-gray-700/20 border-2 border-gray-700 text-gray-700 hover:bg-gray-700/20":
                            props.getValue() === "pending",
                        "bg-green-600/20 border-2 border-green-600 text-green-600 hover:bg-green-600/20":
                            props.getValue() === "confirmed",
                    }
                )}
            >
                {props.getValue()}
            </Badge>
        ),
    }),

    columnHelper.accessor("preferredDateTime", {
        id: "Preferred Date and Time",
        header: ({ column }) => (
            <SortedSiteHeader column={column} label="Date" />
        ),
        cell: (props) => {
            const date = new Date(props.getValue());
            return (
                <p className="text-sm max-w-72 truncate">
                    {date.toDateString()}
                </p>
            );
        },
    }),

    columnHelper.display({
        id: "Actions",
        header: ({ table }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="relative"
                            size="sm"
                            variant="ghost"
                            disabled={
                                table.getSelectedRowModel().rows.length === 0
                            }
                        >
                            <EllipsisIcon className="w-4 h-4" />
                            {table.getSelectedRowModel().rows.length > 0 && (
                                <Badge className="absolute -top-1 text-xs -right-2.5 rounded-full px-1.5 py-0.5 bg-red-600">
                                    {table.getSelectedRowModel().rows.length}
                                </Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                asChild
                            ></DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        cell: ({ row }) => <TableAction id={row.original._id} />,
        maxSize: 50,
    }),
] as ColumnDef<iColumnProps, unknown>[];
