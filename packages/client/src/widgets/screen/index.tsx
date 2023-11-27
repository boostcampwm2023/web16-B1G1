import { Canvas } from '@react-three/fiber';
import BackgroundStars from 'features/backgroundStars';
import { Galaxy } from '../galaxy';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useControls } from 'leva';
import { CAMERA_POSITION, CAMERA_FAR } from '@constants';
import Controls from 'features/controls/Controls.tsx';
import { useCameraStore } from 'shared/store/useCameraStore.ts';
import { Posts } from 'entities/posts/index.ts';

export default function Screen() {
	const camera = {
		position: CAMERA_POSITION,
		far: CAMERA_FAR,
	};

	const { cameraToCurrentView, setCameraToCurrentView } = useCameraStore();

	const { intensity, mipmapBlur, luminanceThreshold, luminanceSmoothing } =
		useControls('Bloom', {
			intensity: { value: 0.4, min: 0, max: 1.5, step: 0.01 },
			mipmapBlur: { value: false },
			luminanceThreshold: { value: 0.9, min: 0, max: 1, step: 0.01 },
			luminanceSmoothing: { value: 0.025, min: 0, max: 2, step: 0.01 },
		});

	return (
		<div style={{ height: '100vh', width: '100vw' }}>
			<Canvas
				camera={camera}
				onWheel={(e) =>
					setCameraToCurrentView(cameraToCurrentView + e.deltaY / 5)
				}
			>
				<EffectComposer>
					<Bloom
						intensity={intensity}
						mipmapBlur={mipmapBlur}
						luminanceThreshold={luminanceThreshold}
						luminanceSmoothing={luminanceSmoothing}
					/>
				</EffectComposer>

				<color attach="background" args={['#000']} />
				<ambientLight color="#fff" intensity={5} />
				<Controls />
				<BackgroundStars />
				<Galaxy />
				<Posts />
			</Canvas>
		</div>
	);
}
