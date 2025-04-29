import { useDashboard } from '../../hooks/useDashboard';
import { formatDate } from '../../utils/formatters';

export const DashboardOverview = () => {
	const { dashboardData, isLoading, error } = useDashboard();

	if (isLoading) {
		return (
			<div className='p-4 bg-white rounded-lg shadow'>
				<div className='animate-pulse space-y-4'>
					<div className='h-6 bg-gray-200 rounded w-3/4'></div>
					<div className='h-20 bg-gray-200 rounded'></div>
					<div className='h-12 bg-gray-200 rounded w-1/2'></div>
				</div>
			</div>
		);
	}

	if (error || !dashboardData) {
		return (
			<div className='p-4 bg-white rounded-lg shadow'>
				<p className='text-red-500'>
					Error loading dashboard data. Please try again later.
				</p>
			</div>
		);
	}

	const { currentWeight, bmi, nextShipmentDate } = dashboardData;

	return (
		<div className='bg-white rounded-lg shadow p-6'>
			<h2 className='text-2xl font-bold mb-6'>Dashboard Overview</h2>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div className='bg-blue-50 p-4 rounded-lg'>
					<h3 className='text-lg font-semibold text-blue-800 mb-2'>
						Current Stats
					</h3>
					<div className='space-y-2'>
						<p className='flex justify-between'>
							<span className='text-gray-600'>Current Weight:</span>
							<span className='font-medium'>{currentWeight} kg</span>
						</p>
						<p className='flex justify-between'>
							<span className='text-gray-600'>BMI:</span>
							<span className='font-medium'>{bmi.toFixed(1)}</span>
						</p>
					</div>
				</div>

				<div className='bg-green-50 p-4 rounded-lg'>
					<h3 className='text-lg font-semibold text-green-800 mb-2'>
						Next Shipment
					</h3>
					{nextShipmentDate ? (
						<p className='text-gray-700'>
							Your next medication shipment is scheduled for{' '}
							<span className='font-semibold'>
								{formatDate(new Date(nextShipmentDate))}
							</span>
						</p>
					) : (
						<p className='text-gray-700'>No upcoming shipments scheduled.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default DashboardOverview;
