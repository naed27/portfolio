import styles from './FieldCover.module.scss'

interface Props{
  children: React.ReactNode;
  className?: string;
  showCover: boolean;
}

export default function FieldCover ({
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