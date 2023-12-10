import { HelpCircleIcon } from 'lucide-react';
import { useState } from 'react';
import CoachMarker from './CoachMarker';
import styled from '@emotion/styled';

export default function CoachButton() {
	const [showCoach, setShowCoach] = useState(false);
	return (
		<>
			<HelpCircleButton size={24} onClick={() => setShowCoach(!showCoach)} />
			{showCoach && <CoachMarker isFirst={false} />}
		</>
	);
}

const HelpCircleButton = styled(HelpCircleIcon)`
	color: ${({ theme }) => theme.colors.text.primary};
	cursor: pointer;
`;
