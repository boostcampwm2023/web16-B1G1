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
import { useGalaxyStore, useCustomStore } from 'shared/store';
import { Toast } from 'shared/ui';
import { useToastStore } from 'shared/store';
import { useOwnerStore } from 'shared/store/useOwnerStore';
import {
	SPIRAL,
	GALAXY_THICKNESS,
	SPIRAL_START,
	ARMS_Z_DIST,
} from 'widgets/galaxy/lib/constants';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export default function Home() {
	const { view } = useViewStore();
	const { isSwitching } = useScreenSwitchStore();
	const { text } = useToastStore();
	const { pageOwnerNickName } = useOwnerStore();
	const [nickname, setNickname] = useState('');

	const navigate = useNavigate();
	const { setSpiral, setStart, setThickness, setZDist } = useGalaxyStore();
	const custom = useCustomStore();

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
		})();

		getSignInInfo().then((res) => {
			Cookies.set('nickname', res.nickname);
			setNickname(res.nickname);
		});
		getGalaxy('').then((res) => {
			if (res.spiral) {
				setSpiral(res.spiral);
				custom.setSpiral(res.spiral);
			}

			if (res.start) {
				setStart(res.start);
				custom.setStart(res.start);
			}

			if (res.thickness) {
				setThickness(res.thickness);
				custom.setThickness(res.thickness);
			}

			if (res.zDist) {
				setZDist(res.zDist);
				custom.setZDist(res.zDist);
			}
		});
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
			{!isSwitching && <WhiteScreen />}
			{text && <Toast>{text}</Toast>}

			{(view === 'MAIN' || view === 'DETAIL') && (
				<>
					<UpperBar />
					<UnderBar nickname={nickname} />
				</>
			)}

			<Screen />
		</>
	);
}

const fadeout = keyframes`
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
		display: none;
	}
`;

const WhiteScreen = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 101;
	background-color: white;
	animation: ${fadeout} 0.5s linear forwards;
`;
