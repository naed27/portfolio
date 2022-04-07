import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import styles from '../styles/App.module.css'
export default function MyApp({ Component, pageProps,router }: AppProps) {

  return (
    <div className={styles.container}>
      <Layout>
        <Component {...pageProps} key={router.route}/>
      </Layout>
    </div>
  )
}

