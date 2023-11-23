import { forwardRef } from 'react';
import * as THREE from 'three';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { DISTANCE_LIMIT } from './lib/constants';
import { useForwardRef } from 'shared/hooks';

interface PropsType {
	children?: React.ReactNode;
	onClick?: (e: ThreeEvent<MouseEvent>) => void;
	position: THREE.Vector3;
	size: number;
	color: string;
}

const Star = forwardRef<THREE.Mesh, PropsType>((props, ref) => {
	const innerRef = useForwardRef(ref);

	useFrame((state) => {
		const cameraDistance = innerRef.current.position.distanceTo(
			state.camera.position,
		);
		const scale = cameraDistance / DISTANCE_LIMIT;

		if (cameraDistance > DISTANCE_LIMIT) {
			innerRef.current!.scale.x = scale;
			innerRef.current!.scale.y = scale;
			innerRef.current!.scale.z = scale;
		}
	});

	return (
		<mesh ref={innerRef} position={props.position} onClick={props.onClick}>
			<sphereGeometry args={[props.size, 32, 16]} />
			<meshStandardMaterial
				color={props.color}
				emissive={props.color}
				emissiveIntensity={2}
			/>
			{props.children}
		</mesh>
	);
});

export default Star;
