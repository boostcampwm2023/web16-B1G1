import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group, Object3DEventMap } from 'three';

export default function CameraLight() {
	const lightRef = useRef<Group<Object3DEventMap>>(null!);

	useFrame((state) => {
		lightRef.current.position.copy(state.camera.position);
	});
	return (
		<group ref={lightRef}>
			<directionalLight intensity={3} />
		</group>
	);
}
