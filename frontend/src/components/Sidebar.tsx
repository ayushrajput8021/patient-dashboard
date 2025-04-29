import React from 'react';
import { NavLink } from 'react-router-dom';
import { Scale, Home, Truck, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavItemProps {
	to: string;
	icon: React.ReactNode;
	label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
	<NavLink
		to={to}
		className={({ isActive }) =>
			`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
				isActive
					? 'bg-blue-50 text-blue-600'
					: 'text-gray-700 hover:bg-gray-100'
			}`
		}
	>
		{icon}
		<span className='ml-3'>{label}</span>
	</NavLink>
);

const Sidebar: React.FC = () => {
	const { logout, user } = useAuth();

	if (!user) return null;

	return (
		<aside className='fixed inset-y-0 left-0 w-64 bg-white shadow-sm z-10 hidden md:block'>
			<div className='flex flex-col h-full'>
				<div className='flex items-center justify-center h-16 border-b border-gray-200'>
					<h1 className='text-xl font-semibold text-gray-900'>
						Health Dashboard
					</h1>
				</div>
				<div className='flex flex-col flex-grow p-4 space-y-1 overflow-y-auto'>
					<NavItem
						to='/'
						icon={<Home className='w-5 h-5' />}
						label='Dashboard'
					/>
					<NavItem
						to='/weight-progress'
						icon={<Scale className='w-5 h-5' />}
						label='Weight Progress'
					/>
					<NavItem
						to='/shipments'
						icon={<Truck className='w-5 h-5' />}
						label='Shipments'
					/>
				</div>
				<div className='p-4 border-t border-gray-200'>
					<div className='flex items-center mb-4'>
						<div className='flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center'>
							<span className='text-gray-600 font-medium'>
								{user.name.charAt(0)}
							</span>
						</div>
						<div className='ml-3'>
							<p className='text-sm font-medium text-gray-700'>{user.name}</p>
							<p className='text-xs text-gray-500'>{user.email}</p>
						</div>
					</div>
					<button
						onClick={logout}
						className='flex items-center px-4 py-2 w-full text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors'
					>
						<LogOut className='w-5 h-5 mr-3' />
						Sign out
					</button>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
