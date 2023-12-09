import LandingScreen from 'widgets/landingScreen/LandingScreen';
import { useState } from 'react';
import { useToastStore } from 'shared/store/useToastStore';
import { Toast } from 'shared/ui';
import { Outlet } from 'react-router-dom';
import Audio from 'features/audio/Audio';
import AudioButton from 'shared/ui/audioButton/AudioButton';

export default function Landing() {
	const [mouse, setMouse] = useState([0.5, 0.5]);
	const { text } = useToastStore();

	return (
		<div
			onMouseMove={(e) => {
				setMouse([
					e.clientX / window.innerWidth,
					e.clientY / window.innerHeight,
				]);
			}}
		>
			<Audio />
			<AudioButton />
			{text && <Toast>{text}</Toast>}
			<Outlet />
			<LandingScreen mousePosition={mouse} />
		</div>
	);
}
