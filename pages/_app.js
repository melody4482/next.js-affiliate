import * as React from 'react';
import '../styles/index.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../mui.config.theme';

import Header from '../app/components/layouts/Header';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Component {...pageProps} />		
		</ThemeProvider>
	);
}