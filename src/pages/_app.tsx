import { ReactNode } from 'react'
import '@styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { fontMono, fontSans } from '../shared/fonts/fonts'
import AxiosState from '@context/axios/AxiosState'
import SocketState from '@context/socket/SocketState'
import { GlobalState } from '@context/global-state/GlobalState'
import DefaultLayout from '../shared/components/base/layouts/default'
import AuthState from '@context/auth/AuthState'

export default function App ({ Component, pageProps }: AppProps) {
  const getLayout = pageProps.getLayout ?? ((page: ReactNode) => {
    return (
      <DefaultLayout>
        {page}
      </DefaultLayout>
    )
  })

  return (
    <NextUIProvider>
      <NextThemesProvider>
        <AuthState>
          <AxiosState>
            <SocketState>
              <GlobalState>
                {getLayout(<Component {...pageProps} />)}
              </GlobalState>
            </SocketState>
          </AxiosState>
        </AuthState>
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily
}
