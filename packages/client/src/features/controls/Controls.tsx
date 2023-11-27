import { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useCameraStore } from 'shared/store/useCameraStore';
import { Camera, useFrame, useThree } from '@react-three/fiber';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useViewStore } from 'shared/store/useWritingStore';
import { useEffect } from 'react';
import { CAMERA_POSITION } from '@constants';

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
	const {
		cameraToCurrentView,
		setCameraToCurrentView,
		currentView,
		setCurrentView,
		targetView,
	} = useCameraStore();
	const { view } = useViewStore();
	const state = useThree();

	useEffect(() => {
		setCameraToCurrentView(currentView.distanceTo(state.camera.position));
	}, []);

	useFrame((state, delta) => {
		const targetPosition = new THREE.Vector3(0, 0, 0);
		const LENGTH_LIMIT = 1000 * delta;

		if (targetView) targetView.getWorldPosition(targetPosition);
		if (view === 'POST') {
			targetPosition
				.sub(state.camera.position)
				.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 6)
				.add(state.camera.position);
			const distance = targetPosition.clone().sub(state.camera.position);
			distance.x = 0;
			distance.z = 0;
			if (distance.length() > LENGTH_LIMIT) distance.setLength(LENGTH_LIMIT);
			state.camera.position.add(distance);
		}

		if (targetPosition !== currentView) {
			const direction = targetPosition.sub(currentView);

			if (direction.length() > LENGTH_LIMIT) direction.setLength(LENGTH_LIMIT);

			setCurrentView(currentView.add(direction));
			if (view !== 'POST')
				setCameraPosition(state.camera, currentView, cameraToCurrentView);

			controlsRef.current.target = currentView;
		}
	});

	return <OrbitControls ref={controlsRef} />;
}
