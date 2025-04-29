import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Scale, Home, Truck, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavItemProps {
	to: string;
	icon: React.ReactNode;
	label: string;
	onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, onClick }) => {
	const { pathname } = useLocation();
	const isActive = pathname === to;

	return (
		<NavLink
			to={to}
			onClick={onClick}
			className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out ${
				isActive
					? 'bg-blue-100 text-blue-700 shadow-sm'
					: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
			} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
			aria-current={isActive ? 'page' : undefined}
		>
			<span className='flex-shrink-0'>{icon}</span>
			<span className='ml-3'>{label}</span>
		</NavLink>
	);
};

const Sidebar: React.FC = () => {
	const { logout, user } = useAuth();
	const [isMobileOpen, setIsMobileOpen] = React.useState(false);

	if (!user) return null;

	const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

	return (
		<>
			{/* Mobile Menu Button */}
			<button
				className='fixed z-50 p-2 bg-white rounded-md shadow-md md:hidden top-4 left-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
				onClick={toggleMobileMenu}
				aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={isMobileOpen}
			>
				{isMobileOpen ? (
					<X className='w-6 h-6 text-gray-600' />
				) : (
					<Menu className='w-6 h-6 text-gray-600' />
				)}
			</button>

			{/* Sidebar */}
			<aside
				className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
					isMobileOpen ? 'translate-x-0' : '-translate-x-full'
				} md:translate-x-0 md:shadow-sm`}
				aria-label='Main navigation'
			>
				<div className='flex flex-col h-full'>
					{/* Header */}
					<div className='flex items-center justify-between h-16 px-6 border-b border-gray-200'>
						<h1 className='text-xl font-semibold text-gray-900'>
							Patient Dashboard
						</h1>
						<button
							className='p-2 rounded-md md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
							onClick={toggleMobileMenu}
							aria-label='Close menu'
						>
							<X className='w-5 h-5 text-gray-600' />
						</button>
					</div>

					{/* Navigation */}
					<nav className='flex flex-col flex-grow p-4 space-y-2 overflow-y-auto'>
						<NavItem
							to='/'
							icon={<Home className='w-5 h-5' />}
							label='Dashboard'
							onClick={() => setIsMobileOpen(false)}
						/>
						<NavItem
							to='/weight-progress'
							icon={<Scale className='w-5 h-5' />}
							label='Weight Progress'
							onClick={() => setIsMobileOpen(false)}
						/>
						<NavItem
							to='/shipments'
							icon={<Truck className='w-5 h-5' />}
							label='Shipments'
							onClick={() => setIsMobileOpen(false)}
						/>
					</nav>

					{/* User Info & Logout */}
					<div className='p-4 border-t border-gray-200'>
						<div className='flex items-center mb-4'>
							<div className='flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full'>
								<span className='text-lg font-medium text-blue-700'>
									{user.name.charAt(0).toUpperCase()}
								</span>
							</div>
							<div className='ml-3 truncate'>
								<p className='text-sm font-medium text-gray-900 truncate'>
									{user.name}
								</p>
								<p className='text-xs text-gray-500 truncate'>{user.email}</p>
							</div>
						</div>
						<button
							onClick={() => {
								logout();
								setIsMobileOpen(false);
							}}
							className='flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500'
							aria-label='Sign out'
						>
							<LogOut className='w-5 h-5 mr-3' />
							Sign out
						</button>
					</div>
				</div>
			</aside>

			{/* Overlay for Mobile */}
			{isMobileOpen && (
				<div
					className='fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden'
					onClick={toggleMobileMenu}
					aria-hidden='true'
				/>
			)}
		</>
	);
};

export default Sidebar;
