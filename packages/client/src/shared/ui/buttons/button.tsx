import styled from '@emotion/styled';
import React from 'react';
<<<<<<< HEAD
import { generateButtonStyle } from './generateButtonStyle';
=======
import { css } from '@emotion/react';
import { Body02ME, Body03ME, Body02BD, Body03BD } from '../styles';
>>>>>>> e49fbdc63c7f2a0ae2c76c913848ca2696116712

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
<<<<<<< HEAD
	box-shadow: 0px 2px 10px 5px rgba(13, 111, 252, 0.1);
	&:disabled {
		cursor: default;
	}

	${({ size, buttonType, theme: { colors } }) =>
		generateButtonStyle(size, buttonType, colors)}
=======

	${({ size, buttonType, theme: { colors } }) => {
		switch (buttonType) {
			case 'Button':
				return css`
					border: 1px solid ${colors.stroke.sc};
					background: ${colors.background.bdp01};
					color: ${colors.text.secondary};
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
					background: rgba(108, 85, 250, 0.8);
					color: ${colors.text.primary};
					box-shadow: 0px 2px 10px 5px rgba(13, 111, 252, 0.1);
					${size === 'm' ? Body02BD : Body03BD}

					&:not(:disabled):hover {
						background: ${colors.primary.hover};
						color: ${colors.text.primary};
					}

					&:disabled {
						border-color: none;
						background: ${colors.primary.disabled};
						color: ${colors.text.disabled};
					}
				`;
			case 'warning':
				return css`
					border: 1px solid ${colors.warning.filled};
					background: rgba(242, 122, 137, 0.8);
					color: white;
					box-shadow: 0px 2px 10px 5px rgba(13, 111, 252, 0.1);
					${size === 'm' ? Body02ME : Body03ME}

					&:hover {
						background: ${colors.warning.filled};
					}
				`;
			case 'warning-border':
				return css`
					border: 1px solid ${colors.warning.filled};
					background: none;
					color: ${colors.warning.filled};
					box-shadow: 0px 2px 10px 5px rgba(13, 111, 252, 0.1);
					${size === 'm' ? Body02ME : Body03ME}

					&:hover {
						background: rgba(242, 122, 137, 0.1);
					}
				`;
		}
	}}
>>>>>>> e49fbdc63c7f2a0ae2c76c913848ca2696116712
`;
