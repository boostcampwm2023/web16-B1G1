import styled from '@emotion/styled';
import { Button } from 'shared/ui';
import { Title01 } from '../styles';
import PlanetEditIcon from '@icons/icon-planetedit-24-white.svg';
import AddIcon from '@icons/icon-add-24-white.svg';
import WriteIcon from '@icons/icon-writte-24-white.svg';
import { BASE_URL, MAX_WIDTH1, MAX_WIDTH2 } from 'shared/lib/constants';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import instance from 'shared/apis/AxiosInterceptor';
import { useViewStore } from 'shared/store';

export default function UnderBar() {
	const userName = Cookies.get('userId');
	const navigate = useNavigate();
	const { setView } = useViewStore();

	return (
		<Layout>
			<Name>{userName}님의 은하</Name>

			<ButtonsContainer>
				<SmallButtonsContainer>
					<Button
						size="m"
						buttonType="Button"
						onClick={async () => {
							await instance.get(`${BASE_URL}auth/signout`);
							Cookies.remove('accessToken');
							Cookies.remove('refreshToken');
							navigate('/');
						}}
					>
						로그아웃
					</Button>
					<Button size="m" buttonType="Button">
						공유하기
					</Button>
				</SmallButtonsContainer>

				<Line />

				<BigButtonsContainer>
					<BigButton size="l" buttonType="Button">
						<img src={PlanetEditIcon} alt="우주 수정하기" />
						우주 수정하기
					</BigButton>
					<BigButton size="l" buttonType="Button">
						<img src={AddIcon} alt="별 스킨 만들기" />별 스킨 만들기
					</BigButton>
					<BigButton
						size="l"
						buttonType="CTA-icon"
						onClick={() => {
							setView('WRITING');
							navigate('/home/writing');
						}}
					>
						<img src={WriteIcon} alt="글쓰기" />
						글쓰기
					</BigButton>
				</BigButtonsContainer>
			</ButtonsContainer>
		</Layout>
	);
}

const Layout = styled.div`
	position: absolute;
	left: 50%;
	bottom: 30px;
	z-index: 50;
	transform: translateX(-50%);

	display: flex;
	padding: 24px;
	justify-content: space-between;
	align-items: center;
	border-radius: 12px;
	width: 1180px;

	background-color: ${({ theme }) => theme.colors.background.bdp01_80};
	border: 1px solid ${({ theme }) => theme.colors.stroke.default};

	@media (max-width: ${MAX_WIDTH1}px) {
		width: calc(100% - 30px);
	}

	@media (max-width: ${MAX_WIDTH2}px) {
		width: 900px;
	}
`;

const ButtonsContainer = styled.div`
	display: flex;
`;

const SmallButtonsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const BigButtonsContainer = styled.div`
	display: flex;
	gap: 8px;
`;

const BigButton = styled(Button)`
	width: 150px;
	height: 76px;
`;

const Name = styled.p`
	color: ${({ theme }) => theme.colors.text.primary};
	${Title01}
`;

const Line = styled.div`
	margin: 0 18px;
	border-left: 1px solid ${({ theme }) => theme.colors.stroke.sc};
`;
