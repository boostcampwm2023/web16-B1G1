import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { DISTANCE_LIMIT } from '../constants';
import { getSpiralPositions, getSpherePositions } from '.';
import { useGalaxyStore, useCustomStore } from 'shared/store';

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
	const { density, zDist, thickness, spiral, start } = isCustom
		? useCustomStore()
		: useGalaxyStore();

	useEffect(() => {
		const arms = count * density;
		const center = count - arms;
		let index = 0;

		for (let i = 0; i < arms; i++) {
			tempObject.position.copy(
				getSpiralPositions({
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
			tempObject.position.copy(getSpherePositions(thickness));
			tempObject.updateMatrix();
			instancedMeshRef.current.setMatrixAt(index++, tempObject.matrix);
		}
		instancedMeshRef.current.instanceMatrix.needsUpdate = true;
	}, []);

	useFrame(({ camera: { position } }) => {
		const cameraDistance = new THREE.Vector3(0, 0, 0).distanceTo(position);
		const scale = cameraDistance / DISTANCE_LIMIT;
		let index = 0;

		for (let arm = 0; arm < instancedMeshRef.current.count; arm++) {
			const tempMatrix = new THREE.Matrix4();

			instancedMeshRef.current.getMatrixAt(index, tempMatrix);
			tempObject.position.setFromMatrixPosition(tempMatrix);
			tempObject.scale.set(scale, scale, scale);
			tempObject.updateMatrix();
			instancedMeshRef.current.setMatrixAt(index++, tempObject.matrix);
		}
		instancedMeshRef.current.instanceMatrix.needsUpdate = true;
	});

	return (
		<instancedMesh ref={instancedMeshRef} args={[geometry, material, count]} />
	);
}
