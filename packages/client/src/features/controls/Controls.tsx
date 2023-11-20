import { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useCameraStore } from 'shared/store/useCameraStore';
import { Camera, useFrame } from '@react-three/fiber';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

const setCameraPosition = (
	camera: Camera,
	currentView: THREE.Vector3,
	distance: number,
) => {
	const direction = currentView
		.clone()
		.sub(camera.position)
		.setLength(camera.position.distanceTo(currentView) - distance);
	camera.position.add(direction);
};

export default function Controls() {
	const controlsRef = useRef<OrbitControlsImpl>(null!);
	const { cameraToCurrentView, currentView, setCurrentView, targetView } =
		useCameraStore();

	useFrame((state, delta) => {
		const targetPosition = new THREE.Vector3(0, 0, 0);
		const LENGTH_LIMIT = 1000 * delta;

		if (targetView) targetView.getWorldPosition(targetPosition);

		if (targetPosition !== currentView) {
			const direction = targetPosition.sub(currentView);

			if (direction.length() > LENGTH_LIMIT) direction.setLength(LENGTH_LIMIT);

			setCurrentView(currentView.add(direction));
			setCameraPosition(state.camera, currentView, cameraToCurrentView);

			controlsRef.current.target = currentView;
		}
	});

	return <OrbitControls ref={controlsRef} />;
}
