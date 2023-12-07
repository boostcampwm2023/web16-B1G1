import { create } from 'zustand';

interface ScreenSwitchState {
	isSwitching: boolean;
	setIsSwitching: (value: boolean) => void;
}

export const useScreenSwitchStore = create<ScreenSwitchState>((set) => ({
	isSwitching: false,
	setIsSwitching: (isSwitching) => set((state) => ({ ...state, isSwitching })),
}));
