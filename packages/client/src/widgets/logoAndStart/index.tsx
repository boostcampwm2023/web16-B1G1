import { Button } from 'shared/ui';
import styled from '@emotion/styled';
import { Title02 } from 'shared/ui/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function LogoAndStart() {
	const navigate = useNavigate();

	const handleStart = () => {
		const accessToken = Cookies.get('accessToken');
		const refreshToken = Cookies.get('refreshToken');
		if (!accessToken || !refreshToken) navigate('/login');
		else navigate('/home');
	};

	return (
		<Container>
			<Logo>Logo</Logo>
			<Button
				onClick={handleStart}
				size="l"
				buttonType="CTA-icon"
				type="button"
				style={{ width: '516px', padding: '24px 12px' }}
			>
				<Start>시작하기</Start>
			</Button>
		</Container>
	);
}

const Logo = styled.div`
	display: flex;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 16px;
	color: white;
	width: 700px;
	height: 180px;
	align-items: center;
	justify-content: center;
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
