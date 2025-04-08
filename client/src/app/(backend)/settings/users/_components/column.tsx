"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { EllipsisIcon, SquarePen, Trash2 } from "lucide-react";

import {
    DropdownMenuContent,
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
// import { useModalHook } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/reusable/user-avatar";
import { SortedSiteHeader } from "@/components/table/sorted-header";

interface iColumnProps {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    isVerified: boolean;
}

const TableAction = ({ id }: { id: string }) => {
    // const { onOpen } = useModalHook();

    // const DeleteData = async () => {
    //     // const res = await DeleteUser({ id: id });
    //     // if (!res?.data?.status) {
    //     //   toast.error(res?.data?.error);
    //     // } else {
    //     //   toast.success(res?.data?.message);
    //     // }
    // };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="">
                    <EllipsisIcon className="h-6 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className=" w-full cursor-pointer  text-blue-700 focus:text-blue-700 focus:bg-blue-700/20"
                    asChild
                >
                    <Link href={`/users/${id}/edit`}>
                        <SquarePen className="w-4 h-4" />
                        Edit
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className=" w-full  cursor-pointer text-red-600 focus:text-red-600  focus:bg-red-600/20"
                    asChild
                >
                    <button
                        className="w-full"
                        // onClick={() => onOpen("deleteModal", DeleteData)}
                    >
                        <Trash2 className="w-4 h-4 " />
                        Delete
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const columnHelper = createColumnHelper<iColumnProps>();
export const userColumns = [
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
    columnHelper.accessor("avatar", {
        id: "avatar",
        header: "Avatar",
        cell: ({ row }) => (
            <UserAvatar
                src={`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN_URL}${row.original.avatar}`}
                name={row.original.name}
            />
        ),
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
    columnHelper.accessor("email", {
        id: "email",
        header: ({ column }) => (
            <SortedSiteHeader column={column} label="Email" />
        ),
        cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("role", {
        id: "role",
        header: "Role",
        cell: (props) => (
            <Badge
                className={cn(
                    "flex justify-center w-16 truncate rounded-full",
                    {
                        "bg-red-600/20 border-2 border-red-600 text-red-600 hover:bg-red-600/20":
                            props.getValue() === "admin",
                        "bg-blue-600/20 border-2 border-blue-600 text-blue-600 hover:bg-blue-600/20":
                            props.getValue() === "user",
                    }
                )}
            >
                {props.getValue()}
            </Badge>
        ),
    }),

    columnHelper.accessor("updatedAt", {
        id: "Updated At",
        header: ({ column }) => (
            <SortedSiteHeader column={column} label="Updated At" />
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
