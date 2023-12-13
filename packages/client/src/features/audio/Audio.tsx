import bgm from 'assets/musics/bgm.mp3';
import ReactHowler from 'react-howler';
import { usePlayingStore } from 'shared/store';

export default function Audio() {
	const { playing } = usePlayingStore();

	return (
		<ReactHowler
			src={bgm}
			playing={true}
			loop={true}
			volume={0.5}
			mute={!playing}
		/>
	);
}
