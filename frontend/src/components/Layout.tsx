import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
	children: React.ReactNode;
}

const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
	isOpen,
	onClose,
}) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 flex z-40 md:hidden'>
			{/* Overlay */}
			<div
				className='fixed inset-0 bg-gray-600 bg-opacity-75'
				onClick={onClose}
				aria-hidden='true'
			></div>

			{/* Sidebar */}
			<div className='relative flex-1 flex flex-col max-w-xs w-full bg-white'>
				<div className='absolute top-0 right-0 pt-2 pr-2'>
					<button
						type='button'
						className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
						onClick={onClose}
					>
						<span className='sr-only'>Close sidebar</span>
						<X className='h-6 w-6 text-gray-600' aria-hidden='true' />
					</button>
				</div>

				<Sidebar />
			</div>
		</div>
	);
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { user } = useAuth();

	return (
		<div className='min-h-screen bg-gray-50'>
			{user && (
				<>
					<Sidebar />
					<div className='md:pl-64'>
						<div className='sticky top-0 z-10 flex h-16 flex-shrink-0 md:hidden'>
							<button
								type='button'
								className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden'
								onClick={() => setMobileMenuOpen(true)}
							>
								<span className='sr-only'>Open sidebar</span>
								<Menu className='h-6 w-6' aria-hidden='true' />
							</button>
						</div>
						<MobileMenu
							isOpen={mobileMenuOpen}
							onClose={() => setMobileMenuOpen(false)}
						/>
					</div>
				</>
			)}
			<main className={`flex-1 ${user ? 'md:pl-64' : ''}`}>
				<div className={`py-6 ${user ? 'px-4 sm:px-6 md:px-8' : ''}`}>
					{children}
				</div>
			</main>
		</div>
	);
};

export default Layout;
