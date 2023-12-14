import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { theme } from 'shared/styles';
import { WarpStateType } from 'shared/lib';
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
import BrightSphere from './ui/BrightSphere';
import SpaceWarp from './ui/SpaceWarp';

interface PropsType {
	isSwitching: WarpStateType;
	setIsSwitching: React.Dispatch<React.SetStateAction<WarpStateType>>;
}

export default function WarpScreen({ isSwitching, setIsSwitching }: PropsType) {
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
		backgroundColor: theme.colors.background.bdp04,
	};

	if (isSwitching === 'end') return null;

	if (isSwitching === 'fade')
		return <FadeoutScreen onAnimationEnd={() => setIsSwitching('end')} />;

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
