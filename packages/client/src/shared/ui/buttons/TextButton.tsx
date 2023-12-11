import styled from '@emotion/styled';
import React from 'react';
import { css } from '@emotion/react';
import { Body02ME, Body03ME, Body02BD, Body03BD } from '../styles';

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick: () => void;
	children: React.ReactNode;
	size: 'm' | 'l';
}

export default function TextButton({ children, ...args }: PropsType) {
	return <CustomButton {...args}>{children}</CustomButton>;
}

const CustomButton = styled.button<PropsType>`
	display: flex;
	height: fit-content;
	width: fit-content;
	justify-content: center;
	align-items: center;
	gap: 4px;
	background: none;
	border: none;
	white-space: nowrap;

	${({ size, theme: { colors } }) => css`
		${size === 'm' ? Body02ME : Body03ME}
		color: ${colors.text.primary};

		&:hover {
			${size === 'm' ? Body02BD : Body03BD}
			text-decoration: underline;
		}
	`};
`;
