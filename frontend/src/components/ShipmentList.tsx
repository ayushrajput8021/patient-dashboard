import React from 'react';
import { Shipment, Medication } from '../types';
import Table from './ui/Table';
import Card from './ui/Card';
import Accordion, { AccordionItem } from './ui/Accordion';
import { CheckCircle, Clock, ExternalLink, Pill } from 'lucide-react';

interface ShipmentListProps {
	shipments: Shipment[];
	medication: Medication;
}

const ShipmentList: React.FC<ShipmentListProps> = ({
	shipments,
	medication,
}) => {
	// Define the columns for the shipment table
	const columns = [
		{
			header: 'Date',
			accessor: (shipment: Shipment) =>
				new Date(shipment.shipmentDate).toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				}),
		},
		{
			header: 'Medication',
			accessor: 'medicationType',
		},
		{
			header: 'Dosage',
			accessor: 'dosage',
		},
		{
			header: 'Status',
			accessor: (shipment: Shipment) => (
				<div className='flex items-center'>
					<span
						className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
							shipment.status === 'Delivered'
								? 'bg-green-100 text-green-800'
								: shipment.status === 'Shipped'
								? 'bg-blue-100 text-blue-800'
								: 'bg-yellow-100 text-yellow-800'
						}`}
					>
						{shipment.status === 'Delivered' && (
							<CheckCircle className='w-3 h-3 mr-1' />
						)}
						{shipment.status === 'Processing' && (
							<Clock className='w-3 h-3 mr-1' />
						)}
						{shipment.status}
					</span>
				</div>
			),
		},
		{
			header: 'Tracking',
			accessor: (shipment: Shipment) =>
				shipment.trackingInfo !== 'Pending' ? (
					<a
						href={`#tracking-${shipment.trackingInfo}`}
						className='text-blue-600 hover:text-blue-800 flex items-center'
						target='_blank'
						rel='noopener noreferrer'
					>
						{shipment.trackingInfo} <ExternalLink className='w-3 h-3 ml-1' />
					</a>
				) : (
					<span className='text-gray-500'>Pending</span>
				),
		},
	];

	return (
		<div className='space-y-8'>
			<div>
				<h2 className='text-2xl font-semibold text-gray-900 mb-6'>
					Current Medication
				</h2>
				<Card>
					<div className='flex items-start'>
						<div className='flex-shrink-0 p-2 bg-purple-50 rounded-lg'>
							<Pill className='w-10 h-10 text-purple-600' />
						</div>
						<div className='ml-4'>
							<h3 className='text-lg font-medium text-gray-900'>
								{medication.type}
							</h3>
							<div className='mt-1 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2'>
								<div>
									<p className='text-sm font-medium text-gray-500'>Dosage</p>
									<p className='text-base text-gray-900'>{medication.dosage}</p>
								</div>
								<div>
									<p className='text-sm font-medium text-gray-500'>
										Start Date
									</p>
									<p className='text-base text-gray-900'>
										{new Date(medication.startDate).toLocaleDateString(
											'en-US',
											{
												month: 'short',
												day: 'numeric',
												year: 'numeric',
											}
										)}
									</p>
								</div>
								<div>
									<p className='text-sm font-medium text-gray-500'>End Date</p>
									<p className='text-base text-gray-900'>
										{new Date(medication.endDate).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
											year: 'numeric',
										})}
									</p>
								</div>
							</div>
						</div>
					</div>
				</Card>
			</div>

			<div>
				<h2 className='text-2xl font-semibold text-gray-900 mb-6'>
					Shipment History
				</h2>

				{/* Desktop table view */}
				<div className='hidden md:block'>
					<Card>
						<Table
							columns={columns}
							data={shipments}
							keyExtractor={(shipment) => shipment.id}
						/>
					</Card>
				</div>

				{/* Mobile accordion view */}
				<div className='block md:hidden'>
					<Accordion>
						{shipments.map((shipment) => (
							<AccordionItem
								key={shipment.id}
								title={
									<div className='flex justify-between items-center'>
										<span>
											{new Date(shipment.shipmentDate).toLocaleDateString(
												'en-US',
												{
													month: 'short',
													day: 'numeric',
												}
											)}
										</span>
										<span
											className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
												shipment.status === 'Delivered'
													? 'bg-green-100 text-green-800'
													: shipment.status === 'Shipped'
													? 'bg-blue-100 text-blue-800'
													: 'bg-yellow-100 text-yellow-800'
											}`}
										>
											{shipment.status}
										</span>
									</div>
								}
							>
								<div className='space-y-2'>
									<div className='flex justify-between'>
										<span className='text-gray-500'>Medication:</span>
										<span className='font-medium'>
											{shipment.medicationType}
										</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-500'>Dosage:</span>
										<span className='font-medium'>{shipment.dosage}</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-500'>Tracking:</span>
										{shipment.trackingInfo !== 'Pending' ? (
											<a
												href={`#tracking-${shipment.trackingInfo}`}
												className='text-blue-600 font-medium'
											>
												{shipment.trackingInfo}
											</a>
										) : (
											<span className='font-medium'>Pending</span>
										)}
									</div>
								</div>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	);
};

export default ShipmentList;
