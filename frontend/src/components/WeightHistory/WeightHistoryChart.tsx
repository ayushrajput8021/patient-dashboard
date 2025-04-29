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
import { useWeightHistory } from '../../hooks/useWeightHistory';
import { formatDate } from '../../utils/formatters';

export const WeightHistoryChart = () => {
	const { weightHistory, isLoading, error } = useWeightHistory();

	if (isLoading) {
		return (
			<div className='p-4 bg-white rounded-lg shadow'>
				<div className='animate-pulse space-y-4'>
					<div className='h-6 bg-gray-200 rounded w-1/2'></div>
					<div className='h-64 bg-gray-200 rounded'></div>
				</div>
			</div>
		);
	}

	if (error || !weightHistory) {
		return (
			<div className='p-4 bg-white rounded-lg shadow'>
				<p className='text-red-500'>
					Error loading weight history. Please try again later.
				</p>
			</div>
		);
	}

	// Format data for the chart
	const chartData = weightHistory.map((entry) => ({
		date: formatDate(new Date(entry.recordedAt)),
		weight: entry.weight,
		bmi: entry.bmi,
	}));

	return (
		<div className='bg-white rounded-lg shadow p-6'>
			<h2 className='text-2xl font-bold mb-6'>Weight History</h2>

			{chartData.length > 0 ? (
				<div className='h-96'>
					<ResponsiveContainer width='100%' height='100%'>
						<LineChart
							data={chartData}
							margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis
								dataKey='date'
								label={{
									value: 'Date',
									position: 'insideBottomRight',
									offset: 0,
								}}
							/>
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
								label={{ value: 'BMI', angle: -90, position: 'insideRight' }}
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
				<div className='p-6 text-center'>
					<p className='text-gray-500'>No weight history available.</p>
				</div>
			)}
		</div>
	);
};

export default WeightHistoryChart;
