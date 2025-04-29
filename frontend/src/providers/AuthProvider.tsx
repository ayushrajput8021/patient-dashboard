import React, {
	useState,
	useEffect,
	createContext,
	useContext,
	ReactNode,
} from 'react';
import { api } from '../lib/api';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	error: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	isLoading: false,
	error: null,
	login: async () => {},
	logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	// Check for existing user on load
	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = async (email: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const user = await api.login(email);
			setUser(user);
			// In a real app, JWT would be handled by HTTP-only cookies
			// For this prototype, we store the user in localStorage
			localStorage.setItem('user', JSON.stringify(user));
			navigate('/');
		} catch (error) {
			setError('Invalid email or password');
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
		navigate('/login');
	};

	return (
		<AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
