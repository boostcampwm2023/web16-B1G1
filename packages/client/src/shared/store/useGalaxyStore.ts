import { create } from 'zustand';
import {
	ARMS_Z_DIST,
	GALAXY_THICKNESS,
	SPIRAL,
	SPIRAL_START,
	STARS_DENSITY,
} from 'widgets/galaxy/lib/constants';

interface GalaxyState {
	spiral: number;
	setSpiral: (value: number) => void;
	density: number;
	setDensity: (value: number) => void;
	start: number;
	setStart: (value: number) => void;
	thickness: number;
	setThickness: (value: number) => void;
	zDist: number;
	setZDist: (value: number) => void;
}

export const useGalaxyStore = create<GalaxyState>((set) => ({
	spiral: SPIRAL,
	setSpiral: (value: number) => set({ spiral: value }),
	density: STARS_DENSITY,
	setDensity: (value: number) => set({ density: value }),
	start: SPIRAL_START,
	setStart: (value: number) => set({ start: value }),
	thickness: GALAXY_THICKNESS,
	setThickness: (value: number) => set({ thickness: value }),
	zDist: ARMS_Z_DIST,
	setZDist: (value: number) => set({ zDist: value }),
}));
