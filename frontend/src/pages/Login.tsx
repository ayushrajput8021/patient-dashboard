import React from 'react';
import LoginForm from '../components/LoginForm';
import Layout from '../components/Layout';

const Login: React.FC = () => {
	return (
		<Layout>
			<div className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<h2 className='mt-6 text-center text-3xl font-bold text-gray-900'>
						Sign in to your account
					</h2>
					<p className='mt-2 text-center text-sm text-gray-600'>
						Enter your credentials to access your health dashboard
					</p>
				</div>

				<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
					<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
						<LoginForm />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Login;
