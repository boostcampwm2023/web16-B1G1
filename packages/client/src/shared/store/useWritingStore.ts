import { create } from 'zustand';

interface viewState {
	view: string;
	setView: (writing: string) => void;
}

export const useViewStore = create<viewState>((set) => ({
	view: 'MAIN',
	setView: (view: string) => set({ view }),
}));
