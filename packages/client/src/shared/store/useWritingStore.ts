import { create } from 'zustand';

type view = 'MAIN' | 'DETAIL' | 'WRITING';

interface viewState {
	view: view;
	setView: (view: view) => void;
}

export const useViewStore = create<viewState>((set) => ({
	view: 'MAIN',
	setView: (view: view) => set({ view }),
}));
