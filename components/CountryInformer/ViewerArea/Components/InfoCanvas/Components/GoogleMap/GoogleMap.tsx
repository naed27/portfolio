import type { Country } from '../../../../../Types/types';
import styles from './GoogleMap.module.scss'

interface Props {
  country: Country,
  viewState: 'map' | 'flag'
};

const GoogleMap = ({country, viewState}: Props) => {

  return (
    <iframe 
      src={`https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d25438414.00868684!2d${country.latlng[1]}!3d${country.latlng[0]}!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzjCsDAwJzAwLjAiTiA5N8KwMDAnMDAuMCJX!5e0!4v1685102495965`} 
      className={`${viewState==='map' ? styles.container : styles.hidden}`} 
      allowFullScreen={true} 
      loading="lazy"/>
  )
};

export default GoogleMap;