import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Layout from './Layout';

const ProtectedRoute: React.FC = () => {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to='/login' replace />;
	}

	return <Layout>{<Outlet />}</Layout>;
};

export default ProtectedRoute;
