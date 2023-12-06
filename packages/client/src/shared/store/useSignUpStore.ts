import { create } from 'zustand';

interface SignUpState {
	id: string;
	pw: string;
	setId: (id: string) => void;
	setPw: (password: string) => void;
}

export const useSignUpStore = create<SignUpState>((set) => ({
	id: '',
	pw: '',
	setId: (id) => set((state) => ({ ...state, id })),
	setPw: (pw) => set((state) => ({ ...state, pw })),
}));
