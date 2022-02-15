import styles from './TextCover.module.scss'

interface Props{
  children: React.ReactNode;
  className?: string;
  showCover: boolean;
}

export default function TextCover ({
  children,
  className='',
  showCover=false
}:Props) {

  return (
    <div className={`${className}`}>
      {showCover&&<div className={styles.cover}></div>}
      {children}
    </div>
  )
}