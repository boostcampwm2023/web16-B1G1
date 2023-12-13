import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	plugins: [react(), tsConfigPaths(), svgr()],
	cacheDir: '.vite',
});
