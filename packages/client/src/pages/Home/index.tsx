import Screen from 'widgets/screen';
import { useViewStore } from 'shared/store/useViewStore';
import { Outlet, useNavigate } from 'react-router-dom';
import UnderBar from 'shared/ui/underBar/UnderBar';
import UpperBar from './ui/UpperBar';
import WarpScreen from 'widgets/warpScreen/WarpScreen';
import { useEffect } from 'react';
import instance from 'shared/apis/AxiosInterceptor';
import { useScreenSwitchStore } from 'shared/store/useScreenSwitchStore';

export default function Home() {
	const { view } = useViewStore();
	const { isSwitching } = useScreenSwitchStore();
	const navigate = useNavigate();

	useEffect(() => {
		const checkLogin = async () => {
			try {
				const res = await instance({
					method: 'GET',
					url: `/auth/check-signin`,
				});
				if (res.status !== 200) {
					navigate('/login');
				}
			} catch (error) {
				console.error(error);
				navigate('/login');
			}
		};
		checkLogin();
	}, []);

	return (
		<>
			<Outlet />

			{isSwitching && <WarpScreen />}

			{view === 'MAIN' && (
				<>
					<UpperBar />
					<UnderBar />
				</>
			)}

			<Screen />
		</>
	);
}
