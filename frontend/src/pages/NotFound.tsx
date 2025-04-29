import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50'>
			<div className='text-center'>
				<h1 className='text-9xl font-bold text-gray-200'>404</h1>
				<h2 className='mt-4 text-3xl font-bold text-gray-900'>
					Page not found
				</h2>
				<p className='mt-2 text-lg text-gray-600'>
					Sorry, we couldn't find the page you're looking for.
				</p>
				<div className='mt-6'>
					<Link to='/'>
						<Button icon={Home} iconPosition='left'>
							Back to Dashboard
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
