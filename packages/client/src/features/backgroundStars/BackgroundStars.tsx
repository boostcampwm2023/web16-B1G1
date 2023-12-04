import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { getRandomInt, getRandomFloat } from '@utils/random';
import * as THREE from 'three';
import {
	BACKGROUND_STARS_NUM,
	BACKGROUND_STAR_COLORS,
	BACKGROUND_STAR_SIZE,
} from './lib/constants';
import { DIMENSION, SPACE_MAX_SIZE, SPACE_MIN_SIZE } from '@constants';

const getBackgroundStarsInfo = () => {
	const positions = Array.from(
		{ length: BACKGROUND_STARS_NUM * DIMENSION },
		() => getRandomFloat(SPACE_MIN_SIZE, SPACE_MAX_SIZE),
	);

	const colors = Array.from({ length: BACKGROUND_STARS_NUM }, () => {
		const color = new THREE.Color(
			BACKGROUND_STAR_COLORS[getRandomInt(0, BACKGROUND_STAR_COLORS.length)],
		);

		return [color.r, color.g, color.b];
	}).flat();

	return [new Float32Array(positions), new Float32Array(colors)];
};

export default function BackgroundStars() {
	const pointsRef = useRef<THREE.Points>(null!);

	const [positions, colors] = useMemo(() => getBackgroundStarsInfo(), []);

	useFrame((_, delta) => (pointsRef.current.rotation.y += delta / 150));

	return (
		<points ref={pointsRef}>
			<bufferGeometry attach="geometry">
				<bufferAttribute
					attach="attributes-position"
					count={BACKGROUND_STARS_NUM}
					array={positions}
					itemSize={3}
				/>
				<bufferAttribute
					attach="attributes-color"
					count={BACKGROUND_STARS_NUM}
					array={colors}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial
				attach="material"
				size={BACKGROUND_STAR_SIZE}
				vertexColors={true}
				sizeAttenuation={false}
			/>
		</points>
	);
}
