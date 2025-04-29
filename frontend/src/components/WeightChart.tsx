import React, { useState, useMemo } from 'react';
import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';
import { WeightEntry } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import { Filter } from 'lucide-react';

interface WeightChartProps {
	data: WeightEntry[];
}

const WeightChart: React.FC<WeightChartProps> = ({ data }) => {
	const [timeFilter, setTimeFilter] = useState<'1M' | '3M' | '6M' | 'all'>(
		'3M'
	);

	const filteredData = useMemo(() => {
		if (timeFilter === 'all') return data;

		const now = new Date();
		const monthsBack = timeFilter === '1M' ? 1 : timeFilter === '3M' ? 3 : 6;
		const cutoffDate = new Date(now.setMonth(now.getMonth() - monthsBack));

		return data.filter((entry) => new Date(entry.recordedAt) >= cutoffDate);
	}, [data, timeFilter]);

	const chartData = useMemo(() => {
		return filteredData.map((entry) => ({
			date: new Date(entry.recordedAt).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
			}),
			weight: entry.weight,
			bmi: entry.bmi,
		}));
	}, [filteredData]);

	// Calculate weight change during filtered period
	const weightChange =
		chartData.length > 1
			? chartData[chartData.length - 1].weight - chartData[0].weight
			: 0;

	// Calculate metrics
	const startWeight = chartData.length > 0 ? chartData[0].weight : 0;
	const currentWeight =
		chartData.length > 0 ? chartData[chartData.length - 1].weight : 0;
	const currentBMI =
		chartData.length > 0 ? chartData[chartData.length - 1].bmi : 0;

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-semibold text-gray-900'>
					Weight Progress
				</h2>
				<div className='flex items-center space-x-2'>
					<Filter className='h-5 w-5 text-gray-500 mr-2' />
					<span className='text-sm text-gray-700 mr-2'>Filter:</span>
					<div className='inline-flex rounded-md shadow-sm' role='group'>
						<Button
							variant={timeFilter === '1M' ? 'primary' : 'outline'}
							size='sm'
							className='rounded-l-md rounded-r-none'
							onClick={() => setTimeFilter('1M')}
						>
							1M
						</Button>
						<Button
							variant={timeFilter === '3M' ? 'primary' : 'outline'}
							size='sm'
							className='-ml-px rounded-none'
							onClick={() => setTimeFilter('3M')}
						>
							3M
						</Button>
						<Button
							variant={timeFilter === '6M' ? 'primary' : 'outline'}
							size='sm'
							className='-ml-px rounded-none'
							onClick={() => setTimeFilter('6M')}
						>
							6M
						</Button>
						<Button
							variant={timeFilter === 'all' ? 'primary' : 'outline'}
							size='sm'
							className='-ml-px rounded-l-none rounded-r-md'
							onClick={() => setTimeFilter('all')}
						>
							All
						</Button>
					</div>
				</div>
			</div>

			<Card>
				<div className='h-96'>
					<ResponsiveContainer width='100%' height='100%'>
						<LineChart
							data={chartData}
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='date' />
							<YAxis
								yAxisId='left'
								orientation='left'
								domain={['dataMin - 5', 'dataMax + 5']}
								label={{
									value: 'Weight (lbs)',
									angle: -90,
									position: 'insideLeft',
								}}
							/>
							<YAxis
								yAxisId='right'
								orientation='right'
								domain={[15, 35]}
								label={{ value: 'BMI', angle: 90, position: 'insideRight' }}
							/>
							<Tooltip />
							<Legend />
							<Line
								yAxisId='left'
								type='monotone'
								dataKey='weight'
								name='Weight'
								stroke='#4F46E5'
								strokeWidth={2}
								dot={{ strokeWidth: 2 }}
								activeDot={{ r: 8 }}
							/>
							<Line
								yAxisId='right'
								type='monotone'
								dataKey='bmi'
								name='BMI'
								stroke='#10B981'
								strokeWidth={2}
								dot={{ strokeWidth: 2 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</Card>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				<Card>
					<h3 className='text-lg font-semibold text-gray-900'>
						Starting Weight
					</h3>
					<div className='mt-2 text-3xl font-bold text-gray-900'>
						{startWeight} lbs
					</div>
					<div className='mt-1 text-sm text-gray-500'>
						{new Date(filteredData[0]?.recordedAt || '').toLocaleDateString(
							'en-US',
							{
								month: 'long',
								day: 'numeric',
								year: 'numeric',
							}
						)}
					</div>
				</Card>

				<Card>
					<h3 className='text-lg font-semibold text-gray-900'>
						Current Weight
					</h3>
					<div className='mt-2 text-3xl font-bold text-gray-900'>
						{currentWeight} lbs
					</div>
					<div
						className={`mt-1 text-sm ${
							weightChange <= 0 ? 'text-green-600' : 'text-red-600'
						}`}
					>
						{weightChange <= 0
							? `${Math.abs(weightChange).toFixed(1)} lbs lost`
							: `${weightChange.toFixed(1)} lbs gained`}
					</div>
				</Card>

				<Card>
					<h3 className='text-lg font-semibold text-gray-900'>Current BMI</h3>
					<div className='mt-2 text-3xl font-bold text-gray-900'>
						{currentBMI.toFixed(1)}
					</div>
					<div className='mt-1 text-sm text-gray-500'>
						{currentBMI < 18.5
							? 'Underweight'
							: currentBMI < 25
							? 'Healthy weight'
							: currentBMI < 30
							? 'Overweight'
							: 'Obese'}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default WeightChart;
