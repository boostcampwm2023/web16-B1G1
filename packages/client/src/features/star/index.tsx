import { forwardRef } from 'react';
import * as THREE from 'three';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { DISTANCE_LIMIT } from './lib/constants';
import { useForwardRef } from 'shared/hooks';

interface PropsType {
	children?: React.ReactNode;
	position: THREE.Vector3;
	size: number;
	color: string;
	onClick?: (e: ThreeEvent<MouseEvent>) => void;
	onPointerOver?: (e: React.MouseEvent) => void;
	onPointerOut?: (e: React.MouseEvent) => void;
}

const Star = forwardRef<THREE.Mesh, PropsType>((props, ref) => {
	const innerRef = useForwardRef(ref);

	const {
		children,
		position,
		size,
		color,
		onClick,
		onPointerOver,
		onPointerOut,
	} = props;

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
		<mesh
			ref={innerRef}
			position={position}
			onClick={onClick}
			onPointerOver={onPointerOver}
			onPointerOut={onPointerOut}
		>
			<sphereGeometry args={[size, 32, 16]} />
			<meshStandardMaterial
				color={color}
				emissive={color}
				emissiveIntensity={2}
			/>
			{children}
		</mesh>
	);
});

export default Star;
