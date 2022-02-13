import { useRef } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import styles from './Modal.module.scss'

interface Props{
  children: React.ReactNode;
  className?: string;
  onClickOutside?:() => any
}

export default function Modal ({
  children,
  className='',
  onClickOutside = () => {},
}:Props) {

  const modalRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(modalRef, onClickOutside);

  return (
    <div className={styles.backdrop}>
      <div className={className} ref={modalRef}>
        {children}
      </div>
    </div>
  )
}