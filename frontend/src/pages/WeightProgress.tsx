import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
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
	Legend,
} from 'recharts';

export const WeightProgress = () => {
	const { isAuthenticated } = useAuthStore();
	const navigate = useNavigate();
	const { weightHistory, isLoading, error, isAdding } = useWeightHistory();

	// Redirect to login if not authenticated
	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login');
		}
	}, [isAuthenticated, navigate]);

	if (!isAuthenticated) {
		return null;
	}

	// Prepare chart data
	const chartData =
		weightHistory?.map((entry) => ({
			date: new Date(entry.recordedAt).toLocaleDateString(),
			weight: entry.weight,
			bmi: entry.bmi,
		})) || [];

	return (
		<div className='container p-4 mx-auto'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-3xl font-bold'>Weight Progress</h1>
				<button
					onClick={() => navigate('/')}
					className='px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200'
				>
					Back to Dashboard
				</button>
			</div>

			{isLoading ? (
				<div className='p-6 bg-white rounded-lg shadow animate-pulse'>
					<div className='w-1/2 h-6 mb-4 bg-gray-200 rounded'></div>
					<div className='h-64 bg-gray-200 rounded'></div>
				</div>
			) : error ? (
				<div className='p-6 bg-white rounded-lg shadow'>
					<p className='text-red-500'>
						Error loading weight history. Please try again later.
					</p>
				</div>
			) : (
				<>
					{/* Weight Chart */}
					<div className='p-6 mb-8 bg-white rounded-lg shadow'>
						<h2 className='mb-4 text-xl font-semibold text-gray-700'>
							Weight History
						</h2>
						{chartData.length > 0 ? (
							<div className='h-96'>
								<ResponsiveContainer width='100%' height='100%'>
									<LineChart
										data={chartData}
										margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
									>
										<CartesianGrid strokeDasharray='3 3' />
										<XAxis dataKey='date' />
										<YAxis
											yAxisId='left'
											label={{
												value: 'Weight (kg)',
												angle: -90,
												position: 'insideLeft',
											}}
										/>
										<YAxis
											yAxisId='right'
											orientation='right'
											label={{
												value: 'BMI',
												angle: -90,
												position: 'insideRight',
											}}
										/>
										<Tooltip />
										<Legend />
										<Line
											yAxisId='left'
											type='monotone'
											dataKey='weight'
											stroke='#8884d8'
											activeDot={{ r: 8 }}
											name='Weight (kg)'
										/>
										<Line
											yAxisId='right'
											type='monotone'
											dataKey='bmi'
											stroke='#82ca9d'
											name='BMI'
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						) : (
							<p className='py-10 text-center text-gray-500'>
								No weight history available
							</p>
						)}
					</div>

					{/* Weight History Table */}
					<div className='p-6 bg-white rounded-lg shadow'>
						<div className='flex items-center justify-between mb-4'>
							<h2 className='text-xl font-semibold text-gray-700'>
								Weight Records
							</h2>
							{/* This button would open a form to add a new weight entry */}
							<button
								className='px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50'
								disabled={isAdding}
								onClick={() => alert('Add weight functionality would go here')}
							>
								{isAdding ? 'Adding...' : 'Add New Record'}
							</button>
						</div>

						{weightHistory && weightHistory.length > 0 ? (
							<div className='overflow-x-auto'>
								<table className='min-w-full divide-y divide-gray-200'>
									<thead className='bg-gray-50'>
										<tr>
											<th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
												Date
											</th>
											<th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
												Weight (kg)
											</th>
											<th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
												BMI
											</th>
											<th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
												Status
											</th>
										</tr>
									</thead>
									<tbody className='bg-white divide-y divide-gray-200'>
										{weightHistory.map((entry) => (
											<tr key={entry.id}>
												<td className='px-6 py-4 whitespace-nowrap'>
													<div className='text-sm text-gray-900'>
														{formatDate(new Date(entry.recordedAt))}
													</div>
												</td>
												<td className='px-6 py-4 whitespace-nowrap'>
													<div className='text-sm font-medium text-gray-900'>
														{entry.weight} kg
													</div>
												</td>
												<td className='px-6 py-4 whitespace-nowrap'>
													<div className='text-sm text-gray-900'>
														{entry.bmi.toFixed(1)}
													</div>
												</td>
												<td className='px-6 py-4 whitespace-nowrap'>
													<div className='text-sm text-gray-900'>
														{formatBMI(entry.bmi)
															.split(' ')[1]
															.replace(/[()]/g, '')}
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<p className='py-10 text-center text-gray-500'>
								No weight records available
							</p>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default WeightProgress;
