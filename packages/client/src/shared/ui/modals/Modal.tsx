import styled from '@emotion/styled';
import { Body02ME, Title02 } from '../styles';
import { ReactNode } from 'react';
import { css } from '@emotion/react';

interface PropsTypes {
	title: string;
	explanation?: string;
	topButton?: ReactNode;
	leftButton?: ReactNode;
	rightButton?: ReactNode;
	children: ReactNode;
}

export default function Modal({
	title,
	explanation,
	leftButton,
	rightButton,
	topButton,
	children,
	...args
}: PropsTypes) {
	const isButtonExist = leftButton || rightButton;

	return (
		<Layout {...args}>
			<UpperLayout>
				<TitleLayout>
					<Title>{title}</Title>
					{topButton}
				</TitleLayout>

				<Explanation>{explanation}</Explanation>
			</UpperLayout>

			{children}

			{isButtonExist && (
				<ButtonLayout>
					<div>{leftButton}</div>
					<div>{rightButton}</div>
				</ButtonLayout>
			)}
		</Layout>
	);
}

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 16px;
	opacity: 80%;
	padding: 32px;

	${({ theme: { colors } }) => css`
		background-color: ${colors.background.bdp03};
		border: 2px solid ${colors.stroke.default};
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
	color: ${({ theme: { colors } }) => colors.text.primary};
	${Title02}
`;

const Explanation = styled.p`
	color: ${({ theme: { colors } }) => colors.text.third};
	${Body02ME}
`;
