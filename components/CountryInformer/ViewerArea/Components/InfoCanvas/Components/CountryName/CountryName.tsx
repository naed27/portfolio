import type { Country } from "../../../../../Types/types";
import styles from './CountryName.module.scss'

const CountryName = ({country}:{country: Country}) => {

  return (
    <div className={styles.container}>
      {country.name.common.toUpperCase()}
    </div>
  )
};

export default CountryName;