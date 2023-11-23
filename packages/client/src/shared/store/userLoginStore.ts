import { create } from 'zustand';

interface loginState {
	id: string;
	setId: (id: string) => void;
	password: string;
	setPassword: (password: string) => void;
}

export const useLoginStore = create<loginState>()((set) => ({
	id: '',
	setId: (id: string) => set({ id }),
	password: '',
	setPassword: (password: string) => set({ password }),
}));
