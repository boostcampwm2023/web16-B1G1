import { create } from 'zustand';

interface OwnerState {
	isMyPage: boolean;
	pageOwnerNickName: string;
	setIsMyPage: (value: boolean) => void;
	setPageOwnerNickName: (value: string) => void;
}

export const useOwnerStore = create<OwnerState>((set) => ({
	isMyPage: true,
	pageOwnerNickName: '',
	setIsMyPage: (value) => {
		if (value === true) set((state) => ({ ...state, pageOwnerNickName: '' }));
		set((state) => ({ ...state, isMyPage: value }));
	},
	setPageOwnerNickName: (value) => {
		set((state) => ({ ...state, pageOwnerNickName: value }));
	},
}));
