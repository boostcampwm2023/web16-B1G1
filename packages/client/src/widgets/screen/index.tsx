import { Canvas } from '@react-three/fiber';
import BackgroundStars from 'features/backgroundStars';
import { Galaxy } from '../galaxy';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';
import { CAMERA_POSITION, CAMERA_FAR } from '@constants';
import Controls from 'features/controls/Controls.tsx';
import { useCameraStore } from 'shared/store/useCameraStore.ts';
import { Posts } from 'entities/posts';
import styled from '@emotion/styled';
import { useViewStore } from 'shared/store';

export default function Screen() {
	const { view } = useViewStore();
	const camera = {
		position: CAMERA_POSITION,
		far: CAMERA_FAR,
	};

	const { cameraToCurrentView, setCameraToCurrentView } = useCameraStore();

	const { intensity, mipmapBlur } = useControls('Bloom', {
		intensity: { value: 0.4, min: 0, max: 1.5, step: 0.01 },
		mipmapBlur: { value: false },
	});
	const { wheelSpeed } = useControls('Controls', {
		wheelSpeed: { value: 3, min: 0.1, max: 30, step: 0.1 },
	});

	return (
		<div style={{ height: '100vh', width: '100vw' }}>
			<Canvas
				camera={camera}
				onWheel={(e) =>
					setCameraToCurrentView(cameraToCurrentView + e.deltaY * wheelSpeed)
				}
			>
				<EffectComposer>
					<Bloom
						intensity={intensity}
						mipmapBlur={mipmapBlur}
						luminanceThreshold={0.9}
						luminanceSmoothing={0.025}
					/>
				</EffectComposer>

				<color attach="background" args={['#070614']} />
				<ambientLight color="#fff" intensity={5} />
				<Controls />
				<BackgroundStars />
				<Galaxy />
				<Posts />
			</Canvas>
			<LevaWrapper>
				<Leva fill collapsed hidden={view !== 'MAIN'} />
			</LevaWrapper>
		</div>
	);
}

const LevaWrapper = styled.div`
	position: absolute;
	top: 5%;
	right: 50%;
	transform: translateX(50%);
	z-index: 100;
`;
