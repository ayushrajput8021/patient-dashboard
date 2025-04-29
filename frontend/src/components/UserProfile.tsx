import { useState } from 'react';
import useGetUser from '../hooks/useGetUser';

interface EditableFieldProps {
	label: string;
	value: string | undefined;
	onSave: (value: string) => void;
	isDisabled?: boolean;
}

const EditableField = ({
	label,
	value,
	onSave,
	isDisabled = false,
}: EditableFieldProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(value || '');

	const handleSave = () => {
		onSave(editValue);
		setIsEditing(false);
	};

	return (
		<div className='mb-4'>
			<div className='flex justify-between items-center mb-1'>
				<label className='font-medium text-gray-700'>{label}</label>
				{!isEditing && !isDisabled && (
					<button
						onClick={() => setIsEditing(true)}
						className='text-blue-500 text-sm'
					>
						Edit
					</button>
				)}
			</div>

			{isEditing ? (
				<div className='flex gap-2'>
					<input
						type='text'
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						className='w-full p-2 border rounded'
					/>
					<button
						onClick={handleSave}
						className='bg-blue-500 text-white px-3 py-1 rounded'
					>
						Save
					</button>
					<button
						onClick={() => {
							setIsEditing(false);
							setEditValue(value || '');
						}}
						className='bg-gray-300 text-gray-700 px-3 py-1 rounded'
					>
						Cancel
					</button>
				</div>
			) : (
				<div className='p-2 bg-gray-50 rounded'>{value || 'Not provided'}</div>
			)}
		</div>
	);
};

export const UserProfile = () => {
	const { userDetails, isLoading, error, updateUser, isUpdating } =
		useGetUser();

	if (isLoading) {
		return <div className='p-4'>Loading user data...</div>;
	}

	if (error || !userDetails) {
		return <div className='p-4 text-red-500'>Error loading user profile</div>;
	}

	const handleUpdate = (field: string, value: string) => {
		updateUser({ [field]: value });
	};

	return (
		<div className='bg-white rounded-lg shadow p-6 max-w-xl mx-auto'>
			<h2 className='text-2xl font-bold mb-6'>User Profile</h2>

			<EditableField
				label='Name'
				value={userDetails.name}
				onSave={(value) => handleUpdate('name', value)}
			/>

			<EditableField
				label='Email'
				value={userDetails.email}
				onSave={(value) => handleUpdate('email', value)}
			/>

			<EditableField
				label='Phone'
				value={userDetails.phone}
				onSave={(value) => handleUpdate('phone', value)}
			/>

			<EditableField
				label='Address'
				value={userDetails.address}
				onSave={(value) => handleUpdate('address', value)}
			/>

			<div className='mt-4'>
				<p className='text-sm text-gray-500'>
					{isUpdating
						? 'Saving changes...'
						: 'All changes are saved automatically'}
				</p>
			</div>
		</div>
	);
};

export default UserProfile;
