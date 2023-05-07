import { Country } from "../../../Types/types";
import styles from './Name.module.scss'


export default function Name ({country}:{country: Country}) {

  return (
    <div className={styles.container}>
      {country.name.common.toUpperCase()}
    </div>
  )

}