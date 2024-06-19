import { CustomNode, nodes } from '@/lib/data';
import { columns } from './columns';
import { DataTable } from './data-table';
import TableRouter from './table-router';

async function getData(): Promise<CustomNode[]> {
	// Fetch data from your API here.
	return nodes;
}

export default async function DemoPage() {
	const data = await getData();

	return (
		<div className="container mx-auto py-10">
			<TableRouter columns={columns} data={data} />
		</div>
	);
}
