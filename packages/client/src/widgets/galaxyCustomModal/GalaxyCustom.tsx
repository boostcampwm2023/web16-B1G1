import { Modal } from 'shared/ui';
import { useNavigate } from 'react-router-dom';
import { RightButton, SampleScreen, Sliders } from './ui';
import { useViewStore } from 'shared/store';
import styled from '@emotion/styled';
import { useGalaxyStore, useCustomStore } from 'shared/store';

export default function GalaxyCustom() {
	const navigate = useNavigate();
	const { setView } = useViewStore();
	const { setSpiral, setStart, setThickness, setZDist } = useGalaxyStore();
	const { spiral, start, thickness, zDist } = useCustomStore();

	const handleSubmit = () => {
		setSpiral(spiral);
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
				title="은하 커스텀"
				onClickGoBack={() => {
					navigate('/home');
					setView('MAIN');
				}}
				rightButton={<RightButton />}
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
