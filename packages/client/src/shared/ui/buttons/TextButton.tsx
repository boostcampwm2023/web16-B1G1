import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { Body02BD, Body02ME, Body03BD, Body03ME } from 'shared/styles';

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick: () => void;
	children: React.ReactNode;
	size: 'm' | 'l';
}

export default function TextButton({
	children,
	type = 'button',
	...args
}: PropsType) {
	return (
		<CustomButton {...args} type={type}>
			{children}
		</CustomButton>
	);
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
