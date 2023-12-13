import { LevaCustomTheme } from 'leva/dist/declarations/src/styles';
import { theme } from 'shared/styles';

const color = theme.colors;

export const LevaTheme: LevaCustomTheme = {
	colors: {
		elevation1: color.background.bdp02,
		elevation2: color.background.bdp01_80,
		elevation3: color.background.bdp03,
		accent1: color.stroke.focus,
		accent2: color.primary.filled,
		accent3: color.primary.pressed,
		highlight1: color.stroke.sc,
		highlight2: color.text.third,
		highlight3: color.text.secondary,
	},
	fontSizes: {
		root: '12px',
	},
	fonts: {
		mono: 'pretendard_medium',
	},
};
