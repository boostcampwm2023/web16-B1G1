import { Navigate, Outlet } from 'react-router-dom';
import { getSignInInfo } from 'shared/apis';
import { useEffect, useState } from 'react';

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
