import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface PropsType {
	position: THREE.Vector3;
	size: number;
	color: string;
}

export default function Star({ position, size, color }: PropsType) {
	const meshRef = useRef<THREE.Mesh>(null!);

	return (
		<mesh ref={meshRef} position={position}>
			<sphereGeometry args={[size, 32, 16]} />
			<meshStandardMaterial
				color={color}
				emissive={color}
				emissiveIntensity={2}
				toneMapped={false}
			/>
		</mesh>
	);
}
