import type { AppProps } from 'next/app';
import GlobalStyle from '@/theme/GlobalStyle';
import ThemeProvider from '@/theme/ThemeProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
