import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import styles from '../styles/App.module.css'
import { AnimatePresence } from "framer-motion";
export default function MyApp({ Component, pageProps,router }: AppProps) {

  return (
    <div className={styles.container}>
      <Layout>
        <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route}/>
        </AnimatePresence>
      </Layout>
    </div>
  )
}

