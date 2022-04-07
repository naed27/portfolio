import Letterbox from './Components/Letterbox'
import styles from './Header.module.scss'

const HEADER_CONTENT = "DEAN"

export default function Header () {
  return  (
    <div className={styles.container}>
      {(()=>{
        let letters = []
        for (let i = 0; i < HEADER_CONTENT.length; i++) {
          letters.push(<Letterbox letter={HEADER_CONTENT[i]} key={`header_letter_${i}`}/>)
        }
        return letters
      })()}
    </div>
  )
}