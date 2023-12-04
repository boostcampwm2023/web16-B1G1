import Screen from 'widgets/screen/Screen';
import { useViewStore } from 'shared/store/useViewStore';
import { Outlet, useNavigate } from 'react-router-dom';
import UnderBar from 'widgets/underBar/UnderBar';
import UpperBar from '../../widgets/upperBar/UpperBar';
import WarpScreen from 'widgets/warpScreen/WarpScreen';
import { useEffect, useState } from 'react';
import instance from 'shared/apis/AxiosInterceptor';
import { useScreenSwitchStore } from 'shared/store/useScreenSwitchStore';
import Cookies from 'js-cookie';
import { getSignInInfo } from 'shared/apis';
import { getGalaxy } from 'shared/apis';
import { useGalaxyStore } from 'shared/store';
import { Toast } from 'shared/ui';
import { useToastStore } from 'shared/store';
import { useOwnerStore } from 'shared/store/useOwnerStore';
import {
	SPIRAL,
	GALAXY_THICKNESS,
	SPIRAL_START,
	ARMS_Z_DIST,
} from 'widgets/galaxy/lib/constants';

export default function Home() {
	const { view } = useViewStore();
	const { isSwitching } = useScreenSwitchStore();
	const { text } = useToastStore();
	const { pageOwnerNickName } = useOwnerStore();
	const [nickname, setNickname] = useState('');

	const navigate = useNavigate();
	const { setSpiral, setStart, setThickness, setZDist } = useGalaxyStore();

	useEffect(() => {
		(async () => {
			try {
				const res = await instance({
					method: 'GET',
					url: `/auth/check-signin`,
				});

				if (res.status !== 200) navigate('/login');
			} catch (error) {
				navigate('/login');
			}
<<<<<<< HEAD
		};
		checkLogin();
		getSignInInfo().then((res) => {
			Cookies.set('nickname', res.nickname);
			setNickname(res.nickname);
		});
=======
		})();
>>>>>>> 460c149 (🎨 Change checkLogin function to IIFE)
	}, []);

	useEffect(() => {
		getGalaxy(pageOwnerNickName).then((res) => {
			if (!res.spiral) setSpiral(SPIRAL);
			else setSpiral(res.spiral);

			if (!res.start) setStart(SPIRAL_START);
			else setStart(res.start);

			if (!res.thickness) setThickness(GALAXY_THICKNESS);
			else setThickness(res.thickness);

			if (!res.zDist) setZDist(ARMS_Z_DIST);
			else setZDist(res.zDist);
		});
	}, [pageOwnerNickName]);

	return (
		<>
			<Outlet />

			{isSwitching && <WarpScreen />}
			{text && <Toast>{text}</Toast>}

			{view === 'MAIN' && (
				<>
					<UpperBar />
					<UnderBar nickname={nickname} />
				</>
			)}

			<Screen />
		</>
	);
}
