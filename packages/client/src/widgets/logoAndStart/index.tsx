import { Button } from 'shared/ui';
import styled from '@emotion/styled';
import { Title02 } from 'shared/ui/styles';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/logo.png';

export default function LogoAndStart() {
	const navigate = useNavigate();

	return (
		<>
			<BackDrop />
			<Container>
				<Logo src={logo} />
				<Button
					onClick={() => navigate('/login')}
					size="l"
					buttonType="CTA-icon"
					type="button"
					style={{ width: '516px', padding: '24px 12px' }}
				>
					<Start>시작하기</Start>
				</Button>
			</Container>
		</>
	);
}

const Logo = styled.img`
	width: 350px;
`;

const Container = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	gap: 120px;
	align-items: center;
	z-index: 1;
`;

const Start = styled.div`
	${Title02}
`;

const BackDrop = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: black;
	opacity: 0.6;
	width: 100%;
	height: 100%;
	z-index: 1;
`;
