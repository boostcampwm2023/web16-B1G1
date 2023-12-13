import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getSignInInfo } from 'shared/apis';

export default function PublicRoute() {
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

	return isAuthenticated && !isLoading ? <Navigate to="/home" /> : <Outlet />;
}
