import { useContext } from 'react';
import styles from './Frame.module.scss';
import Canvas from './Components/Canvas/Canvas';
import { GlobalContext } from '../../Context/GlobalContext';
import LoadingPage from './Components/LoadingPage/LoadingPage';

export default function Frame () {
  const { parsingStatus } = useContext(GlobalContext);

  return (
    <div className={styles.container}>
      {parsingStatus ? <LoadingPage/>: <Canvas/>}
    </div>
  )
}