import { Link, Route, Routes } from 'react-router-dom';
import './App.css';

import Board from './components/Board/Board.tsx';
import Nav from './components/Nav.tsx';
import SystemInfo from './components/SystemInfo/SystemInfo.tsx';
import ExceptionStatistics from './components/ExceptionStatistics/ExceptionStatistics.tsx';

function App() {
	return (
		<>
			<Nav>
				<Link to={'/admin'}>Home</Link>
				<Link to={'/admin/board'}>Board</Link>
				<Link to={'/admin/system-info'}>System Info</Link>
				<Link to={'/admin/exception-statistics'}>Exception Statistics</Link>
			</Nav>
			<Routes>
				<Route path="/admin" element={<div>Home</div>} />
				<Route path="/admin/board" element={<Board />} />
				<Route path="/admin/system-info" element={<SystemInfo />} />
				<Route
					path={'/admin/exception-statistics'}
					element={<ExceptionStatistics />}
				/>
			</Routes>
		</>
	);
}

export default App;
