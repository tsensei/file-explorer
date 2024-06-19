'use client';

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { Input } from '@/components/ui/input';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Fragment, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, File, Folder, FolderPlus, Upload } from 'lucide-react';
import { CustomNode } from '@/lib/data';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	navStack: CustomNode[];
	handleNodeClick: (node: any) => void;
	handleGoBack: () => void;
	handleBreadcrumbClick: (node: CustomNode) => void;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	navStack,
	handleNodeClick,
	handleGoBack,
	handleBreadcrumbClick,
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	});

	return (
		<div className="border rounded-md">
			{/* Header */}
			<div className="flex items-center justify-between my-2 mx-3">
				<div className="flex items-center gap-2">
					<button
						onClick={handleGoBack}
						className="bg-background hover:bg-accent hover:text-accent-foreground p-2 rounded-lg"
					>
						<ChevronLeft className="h-4 w-4" />
					</button>
					<Breadcrumb>
						<BreadcrumbList>
							{navStack.map((n, i) => (
								<Fragment key={i}>
									<BreadcrumbItem
										className="cursor-pointer"
										onClick={() => handleBreadcrumbClick(n)}
									>
										{n.name}
									</BreadcrumbItem>
									{i !== navStack.length - 1 && <BreadcrumbSeparator />}
								</Fragment>
							))}
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="ghost">
						<Upload size={16} strokeWidth={2} className="mr-2" />
						Upload Files
					</Button>
					<Button variant="ghost">
						<FolderPlus size={16} strokeWidth={2} className="mr-2" />
						Create Folder
					</Button>
					<Input
						placeholder="Filter names..."
						value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
						onChange={(event) =>
							table.getColumn('name')?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
				</div>
			</div>

			<div className="border-t">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
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
									data-state={row.getIsSelected() && 'selected'}
									className="cursor-pointer"
									onClick={() => handleNodeClick(row.original)}
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
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
