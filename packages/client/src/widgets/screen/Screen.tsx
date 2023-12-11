import { Canvas } from '@react-three/fiber';
import BackgroundStars from 'features/backgroundStars/BackgroundStars';
import { Galaxy } from '../galaxy';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';
import { CAMERA_POSITION, CAMERA_FAR } from '@constants';
import Controls from 'features/controls/Controls.tsx';
import { useCameraStore } from 'shared/store/useCameraStore.ts';
import { Posts } from 'entities/posts';
import styled from '@emotion/styled';
import { useViewStore } from 'shared/store';
import { CameraLight, LevaTheme } from './ui';
import { useState } from 'react';
import { PerformanceMonitor } from '@react-three/drei';

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

				<color attach="background" args={['#070614']} />
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
