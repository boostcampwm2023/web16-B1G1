import { view } from 'shared/lib';
import { create } from 'zustand';

interface ViewState {
	view: view;
	setView: (view: view) => void;
}

export const useViewStore = create<ViewState>((set) => ({
	view: 'MAIN',
	setView: (view: view) => set({ view }),
}));
