import React, { useState, useEffect } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
	const [email, setEmail] = useState('test@acme.com');
	const [password, setPassword] = useState('Password123!');
	const [errors, setErrors] = useState<{
		email?: string;
		password?: string;
		general?: string;
	}>({});
	const { login, isLoading, user } = useAuth();
	const navigate = useNavigate();

	// Redirect if already logged in
	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	const validateForm = () => {
		const newErrors: { email?: string; password?: string } = {};
		let isValid = true;

		if (!email) {
			newErrors.email = 'Email is required';
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'Please enter a valid email address';
			isValid = false;
		}

		if (!password) {
			newErrors.password = 'Password is required';
			isValid = false;
		} else if (password.length < 8) {
			newErrors.password = 'Password must be at least 8 characters';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrors({});
		if (validateForm()) {
			try {
				await login({ email, password });
			} catch (err) {
				console.error(err);
				setErrors({ general: 'Invalid email or password. Please try again.' });
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-6'
			noValidate
			aria-label='Login form'
		>
			<div>
				<Input
					label='Email Address'
					id='email'
					name='email'
					type='email'
					autoComplete='email'
					required
					value={email}
					onChange={(e) => setEmail(e.target.value.trim())}
					error={errors.email}
					icon={Mail}
					placeholder='you@example.com'
					aria-describedby={errors.email ? 'email-error' : undefined}
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
					placeholder='••••••••'
					aria-describedby={errors.password ? 'password-error' : undefined}
				/>
			</div>

			<div>
				<Button
					type='submit'
					className='w-full'
					size='lg'
					disabled={isLoading}
					aria-label={isLoading ? 'Signing in' : 'Sign in'}
				>
					{isLoading ? (
						<svg
							className='w-5 h-5 mr-2 text-white animate-spin'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
						>
							<circle
								className='opacity-25'
								cx='12'
								cy='12'
								r='10'
								stroke='currentColor'
								strokeWidth='4'
							></circle>
							<path
								className='opacity-75'
								fill='currentColor'
								d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
							></path>
						</svg>
					) : null}
					{isLoading ? 'Signing in...' : 'Sign in'}
				</Button>
			</div>

			{errors.general && (
				<div
					className='flex items-center p-4 mt-4 rounded-lg bg-red-50'
					role='alert'
					aria-live='assertive'
				>
					<AlertCircle className='w-5 h-5 text-red-600' />
					<div className='ml-3'>
						<h3 className='text-sm font-medium text-red-800'>Login failed</h3>
						<p className='mt-1 text-sm text-red-700'>{errors.general}</p>
					</div>
				</div>
			)}
		</form>
	);
};

export default LoginForm;
