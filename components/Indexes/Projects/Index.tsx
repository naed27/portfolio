import styles from './Index.module.scss';
import {useContext,useEffect} from 'react'
import {LayoutContext} from '../../Layout/Context/LayoutContext'

export default function Index () {
  const { setAbsoluteNavBar }  = useContext(LayoutContext)

  useEffect(()=>setAbsoluteNavBar(false), [setAbsoluteNavBar])

  return (
    <div className={styles.container}>
      Hello Projects
    </div>
  )
}