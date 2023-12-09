import Screen from 'widgets/screen/Screen';
import { useViewStore } from 'shared/store/useViewStore';
import { Outlet } from 'react-router-dom';
import UnderBar from 'widgets/underBar/UnderBar';
import UpperBar from 'widgets/upperBar/UpperBar';
import WarpScreen from 'widgets/warpScreen/WarpScreen';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getGalaxy } from 'shared/apis';
import {
	useErrorStore,
	useGalaxyStore,
	useToastStore,
	useCustomStore,
} from 'shared/store';
import { Toast } from 'shared/ui';
import {
	SPIRAL,
	GALAXY_THICKNESS,
	SPIRAL_START,
	ARMS_Z_DIST,
} from 'widgets/galaxy/lib/constants';
import Alert from 'shared/ui/alert/Alert';
import useCheckNickName from 'shared/hooks/useCheckNickName';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Audio from 'features/audio/Audio';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export default function Home() {
	const { view } = useViewStore();
	const [isSwitching, setIsSwitching] = useState(true);
	const { text } = useToastStore();
	const { message } = useErrorStore();
	const { page, nickName } = useCheckNickName();

	const handleFullScreen = useFullScreenHandle();

	const { setSpiral, setStart, setThickness, setZDist } = useGalaxyStore();
	const custom = useCustomStore();

	useEffect(() => {
		getGalaxy('').then((res) => {
			const { setSpiral, setStart, setThickness, setZDist } = custom;
			if (res.spiral) setSpiral(res.spiral);

			if (res.start) setStart(res.start);

			if (res.thickness) setThickness(res.thickness);

			if (res.zDist) setZDist(res.zDist);
		});
	}, []);

	useEffect(() => {
		setIsSwitching(true);

		getGalaxy(nickName).then((res) => {
			if (!res.spiral) setSpiral(SPIRAL);
			else setSpiral(res.spiral);

			if (!res.start) setStart(SPIRAL_START);
			else setStart(res.start);

			if (!res.thickness) setThickness(GALAXY_THICKNESS);
			else setThickness(res.thickness);

			if (!res.zDist) setZDist(ARMS_Z_DIST);
			else setZDist(res.zDist);
		});
	}, [nickName]);

	const keyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			e.preventDefault();
			handleFullScreen.exit();
		} else if (e.key === 'F9') {
			e.preventDefault();
			handleFullScreen.enter();
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', keyDown);
		return () => {
			window.removeEventListener('keydown', keyDown);
		};
	}, []);

	return (
		<FullScreen handle={handleFullScreen}>
			<Outlet />
			<Audio />

			{message && <Alert title={message} />}
			{isSwitching && <WarpScreen setIsSwitching={setIsSwitching} />}
			{!isSwitching && <FadeoutScreen />}
			{text && <Toast>{text}</Toast>}

			{(view === 'MAIN' || view === 'DETAIL') && (
				<>
					<UpperBar />
					<UnderBar />
				</>
			)}

			<Screen />
		</FullScreen>
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

const FadeoutScreen = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 101;
	background-color: white;
	animation: ${fadeout} 0.5s linear forwards;
`;
