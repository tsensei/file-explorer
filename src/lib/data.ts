type NodeType = 'folder' | 'file';

export interface CustomNode {
	id: string;
	name: string;
	type: NodeType;
	parentId: string | null;
	fileType: string | undefined; // MIME type for files, undefined for folders
	createdAt: Date | undefined; // Date for files, undefined for folders
	url: string | undefined; // URL for files, undefined for folders
	size: number | undefined; // Size for files, undefined for folders
}

export const nodes: CustomNode[] = [
	{
		id: '1',
		name: 'root',
		type: 'folder',
		parentId: null,
		fileType: undefined,
		createdAt: undefined,
		url: undefined,
		size: undefined,
	},
	{
		id: '2',
		name: 'documents',
		type: 'folder',
		parentId: '1',
		fileType: undefined,
		createdAt: undefined,
		url: undefined,
		size: undefined,
	},
	{
		id: '3',
		name: 'photos',
		type: 'folder',
		parentId: '1',
		fileType: undefined,
		createdAt: undefined,
		url: undefined,
		size: undefined,
	},
	{
		id: '4',
		name: 'resume.pdf',
		type: 'file',
		parentId: '2',
		fileType: 'application/pdf',
		createdAt: new Date('2023-05-01T10:00:00Z'),
		url: 'https://example.com/bucket/documents/resume.pdf',
		size: 102400,
	},
	{
		id: '5',
		name: 'cover_letter.pdf',
		type: 'file',
		parentId: '2',
		fileType: 'application/pdf',
		createdAt: new Date('2023-05-02T12:00:00Z'),
		url: 'https://example.com/bucket/documents/cover_letter.pdf',
		size: 51200,
	},
	{
		id: '6',
		name: 'vacation.jpg',
		type: 'file',
		parentId: '3',
		fileType: 'image/jpeg',
		createdAt: new Date('2023-05-03T08:00:00Z'),
		url: 'https://example.com/bucket/photos/vacation.jpg',
		size: 204800,
	},
	{
		id: '7',
		name: 'readme.txt',
		type: 'file',
		parentId: '1',
		fileType: 'text/plain',
		createdAt: new Date('2023-05-04T09:00:00Z'),
		url: 'https://example.com/bucket/readme.txt',
		size: 1024,
	},
	{
		id: '8',
		name: '2024',
		type: 'folder',
		parentId: '2',
		fileType: undefined,
		createdAt: undefined,
		url: undefined,
		size: undefined,
	},
	{
		id: '9',
		name: 'project',
		type: 'folder',
		parentId: '8',
		fileType: undefined,
		createdAt: undefined,
		url: undefined,
		size: undefined,
	},
	{
		id: '10',
		name: 'report.pdf',
		type: 'file',
		parentId: '9',
		fileType: 'application/pdf',
		createdAt: new Date('2024-01-10T14:00:00Z'),
		url: 'https://example.com/bucket/documents/2024/project/report.pdf',
		size: 409600,
	},
	{
		id: '11',
		name: 'presentation',
		type: 'folder',
		parentId: '8',
		fileType: undefined,
		createdAt: undefined,
		url: undefined,
		size: undefined,
	},
	{
		id: '12',
		name: 'slides.pptx',
		type: 'file',
		parentId: '11',
		fileType:
			'application/vnd.openxmlformats-officedocument.presentationml.presentation',
		createdAt: new Date('2024-02-20T10:00:00Z'),
		url: 'https://example.com/bucket/documents/2024/presentation/slides.pptx',
		size: 2048000,
	},
	{
		id: '13',
		name: '2023',
		type: 'folder',
		parentId: '2',
		fileType: undefined,
		createdAt: undefined,
		url: undefined,
		size: undefined,
	},
	{
		id: '14',
		name: 'notes.txt',
		type: 'file',
		parentId: '13',
		fileType: 'text/plain',
		createdAt: new Date('2023-03-15T09:00:00Z'),
		url: 'https://example.com/bucket/documents/2023/notes.txt',
		size: 10240,
	},
	{
		id: '15',
		name: 'work',
		type: 'folder',
		parentId: '3',
		fileType: undefined,
		createdAt: undefined,
		url: undefined,
		size: undefined,
	},
	{
		id: '16',
		name: 'design.png',
		type: 'file',
		parentId: '15',
		fileType: 'image/png',
		createdAt: new Date('2023-04-25T16:00:00Z'),
		url: 'https://example.com/bucket/photos/work/design.png',
		size: 512000,
	},
	{
		id: '17',
		name: 'holidays',
		type: 'folder',
		parentId: '3',
		fileType: undefined,
		createdAt: undefined,
		url: undefined,
		size: undefined,
	},
	{
		id: '18',
		name: 'trip.jpg',
		type: 'file',
		parentId: '17',
		fileType: 'image/jpeg',
		createdAt: new Date('2023-05-18T12:00:00Z'),
		url: 'https://example.com/bucket/photos/holidays/trip.jpg',
		size: 307200,
	},
];

// root/
// ├── documents/
// │   ├── 2024/
// │   │   ├── project/
// │   │   │   └── report.pdf
// │   │   └── presentation/
// │   │       └── slides.pptx
// │   ├── 2023/
// │   │   └── notes.txt
// │   ├── resume.pdf
// │   └── cover_letter.pdf
// ├── photos/
// │   ├── work/
// │   │   └── design.png
// │   ├── holidays/
// │   │   └── trip.jpg
// │   └── vacation.jpg
// └── readme.txt
