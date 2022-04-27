import styles from './Menu.module.scss';
import Toggler from './Components/Toggler/Toggler';
import Contents from './Components/Contents/Contents';
export default function Menu() {

  return (
    <div className={styles.container}>
        <Toggler/>
        <Contents/>
    </div>
  );
}