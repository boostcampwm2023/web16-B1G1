import { Canvas } from '@react-three/fiber';
import BackgroundStars from '../BackgroundStars';
import { OrbitControls } from '@react-three/drei';

export default function Screen() {
	type Vector3 = [number, number, number];

	const CAMERA_POSITION: Vector3 = [0, 2000, 2000];
	const CAMERA_ROTATION: Vector3 = [-0.5, 0, 0];
	const CAMERA_FAR = 100000;

	const camera = {
		position: CAMERA_POSITION,
		rotation: CAMERA_ROTATION,
		far: CAMERA_FAR,
	};

	return (
		<div style={{ height: '100vh', width: '100vw' }}>
			<Canvas camera={camera}>
				<color attach="background" args={['black']} />
				<ambientLight color="#ffffff" intensity={5} />
				<BackgroundStars />

				<axesHelper args={[20000]} />
				<OrbitControls />
			</Canvas>
		</div>
	);
}
