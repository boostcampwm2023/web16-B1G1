import styled from '@emotion/styled';
import React from 'react';
import { generateButtonStyle } from './generateButtonStyle';

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick: () => void;
	children: React.ReactNode;
	size: 'm' | 'l';
	buttonType: 'Button' | 'CTA-icon' | 'warning' | 'warning-border';
}

export default function Button({ children, ...args }: PropsType) {
	return <CustomButton {...args}>{children}</CustomButton>;
}

const CustomButton = styled.button<PropsType>`
	display: inline-flex;
	height: fit-content;
	width: fit-content;
	padding: 6px 12px;
	justify-content: center;
	align-items: center;
	gap: 2px;
	border-radius: 4px;
	box-shadow: 0px 2px 10px 5px rgba(13, 111, 252, 0.1);
	&:disabled {
		cursor: default;
	}

	${({ size, buttonType, theme: { colors } }) =>
		generateButtonStyle(size, buttonType, colors)}
`;
