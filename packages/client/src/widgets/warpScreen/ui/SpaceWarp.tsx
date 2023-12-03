import { useFrame } from '@react-three/fiber';
import { getRandomFloat, getRandomInt } from '@utils/random';
import { useState, useMemo } from 'react';
import * as THREE from 'three';
import {
	SPACE_WARP_LINES_NUM,
	SPACE_WARP_LINE_LENGTH,
	SPACE_WARP_XZ_MAX,
	SPACE_WARP_XZ_MIN,
	SPACE_WARP_Y_MAX,
	SPACE_WARP_Y_MIN,
} from '../lib/constants';
import { BACKGROUND_STAR_COLORS } from 'features/backgroundStars/lib/constants';
import { useEffect } from 'react';
import { useScreenSwitchStore } from 'shared/store/useScreenSwitchStore';

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
	const [lerpFactor, setLerpFactor] = useState(0);
	const [isWarpEnd, setIsWarpEnd] = useState(false);

	const [positions, colors] = useMemo(() => geSpaceWarpLinesInfo(), []);

	const { setIsSwitching } = useScreenSwitchStore();

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
			setLerpFactor((prev) => prev + 0.03);
			return;
		}

		if (state.camera.position.y > 0) state.camera.position.y -= 700;
	});

	useEffect(() => {
		if (lerpFactor < 1) return;
		setIsSwitching(false);
	}, [lerpFactor]);

	if (isWarpEnd) return null;

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
