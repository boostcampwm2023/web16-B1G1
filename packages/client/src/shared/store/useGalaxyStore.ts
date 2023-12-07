import { create } from 'zustand';
import {
	ARMS_Z_DIST,
	GALAXY_THICKNESS,
	SPIRAL,
	SPIRAL_START,
} from 'widgets/galaxy/lib/constants';

interface GalaxyState {
	spiral: number;
	setSpiral: (value: number) => void;
	start: number;
	setStart: (value: number) => void;
	thickness: number;
	setThickness: (value: number) => void;
	zDist: number;
	setZDist: (value: number) => void;
	reset: () => void;
}

export const useGalaxyStore = create<GalaxyState>((set, get) => ({
	spiral: SPIRAL,
	setSpiral: (value: number) => {
		if (value !== get().spiral) set({ spiral: value });
	},
	start: SPIRAL_START,
	setStart: (value: number) => {
		if (value !== get().start) set({ start: value });
	},
	thickness: GALAXY_THICKNESS,
	setThickness: (value: number) => {
		if (value !== get().thickness) set({ thickness: value });
	},
	zDist: ARMS_Z_DIST,
	setZDist: (value: number) => {
		if (value !== get().zDist) set({ zDist: value });
	},
	reset: () => {
		if (get().spiral !== SPIRAL) set({ spiral: SPIRAL });
		if (get().start !== SPIRAL_START) set({ start: SPIRAL_START });
		if (get().thickness !== GALAXY_THICKNESS)
			set({ thickness: GALAXY_THICKNESS });
		if (get().zDist !== ARMS_Z_DIST) set({ zDist: ARMS_Z_DIST });
	},
}));
