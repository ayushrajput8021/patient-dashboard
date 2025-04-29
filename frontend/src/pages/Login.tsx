import React from 'react';
import LoginForm from '../components/LoginForm';
import Layout from '../components/Layout';
// Assuming a logo asset exists

const Login: React.FC = () => {
	return (
		<Layout>
			<div className='flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md space-y-8'>
					<div className='text-center'>
						<h2 className='mt-6 text-3xl font-bold tracking-tight text-gray-900'>
							Welcome to Your Patient Dashboard
						</h2>
						<p className='mt-2 text-sm text-gray-600'>
							Sign in to access your weight-loss progress and shipment details
						</p>
					</div>
					<div className='p-8 transition-all duration-300 ease-in-out bg-white rounded-lg shadow-lg'>
						<LoginForm />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Login;
