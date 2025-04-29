import { useShipments } from '../../hooks/useShipments';
import { formatDate } from '../../utils/formatters';

type ShipmentStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';

const StatusBadge = ({ status }: { status: ShipmentStatus }) => {
	const colorMap: Record<ShipmentStatus, string> = {
		Pending: 'bg-yellow-100 text-yellow-800',
		Shipped: 'bg-blue-100 text-blue-800',
		Delivered: 'bg-green-100 text-green-800',
		Cancelled: 'bg-red-100 text-red-800',
	};

	return (
		<span
			className={`px-2 py-1 text-xs font-medium rounded-full ${
				colorMap[status] || 'bg-gray-100 text-gray-800'
			}`}
		>
			{status}
		</span>
	);
};

export const ShipmentList = () => {
	const { shipments, isLoading, error } = useShipments();

	if (isLoading) {
		return (
			<div className='p-4 bg-white rounded-lg shadow'>
				<div className='animate-pulse space-y-4'>
					<div className='h-6 bg-gray-200 rounded w-1/2'></div>
					<div className='h-24 bg-gray-200 rounded'></div>
					<div className='h-24 bg-gray-200 rounded'></div>
				</div>
			</div>
		);
	}

	if (error || !shipments) {
		return (
			<div className='p-4 bg-white rounded-lg shadow'>
				<p className='text-red-500'>
					Error loading shipments. Please try again later.
				</p>
			</div>
		);
	}

	return (
		<div className='bg-white rounded-lg shadow p-6'>
			<h2 className='text-2xl font-bold mb-6'>Medication Shipments</h2>

			{shipments.length > 0 ? (
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-200'>
						<thead className='bg-gray-50'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Medication
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Dosage
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Date
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Status
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Tracking
								</th>
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-gray-200'>
							{shipments.map((shipment) => (
								<tr key={shipment.id}>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm font-medium text-gray-900'>
											{shipment.medicationType}
										</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-gray-500'>
											{shipment.dosage}
										</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-gray-500'>
											{formatDate(new Date(shipment.shipmentDate))}
										</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<StatusBadge status={shipment.status as ShipmentStatus} />
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										{shipment.trackingInfo ? (
											<a
												href={`https://track.example.com/${shipment.trackingInfo}`}
												target='_blank'
												rel='noopener noreferrer'
												className='text-blue-600 hover:text-blue-900'
											>
												{shipment.trackingInfo}
											</a>
										) : (
											<span className='text-gray-400'>Not available</span>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className='p-6 text-center'>
					<p className='text-gray-500'>No shipments available.</p>
				</div>
			)}
		</div>
	);
};

export default ShipmentList;
