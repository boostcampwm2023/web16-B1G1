import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '..';
import { usePlayingStore } from 'shared/store/useAudioStore';
import styled from '@emotion/styled';

export default function AudioButton() {
	const { playing, setPlaying } = usePlayingStore();

	return (
		<BGMButton size="m" buttonType="Button" onClick={() => setPlaying()}>
			{playing ? <MuteIcon /> : <UnMuteIcon />}
		</BGMButton>
	);
}

const BGMButton = styled(Button)`
	position: absolute;
	top: 20px;
	left: 20px;
	z-index: 100;
`;

const MuteIcon = styled(VolumeX)`
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const UnMuteIcon = styled(Volume2)`
	color: ${({ theme }) => theme.colors.text.secondary};
`;
