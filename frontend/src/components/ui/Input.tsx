import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	icon?: LucideIcon;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, icon: Icon, className, ...props }, ref) => {
		return (
			<div className='w-full'>
				{label && (
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						{label}
					</label>
				)}
				<div className='relative rounded-md'>
					{Icon && (
						<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
							<Icon className='h-5 w-5 text-gray-400' aria-hidden='true' />
						</div>
					)}
					<input
						ref={ref}
						className={`
              block w-full rounded-md
              ${Icon ? 'pl-10' : 'pl-4'}
              py-2 pr-4
              ${
								error
									? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
									: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
							}
              shadow-sm
              ${className || ''}
            `}
						aria-invalid={error ? 'true' : 'false'}
						aria-describedby={
							error ? `${props.id || props.name}-error` : undefined
						}
						{...props}
					/>
				</div>
				{error && (
					<p
						className='mt-2 text-sm text-red-600'
						id={`${props.id || props.name}-error`}
					>
						{error}
					</p>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';

export default Input;
