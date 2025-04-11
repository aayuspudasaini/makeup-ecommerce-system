"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToolTip } from "@/components/tool-tip";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Columns3,
    Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterBy?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filterBy,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 8,
    });
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    });

    return (
        <div className="w-full">
            <div className="flex gap-2.5 justify-between items-center pb-4">
                {filterBy && (
                    <div className="relative max-w-sm items-center">
                        <Input
                            placeholder={`Search by ${filterBy}`}
                            value={
                                (table
                                    .getColumn(filterBy)
                                    ?.getFilterValue() as string) ?? ""
                            }
                            onChange={(event) =>
                                table
                                    .getColumn(filterBy)
                                    ?.setFilterValue(event.target.value)
                            }
                            className="w-72 bg-background"
                        />
                        <Search className="size-4 aspect-square absolute top-3 right-3 text-muted-foreground" />
                    </div>
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" title="Columns">
                            <Columns3 className="w-6 h-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize cursor-pointer"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value: any) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table className="w-full overflow-auto bg-sidebar rounded-md">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="font-semibold text-secondary-foreground"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-12 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-2">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex flex-row gap-2.5 items-center">
                    <div className="flex flex-row gap-2.5 items-center">
                        <p className="font-medium text-sm">Rows Per page</p>
                        <Select
                            value={table
                                .getState()
                                .pagination.pageSize.toString()}
                            onValueChange={(value: any) =>
                                setPagination((prev) => ({
                                    ...prev,
                                    pageSize: Number(value),
                                }))
                            }
                        >
                            <SelectTrigger className="w-16 max-w-max h-9">
                                <SelectValue
                                    placeholder="10"
                                    className="text-sm"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {[8, 15, 25, 50].map((value) => (
                                    <SelectItem
                                        value={value.toString()}
                                        key={value}
                                    >
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <ToolTip text="First Page">
                            <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer bg-sidebar"
                                onClick={() => table.firstPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <ChevronsLeft className="w-5 h-5" />
                            </Button>
                        </ToolTip>
                        <ToolTip text="Previous">
                            <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer bg-sidebar"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                        </ToolTip>
                        <p className="font-medium text-sm">
                            Page {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount().toLocaleString()}
                        </p>
                        <ToolTip text="Next">
                            <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer bg-sidebar"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </ToolTip>
                        <ToolTip text="Last Page">
                            <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer bg-sidebar"
                                onClick={() => table.lastPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <ChevronsRight className="w-5 h-5" />
                            </Button>
                        </ToolTip>
                    </div>
                </div>
            </div>
        </div>
    );
}
