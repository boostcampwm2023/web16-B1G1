import { useRef } from 'react';
import * as THREE from 'three';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { DIST_LIMIT } from 'constants/star';
import { useCameraStore } from 'store/useCameraStore';

interface PropsType {
	position: THREE.Vector3;
	size: number;
	color: string;
}

export default function Star({ position, size, color }: PropsType) {
	const meshRef = useRef<THREE.Mesh>(null!);
	const { targetView, setTargetView } = useCameraStore();

	useFrame((state) => {
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

	const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation();

		if (meshRef.current !== targetView) {
			setTargetView(meshRef.current);
			return;
		}

		setTargetView(null);
	};

	return (
		<mesh ref={meshRef} position={position} onClick={(e) => handleMeshClick(e)}>
			<sphereGeometry args={[size, 32, 16]} />
			<meshStandardMaterial
				color={color}
				emissive={color}
				emissiveIntensity={2}
			/>
		</mesh>
	);
}
