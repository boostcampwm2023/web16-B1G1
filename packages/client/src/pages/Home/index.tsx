import Screen from 'widgets/screen';
import { useViewStore } from 'shared/store/useViewStore';
import { Outlet, useNavigate } from 'react-router-dom';
import UnderBar from 'shared/ui/underBar/UnderBar';
import UpperBar from './ui/UpperBar';
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

export default function Home() {
	const [nickName, setNickName] = useState('');

	const { view } = useViewStore();
	const { isSwitching } = useScreenSwitchStore();
	const { text } = useToastStore();

	const navigate = useNavigate();
	const {
		spiral,
		setSpiral,
		start,
		setStart,
		thickness,
		setThickness,
		zDist,
		setZDist,
	} = useGalaxyStore();

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
		getSignInInfo().then((res) => {
			Cookies.set('nickname', res.nickname);
			setNickName(res.nickname);
		});
		getGalaxy(nickName).then((res) => {
			if (res.spiral && res.spiral !== spiral) setSpiral(res.spiral);
			if (res.start && res.start !== start) setStart(res.start);
			if (res.thickness && res.thickness !== thickness)
				setThickness(res.thickness);
			if (res.zDist && res.zDist !== zDist) setZDist(res.zDist);
		});
	}, []);

	return (
		<>
			<Outlet />

			{isSwitching && <WarpScreen />}
			{text && <Toast>{text}</Toast>}

			{view === 'MAIN' && (
				<>
					<UpperBar />
					<UnderBar nickName={nickName} />
				</>
			)}

			<Screen />
		</>
	);
}
