import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { DIST_LIMIT } from 'constants/star';

interface PropsType {
	position: THREE.Vector3;
	size: number;
	color: string;
}

export default function Star({ position, size, color }: PropsType) {
	const meshRef = useRef<THREE.Mesh>(null!);

	useFrame((state, delta) => {
		const cameraDistance = new THREE.Vector3(0, 0, 0).distanceTo(
			state.camera.position,
		);
		const scale = cameraDistance / DIST_LIMIT;

		if (cameraDistance > DIST_LIMIT) {
			meshRef.current.scale.x = scale;
			meshRef.current.scale.y = scale;
			meshRef.current.scale.z = scale;
		}
	});

	return (
		<mesh ref={meshRef} position={position}>
			<sphereGeometry args={[size, 32, 16]} />
			<meshStandardMaterial
				color={color}
				emissive={color}
				emissiveIntensity={2}
			/>
		</mesh>
	);
}
