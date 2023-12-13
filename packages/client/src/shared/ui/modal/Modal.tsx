import { css } from '@emotion/react';
import styled from '@emotion/styled';
import goBackIcon from '@icons/icon-back-32-white.svg';
import { ReactNode } from 'react';
import { Body02ME, Title02 } from 'shared/styles';
import { IconButton, ModalPortal } from 'shared/ui';

interface PropsTypes extends React.HTMLAttributes<HTMLFormElement> {
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
		<ModalPortal>
			<Overlay>
				<Layout {...args}>
					{onClickGoBack && (
						<IconButton onClick={onClickGoBack} type="button">
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
			</Overlay>
		</ModalPortal>
	);
}

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 998;
`;

const Layout = styled.form`
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
	padding: 32px;
	margin: 12px 0 0 0;

	${({ theme: { colors } }) => css`
		background-color: ${colors.background.bdp01_80};
		border: 2px solid ${colors.stroke.focus_80};
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
