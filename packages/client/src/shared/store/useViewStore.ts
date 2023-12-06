import { create } from 'zustand';

type view = 'MAIN' | 'DETAIL' | 'POST' | 'WRITING' | 'CUSTOM' | 'SHARE';

interface ViewState {
	view: view;
	setView: (view: view) => void;
}

export const useViewStore = create<ViewState>((set) => ({
	view: 'MAIN',
	setView: (view: view) => set({ view }),
}));
