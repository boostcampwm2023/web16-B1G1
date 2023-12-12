import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useToastStore } from 'shared/store';
import { Toast } from 'shared/ui';
import { LandingScreen } from 'widgets';

export default function Landing() {
	const { text, type } = useToastStore();

	const keyDown = (e: KeyboardEvent) => {
		if (e.key === 'F9') document.documentElement.requestFullscreen();
		if (e.key === 'Escape') document.exitFullscreen();
	};

	useEffect(() => {
		window.addEventListener('keydown', keyDown);
		return () => {
			window.removeEventListener('keydown', keyDown);
		};
	}, []);

	return (
		<>
			{text && <Toast type={type}>{text}</Toast>}
			<Outlet />
			<LandingScreen />
		</>
	);
}
