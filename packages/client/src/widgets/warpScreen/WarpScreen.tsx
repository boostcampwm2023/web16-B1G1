import { getRandomInt, getRandomFloat } from '@utils/random';
import { BACKGROUND_STAR_COLORS } from 'features/backgroundStars/lib/constants'; //나중에 처리 필요
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
	SPACE_WARP_CAMERA_FAR,
	SPACE_WARP_CAMERA_POSITION,
	SPACE_WARP_CAMERA_UP,
	SPACE_WARP_LINES_NUM,
	SPACE_WARP_LINE_LENGTH,
	SPACE_WARP_XZ_MAX,
	SPACE_WARP_XZ_MIN,
	SPACE_WARP_Y_MAX,
	SPACE_WARP_Y_MIN,
} from './lib/constants';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useState } from 'react';

const geSpaceWarpLinesInfo = () => {
	const positions = Array.from({ length: SPACE_WARP_LINES_NUM }, () => {
		const x = getRandomFloat(SPACE_WARP_XZ_MIN, SPACE_WARP_XZ_MAX);
		const y = getRandomFloat(SPACE_WARP_Y_MIN, SPACE_WARP_Y_MAX);
		const z = getRandomFloat(SPACE_WARP_XZ_MIN, SPACE_WARP_XZ_MAX);

		return [x, y, z, x, y - SPACE_WARP_LINE_LENGTH, z];
	}).flat();

	const colors = Array.from({ length: SPACE_WARP_LINES_NUM }, () => {
		const color = new THREE.Color(
			BACKGROUND_STAR_COLORS[getRandomInt(0, BACKGROUND_STAR_COLORS.length)],
		);

		return [color.r, color.g, color.b];
	}).flat();

	return [new Float32Array(positions), new Float32Array(colors)];
};

const SpaceWarp = () => {
	const linesRef = useRef<THREE.LineSegments>(null!);

	const [lerpFactor, setLerpFactor] = useState(0);
	const [isWarpEnd, setIsWarpEnd] = useState(false);

	const [positions, colors] = useMemo(() => geSpaceWarpLinesInfo(), []);

	useFrame((state) => {
		if (state.camera.position.y < 0 && !isWarpEnd) {
			state.scene.background = new THREE.Color(0xffffff);
			setIsWarpEnd(true);
			return;
		}

		if (
			isWarpEnd &&
			lerpFactor <= 1 &&
			state.scene.background instanceof THREE.Color
		) {
			state.scene.background.lerp(new THREE.Color(0x000000), lerpFactor);
			setLerpFactor((prev) => prev + 0.01);
			return;
		}

		if (state.camera.position.y > 0) state.camera.position.y -= 280;
	});

	if (isWarpEnd) return null;

	return (
		<lineSegments ref={linesRef}>
			<bufferGeometry attach="geometry">
				<bufferAttribute
					attach="attributes-position"
					count={SPACE_WARP_LINES_NUM}
					array={positions}
					itemSize={3}
				/>
				<bufferAttribute
					attach="attributes-color"
					count={SPACE_WARP_LINES_NUM}
					array={colors}
					itemSize={3}
				/>
			</bufferGeometry>
			<lineBasicMaterial attach="material" vertexColors={true} />
		</lineSegments>
	);
};

const BrightSphere = () => {
	const sphereRef = useRef<THREE.Mesh>(null!);

	return (
		<mesh ref={sphereRef} position={[0, 0, 0]}>
			<sphereGeometry attach="geometry" args={[600, 32, 32]} />
			<meshStandardMaterial attach="material" color="white" />
		</mesh>
	);
};

export default function WarpScreen() {
	const camera = {
		position: SPACE_WARP_CAMERA_POSITION,
		up: SPACE_WARP_CAMERA_UP,
		far: SPACE_WARP_CAMERA_FAR,
	};

	return (
		<Canvas
			camera={camera}
			style={{
				height: '100vh',
				width: '100vw',
				background: '#000',
				position: 'absolute',

				zIndex: 999,
			}}
		>
			<EffectComposer>
				<Bloom
					intensity={2}
					mipmapBlur={true}
					luminanceThreshold={1}
					luminanceSmoothing={0.1}
				/>
			</EffectComposer>
			<ambientLight intensity={10} />
			<BrightSphere />
			<SpaceWarp />
		</Canvas>
	);
}
