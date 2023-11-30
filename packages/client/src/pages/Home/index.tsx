import Screen from 'widgets/screen';
import { useViewStore } from 'shared/store/useViewStore';
import { Outlet, useNavigate } from 'react-router-dom';
import UnderBar from 'shared/ui/underBar/UnderBar';
import UpperBar from './ui/UpperBar';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function Home() {
	const { view } = useViewStore();
	const navigate = useNavigate();

	useEffect(() => {
		const accessToken = Cookies.get('accessToken');
		const refreshToken = Cookies.get('refreshToken');
		if (!accessToken && !refreshToken) {
			navigate('/');
		}
	}, []);

	return (
		<>
			<Outlet />

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
