import Letterbox from './Components/Letterbox'
import styles from './Header.module.scss'

export default function Header ({label} : {label: string}) {
  return  (
    <div className={styles.container}>
      {(()=>{
        let letters = []
        for (let i = 0; i < label.length; i++) {
          letters.push(<Letterbox letter={label[i].toUpperCase()} key={`header_letter_${i}`}/>)
        }
        return letters
      })()}
    </div>
  )
}