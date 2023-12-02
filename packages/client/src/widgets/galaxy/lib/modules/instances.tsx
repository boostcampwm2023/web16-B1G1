import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { DISTANCE_LIMIT, ARMS } from '../constants';
import { getSpiralPositions, getSpherePositions } from '.';

interface PropsType {
	count: number;
	size: number;
	color: number;
}

export default function Instances({ count, size, color }: PropsType) {
	const instancedMeshRef = useRef<THREE.InstancedMesh>(null!);
	const geometry = new THREE.SphereGeometry(size * 5, 16, 8);
	const material = new THREE.MeshStandardMaterial({
		color: color,
		emissive: color,
		emissiveIntensity: 2,
	});
	const tempObject = new THREE.Object3D();

	useEffect(() => {
		const center = count / 5;
		const arms = count - center;
		let index = 0;

		for (let arm = 0; arm < ARMS; arm++) {
			for (let star = 0; star < arms / (ARMS + 1); star++) {
				tempObject.position.copy(
					getSpiralPositions(((2 * Math.PI) / ARMS) * arm),
				);
				tempObject.updateMatrix();
				instancedMeshRef.current.setMatrixAt(index++, tempObject.matrix);
			}
		}
		for (let i = 0; i < center; i++) {
			tempObject.position.copy(getSpherePositions());
			tempObject.updateMatrix();
			instancedMeshRef.current.setMatrixAt(index++, tempObject.matrix);
		}
		instancedMeshRef.current.instanceMatrix.needsUpdate = true;
	});

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
