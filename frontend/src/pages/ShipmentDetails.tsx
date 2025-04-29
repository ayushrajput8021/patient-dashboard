import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useShipments } from '../hooks/useShipments';
import { useMedication } from '../hooks/useMedication';
import { formatDate } from '../utils/formatters';

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

export const ShipmentDetails = () => {
	const { isAuthenticated } = useAuthStore();
	const navigate = useNavigate();
	const {
		shipments,
		isLoading: isShipmentsLoading,
		error: shipmentsError,
	} = useShipments();
	const {
		medication,
		isLoading: isMedicationLoading,
		error: medicationError,
	} = useMedication();

	// Redirect to login if not authenticated
	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login');
		}
	}, [isAuthenticated, navigate]);

	if (!isAuthenticated) {
		return null;
	}

	const isLoading = isShipmentsLoading || isMedicationLoading;
	const hasError = shipmentsError || medicationError;

	return (
		<div className='container mx-auto p-4'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Shipment Details</h1>
				<button
					onClick={() => navigate('/')}
					className='px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors'
				>
					Back to Dashboard
				</button>
			</div>

			{isLoading ? (
				<div className='grid gap-6'>
					<div className='bg-white p-6 rounded-lg shadow animate-pulse'>
						<div className='h-6 bg-gray-200 rounded w-1/2 mb-4'></div>
						<div className='h-24 bg-gray-200 rounded'></div>
					</div>
					<div className='bg-white p-6 rounded-lg shadow animate-pulse'>
						<div className='h-6 bg-gray-200 rounded w-1/2 mb-4'></div>
						<div className='h-64 bg-gray-200 rounded'></div>
					</div>
				</div>
			) : hasError ? (
				<div className='bg-white p-6 rounded-lg shadow'>
					<p className='text-red-500'>
						Error loading data. Please try again later.
					</p>
				</div>
			) : (
				<>
					{/* Current Medication */}
					<div className='bg-white p-6 rounded-lg shadow mb-8'>
						<h2 className='text-xl font-semibold text-gray-700 mb-4'>
							Current Medication
						</h2>
						{medication ? (
							<div className='bg-blue-50 p-4 rounded-lg'>
								<div className='flex flex-col md:flex-row md:justify-between md:items-center mb-4'>
									<h3 className='text-xl font-semibold text-blue-800'>
										{medication.type}
									</h3>
									<div className='mt-2 md:mt-0 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>
										{medication.dosage}
									</div>
								</div>

								<div className='border-t border-blue-200 pt-4 mt-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<div>
											<p className='text-sm text-gray-500'>Start Date</p>
											<p className='font-medium'>
												{formatDate(new Date(medication.startDate))}
											</p>
										</div>
										{medication.endDate && (
											<div>
												<p className='text-sm text-gray-500'>End Date</p>
												<p className='font-medium'>
													{formatDate(new Date(medication.endDate))}
												</p>
											</div>
										)}
									</div>
								</div>

								<div className='mt-4 pt-4 border-t border-blue-200'>
									<h4 className='font-medium text-blue-800 mb-2'>
										Instructions
									</h4>
									<p className='text-gray-700'>
										Take {medication.dosage} of {medication.type} as directed by
										your healthcare provider. Please consult with your doctor
										before making any changes to your medication regimen.
									</p>
								</div>
							</div>
						) : (
							<p className='text-gray-500 text-center py-6'>
								No active medication found.
							</p>
						)}
					</div>

					{/* Shipment History */}
					<div className='bg-white p-6 rounded-lg shadow'>
						<h2 className='text-xl font-semibold text-gray-700 mb-4'>
							Medication Shipments
						</h2>
						{shipments && shipments.length > 0 ? (
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
													<StatusBadge
														status={shipment.status as ShipmentStatus}
													/>
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
							<p className='text-gray-500 text-center py-6'>
								No shipments available.
							</p>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default ShipmentDetails;
