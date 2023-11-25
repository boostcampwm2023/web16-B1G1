import { create } from 'zustand';

interface ToastState {
	text: string;
	setText: (text: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
	text: '',
	setText: (text) => {
		set((state) => ({ ...state, text }));

		setTimeout(() => {
			set((state) => ({ ...state, text: '' }));
		}, 3000);
	},
}));
