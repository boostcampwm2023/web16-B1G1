import { getRandomFloat, getGaussianRandomFloat } from '@utils/random';
import * as THREE from 'three';
import { ARMS_X_DIST } from '../constants';

interface GalaxyInfo {
	z_dist: number;
	thickness: number;
	spiral: number;
	spiral_start: number;
}

export const getSpiralPositions = ({
	z_dist,
	thickness,
	spiral,
	spiral_start,
}: GalaxyInfo) => {
	const x = getGaussianRandomFloat(0, ARMS_X_DIST);
	const y = getGaussianRandomFloat(0, thickness);
	const z = getGaussianRandomFloat(0, z_dist);
	const r = Math.sqrt(x ** 2 + z ** 2);
	if (r < spiral_start) return new THREE.Vector3(x, y, z);

	const theta = Math.log(r / spiral_start) * spiral * -Math.PI;
	const yAxis = new THREE.Vector3(0, 1, 0);

	return new THREE.Vector3(x, y, z).applyAxisAngle(yAxis, theta);
};

export const getSpherePositions = (thickness: number) => {
	const x = getRandomFloat(0, Math.PI * 2);
	const y = getGaussianRandomFloat(0, Math.PI / 5);
	const r = getGaussianRandomFloat(0, 1);

	return new THREE.Vector3(
		r * Math.sin(x) * Math.cos(y) * ARMS_X_DIST,
		r * Math.sin(y) * thickness * 4,
		r * Math.cos(x) * Math.cos(y) * ARMS_X_DIST,
	);
};
