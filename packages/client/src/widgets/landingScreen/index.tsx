import { Canvas } from '@react-three/fiber';
import BackgroundStars from 'features/backgroundStars';
import Galaxy from '../galaxy/index.tsx';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useControls } from 'leva';
import { useCameraStore } from 'shared/store/useCameraStore.ts';
import * as THREE from 'three';

export default function LandingScreen() {
	const camera = {
		position: new THREE.Vector3(4000, 8000, 16000),
		up: new THREE.Vector3(0, 1, 0.8),
		far: 500000,
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
				{/* <Controls /> */}
				<BackgroundStars />
				<Galaxy />
			</Canvas>
		</div>
	);
}
