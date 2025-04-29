import { useMedication } from '../../hooks/useMedication';
import { formatDate } from '../../utils/formatters';

export const CurrentMedication = () => {
	const { medication, isLoading, error } = useMedication();

	if (isLoading) {
		return (
			<div className='p-4 bg-white rounded-lg shadow'>
				<div className='animate-pulse space-y-4'>
					<div className='h-6 bg-gray-200 rounded w-1/2'></div>
					<div className='h-24 bg-gray-200 rounded'></div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='p-4 bg-white rounded-lg shadow'>
				<p className='text-red-500'>
					Error loading medication data. Please try again later.
				</p>
			</div>
		);
	}

	if (!medication) {
		return (
			<div className='bg-white rounded-lg shadow p-6'>
				<h2 className='text-2xl font-bold mb-6'>Current Medication</h2>
				<p className='text-gray-500'>No active medication found.</p>
			</div>
		);
	}

	return (
		<div className='bg-white rounded-lg shadow p-6'>
			<h2 className='text-2xl font-bold mb-6'>Current Medication</h2>

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
					<h4 className='font-medium text-blue-800 mb-2'>Instructions</h4>
					<p className='text-gray-700'>
						Take {medication.dosage} of {medication.type} as directed by your
						healthcare provider. Please consult with your doctor before making
						any changes to your medication regimen.
					</p>
				</div>
			</div>
		</div>
	);
};

export default CurrentMedication;
