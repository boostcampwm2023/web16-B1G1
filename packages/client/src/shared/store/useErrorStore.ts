import { create } from 'zustand';

interface ErrorState {
	message: string;
	setMessage: (value: string) => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
	message: '',
	setMessage: (message) => set((state) => ({ ...state, message })),
}));
