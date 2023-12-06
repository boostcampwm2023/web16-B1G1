import { create } from 'zustand';

interface CustomState {
	spiral: number;
	setSpiral: (value: number) => void;
	start: number;
	setStart: (value: number) => void;
	thickness: number;
	setThickness: (value: number) => void;
	zDist: number;
	setZDist: (value: number) => void;
}

export const useCustomStore = create<CustomState>((set, get) => ({
	spiral: 1.2,
	setSpiral: (value: number) => {
		if (value !== get().spiral) set({ spiral: value });
	},
	start: 1000,
	setStart: (value: number) => {
		if (value !== get().start) set({ start: value });
	},
	thickness: 300,
	setThickness: (value: number) => {
		if (value !== get().thickness) set({ thickness: value });
	},
	zDist: 1000,
	setZDist: (value: number) => {
		if (value !== get().zDist) set({ zDist: value });
	},
}));
