/// <reference types="vite-plugin-svgr/client" />
import { ThemeProvider } from '@emotion/react';
import { router } from 'app/Router';
import { Audio } from 'features';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AxiosInterceptor } from 'shared/apis';
import { theme } from 'shared/styles';
import { AudioButton } from 'shared/ui';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Audio />
			<AudioButton />
			<AxiosInterceptor>
				<RouterProvider router={router} />
			</AxiosInterceptor>
		</ThemeProvider>
	</React.StrictMode>,
);
