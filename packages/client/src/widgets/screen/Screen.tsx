import { CAMERA_FAR, CAMERA_POSITION } from '@constants';
import styled from '@emotion/styled';
import { PerformanceMonitor } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Posts } from 'entities';
import { BackgroundStars, Controls } from 'features';
import { Leva, useControls } from 'leva';
import { useState } from 'react';
import { useViewStore, useCameraStore } from 'shared/store';
import { Galaxy } from 'widgets/galaxy';
import { CameraLight, LevaTheme } from './ui';
import { theme } from 'shared/styles';

export default function Screen() {
	const { view } = useViewStore();
	const camera = {
		position: CAMERA_POSITION,
		far: CAMERA_FAR,
	};

	const { cameraToCurrentView, setCameraToCurrentView } = useCameraStore();

	const { 밝기, 블러효과 } = useControls('별 속성', {
		밝기: { value: 0.4, min: 0, max: 1.5, step: 0.01 },
		블러효과: { value: false },
	});
	const { 휠속도 } = useControls('컨트롤', {
		휠속도: { value: 3, min: 0.1, max: 30, step: 0.1 },
	});

	const [dpr, setDpr] = useState(1);

	return (
		<div style={{ height: '100vh', width: '100vw' }}>
			<Canvas
				dpr={dpr}
				camera={camera}
				onWheel={(e) =>
					setCameraToCurrentView(cameraToCurrentView + e.deltaY * 휠속도)
				}
			>
				<PerformanceMonitor
					onChange={({ factor }) => {
						setDpr(0.5 + factor / 2);
					}}
				/>
				<EffectComposer>
					<Bloom
						intensity={밝기}
						mipmapBlur={블러효과}
						luminanceThreshold={0.9}
						luminanceSmoothing={0.025}
					/>
				</EffectComposer>

				<color attach="background" args={[theme.colors.background.bdp04]} />
				<ambientLight color="#fff" intensity={1} />
				<Controls />
				<BackgroundStars />
				<Galaxy>
					<Posts />
				</Galaxy>
				<CameraLight />
			</Canvas>
			<LevaWrapper className="leva">
				<Leva
					fill
					collapsed
					hideCopyButton
					hidden={view !== 'MAIN' && view !== 'DETAIL'}
					theme={LevaTheme}
					titleBar={{ filter: false }}
				/>
			</LevaWrapper>
		</div>
	);
}

const LevaWrapper = styled.div`
	position: absolute;
	top: 37px;
	right: 50%;
	transform: translateX(50%);
	z-index: 100;
`;
