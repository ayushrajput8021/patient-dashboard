import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { user } = useAuth();

	return (
		<div className='flex min-h-screen bg-gray-50'>
			{user && <Sidebar />}
			<main
				className={`flex-1 ${user ? 'pl-64' : ''}`}
				aria-label='Main content'
			>
				<div
					className={`py-8 px-4 sm:px-6 lg:px-8 ${
						user ? 'max-w-7xl mx-auto' : ''
					}`}
				>
					{children}
				</div>
			</main>
		</div>
	);
};

export default Layout;
