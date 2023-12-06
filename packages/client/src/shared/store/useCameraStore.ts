import { create } from 'zustand';
import * as THREE from 'three';
import { CAMERA_MIN_DISTANCE, CAMERA_MAX_DISTANCE } from '@constants';

interface CameraState {
	currentView: THREE.Vector3;
	setCurrentView: (position: THREE.Vector3) => void;
	targetView: THREE.Mesh | null;
	setTargetView: (star: THREE.Mesh | null) => void;
	cameraToCurrentView: number;
	setCameraToCurrentView: (distance: number) => void;
}

export const useCameraStore = create<CameraState>()((set) => ({
	currentView: new THREE.Vector3(0, 0, 0),
	setCurrentView: (position: THREE.Vector3) => set({ currentView: position }),
	targetView: null,
	setTargetView: (star: THREE.Mesh | null) => set({ targetView: star }),
	cameraToCurrentView: CAMERA_MIN_DISTANCE,
	setCameraToCurrentView: (distance: number) => {
		if (distance < CAMERA_MIN_DISTANCE)
			set({ cameraToCurrentView: CAMERA_MIN_DISTANCE });
		else if (distance > CAMERA_MAX_DISTANCE)
			set({ cameraToCurrentView: CAMERA_MAX_DISTANCE });
		else set({ cameraToCurrentView: distance });
	},
}));
