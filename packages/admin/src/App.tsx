import { Route, Routes } from 'react-router-dom';
import './App.css';
import { TestComponent } from './components/TestComponent/TestComponent.tsx';
import { Nav } from './components/Nav.tsx';

function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" element={<div>Home</div>} />
				<Route path="/about" element={<div>About</div>} />
				<Route path="/abc" element={<TestComponent />} />
			</Routes>
		</>
	);
}

export default App;
