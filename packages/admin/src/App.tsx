import { Route, Routes } from 'react-router-dom';
import './App.css';
import { TestComponent } from './components/TestComponent/TestComponent.tsx';
import { Nav } from './components/Nav.tsx';

function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/admin/" element={<div>Home</div>} />
				<Route path="/admin/about" element={<div>About</div>} />
				<Route path="/admin/abc" element={<TestComponent />} />
			</Routes>
		</>
	);
}

export default App;
