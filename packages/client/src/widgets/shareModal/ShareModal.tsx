import { Button, Modal } from 'shared/ui';
import LinkContainer from './ui/LinkContainer';
import SearchSetContainer from './ui/SearchSetContainer';
import { useState } from 'react';

export default function ShareModal() {
	const [isSearchable, setIsSearchable] = useState(false);

	const handleSaveButton = () => {
		// TODO: 공개 상태가 바뀌었다면 API 호출
	};

	const rightButton = (
		<Button
			buttonType="CTA-icon"
			size="m"
			type="submit"
			onClick={handleSaveButton}
		>
			저장
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
			<SearchSetContainer
				isSearchable={isSearchable}
				setIsSearchable={setIsSearchable}
			/>
			<LinkContainer />
		</Modal>
	);
}
