import { Volume2, VolumeX } from 'lucide-react';
import { usePlayingStore } from 'shared/store/useAudioStore';
import styled from '@emotion/styled';

export default function AudioButton() {
	const { playing, setPlaying } = usePlayingStore();

	return (
		<Wrapper onClick={setPlaying}>
			{playing ? <UnMuteIcon /> : <MuteIcon />}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: absolute;
	top: 20px;
	left: 20px;
	z-index: 100;
	cursor: pointer;
`;

const MuteIcon = styled(VolumeX)`
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const UnMuteIcon = styled(Volume2)`
	color: ${({ theme }) => theme.colors.text.secondary};
`;
