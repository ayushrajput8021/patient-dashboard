import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './providers/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import WeightProgress from './pages/WeightProgress';
import ShipmentDetails from './pages/ShipmentDetails';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<AuthProvider>
					<Routes>
						{/* Public routes */}
						<Route path='/login' element={<Login />} />

						{/* Protected routes */}
						<Route element={<ProtectedRoute />}>
							<Route path='/' element={<Dashboard />} />
							<Route path='/weight-progress' element={<WeightProgress />} />
							<Route path='/shipments' element={<ShipmentDetails />} />
						</Route>

						{/* Catch all */}
						<Route path='*' element={<NotFound />} />
					</Routes>

					<Toaster position='top-right' />
				</AuthProvider>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
