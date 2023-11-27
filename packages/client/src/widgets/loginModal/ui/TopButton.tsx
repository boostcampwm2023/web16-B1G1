import { TextButton } from 'shared/ui';
import RightArrow from '@icons/icon-arrow-right-17-white.svg?react';

interface PropsType {
	onClick: () => void;
}

export default function TopButton({ onClick }: PropsType) {
	return (
		<TextButton size="l" onClick={onClick} type="button">
			<p>둘러보기</p>
			<RightArrow />
		</TextButton>
	);
}
