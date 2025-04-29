import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useDashboard } from '../hooks/useDashboard';
import { useMedication } from '../hooks/useMedication';
import { useWeightHistory } from '../hooks/useWeightHistory';
import { formatDate, formatBMI } from '../utils/formatters';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { Scale, Pill, Truck } from 'lucide-react';

const Dashboard = () => {
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
		return null;
	}

	const isLoading =
		isDashboardLoading || isMedicationLoading || isWeightLoading;

	// Prepare chart data (last 7 entries)
	const chartData =
		weightHistory?.slice(-7).map((entry) => ({
			date: new Date(entry.recordedAt).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
			}),
			weight: entry.weight,
			bmi: entry.bmi,
		})) || [];

	return (
		<div className='flex min-h-screen bg-gray-50'>
			<main className='flex-1 p-6 md:pl-72 lg:p-8'>
				<header className='mb-8'>
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						Your Health Dashboard
					</h1>
					<p className='mt-2 text-sm text-gray-600'>
						Monitor your weight-loss progress and medication shipments
					</p>
				</header>

				{isLoading ? (
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
						{[1, 2, 3, 4].map((i) => (
							<div
								key={i}
								className='p-6 bg-white rounded-lg shadow-lg animate-pulse'
								aria-hidden='true'
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
						<section
							className='grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3'
							aria-labelledby='dashboard-stats'
						>
							{/* Current Weight Card */}
							<div className='p-6 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl'>
								<div className='flex items-center justify-between mb-2'>
									<h2 className='text-lg font-semibold text-gray-700'>
										Current Weight
									</h2>
									<Scale className='w-5 h-5 text-blue-600' />
								</div>
								<p className='text-3xl font-bold text-blue-600'>
									{dashboardData?.currentWeight
										? `${dashboardData.currentWeight.toFixed(1)} kg`
										: 'N/A'}
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
							<div className='p-6 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl'>
								<div className='flex items-center justify-between mb-2'>
									<h2 className='text-lg font-semibold text-gray-700'>
										Body Mass Index
									</h2>
									<Scale className='w-5 h-5 text-green-600' />
								</div>
								<p className='text-3xl font-bold text-green-600'>
									{dashboardData?.bmi ? dashboardData.bmi.toFixed(1) : 'N/A'}
								</p>
								<p className='mt-2 text-sm text-gray-500'>
									{dashboardData
										? formatBMI(dashboardData.bmi).split(' ')[1]
										: 'N/A'}
								</p>
							</div>

							{/* Current Medication Card */}
							<div className='p-6 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl'>
								<div className='flex items-center justify-between mb-2'>
									<h2 className='text-lg font-semibold text-gray-700'>
										Current Medication
									</h2>
									<Pill className='w-5 h-5 text-purple-600' />
								</div>
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
							<div className='p-6 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl'>
								<div className='flex items-center justify-between mb-2'>
									<h2 className='text-lg font-semibold text-gray-700'>
										Next Shipment
									</h2>
									<Truck className='w-5 h-5 text-indigo-600' />
								</div>
								{dashboardData?.nextShipmentDate ? (
									<>
										<p className='text-xl font-bold text-indigo-600'>
											{formatDate(new Date(dashboardData.nextShipmentDate))}
										</p>
										<p className='mt-2 text-sm text-gray-500'>
											Your medication is on its way
										</p>
									</>
								) : (
									<p className='text-gray-500'>No upcoming shipments</p>
								)}
							</div>
						</section>

						{/* Weight Progress Chart */}
						<section
							className='p-6 bg-white rounded-lg shadow-lg'
							aria-labelledby='weight-progress-chart'
						>
							<div className='flex items-center justify-between mb-4'>
								<h2
									id='weight-progress-chart'
									className='text-xl font-semibold text-gray-700'
								>
									Weight Progress
								</h2>
							</div>
							{chartData.length > 0 ? (
								<div className='h-80'>
									<ResponsiveContainer width='100%' height='100%'>
										<LineChart
											data={chartData}
											margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
										>
											<CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
											<XAxis
												dataKey='date'
												tick={{ fontSize: 12, fill: '#6b7280' }}
												tickMargin={10}
											/>
											<YAxis
												yAxisId='left'
												domain={['auto', 'auto']}
												tick={{ fontSize: 12, fill: '#6b7280' }}
												tickMargin={10}
												label={{
													value: 'Weight (kg)',
													angle: -90,
													position: 'insideLeft',
													offset: -5,
													fontSize: 14,
													fill: '#6b7280',
												}}
											/>
											<Tooltip
												contentStyle={{
													backgroundColor: '#fff',
													border: '1px solid #e5e7eb',
													borderRadius: '8px',
												}}
											/>
											<Line
												yAxisId='left'
												type='monotone'
												dataKey='weight'
												stroke='#3b82f6'
												strokeWidth={2}
												dot={{ r: 4, fill: '#3b82f6' }}
												activeDot={{ r: 6 }}
												name='Weight (kg)'
											/>
										</LineChart>
									</ResponsiveContainer>
									<div className='mt-4 text-right'>
										<button
											onClick={() => navigate('/weight-progress')}
											className='text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
											aria-label='View full weight history'
										>
											View full history →
										</button>
									</div>
								</div>
							) : (
								<div className='py-12 text-center'>
									<p className='text-gray-500'>No weight history available</p>
									<button
										onClick={() => navigate('/weight-progress')}
										className='mt-4 text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
										aria-label='Add weight entry'
									>
										Add a weight entry →
									</button>
								</div>
							)}
						</section>
					</>
				)}
			</main>
		</div>
	);
};

export default Dashboard;
