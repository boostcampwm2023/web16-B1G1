import styled from '@emotion/styled';
import { Body02ME, Title02 } from '../styles';
import { ReactNode } from 'react';
import { css } from '@emotion/react';
import goBackIcon from '@icons/icon-back-32-white.svg';
import { IconButton } from '..';

interface PropsTypes {
	title: string;
	children: ReactNode;

	description?: string;
	topButton?: ReactNode;
	leftButton?: ReactNode;
	rightButton?: ReactNode;
	onClickGoBack?: () => void;
}

export default function Modal({
	title,
	description,
	leftButton,
	rightButton,
	topButton,
	onClickGoBack,
	children,
	...args
}: PropsTypes) {
	const isButtonExist = leftButton || rightButton;

	return (
		<Layout {...args}>
			{onClickGoBack && (
				<IconButton onClick={onClickGoBack}>
					<img src={goBackIcon} alt="뒤로가기 버튼" />
				</IconButton>
			)}

			<MainLayout>
				<UpperLayout>
					<TitleLayout>
						<Title>{title}</Title>
						{topButton}
					</TitleLayout>

					{description && <Description>{description}</Description>}
				</UpperLayout>

				{children}

				{isButtonExist && (
					<ButtonLayout>
						<div>{leftButton}</div>
						<div>{rightButton}</div>
					</ButtonLayout>
				)}
			</MainLayout>
		</Layout>
	);
}

const Layout = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 999;
`;

const MainLayout = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 16px;
	opacity: 80%;
	padding: 32px;
	margin: 12px 0 0 0;

	${({ theme: { colors } }) => css`
		background-color: ${colors.background.bdp01};
		border: 2px solid ${colors.stroke.focus};
	`};
`;

const UpperLayout = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 0 32px 0;
`;

const TitleLayout = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ButtonLayout = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 32px 0 0 0;
`;

const Title = styled.h1`
	display: flex;
	justify-content: flex-start;
	margin: 0;
	color: ${({ theme: { colors } }) => colors.text.primary};
	${Title02}
`;

const Description = styled.p`
	color: ${({ theme: { colors } }) => colors.text.third};
	${Body02ME}
`;
