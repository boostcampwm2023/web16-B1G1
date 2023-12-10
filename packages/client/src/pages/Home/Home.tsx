import Screen from 'widgets/screen/Screen';
import { Outlet } from 'react-router-dom';
import WarpScreen from 'widgets/warpScreen/WarpScreen';
import { useEffect, useState } from 'react';
import { getGalaxy } from 'shared/apis';
import { useGalaxyStore, useToastStore, useCustomStore } from 'shared/store';
import { Toast } from 'shared/ui';
import {
	SPIRAL,
	GALAXY_THICKNESS,
	SPIRAL_START,
	ARMS_Z_DIST,
} from 'widgets/galaxy/lib/constants';
import useCheckNickName from 'shared/hooks/useCheckNickName';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import UnderBar from 'widgets/underBar/UnderBar';
import UpperBar from 'widgets/upperBar/UpperBar';

export default function Home() {
	const [isSwitching, setIsSwitching] = useState(false);
	const { text, type } = useToastStore();
	const { nickName } = useCheckNickName();

	const handleFullScreen = useFullScreenHandle();

	const { setSpiral, setStart, setThickness, setZDist } = useGalaxyStore();
	const custom = useCustomStore();

	useEffect(() => {
		setIsSwitching(true);

		if (nickName === '') return;
		getGalaxy(nickName).then((res) => {
			if (!res.spiral) setSpiral(SPIRAL);
			else {
				setSpiral(res.spiral);
				custom.setSpiral(res.spiral);
			}

			if (!res.start) setStart(SPIRAL_START);
			else {
				setStart(res.start);
				custom.setStart(res.start);
			}

			if (!res.thickness) setThickness(GALAXY_THICKNESS);
			else {
				setThickness(res.thickness);
				custom.setThickness(res.thickness);
			}

			if (!res.zDist) setZDist(ARMS_Z_DIST);
			else {
				setZDist(res.zDist);
				custom.setZDist(res.zDist);
			}
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

			{isSwitching && <WarpScreen setIsSwitching={setIsSwitching} />}
			{!isSwitching && <FadeoutScreen />}
			{text && <Toast type={type}>{text}</Toast>}

			<UpperBar />
			<UnderBar />

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
