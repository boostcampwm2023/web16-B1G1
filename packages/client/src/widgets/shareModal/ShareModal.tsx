import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSignInInfo, patchShareStatus } from 'shared/apis';
import { useRefresh } from 'shared/hooks';
import { useToastStore, useViewStore } from 'shared/store';
import { Button, Modal } from 'shared/ui';
import { SearchStatusType } from './lib/types';
import LinkContainer from './ui/LinkContainer';
import SearchSetContainer from './ui/SearchSetContainer';

export default function ShareModal() {
	const [originalSearchStatus, setOriginalSearchStatus] =
		useState<SearchStatusType>('default');
	const [newSearchStatus, setNewSearchStatus] =
		useState<SearchStatusType>('default');

	const { setToast } = useToastStore();
	const { setView } = useViewStore();

	const navigate = useNavigate();

	useRefresh('SHARE');

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

		setToast({ text: '공유 설정이 변경되었습니다.', type: 'success' });
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
			type="button"
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
