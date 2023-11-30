import { getRandomFloat, getGaussianRandomFloat } from '@utils/random';
import * as THREE from 'three';
import {
	ARMS_X_MEAN,
	ARMS_X_DIST,
	ARMS_Z_MEAN,
	ARMS_Z_DIST,
	GALAXY_THICKNESS,
	SPIRAL,
} from '../constants';

export const getSpiralPositions = (offset: number) => {
	const x = getGaussianRandomFloat(ARMS_X_MEAN, ARMS_X_DIST);
	const y = getGaussianRandomFloat(0, GALAXY_THICKNESS);
	const z = getGaussianRandomFloat(ARMS_Z_MEAN, ARMS_Z_DIST);
	const r = Math.sqrt(x ** 2 + z ** 2);
	let theta = offset;

	theta += x > 0 ? Math.atan(z / x) : Math.atan(z / x) + Math.PI;
	theta += (r / ARMS_X_DIST) * SPIRAL;

	return new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta));
};

// export const getSpiralPositions = () => {
// 	const x = getGaussianRandomFloat(0, ARMS_X_DIST);
// 	const y = getGaussianRandomFloat(0, GALAXY_THICKNESS);
// 	const z = getGaussianRandomFloat(0, ARMS_Z_DIST);
// 	const r = Math.sqrt(x ** 2 + z ** 2);
// 	if (r < SPIRAL_START) return new THREE.Vector3(x, y, z);

// 	const theta = Math.log(r / SPIRAL_START) * SPIRAL * -Math.PI;
// 	const yAxis = new THREE.Vector3(0, 1, 0);

// 	return new THREE.Vector3(x, y, z).applyAxisAngle(yAxis, theta);
// };

export const getSpherePositions = () => {
	const x = getRandomFloat(0, Math.PI * 2);
	const y = getGaussianRandomFloat(0, Math.PI / 5);
	const r = getGaussianRandomFloat(0, 1);

	return new THREE.Vector3(
		r * Math.sin(x) * Math.cos(y) * ARMS_X_DIST,
		r * Math.sin(y) * GALAXY_THICKNESS * 4,
		r * Math.cos(x) * Math.cos(y) * ARMS_X_DIST,
	);
};
