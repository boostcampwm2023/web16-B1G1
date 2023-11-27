const theme = {
	colors: {
		primary: {
			filled: '#6C55FA',
			hover: '#8874FF',
			pressed: '#472CE9',
			disabled: '#30295B',
		},

		action: {
			filled: '#161335',
			hover: '#2F2B56',
			pressed: '#0A0823',
			disabled: '#595674',
		},

		warning: {
			filled: '#F27A89',
			hover: '#F49CA7',
			pressed: '#E65164',
		},

		background: {
			bdp01: '#05021F',
			bdp02: '#161335',
			bdp03: '#241F50',
			bdp01_80: '#05021FCC',
		},

		stroke: {
			default: '#1E1A4D',
			focus: '#6C55FA',
			focus_80: '#6C55FACC',
			sc: '#514B75',
		},

		text: {
			primary: '#F2F2FD',
			secondary: '#CBC9DF',
			third: '#9695B3',
			disabled: '#525073',
			warning: '#F27A89',
			confirm: '#8DD96A',
		},
	},
} as const;

export type ThemeExtends = typeof theme;
export default theme;
