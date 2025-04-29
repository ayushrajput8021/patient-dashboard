import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useDashboard } from '../hooks/useDashboard';
import { useMedication } from '../hooks/useMedication';
import { useWeightHistory } from '../hooks/useWeightHistory';
import { formatDate, formatBMI } from '../utils/formatters';

// Chart component
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import Sidebar from '../components/Sidebar';

export const Dashboard = () => {
	const { isAuthenticated } = useAuthStore();
	const navigate = useNavigate();
	const { dashboardData, isLoading: isDashboardLoading } = useDashboard();
	const { medication, isLoading: isMedicationLoading } = useMedication();
	const { weightHistory, isLoading: isWeightLoading } = useWeightHistory();

	// Redirect to login if not authenticated
	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login');
		}
	}, [isAuthenticated, navigate]);

	if (!isAuthenticated) {
		return null; // or a loading indicator
	}

	const isLoading =
		isDashboardLoading || isMedicationLoading || isWeightLoading;

	// Prepare chart data
	const chartData =
		weightHistory?.slice(-7).map((entry) => ({
			date: new Date(entry.recordedAt).toLocaleDateString(),
			weight: entry.weight,
			bmi: entry.bmi,
		})) || [];

	return (
		<div className='container p-4 mx-auto'>
			<Sidebar />
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-3xl font-bold'>Patient Dashboard</h1>
				<div className='space-x-2'>
					<button
						onClick={() => navigate('/weight-progress')}
						className='px-4 py-2 text-blue-700 transition-colors bg-blue-100 rounded-md hover:bg-blue-200'
					>
						Weight Progress
					</button>
					<button
						onClick={() => navigate('/shipment-details')}
						className='px-4 py-2 text-blue-700 transition-colors bg-blue-100 rounded-md hover:bg-blue-200'
					>
						Shipment Details
					</button>
				</div>
			</div>

			{isLoading ? (
				<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{[1, 2, 3, 4].map((i) => (
						<div
							key={i}
							className='p-6 bg-white rounded-lg shadow animate-pulse'
						>
							<div className='w-1/2 h-6 mb-4 bg-gray-200 rounded'></div>
							<div className='h-12 mb-2 bg-gray-200 rounded'></div>
							<div className='w-3/4 h-4 bg-gray-200 rounded'></div>
						</div>
					))}
				</div>
			) : (
				<>
					{/* Stats Cards */}
					<div className='grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3'>
						{/* Current Weight Card */}
						<div className='p-6 bg-white rounded-lg shadow'>
							<h2 className='mb-2 text-lg font-semibold text-gray-700'>
								Current Weight
							</h2>
							<p className='text-3xl font-bold text-blue-600'>
								{dashboardData?.currentWeight} kg
							</p>
							<p className='mt-2 text-sm text-gray-500'>
								Last updated:{' '}
								{weightHistory?.length
									? formatDate(
											new Date(
												weightHistory[weightHistory.length - 1].recordedAt
											)
									  )
									: 'N/A'}
							</p>
						</div>

						{/* BMI Card */}
						<div className='p-6 bg-white rounded-lg shadow'>
							<h2 className='mb-2 text-lg font-semibold text-gray-700'>
								Body Mass Index
							</h2>
							<p className='text-3xl font-bold text-green-600'>
								{dashboardData?.bmi.toFixed(1)}
							</p>
							<p className='mt-2 text-sm text-gray-500'>
								{dashboardData
									? formatBMI(dashboardData.bmi).split(' ')[1]
									: 'N/A'}
							</p>
						</div>

						{/* Current Medication Card */}
						<div className='p-6 bg-white rounded-lg shadow'>
							<h2 className='mb-2 text-lg font-semibold text-gray-700'>
								Current Medication
							</h2>
							{medication ? (
								<>
									<p className='text-xl font-bold text-purple-600'>
										{medication.type}
									</p>
									<p className='text-sm text-gray-600'>{medication.dosage}</p>
									<p className='mt-2 text-xs text-gray-500'>
										Since {formatDate(new Date(medication.startDate))}
									</p>
								</>
							) : (
								<p className='text-gray-500'>No active medication</p>
							)}
						</div>

						{/* Next Shipment Card */}
						<div className='p-6 bg-white rounded-lg shadow'>
							<h2 className='mb-2 text-lg font-semibold text-gray-700'>
								Next Shipment
							</h2>
							{dashboardData?.nextShipmentDate ? (
								<>
									<p className='text-xl font-bold text-indigo-600'>
										{formatDate(new Date(dashboardData.nextShipmentDate))}
									</p>
									<p className='mt-2 text-sm text-gray-500'>
										Your medication will arrive soon
									</p>
								</>
							) : (
								<p className='text-gray-500'>No upcoming shipments</p>
							)}
						</div>
					</div>

					{/* Weight Progress Chart */}
					<div className='p-6 mb-8 bg-white rounded-lg shadow'>
						<h2 className='mb-4 text-xl font-semibold text-gray-700'>
							Weight Progress
						</h2>
						{chartData.length > 0 ? (
							<div className='h-64'>
								<ResponsiveContainer width='100%' height='100%'>
									<LineChart
										data={chartData}
										margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
									>
										<CartesianGrid strokeDasharray='3 3' />
										<XAxis dataKey='date' />
										<YAxis yAxisId='left' domain={['auto', 'auto']} />
										<Tooltip />
										<Line
											yAxisId='left'
											type='monotone'
											dataKey='weight'
											stroke='#8884d8'
											name='Weight (kg)'
										/>
									</LineChart>
								</ResponsiveContainer>
								<div className='mt-2 text-right'>
									<button
										onClick={() => navigate('/weight-progress')}
										className='text-sm text-blue-600 hover:underline'
									>
										View full history →
									</button>
								</div>
							</div>
						) : (
							<p className='py-10 text-center text-gray-500'>
								No weight history available
							</p>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Dashboard;
