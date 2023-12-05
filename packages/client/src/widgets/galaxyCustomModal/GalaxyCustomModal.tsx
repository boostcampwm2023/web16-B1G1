import { Modal } from 'shared/ui';
import { useNavigate } from 'react-router-dom';
import {
	RightButton,
	SampleScreen,
	Sliders,
	LeftButton,
	TopButton,
} from './ui';
import { useViewStore } from 'shared/store';
import styled from '@emotion/styled';
import { useGalaxyStore, useCustomStore } from 'shared/store';

export default function GalaxyCustomModal() {
	const navigate = useNavigate();
	const { setView } = useViewStore();
	const { setSpiral, setDensity, setStart, setThickness, setZDist } =
		useGalaxyStore();
	const { spiral, density, start, thickness, zDist } = useCustomStore();

	const handleSubmit = () => {
		setSpiral(spiral);
		setDensity(density);
		setStart(start);
		setThickness(thickness);
		setZDist(zDist);
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<Modal
				title="은하 수정하기"
				onClickGoBack={() => {
					navigate('/home');
					setView('MAIN');
				}}
				rightButton={<RightButton />}
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
