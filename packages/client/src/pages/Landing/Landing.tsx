import LandingScreen from 'widgets/landingScreen/LandingScreen';
import { useToastStore } from 'shared/store/useToastStore';
import { Toast } from 'shared/ui';
import { Outlet } from 'react-router-dom';
import ModalRoot from 'shared/routes/ModalRoot';

export default function Landing() {
	const { text, type } = useToastStore();

	return (
		<>
			{text && <Toast type={type}>{text}</Toast>}
			<ModalRoot />
			<Outlet />
			<LandingScreen />
		</>
	);
}
