import { useFrame } from '@react-three/fiber';
import { getRandomFloat, getRandomInt } from '@utils/random';
import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
	SPACE_WARP_LINES_NUM,
	SPACE_WARP_LINE_COLORS,
	SPACE_WARP_LINE_LENGTH,
	SPACE_WARP_XZ_MAX,
	SPACE_WARP_XZ_MIN,
	SPACE_WARP_Y_MAX,
	SPACE_WARP_Y_MIN,
} from '../lib/constants';

const geSpaceWarpLinesInfo = () => {
	const positions = Array.from({ length: SPACE_WARP_LINES_NUM }, () => {
		const x = getRandomFloat(SPACE_WARP_XZ_MIN, SPACE_WARP_XZ_MAX);
		const y = getRandomFloat(SPACE_WARP_Y_MIN, SPACE_WARP_Y_MAX);
		const z = getRandomFloat(SPACE_WARP_XZ_MIN, SPACE_WARP_XZ_MAX);

		return [x, y, z, x, y - SPACE_WARP_LINE_LENGTH, z];
	}).flat();

	const colors = Array.from({ length: SPACE_WARP_LINES_NUM }, () => {
		const color = new THREE.Color(
			SPACE_WARP_LINE_COLORS[getRandomInt(0, SPACE_WARP_LINE_COLORS.length)],
		);

		return [color.r, color.g, color.b];
	}).flat();

	return [new Float32Array(positions), new Float32Array(colors)];
};

interface PropsType {
	setIsSwitching: React.Dispatch<React.SetStateAction<'warp' | 'fade' | 'end'>>;
}

export default function SpaceWarp({ setIsSwitching }: PropsType) {
	const [positions, colors] = useMemo(() => geSpaceWarpLinesInfo(), []);

	useFrame((state, delta) => {
		if (state.camera.position.y <= 0) {
			state.scene.background = new THREE.Color(0xffffff);
			setIsSwitching('fade');
			return;
		}
		state.camera.position.y -= 75000 * delta;
	});

	return (
		<lineSegments>
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
