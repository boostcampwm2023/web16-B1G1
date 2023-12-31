import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Body02ME, Title01 } from 'shared/styles';
import { Button, ModalPortal } from 'shared/ui';

interface PropsTypes extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	cancelButtonText: string;
	actionButtonText: string;
	onClickCancelButton: () => void;
	onClickActionButton: () => void;
	description?: string;
	disabled: boolean;
}

export default function AlertDialog({
	title,
	description,
	cancelButtonText,
	actionButtonText,
	onClickCancelButton,
	onClickActionButton,
	disabled,
	...args
}: PropsTypes) {
	return (
		<ModalPortal>
			<Overlay>
				<Layout {...args}>
					<Title>{title}</Title>
					{description && <Description>{description}</Description>}

					<ButtonsContainer>
						<Button
							buttonType="Button"
							size="m"
							type="button"
							onClick={onClickCancelButton}
						>
							{cancelButtonText}
						</Button>
						<Button
							buttonType="warning"
							size="m"
							type="button"
							onClick={onClickActionButton}
							disabled={disabled}
						>
							{actionButtonText}
						</Button>
					</ButtonsContainer>
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
	z-index: 1001;
	background-color: rgba(0, 0, 0, 0.5);
`;

const Layout = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1002;

	display: flex;
	flex-direction: column;
	width: 516px;
	border-radius: 16px;
	padding: 32px;
	margin: 12px 0 0 0;

	${({ theme: { colors } }) => css`
		background-color: ${colors.background.bdp01_80};
		border: 2px solid ${colors.stroke.focus_80};
	`};
`;

const Title = styled.h1`
	display: flex;
	justify-content: flex-start;
	margin: 0 0 8px 0;
	color: ${({ theme: { colors } }) => colors.text.primary};
	${Title01}
`;

const Description = styled.p`
	color: ${({ theme: { colors } }) => colors.text.third};
	${Body02ME}
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 32px 0 0 0;
	gap: 8px;
`;
