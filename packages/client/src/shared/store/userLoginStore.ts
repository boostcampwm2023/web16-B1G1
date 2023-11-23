import { create } from 'zustand';

interface LoginState {
	id: string;
	setId: (id: string) => void;
	password: string;
	setPassword: (password: string) => void;
}

export const useLoginStore = create<LoginState>()((set) => ({
	id: '',
	setId: (id: string) => set({ id }),
	password: '',
	setPassword: (password: string) => set({ password }),
}));
