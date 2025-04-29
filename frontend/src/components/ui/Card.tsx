import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
	children,
	title,
	footer,
	className,
	...props
}) => {
	return (
		<div
			className={`bg-white rounded-lg shadow-sm overflow-hidden ${
				className || ''
			}`}
			{...props}
		>
			{title && (
				<div className='px-6 py-4 border-b border-gray-100'>
					<h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
				</div>
			)}
			<div className='p-6'>{children}</div>
			{footer && (
				<div className='px-6 py-4 bg-gray-50 border-t border-gray-100'>
					{footer}
				</div>
			)}
		</div>
	);
};

export default Card;
