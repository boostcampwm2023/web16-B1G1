import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postGalaxy } from 'shared/apis';
import { useRefresh } from 'shared/hooks';
import {
	useCustomStore,
	useGalaxyStore,
	useToastStore,
	useViewStore,
} from 'shared/store';
import { AlertDialog, Modal } from 'shared/ui';
import {
	LeftButton,
	RightButton,
	SampleScreen,
	Sliders,
	TopButton,
} from './ui';

export default function GalaxyCustomModal() {
	const navigate = useNavigate();
	const { setView } = useViewStore();
	const galaxy = useGalaxyStore();
	const { spiral, start, thickness, zDist } = useCustomStore();
	const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
	const { setToast } = useToastStore();
	const [dialog, setDialog] = useState(false);

	useRefresh('CUSTOM');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isSubmitButtonDisabled) return;
		setIsSubmitButtonDisabled(true);

		const galaxyStyle = {
			spiral: galaxy.spiral !== spiral ? spiral : undefined,
			start: galaxy.start !== start ? start : undefined,
			thickness: galaxy.thickness !== thickness ? thickness : undefined,
			zDist: galaxy.zDist !== zDist ? zDist : undefined,
		};

		galaxy.setSpiral(spiral);
		galaxy.setStart(start);
		galaxy.setThickness(thickness);
		galaxy.setZDist(zDist);

		try {
			await postGalaxy(galaxyStyle);

			setToast({ text: '은하가 수정되었습니다.', type: 'success' });
			navigate('/home');
			setView('MAIN');
		} finally {
			setIsSubmitButtonDisabled(false);
		}
	};

	return (
		<Modal
			title="은하 수정하기"
			onClickGoBack={() => {
				setDialog(true);
			}}
			rightButton={<RightButton disabled={isSubmitButtonDisabled} />}
			leftButton={<LeftButton />}
			topButton={<TopButton />}
			onSubmit={handleSubmit}
		>
			<Container>
				<SampleScreen />
				<Sliders />
			</Container>
			{dialog && (
				<AlertDialog
					title="메인화면으로 돌아가시겠습니까?"
					description="수정 내용은 임시저장됩니다."
					cancelButtonText="머무르기"
					actionButtonText="돌아가기"
					onClickCancelButton={() => setDialog(false)}
					onClickActionButton={() => {
						navigate('/home');
						setView('MAIN');
					}}
					disabled={false}
				/>
			)}
		</Modal>
	);
}

const Container = styled.div`
	display: flex;
	gap: 24px;
`;
