import * as THREE from 'three';
import Star from '../Star';
import { getRandomInt, getGaussianRandomFloat } from '@utils/random';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
	ARMS,
	STARS_NUM,
	STAR_MIN_SIZE,
	STAR_MAX_SIZE,
	ARMS_X_MEAN,
	ARMS_X_DIST,
	ARMS_Z_MEAN,
	ARMS_Z_DIST,
	GALAXY_THICKNESS,
	SPIRAL,
} from 'constants/galaxy';

const getSpiralPositions = (offset: number) => {
	const x = getGaussianRandomFloat(ARMS_X_MEAN, ARMS_X_DIST);
	const y = getGaussianRandomFloat(0, GALAXY_THICKNESS);
	const z = getGaussianRandomFloat(ARMS_Z_MEAN, ARMS_Z_DIST);
	const r = Math.sqrt(x ** 2 + z ** 2);
	let theta = offset;

	theta += x > 0 ? Math.atan(z / x) : Math.atan(z / x) + Math.PI;
	theta += (r / ARMS_X_DIST) * SPIRAL;

	return new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta));
};

export default function Galaxy() {
	const galaxyRef = useRef<THREE.Group>(null!);
	const stars = [];

	useFrame((_, delta) => (galaxyRef.current.rotation.y += delta / 100));

	for (let arm = 0; arm < ARMS; arm++) {
		for (let star = 0; star < STARS_NUM / (ARMS + 1); star++) {
			const size = getRandomInt(STAR_MIN_SIZE, STAR_MAX_SIZE);
			const position = getSpiralPositions((arm * 2 * Math.PI) / ARMS);

			stars.push(<Star position={position} size={size} color={'#FFF'} />);
		}
	}

	for (let star = 0; star < STARS_NUM / (ARMS + 1); star++) {
		const size = getRandomInt(STAR_MIN_SIZE, STAR_MAX_SIZE);
		const position = new THREE.Vector3(
			getGaussianRandomFloat(0, (ARMS_X_MEAN + ARMS_X_DIST) / 4),
			getGaussianRandomFloat(0, GALAXY_THICKNESS * 2),
			getGaussianRandomFloat(0, (ARMS_X_MEAN + ARMS_X_DIST) / 4),
		);

		stars.push(<Star position={position} size={size} color={'#FFF'} />);
	}

	return <group ref={galaxyRef}>{stars}</group>;
}
