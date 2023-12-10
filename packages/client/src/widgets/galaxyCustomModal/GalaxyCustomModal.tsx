import { Modal } from 'shared/ui';
import { useNavigate } from 'react-router-dom';
import {
	RightButton,
	SampleScreen,
	Sliders,
	LeftButton,
	TopButton,
} from './ui';
import { useToastStore, useViewStore } from 'shared/store';
import styled from '@emotion/styled';
import { useGalaxyStore, useCustomStore } from 'shared/store';
import { postGalaxy } from 'shared/apis';
import { useRefresh } from 'shared/hooks/useRefresh';
import { useState } from 'react';

export default function GalaxyCustomModal() {
	const navigate = useNavigate();
	const { setView } = useViewStore();
	const galaxy = useGalaxyStore();
	const { spiral, start, thickness, zDist } = useCustomStore();
	const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
	const { setToast } = useToastStore();

	useRefresh('CUSTOM');

	const handleSubmit = async () => {
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
		await postGalaxy(galaxyStyle);
	};

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				await handleSubmit();
				setToast({ text: '은하가 수정되었습니다.', type: 'success' });

				setIsSubmitButtonDisabled(false);
				navigate('/home');
				setView('MAIN');
			}}
		>
			<Modal
				title="은하 수정하기"
				onClickGoBack={() => {
					navigate('/home');
					setView('MAIN');
				}}
				rightButton={<RightButton disabled={isSubmitButtonDisabled} />}
				leftButton={<LeftButton />}
				topButton={<TopButton />}
			>
				<Container>
					<SampleScreen />
					<Sliders />
				</Container>
			</Modal>
		</form>
	);
}

const Container = styled.div`
	display: flex;
	gap: 24px;
`;
