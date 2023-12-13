import styled from '@emotion/styled';
import Logo from 'assets/logos/404.png';
import { useNavigate } from 'react-router-dom';
import { Body05Me, PageTitle03 } from 'shared/styles';

export default function FallBackComponent() {
	const navigate = useNavigate();
	return (
		<Layout>
			<LogoImage src={Logo} alt="404 error" />
			<Title>404</Title>
			<Title>페이지를 찾을 수 없습니다.</Title>
			<Button
				onClick={() => {
					navigate('/home');
				}}
			>
				홈화면으로 이동
			</Button>
		</Layout>
	);
}

const Layout = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: #070614;
	color: ${({ theme }) => theme.colors.text.primary};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	${Body05Me}
`;

const LogoImage = styled.img`
	width: 30vw;
	margin-bottom: 80px;
`;

const Title = styled.p`
	${PageTitle03};
	margin-bottom: 40px;
`;

const Button = styled.button`
	${Body05Me}
	padding: 10px 20px;
	border-radius: 4px;
	background-color: ${({ theme }) => theme.colors.primary.filled};
	color: ${({ theme }) => theme.colors.text.primary};
	border: none;
	cursor: pointer;
`;
