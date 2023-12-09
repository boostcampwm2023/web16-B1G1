import { create } from 'zustand';

export type view = 'MAIN' | 'DETAIL' | 'POST' | 'WRITING' | 'CUSTOM' | 'SHARE';

interface ViewState {
	view: view;
	setView: (view: view) => void;
}

export const useViewStore = create<ViewState>((set) => ({
	view: 'MAIN',
	setView: (view: view) => set({ view }),
}));
