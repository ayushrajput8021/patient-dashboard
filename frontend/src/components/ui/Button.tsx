import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline';
	size?: 'sm' | 'md' | 'lg';
	icon?: LucideIcon;
	iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	size = 'md',
	icon: Icon,
	iconPosition = 'left',
	className,
	disabled,
	...props
}) => {
	const baseStyles =
		'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors';

	const variantStyles = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700',
		secondary: 'bg-green-500 text-white hover:bg-green-600',
		outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
	};

	const sizeStyles = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg',
	};

	const disabledStyles = disabled
		? 'opacity-50 cursor-not-allowed'
		: 'cursor-pointer';

	return (
		<button
			className={`${baseStyles} ${variantStyles[variant]} ${
				sizeStyles[size]
			} ${disabledStyles} ${className || ''}`}
			disabled={disabled}
			{...props}
		>
			{Icon && iconPosition === 'left' && (
				<Icon className='mr-2 h-5 w-5' aria-hidden='true' />
			)}
			{children}
			{Icon && iconPosition === 'right' && (
				<Icon className='ml-2 h-5 w-5' aria-hidden='true' />
			)}
		</button>
	);
};

export default Button;
