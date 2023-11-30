import { create } from 'zustand';

interface LoadingState {
	isLoading: boolean;
	setIsLoading: (id: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
	isLoading: false,
	setIsLoading: (value) => {
		set((state) => ({ ...state, isLoading: value }));
	},
}));
