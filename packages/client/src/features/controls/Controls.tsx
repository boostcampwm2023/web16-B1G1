import { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useCameraStore } from 'shared/store/useCameraStore';
import { Camera, useFrame, useThree } from '@react-three/fiber';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useViewStore } from 'shared/store/useViewStore';
import { useEffect } from 'react';
import { CAMERA_POST_VIEW } from '@constants';
import useCheckNickName from 'shared/hooks/useCheckNickName';

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

const setPostViewCamera = (
	camera: Camera,
	currentView: THREE.Vector3,
	LENGTH_LIMIT: number,
) => {
	const distance = camera.position.distanceTo(currentView);
	const direction = currentView.clone().sub(camera.position);

	if (distance - CAMERA_POST_VIEW > LENGTH_LIMIT)
		direction.setLength(LENGTH_LIMIT);
	else if (CAMERA_POST_VIEW - distance > LENGTH_LIMIT)
		direction.setLength(-LENGTH_LIMIT);
	else
		direction.setLength(
			camera.position.distanceTo(currentView) - CAMERA_POST_VIEW,
		);
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
		setTargetView,
	} = useCameraStore();
	const { view } = useViewStore();
	const state = useThree();
	const { nickName } = useCheckNickName();

	useEffect(() => {
		setCameraToCurrentView(currentView.distanceTo(state.camera.position));
	}, []);

	useEffect(() => {
		setTargetView(null);
	}, [nickName]);

	useFrame((state, delta) => {
		const targetPosition = new THREE.Vector3(0, 0, 0);
		const LENGTH_LIMIT = ((cameraToCurrentView + 5000) * delta) / 2;

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
			setCameraToCurrentView(currentView.distanceTo(state.camera.position));
		}

		if (targetPosition !== currentView) {
			const direction = targetPosition.sub(currentView);

			if (direction.length() > LENGTH_LIMIT) direction.setLength(LENGTH_LIMIT);

			setCurrentView(currentView.add(direction));
			if (view !== 'POST')
				setCameraPosition(state.camera, currentView, cameraToCurrentView);
			else setPostViewCamera(state.camera, currentView, LENGTH_LIMIT);

			controlsRef.current.target = currentView;
		}
	});

	return <OrbitControls ref={controlsRef} />;
}
