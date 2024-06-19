'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './data-table';
import { CustomNode, nodes } from '@/lib/data';
import { useEffect, useState } from 'react';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Delete, Download, File, Trash, Trash2 } from 'lucide-react';

const getFormattedSizeString = (sizeInBytes: number | undefined) => {
	if (!sizeInBytes) return '';

	let formattedSize;

	if (sizeInBytes >= 1048576) {
		// 1 MB = 1048576 bytes
		formattedSize = (sizeInBytes / 1048576).toFixed(2) + ' MB';
	} else {
		formattedSize = (sizeInBytes / 1024).toFixed(0) + ' KB'; // 1 KB = 1024 bytes
	}

	return formattedSize;
};

const getFormattedDateString = (createdAt: Date | undefined) => {
	if (!createdAt) return '';

	const date = new Date(createdAt);
	const formattedDate = date.toLocaleString('en-US', {
		month: 'numeric',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: true,
	});

	return formattedDate;
};

const TableRouter = ({
	columns,
	data,
}: {
	columns: ColumnDef<CustomNode>[];
	data: CustomNode[];
}) => {
	const [currentRoot, setCurrentRoot] = useState<CustomNode | null>(null);
	const [selectedFile, setSelectedFile] = useState<CustomNode | null>(null);
	const [modelOpen, setModalOpen] = useState<boolean>(false);
	const [navStack, setNavStack] = useState<CustomNode[]>([]);

	useEffect(() => {
		const zeroRoot = nodes.find((n) => n.parentId === null)!;

		setCurrentRoot(zeroRoot);
		setNavStack([zeroRoot]);
	}, []);

	const handleNodeClick = (node: CustomNode) => {
		if (node.type === 'file') {
			// Show file info
			setSelectedFile(node);
			setModalOpen(true);
		} else {
			setCurrentRoot(node);
			setNavStack((stack) => [...stack, node]);
		}
	};

	const handleBreadcrumbClick = (node: CustomNode) => {
		const nodeIndex = navStack.indexOf(node);
		if (nodeIndex !== -1) {
			const newStack = navStack.slice(0, nodeIndex + 1);
			setCurrentRoot(node);
			setNavStack(newStack);
		}
	};

	const handleGoBack = () => {
		setNavStack((stack) => {
			const newStack = [...stack];
			if (newStack.length > 1) {
				newStack.pop();
				const newCurrentRoot = newStack[newStack.length - 1];
				setCurrentRoot(newCurrentRoot);
			}
			return newStack;
		});
	};

	const visibleData = nodes.filter((n) => n.parentId === currentRoot?.id);

	return (
		<>
			<Sheet
				modal={true}
				open={modelOpen}
				onOpenChange={(o) => setModalOpen(o)}
			>
				<SheetContent>
					<div className="border-2 rounded-md flex justify-center items-center py-8 my-4">
						<File className="h-12 w-12" />
					</div>
					<SheetHeader>
						<SheetTitle>{selectedFile?.name}</SheetTitle>
						<SheetDescription>
							{selectedFile?.fileType} -{' '}
							{getFormattedSizeString(selectedFile?.size)}
						</SheetDescription>
					</SheetHeader>
					<div className="my-4 text-gray-500">
						<label className="mb-1 text-xs text-foreground-lighter">
							Added on
						</label>
						<p className="text-sm text-foreground-light">
							{getFormattedDateString(selectedFile?.createdAt)}
						</p>
					</div>
					<div className="flex gap-4">
						<Button size={'sm'} variant="outline">
							<Download className="h-4 w-4 mr-2" />
							Download file
						</Button>
						<Button size={'sm'} variant="outline">
							<Trash2 className="h-4 w-4 mr-2" />
							Delete File
						</Button>
					</div>
				</SheetContent>
			</Sheet>
			<DataTable
				handleNodeClick={handleNodeClick}
				handleGoBack={handleGoBack}
				handleBreadcrumbClick={handleBreadcrumbClick}
				columns={columns}
				data={visibleData}
				navStack={navStack}
			/>
		</>
	);
};

export default TableRouter;
