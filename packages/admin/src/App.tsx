import { Route, Routes } from 'react-router-dom';
import './App.css';
import { TestComponent } from './components/TestComponent/TestComponent.tsx';

import Board from './components/Board/Board.tsx';
import Nav from './components/Nav.tsx';

function App() {
	return (
		<>
			<Nav>
				<a href="/admin">Home</a>
				<a href="/admin/about">About</a>
				<a href="/admin/abc">Test</a>
				<a href="/admin/board">Board</a>
			</Nav>
			<Routes>
				<Route path="/admin" element={<div>Home</div>} />
				<Route path="/admin/about" element={<div>About</div>} />
				<Route path="/admin/abc" element={<TestComponent />} />
				<Route path="/admin/board" element={<Board />} />
			</Routes>
		</>
	);
}

export default App;
