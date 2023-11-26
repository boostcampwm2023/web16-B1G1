import styled from '@emotion/styled';
import { Button } from 'shared/ui';
import { css } from '@emotion/react';
import { Title01 } from '../styles';
import PlanetEditIcon from '@icons/icon-planetedit-24-white.svg';
import AddIcon from '@icons/icon-add-24-white.svg';
import WriteIcon from '@icons/icon-writte-24-white.svg';

export default function UnderBar() {
	const tempName = '도라에몽도라에몽도라';

	return (
		<Layout>
			<Name>{tempName}님의 은하</Name>

			<ButtonsContainer>
				<LogoutButton size="l" buttonType="Button">
					로그아웃
				</LogoutButton>

				<Line />

				<SpaceEditButton size="l" buttonType="Button">
					<img src={PlanetEditIcon} alt="우주 수정하기" />
					우주 수정하기
				</SpaceEditButton>
				<SkinCreateButton size="l" buttonType="Button">
					<img src={AddIcon} alt="별 스킨 만들기" />별 스킨 만들기
				</SkinCreateButton>
				<WritingButton size="l" buttonType="CTA-icon">
					<img src={WriteIcon} alt="글쓰기" />
					글쓰기
				</WritingButton>
			</ButtonsContainer>
		</Layout>
	);
}

const Layout = styled.div`
	position: absolute;
	z-index: 50;
	left: 50%;
	bottom: 50px;
	transform: translateX(-50%);

	display: flex;
	padding: 24px;
	width: 1180px; // TODO: 수정 필요
	justify-content: space-between;
	align-items: center;
	border-radius: 12px;

	background-color: ${({ theme }) => theme.colors.background.bdp01_80};
	border: 1px solid ${({ theme }) => theme.colors.stroke.default};
`;

const Name = styled.p`
	color: ${({ theme }) => theme.colors.text.primary};
	${Title01}
`;

const ButtonsContainer = styled.div`
	display: flex;
`;

const ButtonBasicStyle = css`
	width: 155px;
	height: 70px;
`;

const LogoutButton = styled(Button)`
	height: 70px;
	margin: 0 24px 0 0;
`;

const SpaceEditButton = styled(Button)`
	${ButtonBasicStyle}
	margin: 0 8px 0 0;
`;

const SkinCreateButton = styled(Button)`
	${ButtonBasicStyle}
	margin: 0 16px 0 0;
`;

const WritingButton = styled(Button)`
	${ButtonBasicStyle}
`;

const Line = styled.div`
	margin: 0 24px 0 0;
	border-left: 1px solid ${({ theme }) => theme.colors.stroke.sc};
`;
