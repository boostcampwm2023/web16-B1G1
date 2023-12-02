import Screen from 'widgets/screen';
import { useViewStore } from 'shared/store/useViewStore';
import { Outlet, useNavigate } from 'react-router-dom';
import UnderBar from 'shared/ui/underBar/UnderBar';
import UpperBar from './ui/UpperBar';
import { useLoadingStore } from 'shared/store/useLoadingStore';
import WarpScreen from 'widgets/warpScreen/WarpScreen';
import { useEffect } from 'react';
import instance from 'shared/apis/AxiosInterceptor';
import { BASE_URL } from '@constants';

export default function Home() {
	const { view } = useViewStore();
	const { isLoading } = useLoadingStore();
	const navigate = useNavigate();

	useEffect(() => {
		const checkLogin = async () => {
			try {
				const res = await instance.get(`${BASE_URL}auth/check-signin`);
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

			{isLoading && <WarpScreen />}

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

// TODO: 내 은하에서는 MAIN의 뒤로가기 버튼 안보이게 하기
// TODO: 다른 사람 은하에서는 뒤로가기 버튼만 보이게 하기 ?
