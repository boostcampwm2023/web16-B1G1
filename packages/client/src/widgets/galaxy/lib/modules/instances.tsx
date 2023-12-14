import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { useCustomStore, useGalaxyStore } from 'shared/store';
import * as THREE from 'three';
import {
	getSpherePositions,
	getSpiralPositions,
	setSpherePositions,
	setSpiralPositions,
} from '.';
import { DISTANCE_LIMIT, STARS_DENSITY } from '../constants';

interface PropsType {
	count: number;
	size: number;
	color: number;
	isCustom: boolean;
}

export default function Instances({ count, size, color, isCustom }: PropsType) {
	const instancedMeshRef = useRef<THREE.InstancedMesh>(null!);
	const geometry = new THREE.SphereGeometry(size * 5, 16, 8);
	const material = new THREE.MeshStandardMaterial({
		color: color,
		emissive: color,
		emissiveIntensity: 2,
	});
	const tempObject = new THREE.Object3D();
	const { zDist, thickness, spiral, start } = isCustom
		? useCustomStore()
		: useGalaxyStore();
	const arms = count * STARS_DENSITY;
	const center = count - arms;

	const [spiralPositions, spherePositions] = useMemo(() => {
		const spirals = [];
		const spheres = [];
		for (let i = 0; i < arms; i++) {
			const position = getSpiralPositions();
			spirals.push(position);
		}
		for (let i = 0; i < center; i++) {
			const position = getSpherePositions();
			spheres.push(position);
		}
		return [spirals, spheres];
	}, []);

	useEffect(() => {
		let index = 0;

		for (let i = 0; i < arms; i++) {
			tempObject.position.copy(
				setSpiralPositions({
					position: spiralPositions[i],
					z_dist: zDist,
					thickness: thickness,
					spiral: spiral,
					spiral_start: start,
				}),
			);
			tempObject.updateMatrix();
			instancedMeshRef.current.setMatrixAt(index++, tempObject.matrix);
		}
		for (let i = 0; i < center; i++) {
			tempObject.position.copy(
				setSpherePositions(spherePositions[i], thickness),
			);
			tempObject.updateMatrix();
			instancedMeshRef.current.setMatrixAt(index++, tempObject.matrix);
		}
		instancedMeshRef.current.instanceMatrix.needsUpdate = true;
	}, [zDist, thickness, spiral, start]);

	useFrame(({ camera: { position } }) => {
		const cameraDistance = new THREE.Vector3(0, 0, 0).distanceTo(position);
		const scale = cameraDistance / DISTANCE_LIMIT;
		let index = 0;

		for (let arm = 0; arm < instancedMeshRef.current.count; arm++) {
			const tempMatrix = new THREE.Matrix4();

			instancedMeshRef.current.getMatrixAt(index, tempMatrix);
			tempObject.position.setFromMatrixPosition(tempMatrix);
			if (scale > 0.5) tempObject.scale.set(scale, scale, scale);
			tempObject.updateMatrix();
			instancedMeshRef.current.setMatrixAt(index++, tempObject.matrix);
		}
		instancedMeshRef.current.instanceMatrix.needsUpdate = true;
	});

	return (
		<instancedMesh ref={instancedMeshRef} args={[geometry, material, count]} />
	);
}
