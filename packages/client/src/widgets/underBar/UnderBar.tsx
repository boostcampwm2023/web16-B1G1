import styled from '@emotion/styled';
import PlanetEditIcon from '@icons/icon-planetedit-24-white.svg';
import WriteIcon from '@icons/icon-writte-24-white.svg';
import { CoachButton } from 'features';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from 'shared/apis';
import { useCheckNickName } from 'shared/hooks';
import { MAX_WIDTH1, MAX_WIDTH2 } from 'shared/lib';
import { useGalaxyStore, useViewStore } from 'shared/store';
import { Title01 } from 'shared/styles';
import { Button } from 'shared/ui';

export default function UnderBar() {
	const navigate = useNavigate();
	const [isMyPage, setIsMyPage] = useState(true);
	const [isLogoutButtonDisabled, setIsLogoutButtonDisabled] = useState(false);

	const { setView, view } = useViewStore();
	const { page, nickName } = useCheckNickName();
	const { reset } = useGalaxyStore();

	useEffect(() => {
		if (!page) return;
		if (page === 'home') return setIsMyPage(true);
		setIsMyPage(false);
	}, [page]);

	const handleLogoutButton = async () => {
		if (isLogoutButtonDisabled) return;
		setIsLogoutButtonDisabled(true);
		try {
			await instance.get(`/auth/signout`);

			Cookies.remove('accessToken');
			Cookies.remove('refreshToken');
			Cookies.remove('userName');
			reset();

			navigate('/');
		} finally {
			setIsLogoutButtonDisabled(false);
		}
	};

	const handleShareButton = () => {
		setView('SHARE');
		navigate('/home/share');
	};

	const handleWritingButton = () => {
		setView('WRITING');
		navigate('/home/writing');
	};

	const handleGalaxyCustomButton = () => {
		setView('CUSTOM');
		navigate('/home/galaxy-custom');
	};

	return (
		<Layout view={view}>
			<NameContainer>
				<Name>{nickName}님의 은하</Name>
				{page === 'home' && <CoachButton />}
			</NameContainer>

			<ButtonsContainer>
				<SmallButtonsContainer>
					{page !== 'guest' && (
						<Button
							size="m"
							buttonType="Button"
							onClick={handleLogoutButton}
							disabled={isLogoutButtonDisabled}
						>
							로그아웃
						</Button>
					)}

					{isMyPage && (
						<Button
							size="m"
							buttonType="Button"
							onClick={handleShareButton}
							className="share-button"
						>
							공유하기
						</Button>
					)}
				</SmallButtonsContainer>

				<Line style={{ display: isMyPage ? 'flex' : 'none' }} />

				{isMyPage && (
					<BigButtonsContainer>
						<BigButton
							size="l"
							buttonType="Button"
							onClick={handleGalaxyCustomButton}
							className="galaxy-custom-button"
						>
							<img src={PlanetEditIcon} alt="은하 수정하기" />
							은하 수정하기
						</BigButton>
						<BigButton
							size="l"
							buttonType="CTA-icon"
							onClick={handleWritingButton}
							className="writing-button"
						>
							<img src={WriteIcon} alt="글쓰기" />
							글쓰기
						</BigButton>
					</BigButtonsContainer>
				)}
			</ButtonsContainer>
		</Layout>
	);
}

const Layout = styled.div<{ view: string }>`
	position: absolute;
	left: 50%;
	bottom: 30px;
	z-index: 50;
	transform: translateX(-50%);

	display: ${({ view }) =>
		view === 'MAIN' || view === 'DETAIL' ? 'flex' : 'none'};
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
		width: ${MAX_WIDTH2 - 30}px;
	}
`;

const NameContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

const ButtonsContainer = styled.div`
	display: flex;
`;

const SmallButtonsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 4px;
	height: 76px;
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
