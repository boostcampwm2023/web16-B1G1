import { PostData } from './../lib/types/post';
import { create } from 'zustand';
import * as THREE from 'three';

interface PostState {
	data: PostData;
	setData: (data: PostData) => void;
}

export const usePostStore = create<PostState>((set) => ({
	data: {
		title: '',
		content: '',
		position: new THREE.Vector3(0, 0, 0),
		size: 1,
		color: '#000000',
		images: [],
	},
	setData: (data: PostData) => set({ data }),
}));
