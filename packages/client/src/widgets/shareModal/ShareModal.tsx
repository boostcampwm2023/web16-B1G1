import { Button, Modal } from 'shared/ui';
import LinkContainer from './ui/LinkContainer';
import SearchSetContainer from './ui/SearchSetContainer';

export default function ShareModal() {
	const rightButton = (
		<Button buttonType="CTA-icon" size="m" type="submit">
			적용
		</Button>
	);

	const handleGoBackButton = () => {};

	return (
		<Modal
			title="공유하기"
			description="링크를 복사하고 친구들에게 공유해보세요."
			rightButton={rightButton}
			onClickGoBack={handleGoBackButton}
		>
			<SearchSetContainer />
			<LinkContainer />
		</Modal>
	);
}
