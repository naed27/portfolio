import { useCallback, useRef } from 'react';
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
  const onClickHandler = useCallback(onClickOutside,[onClickOutside])

  useOnClickOutside(modalRef, onClickHandler);

  return (
    <div className={styles.backdrop}>
      <div className={className} ref={modalRef}>
        {children}
      </div>
    </div>
  )
}