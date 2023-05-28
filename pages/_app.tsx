import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import styles from '../styles/App.module.css'

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { AnimatePresence } from 'framer-motion';
config.autoAddCss = false;


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

