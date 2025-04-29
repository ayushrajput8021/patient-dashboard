import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';
import { useAuth } from '../hooks/useAuth';

const LoginForm: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<{
		email?: string;
		password?: string;
	}>({});

	const { login, isLoading, error } = useAuth();

	const validateForm = () => {
		const newErrors: { email?: string; password?: string } = {};
		let isValid = true;

		if (!email) {
			newErrors.email = 'Email is required';
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'Email address is invalid';
			isValid = false;
		}

		if (!password) {
			newErrors.password = 'Password is required';
			isValid = false;
		} else if (password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			await login({ email, password });
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div>
				<Input
					label='Email Address'
					id='email'
					name='email'
					type='email'
					autoComplete='email'
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={errors.email}
					icon={Mail}
					placeholder='john@example.com'
				/>
			</div>

			<div>
				<Input
					label='Password'
					id='password'
					name='password'
					type='password'
					autoComplete='current-password'
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					error={errors.password}
					icon={Lock}
					placeholder='•••••••'
				/>
			</div>

			<div className='flex items-center justify-between'>
				<div className='text-sm'>
					<a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
						Forgot your password?
					</a>
				</div>
			</div>

			<div>
				<Button type='submit' className='w-full' size='lg' disabled={isLoading}>
					{isLoading ? 'Signing in...' : 'Sign in'}
				</Button>
			</div>

			{error && (
				<div className='p-4 mt-4 rounded-md bg-red-50'>
					<div className='flex'>
						<div className='ml-3'>
							<h3 className='text-sm font-medium text-red-800'>Login failed</h3>
							<div className='mt-2 text-sm text-red-700'>
								<p>{error}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</form>
	);
};

export default LoginForm;
