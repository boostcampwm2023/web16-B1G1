import styled from '@emotion/styled';
import React from 'react';
import { css } from '@emotion/react';
import { Body02ME, Body03ME, Body02BD, Body03BD } from '../styles';

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: () => void;
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
	white-space: nowrap;

	&:disabled {
		cursor: default;
	}

	${({ size, buttonType, theme: { colors } }) => {
		switch (buttonType) {
			case 'Button':
				return css`
					border: 1px solid ${colors.stroke.sc};
					background: ${colors.background.bdp01};
					color: ${colors.text.secondary};
					box-shadow: none;
					${size === 'm' ? Body02ME : Body03ME}

					&:not(:disabled):hover {
						border: 1px solid ${colors.stroke.focus};
						color: ${colors.text.primary};
					}

					&:disabled {
						color: ${colors.text.disabled};
					}
				`;
			case 'CTA-icon':
				return css`
					border: 1px solid ${colors.stroke.focus};
					background: ${colors.stroke.focus_80};
					color: ${colors.text.primary};
					${size === 'm' ? Body02BD : Body03BD}

					&:not(:disabled):hover {
						background: ${colors.primary.hover};
						color: ${colors.text.primary};
					}

					&:disabled {
						border-color: transparent;
						background: ${colors.primary.disabled};
						color: ${colors.text.disabled};
						box-shadow: none;
					}
				`;
			case 'warning':
				return css`
					border: 1px solid ${colors.warning.filled};
					background: ${colors.warning.filled_80};
					color: white;
					${size === 'm' ? Body02ME : Body03ME}

					&:hover {
						background: ${colors.warning.filled};
					}
					&:disabled {
						border-color: transparent;
						background: ${colors.primary.disabled};
						color: ${colors.text.disabled};
						box-shadow: none;
					}
				`;
			case 'warning-border':
				return css`
					border: 1px solid ${colors.warning.filled};
					background: transparent;
					color: ${colors.warning.filled};
					${size === 'm' ? Body02ME : Body03ME}

					&:hover {
						background: ${colors.warning.filled_10};
					}
					&:disabled {
						border-color: transparent;
						background: ${colors.warning.filled_10};
						color: ${colors.text.disabled};
						box-shadow: none;
					}
				`;
		}
	}}
`;
