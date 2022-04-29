import { useContext } from 'react';
import styles from './Canvas.module.scss';
import Page from './Components/Page/Page';
import { GlobalContext } from '../../Context/GlobalContext';
import LoadingPage from './Components/LoadingPage/LoadingPage';

export default function Canvas () {
  const { parsingStatus } = useContext(GlobalContext);

  return (
    <div className={styles.container}>
      {parsingStatus? <LoadingPage/>: <Page/>}
    </div>
  )
}