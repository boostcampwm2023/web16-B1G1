import { create } from 'zustand';

interface PostState {
	title: string;
	setStoreTitle: (title: string) => void;
	content: string;
	setStoreContent: (content: string) => void;
	files: FileList | null;
	setStoreFiles: (files: FileList | null) => void;
}

export const usePostStore = create<PostState>((set) => ({
	title: '',
	setStoreTitle: (title) => {
		set((state) => ({ ...state, title: title }));
	},
	content: '',
	setStoreContent: (content) => {
		set((state) => ({ ...state, content: content }));
	},
	files: null,
	setStoreFiles: (files) => {
		set((state) => ({ ...state, files: files }));
	},
}));
