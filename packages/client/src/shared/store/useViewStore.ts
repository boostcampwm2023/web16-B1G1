import { create } from 'zustand';
import { view } from 'shared/lib/types/view';

interface ViewState {
	view: view;
	setView: (view: view) => void;
}

export const useViewStore = create<ViewState>((set) => ({
	view: 'MAIN',
	setView: (view: view) => set({ view }),
}));
