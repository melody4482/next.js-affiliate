import * as React from 'react'
import '../styles/index.css'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../mui.config.theme'
import { AppWrapper } from '../context/AppContext';

// import Header from '../app/components/layouts/Header'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <AppWrapper>
                <Component {...pageProps} />
            </AppWrapper>
        </ThemeProvider>
    )
}
