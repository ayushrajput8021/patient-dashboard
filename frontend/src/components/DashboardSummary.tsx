import React from 'react';
import { Scale, TrendingDown, Calendar } from 'lucide-react';
import Card from './ui/Card';
import { DashboardSummary as DashboardSummaryType } from '../types';
import { WeightEntry } from '../types';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';

interface DashboardSummaryProps {
	data: DashboardSummaryType;
	weightHistory: WeightEntry[];
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({
	data,
	weightHistory,
}) => {
	// Calculate weight change
	const weightChange =
		weightHistory.length > 1
			? weightHistory[weightHistory.length - 1].weight - weightHistory[0].weight
			: 0;

	// Format the weight change with a sign and fixed decimal
	const formattedWeightChange =
		weightChange <= 0
			? `${weightChange.toFixed(1)} lbs`
			: `+${weightChange.toFixed(1)} lbs`;

	// Get a smaller set of data for the mini chart (last 5 entries)
	const chartData = weightHistory.slice(-5).map((entry) => ({
		date: new Date(entry.recordedAt).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
		}),
		weight: entry.weight,
	}));

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
			<Card className='flex flex-col'>
				<div className='flex justify-between items-start mb-2'>
					<h3 className='text-lg font-semibold text-gray-900'>
						Current Weight
					</h3>
					<span className='p-2 bg-blue-50 rounded-full'>
						<Scale className='h-5 w-5 text-blue-600' />
					</span>
				</div>
				<div className='mt-2'>
					<div className='text-3xl font-bold text-gray-900'>
						{data.currentWeight} lbs
					</div>
					<div
						className={`flex items-center mt-1 text-sm ${
							weightChange <= 0 ? 'text-green-600' : 'text-red-600'
						}`}
					>
						<TrendingDown
							className={`mr-1 h-4 w-4 ${
								weightChange <= 0 ? 'text-green-600' : 'text-red-600'
							}`}
						/>
						<span>{formattedWeightChange} since start</span>
					</div>
				</div>
			</Card>

			<Card className='flex flex-col'>
				<div className='flex justify-between items-start mb-2'>
					<h3 className='text-lg font-semibold text-gray-900'>BMI</h3>
					<span className='p-2 bg-green-50 rounded-full'>
						<Scale className='h-5 w-5 text-green-600' />
					</span>
				</div>
				<div className='mt-2'>
					<div className='text-3xl font-bold text-gray-900'>
						{data.bmi.toFixed(1)}
					</div>
					<div className='mt-1 text-sm text-gray-500'>
						{data.bmi < 18.5
							? 'Underweight'
							: data.bmi < 25
							? 'Healthy weight'
							: data.bmi < 30
							? 'Overweight'
							: 'Obese'}
					</div>
				</div>
			</Card>

			<Card className='flex flex-col'>
				<div className='flex justify-between items-start mb-2'>
					<h3 className='text-lg font-semibold text-gray-900'>Next Shipment</h3>
					<span className='p-2 bg-purple-50 rounded-full'>
						<Calendar className='h-5 w-5 text-purple-600' />
					</span>
				</div>
				<div className='mt-2'>
					<div className='text-3xl font-bold text-gray-900'>
						{new Date(data.nextShipmentDate).toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
						})}
					</div>
					<div className='mt-1 text-sm text-gray-500'>Weight Management Rx</div>
				</div>
			</Card>

			<Card className='md:col-span-2 lg:col-span-3'>
				<div className='flex justify-between items-start mb-4'>
					<h3 className='text-lg font-semibold text-gray-900'>
						Weight Progress
					</h3>
				</div>
				<div className='h-64'>
					<ResponsiveContainer width='100%' height='100%'>
						<LineChart data={chartData}>
							<XAxis dataKey='date' />
							<Tooltip />
							<Line
								type='monotone'
								dataKey='weight'
								stroke='#4F46E5'
								strokeWidth={2}
								dot={{ strokeWidth: 4 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</Card>
		</div>
	);
};

export default DashboardSummary;
