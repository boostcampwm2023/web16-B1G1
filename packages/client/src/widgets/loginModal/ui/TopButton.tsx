import { TextButton } from 'shared/ui';
import RightArrow from '@icons/icon-arrow-right-17-white.svg?react';

export default function TopButton() {
	return (
		<TextButton size="l" onClick={() => console.log('top button')}>
			<p>둘러보기</p>
			<RightArrow />
		</TextButton>
	);
}
