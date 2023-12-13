import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getSignInInfo } from 'shared/apis';

export default function PrivateRoute() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				await getSignInInfo();
				setIsAuthenticated(true);
			} catch (error) {
				setIsAuthenticated(false);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	if (isLoading) return null;

	return isAuthenticated && !isLoading ? <Outlet /> : <Navigate to="/login" />;
}
