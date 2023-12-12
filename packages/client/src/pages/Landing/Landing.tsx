import LandingScreen from 'widgets/landingScreen/LandingScreen';
import { useToastStore } from 'shared/store/useToastStore';
import { Toast } from 'shared/ui';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

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
