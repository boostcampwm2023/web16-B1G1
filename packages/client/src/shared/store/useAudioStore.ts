import { create } from 'zustand';

interface PlayingState {
	playing: boolean;
	setPlaying: () => void;
}

export const usePlayingStore = create<PlayingState>((set, get) => ({
	playing: false,
	setPlaying: () => set({ playing: !get().playing }),
}));
