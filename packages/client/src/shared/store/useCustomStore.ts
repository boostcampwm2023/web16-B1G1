import { create } from 'zustand';

interface CustomState {
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

export const useCustomStore = create<CustomState>((set) => ({
	spiral: 1.2,
	setSpiral: (value: number) => set({ spiral: value }),
	density: 0.5,
	setDensity: (value: number) => set({ density: value }),
	start: 1000,
	setStart: (value: number) => set({ start: value }),
	thickness: 300,
	setThickness: (value: number) => set({ thickness: value }),
	zDist: 1000,
	setZDist: (value: number) => set({ zDist: value }),
}));
