import bgm from 'assets/bgm.mp3';
import ReactHowler from 'react-howler';
import { usePlayingStore } from 'shared/store/useAudioStore';

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
