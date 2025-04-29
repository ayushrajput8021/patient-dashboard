# API Integration

This folder contains service files that handle API requests to the backend. The frontend uses:

- **React Query** for data fetching, caching, and state management of server state
- **Zustand** for global client state management
- **Axios** for making HTTP requests

## Directory Structure

```
src/
  ├── services/        # API services
  │   ├── api.ts       # Base API client
  │   ├── authService.ts  # Authentication API
  │   └── userService.ts  # User API
  ├── hooks/           # Custom React hooks
  │   ├── useAuth.ts   # Authentication hook
  │   └── useGetUser.ts # User data hook
  ├── store/           # Zustand stores
  │   └── useAuthStore.ts # Auth state store
  └── providers/       # Context providers
      └── QueryProvider.tsx # React Query provider
```

## Usage Examples

### Authentication

```tsx
import { useAuth } from '../hooks/useAuth';

function LoginForm() {
	const { login, isLoading, error } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;

		await login({ email, password });
	};

	return (
		<form onSubmit={handleSubmit}>
			{/* Form fields */}
			{error && <p className='error'>{error}</p>}
			<button type='submit' disabled={isLoading}>
				{isLoading ? 'Logging in...' : 'Login'}
			</button>
		</form>
	);
}
```

### Fetching User Data

```tsx
import { useGetUser } from '../hooks/useGetUser';

function UserProfile() {
	const { userDetails, isLoading, error, updateUser } = useGetUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading user data</div>;

	const handleUpdateName = (newName) => {
		updateUser({ name: newName });
	};

	return (
		<div>
			<h1>{userDetails.name}</h1>
			<p>{userDetails.email}</p>
			{/* More user data */}
		</div>
	);
}
```

## Adding New Services

1. Create a new service file in the services folder
2. Define interfaces for request/response data
3. Create API functions using the api client
4. Create a custom hook in the hooks folder for consuming the service
5. Use the hook in your components

Example:

```tsx
// services/patientService.ts
import api from './api';

export interface Patient {
	id: string;
	name: string;
	// ...
}

export const patientService = {
	getPatients: async (): Promise<Patient[]> => {
		const response = await api.get<Patient[]>('/patients');
		return response.data;
	},
};

// hooks/usePatients.ts
import { useQuery } from '@tanstack/react-query';
import { patientService } from '../services/patientService';

export const usePatients = () => {
	return useQuery({
		queryKey: ['patients'],
		queryFn: patientService.getPatients,
	});
};
```

## Troubleshooting

### Common Issues

1. **JSON Parse Errors**

   If you see errors like `SyntaxError: Unexpected token '"'` in the server logs, ensure that:

   - The data sent to the API is a proper JavaScript object (not a string)
   - You're not double-stringifying the data
   - Content-Type headers are set correctly

   ```ts
   // Good - sends proper JSON object
   api.post('/endpoint', { key: 'value' });

   // Bad - sending a string that needs parsing
   api.post('/endpoint', '{"key": "value"}');
   ```

2. **CORS Issues**

   If you see CORS errors in the console:

   - Check that the backend CORS configuration includes your frontend origin
   - Ensure `withCredentials` is properly set if you're using cookies

3. **Authentication Problems**

   If authentication fails:

   - Check browser storage to see if tokens are properly stored
   - Verify that auth headers are correctly added to requests
   - Look for any cookie-related issues in the browser console

### Debugging

The API client includes built-in logging for development environments. Open your browser's console to see:

- Request details (URL, method, data)
- Response data and status
- Error information

To enable more detailed logging, add this to your `.env` file:

```
VITE_DEBUG_API=true
```
