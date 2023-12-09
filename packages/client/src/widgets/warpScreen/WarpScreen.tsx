import { Canvas } from '@react-three/fiber';
import {
	AMBIENT_LIGHT_INTENSITY,
	BLOOM_INTENSITY,
	BLOOM_LUMINANCE_SMOOTHING,
	BLOOM_LUMINANCE_THRESHOLD,
	BLOOM_MIMPAP_BLUR,
	SPACE_WARP_CAMERA_FAR,
	SPACE_WARP_CAMERA_POSITION,
	SPACE_WARP_CAMERA_UP,
} from './lib/constants';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import SpaceWarp from './ui/SpaceWarp';
import BrightSphere from './ui/BrightSphere';

interface PropsType {
	setIsSwitching: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WarpScreen({ setIsSwitching }: PropsType) {
	const camera = {
		position: SPACE_WARP_CAMERA_POSITION,
		up: SPACE_WARP_CAMERA_UP,
		far: SPACE_WARP_CAMERA_FAR,
	};

	const canvasStyle: React.CSSProperties = {
		position: 'absolute',
		height: '100vh',
		width: '100vw',
		zIndex: 999,
		backgroundColor: '#000000',
	};

	return (
		<Canvas camera={camera} style={canvasStyle}>
			<EffectComposer>
				<Bloom
					intensity={BLOOM_INTENSITY}
					mipmapBlur={BLOOM_MIMPAP_BLUR}
					luminanceThreshold={BLOOM_LUMINANCE_THRESHOLD}
					luminanceSmoothing={BLOOM_LUMINANCE_SMOOTHING}
				/>
			</EffectComposer>

			<ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />

			<BrightSphere />
			<SpaceWarp setIsSwitching={setIsSwitching} />
		</Canvas>
	);
}
