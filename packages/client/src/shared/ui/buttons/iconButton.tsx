import styled from '@emotion/styled';
import React from 'react';
import { css } from '@emotion/react';

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick: () => void;
	children: React.ReactNode;
}

export default function IconButton({ children, ...args }: PropsType) {
	return <CustomButton {...args}>{children}</CustomButton>;
}

const CustomButton = styled.button<PropsType>`
	display: inline-flex;
	height: fit-content;
	width: fit-content;
	padding: 8px;
	gap: 10px;
	border-radius: 8px;
	cursor: pointer;

	${({ theme: { colors } }) => css`
		border: 1px solid ${colors.stroke.default};
		background: ${colors.background.bdp03};

		&:hover {
			border: 1px solid ${colors.stroke.default};
			background: ${colors.primary.hover};
		}
	`};
`;
