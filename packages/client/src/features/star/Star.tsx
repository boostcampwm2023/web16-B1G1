import { forwardRef } from 'react';
import * as THREE from 'three';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { DISTANCE_LIMIT } from './lib/constants';
import { useForwardRef } from 'shared/hooks';
import { Geometry } from './model';
import { ShapeType } from '@constants';

interface PropsType {
	children?: React.ReactNode;
	position: THREE.Vector3;
	size: number;
	color: string;
	brightness: number;
	onClick?: (e: ThreeEvent<MouseEvent>) => void;
	onPointerOver?: (e: ThreeEvent<MouseEvent>) => void;
	onPointerOut?: (e: ThreeEvent<MouseEvent>) => void;
	shape?: ShapeType;
}

const Star = forwardRef<THREE.Mesh, PropsType>((props, ref) => {
	const innerRef = useForwardRef(ref);
	const {
		children,
		position,
		size,
		color,
		brightness,
		onClick,
		onPointerOver,
		onPointerOut,
		shape,
	} = props;

	useFrame((state, delta) => {
		const cameraDistance = innerRef.current
			.getWorldPosition(new THREE.Vector3())
			.distanceTo(state.camera.position);
		const scale = Math.log((cameraDistance / DISTANCE_LIMIT) * Math.E);

		if (cameraDistance > DISTANCE_LIMIT) {
			innerRef.current!.scale.x = scale;
			innerRef.current!.scale.y = scale;
			innerRef.current!.scale.z = scale;
		}

		innerRef.current.rotation.x += delta / 5;
		innerRef.current.rotation.y += delta / 5;
	});

	return (
		<mesh
			ref={innerRef}
			position={position}
			onClick={onClick}
			onPointerOver={onPointerOver}
			onPointerOut={onPointerOut}
		>
			<Geometry size={size} shape={shape} />
			<meshStandardMaterial
				color={color}
				emissive={color}
				emissiveIntensity={brightness}
			/>
			{children}
		</mesh>
	);
});

export default Star;
