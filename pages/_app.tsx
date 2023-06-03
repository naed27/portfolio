import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import styles from '../styles/App.module.css'
import { BrowserRouter as Router, Routes, 
  Route, Link, useLocation } from "react-router-dom";
  import { AnimatePresence } from 'framer-motion';

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;


// const Animated = () => {
//   const location = useLocation();
//   return (
//       <AnimatePresence mode='wait' >

//         <Routes location={location} key={location.pathname}>
//             <Route path="/" element={Home}></Route>
//             <Route path="/about" element={About}></Route>
//             <Route path="/contact" element={Contact}></Route>
//         </Routes>

//       </AnimatePresence>
//   )
// }

export default function MyApp({ Component, pageProps,router }: AppProps) {

  return (
    <div className={styles.container}>
      <Layout>
        <Component {...pageProps} key={router.route}/>
      </Layout>
    </div>
  )
}

