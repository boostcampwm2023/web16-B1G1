import { css } from '@emotion/react';
import { Body02ME, Body03ME, Body02BD, Body03BD } from '../styles';

export const generateButtonStyle = (
	size: 'm' | 'l',
	buttonType: 'Button' | 'CTA-icon' | 'warning' | 'warning-border',
	colors: any,
) => {
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
				background: rgba(108, 85, 250, 0.8);
				color: ${colors.text.primary};
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
				${size === 'm' ? Body02ME : Body03ME}
				&:hover {
					background: rgba(242, 122, 137, 0.1);
				}
			`;
	}
};
