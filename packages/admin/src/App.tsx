import { Route, Routes } from 'react-router-dom';
import './App.css';
import { TestComponent } from './components/TestComponent/TestComponent.tsx';

import Board from './components/Board/Board.tsx';
import Nav from './components/Nav.tsx';

function App() {
	return (
		<>
			<Nav>
				<a href="/">Home</a>
				<a href="/about">About</a>
				<a href="/abc">Test</a>
				<a href="/board">Board</a>
			</Nav>
			<Routes>
				<Route path="/" element={<div>Home</div>} />
				<Route path="/about" element={<div>About</div>} />
				<Route path="/abc" element={<TestComponent />} />
				<Route path="/board" element={<Board />} />
			</Routes>
		</>
	);
}

export default App;
