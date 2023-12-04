import { create } from 'zustand';

interface ScreenSwitchState {
	isSwitching: boolean;
	setIsSwitching: (value: boolean) => void;
}

export const useScreenSwitchStore = create<ScreenSwitchState>((set) => ({
	isSwitching: false,
	setIsSwitching: (value) => {
		set((state) => ({ ...state, isSwitching: value }));
	},
}));
