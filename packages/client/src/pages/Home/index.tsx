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

export default function Home() {
	const { view } = useViewStore();
	const { isSwitching } = useScreenSwitchStore();
	const navigate = useNavigate();
	const [nickName, setNickName] = useState('');

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
	}, []);

	return (
		<>
			<Outlet />

			{isSwitching && <WarpScreen />}

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
