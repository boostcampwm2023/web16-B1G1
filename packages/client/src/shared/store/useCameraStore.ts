import { create } from 'zustand';
import * as THREE from 'three';
import { CAMERA_MIN_DISTANCE } from '@constants';

interface cameraState {
	currentView: THREE.Vector3;
	setCurrentView: (position: THREE.Vector3) => void;
	targetView: THREE.Mesh | null;
	setTargetView: (star: THREE.Mesh | null) => void;
	cameraToCurrentView: number;
	setCameraToCurrentView: (distance: number) => void;
}

export const useCameraStore = create<cameraState>()((set) => ({
	currentView: new THREE.Vector3(0, 0, 0),
	setCurrentView: (position: THREE.Vector3) => set({ currentView: position }),
	targetView: null,
	setTargetView: (star: THREE.Mesh | null) => set({ targetView: star }),
	cameraToCurrentView: CAMERA_MIN_DISTANCE,
	setCameraToCurrentView: (distance: number) =>
		set({
			cameraToCurrentView:
				distance > CAMERA_MIN_DISTANCE ? distance : CAMERA_MIN_DISTANCE,
		}),
}));
