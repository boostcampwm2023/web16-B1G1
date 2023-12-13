import '@emotion/react';
import { ThemeExtends } from 'shared/styles';

declare module '@emotion/react' {
	export interface Theme extends ThemeExtends {}
}
