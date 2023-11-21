import '@emotion/react';
import { ThemeExtends } from 'shared/ui/styles';

declare module '@emotion/react' {
	export interface Theme extends ThemeExtends {}
}
