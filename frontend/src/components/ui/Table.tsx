import React from 'react';

interface Column<T> {
	header: string;
	accessor: keyof T | ((row: T) => React.ReactNode);
	className?: string;
}

interface TableProps<T> {
	columns: Column<T>[];
	data: T[];
	keyExtractor: (item: T) => string;
	className?: string;
	onRowClick?: (item: T) => void;
}

function Table<T>({
	columns,
	data,
	keyExtractor,
	className,
	onRowClick,
}: TableProps<T>) {
	return (
		<div className='overflow-x-auto'>
			<table
				className={`min-w-full divide-y divide-gray-200 ${className || ''}`}
			>
				<thead className='bg-gray-50'>
					<tr>
						{columns.map((column, index) => (
							<th
								key={index}
								scope='col'
								className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
									column.className || ''
								}`}
							>
								{column.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{data.map((row) => (
						<tr
							key={keyExtractor(row)}
							className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
							onClick={onRowClick ? () => onRowClick(row) : undefined}
						>
							{columns.map((column, index) => (
								<td
									key={index}
									className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
										column.className || ''
									}`}
								>
									{typeof column.accessor === 'function'
										? column.accessor(row)
										: (row[column.accessor] as React.ReactNode)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			{data.length === 0 && (
				<div className='py-8 text-center text-gray-500'>
					No items to display
				</div>
			)}
		</div>
	);
}

export default Table;
