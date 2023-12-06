import { Button, Modal } from 'shared/ui';
import LinkContainer from './ui/LinkContainer';
import SearchSetContainer from './ui/SearchSetContainer';
import { useState, useEffect } from 'react';
import { getSignInInfo } from 'shared/apis';
import { SearchStatusType } from './lib/types';
import { useToastStore, useViewStore } from 'shared/store';
import { useNavigate } from 'react-router-dom';
import { patchShareStatus } from 'shared/apis/share';

export default function ShareModal() {
	const [originalSearchStatus, setOriginalSearchStatus] =
		useState<SearchStatusType>('default');
	const [newSearchStatus, setNewSearchStatus] =
		useState<SearchStatusType>('default');

	const { setText } = useToastStore();
	const { setView } = useViewStore();

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const userData = await getSignInInfo();

			setOriginalSearchStatus(userData.status);
			setNewSearchStatus(userData.status);
		})();
	}, []);

	const handleSaveButton = async () => {
		if (newSearchStatus === 'default') return;

		if (originalSearchStatus !== newSearchStatus) {
			await patchShareStatus(newSearchStatus);
		}

		setText('공유 설정이 변경되었습니다.');
		setView('MAIN');
		navigate('/home');
	};

	const handleGoBackButton = () => {
		setNewSearchStatus(originalSearchStatus);
		setView('MAIN');
		navigate('/home');
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

	return (
		<Modal
			title="공유하기"
			description="링크를 복사하고 친구들에게 공유해보세요."
			rightButton={rightButton}
			onClickGoBack={handleGoBackButton}
		>
			<SearchSetContainer
				searchStatus={newSearchStatus}
				setSearchStatus={setNewSearchStatus}
			/>
			<LinkContainer />
		</Modal>
	);
}
