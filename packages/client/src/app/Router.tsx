import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import { WritingModal } from 'features/writingModal';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route index path="/" element={<Landing />} />
			<Route path="/home" element={<Home />}>
				<Route path="writing" element={<WritingModal />} />
			</Route>
		</>,
	),
);
