import { create } from 'zustand';

interface OwnerState {
	isMyPage: boolean;
	setIsMyPage: (value: boolean) => void;
}

export const useOwnerStore = create<OwnerState>((set) => ({
	isMyPage: true,
	setIsMyPage: (value) => {
		set((state) => ({ ...state, isMyPage: value }));
	},
}));
