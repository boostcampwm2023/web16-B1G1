import { Canvas } from '@react-three/fiber';
import BackgroundStars from 'features/backgroundStars/BackgroundStars.tsx';
import { Galaxy } from '../galaxy/index.ts';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { CAMERA_POSITION, CAMERA_UP, CAMERA_FAR } from './lib/camera.ts';

interface PropsType {
	mousePosition: number[];
}

export default function LandingScreen({
	mousePosition: [mouseX, mouseY],
}: PropsType) {
	const camera = {
		position: CAMERA_POSITION,
		up: CAMERA_UP,
		far: CAMERA_FAR,
	};

	return (
		<div style={{ height: '100vh', width: '100vw' }}>
			<Canvas camera={camera}>
				<EffectComposer>
					<Bloom
						intensity={0.4}
						mipmapBlur={false}
						luminanceThreshold={0.9}
						luminanceSmoothing={0.025}
					/>
				</EffectComposer>

				<color attach="background" args={['#070614']} />
				<ambientLight color="#fff" intensity={5} />
				<BackgroundStars />
				<group rotation={[(mouseY - 0.5) / 5, (mouseX - 0.5) / 5, 0]}>
					<Galaxy />
				</group>
			</Canvas>
		</div>
	);
}
