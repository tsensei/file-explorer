'use client';

import { CustomNode } from '@/lib/data';
import { ColumnDef } from '@tanstack/react-table';
import { File, Folder } from 'lucide-react';

export const columns: ColumnDef<CustomNode>[] = [
	{
		header: '',
		accessorKey: 'type',
		cell: ({ row }) => {
			const type: 'file' | 'folder' = row.getValue('type');

			if (type === 'file') {
				return <File size={16} strokeWidth={2} />;
			} else {
				return <Folder size={16} strokeWidth={2} />;
			}
		},
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'size',
		header: 'Size',
		cell: ({ row }) => {
			if (!row.getValue('size')) {
				return <div className="font-medium">-</div>;
			}

			const sizeInBytes = parseFloat(row.getValue('size'));

			let formattedSize;

			if (sizeInBytes >= 1048576) {
				// 1 MB = 1048576 bytes
				formattedSize = (sizeInBytes / 1048576).toFixed(2) + ' MB';
			} else {
				formattedSize = (sizeInBytes / 1024).toFixed(0) + ' KB'; // 1 KB = 1024 bytes
			}

			return <div className="font-medium">{formattedSize}</div>;
		},
	},
	{
		accessorKey: 'fileType',
		header: 'Type',
		cell: ({ row }) => {
			const fileType: string = row.getValue('fileType');
			return <div className="font-medium">{fileType || '-'}</div>;
		},
	},
	{
		accessorKey: 'createdAt',
		header: 'Created At',
		cell: ({ row }) => {
			const createdAt: string = row.getValue('createdAt');
			if (!createdAt) {
				return <div className="font-medium">-</div>;
			}

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

			return <div className="font-medium">{formattedDate}</div>;
		},
	},
];
