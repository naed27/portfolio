import Link from 'next/link';
import { MenuItem } from '../../../../lib/Menu';
import styles from './PreviewInfo.module.scss'
import { motion } from 'framer-motion'
import { ArrowRightCircle } from 'lucide-react'
import { ReactNode } from 'react';

const animation = {
  initial:{
    opacity:0
  },
  final:{
    opacity:1,
    transition:{
      duration:0.2
    }
  },
  exit:{
    opacity:0,
    transition:{
      duration:0.2
    }
  }
}

interface Props {
  menuItem: MenuItem,
  isLink?: boolean
  children?: ReactNode
};

const PreviewInfo = ({menuItem, isLink= false, children}: Props) => {

  return (
    <motion.div 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'
      className={styles.container}>
        {
          isLink?
          <Link className={styles.title} href={menuItem.link}>{`${menuItem.name}`}<ArrowRightCircle/></Link>
          :
          <a className={styles.title}>{`${menuItem.name}`}</a>
        }
        <div className={styles.descWrapper}>
          {menuItem.description!==''&&<p className={styles.desc}>{`${menuItem.description}`}</p>}
          {children}
        </div>
       
    </motion.div>
  )
};

export default PreviewInfo;