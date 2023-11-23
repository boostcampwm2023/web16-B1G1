import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Landing from '../pages/Landing';

export const router = createBrowserRouter([
	{ path: '/', element: <Landing /> },
	{ path: '/home', element: <Home /> },
]);
