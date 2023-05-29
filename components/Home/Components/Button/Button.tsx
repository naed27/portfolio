import styles from './Button.module.scss'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode,
  onClick?: () => void,
  styles?:{
    width?:string,
    height?:string,
    margin?: string,
    padding?:string,
    outline?: string,
    borderRadius?: string,
  }
};

const Button = ({
  children, 
  onClick = () => {},
  styles:{ borderRadius, outline, width, height, padding, margin } = {
    width: '', 
    height: '',
    margin: '',
    padding: '0px',
    borderRadius: '0px',
    outline: '0px solid transparent',
  },
}: Props) => {

  return (
    <motion.div 
      onClick={onClick}
      className={styles.container}
      style={{width, height, borderRadius, outline, padding, margin}}
      >
      {children}
    </motion.div>
  )
};

export default Button;