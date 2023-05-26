import styles from './InfoCard.module.scss'

interface Props {
    title: string,
    value: string
};

const InfoCard = ({title, value}: Props) => {

  return (
    <div className={styles.container}>
      {`${title}: ${value}`}
    </div>
  )
};

export default InfoCard;