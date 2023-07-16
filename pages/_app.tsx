import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import { Ubuntu } from 'next/font/google'
import store from '@/store'
import { Provider } from 'react-redux'

const ubuntu = Ubuntu({ weight: ['400', '700'], subsets: ['latin-ext'] });

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <div className={ubuntu.className}>
      <Header />
      <Component {...pageProps} />
    </div>
  </Provider>
}
