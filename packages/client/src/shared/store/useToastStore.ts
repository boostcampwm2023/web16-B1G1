import { create } from 'zustand';

interface ToastState {
	text: string;
	type: 'success' | 'error';
	setToast: ({
		text,
		type,
	}: {
		text: string;
		type: 'success' | 'error';
	}) => void;
}

export const useToastStore = create<ToastState>((set) => ({
	text: '',
	type: 'success',
	setToast: ({ text, type }) => {
		set((state) => ({ ...state, text, type }));

		setTimeout(() => {
			set((state) => ({ ...state, text: '' }));
		}, 3000);
	},
}));
