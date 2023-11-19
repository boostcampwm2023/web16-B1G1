import { getRandomFloat, getRandomInt } from '@utils/random';
import { BACKGROUND_STAR_COLORS } from 'constants/backgroundStars';
import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
	SPACE_WARP_LINES_NUM,
	SPACE_WARP_LINE_LENGTH,
	SPACE_WARP_XZ_MAX,
	SPACE_WARP_XZ_MIN,
	SPACE_WARP_Y_MAX,
	SPACE_WARP_Y_MIN,
} from 'constants/spaceWarp';

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

export default function SpaceWarp() {
	const linesRef = useRef<THREE.LineSegments>(null!);

	const [positions, colors] = useMemo(() => geSpaceWarpLinesInfo(), []);

	useThree().camera.position.set(0, 100000, 0);

	useFrame((state) => {
		state.camera.position.y -= 250;
		state.camera.lookAt(0, -500000, 0);
	});

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
}
