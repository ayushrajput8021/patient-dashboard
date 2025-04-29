import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
	title: React.ReactNode;
	children: React.ReactNode;
	defaultOpen?: boolean;
	className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
	title,
	children,
	defaultOpen = false,
	className = '',
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<div className={`border-b border-gray-200 ${className}`}>
			<button
				type='button'
				onClick={() => setIsOpen(!isOpen)}
				className='flex justify-between w-full px-4 py-4 text-left text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset'
				aria-expanded={isOpen}
			>
				<span className='font-medium'>{title}</span>
				<span className='ml-6 flex-shrink-0'>
					{isOpen ? (
						<ChevronUp className='h-5 w-5 text-gray-500' aria-hidden='true' />
					) : (
						<ChevronDown className='h-5 w-5 text-gray-500' aria-hidden='true' />
					)}
				</span>
			</button>
			{isOpen && <div className='px-4 py-3 bg-white'>{children}</div>}
		</div>
	);
};

interface AccordionProps {
	children: React.ReactNode;
	className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ children, className }) => {
	return (
		<div
			className={`divide-y divide-gray-200 border border-gray-200 rounded-md ${
				className || ''
			}`}
		>
			{children}
		</div>
	);
};

export default Accordion;
