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
		<div className='container mx-auto p-4'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Weight Progress</h1>
				<button
					onClick={() => navigate('/')}
					className='px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors'
				>
					Back to Dashboard
				</button>
			</div>

			{isLoading ? (
				<div className='bg-white p-6 rounded-lg shadow animate-pulse'>
					<div className='h-6 bg-gray-200 rounded w-1/2 mb-4'></div>
					<div className='h-64 bg-gray-200 rounded'></div>
				</div>
			) : error ? (
				<div className='bg-white p-6 rounded-lg shadow'>
					<p className='text-red-500'>
						Error loading weight history. Please try again later.
					</p>
				</div>
			) : (
				<>
					{/* Weight Chart */}
					<div className='bg-white p-6 rounded-lg shadow mb-8'>
						<h2 className='text-xl font-semibold text-gray-700 mb-4'>
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
							<p className='text-gray-500 text-center py-10'>
								No weight history available
							</p>
						)}
					</div>

					{/* Weight History Table */}
					<div className='bg-white p-6 rounded-lg shadow'>
						<div className='flex justify-between items-center mb-4'>
							<h2 className='text-xl font-semibold text-gray-700'>
								Weight Records
							</h2>
							{/* This button would open a form to add a new weight entry */}
							<button
								className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50'
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
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
												Date
											</th>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
												Weight (kg)
											</th>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
												BMI
											</th>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
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
							<p className='text-gray-500 text-center py-10'>
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
