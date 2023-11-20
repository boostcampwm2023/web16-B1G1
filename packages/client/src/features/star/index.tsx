import { useRef, forwardRef, useEffect, ForwardedRef } from 'react';
import * as THREE from 'three';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { DISTANCE_LIMIT } from './lib/constants';

interface PropsType {
	children?: React.ReactNode;
	onClick?: (e: ThreeEvent<MouseEvent>) => void;
	position: THREE.Vector3;
	size: number;
	color: string;
}

const useForwardRef = <T,>(ref: ForwardedRef<T>, initialValue: any = null) => {
	const targetRef = useRef<T>(initialValue);

	useEffect(() => {
		if (!ref) return;

		if (typeof ref === 'function') {
			ref(targetRef.current);
			return;
		}

		ref.current = targetRef.current;
	}, [ref]);

	return targetRef;
};

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
