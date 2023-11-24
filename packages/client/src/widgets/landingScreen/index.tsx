import { Canvas } from '@react-three/fiber';
import BackgroundStars from 'features/backgroundStars';
import Galaxy from '../galaxy/index.tsx';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useControls } from 'leva';
import { useCameraStore } from 'shared/store/useCameraStore.ts';
import { CAMERA_POSITION, CAMERA_UP, CAMERA_FAR } from './lib/camera.ts';

interface PropsType {
	mousePosition: number[];
}

export default function LandingScreen({ mousePosition }: PropsType) {
	const camera = {
		position: CAMERA_POSITION,
		up: CAMERA_UP,
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
				<BackgroundStars />
				<Galaxy
					rotation={[
						(mousePosition[1] - 0.5) / 5,
						(mousePosition[0] - 0.5) / 5,
						0,
					]}
				/>
			</Canvas>
		</div>
	);
}
