import styles from '../Styles/MainDeck.module.css'
import { useEffect, useState, useCallback } from 'react';
import CardHolder from './CardHolder';
import ScrollableDiv from '../../../../utility/CustomScrollDiv/ScrollableDiv';
import { DeckFunctions } from '../../Hooks/DeckStore';

function MainDeck({functions}:{functions:DeckFunctions}) {

  const [mainDeck, setMainDeck] = useState<JSX.Element[][]>([]);

  const generateMainDeck = useCallback(()=>{

    const cardWidth = 47.34;
    const cardHeight = cardWidth*1.465;
    const cardSize = {width:cardWidth, height:cardHeight};

    const windowHeight = window.innerHeight;
    const holderCount = 60;
    const rowCount = windowHeight<640?3:4;
    const colCount = holderCount/rowCount;

    const cardHolders:JSX.Element[][] = [];

    for (let row = 0; row < rowCount; row++) {
      cardHolders.push([]);
      for (let col = 0; col < colCount; col++) {
        cardHolders[row].push(
          <CardHolder 
            key={`main_card_${(row*colCount)+col}`} 
            category={'main'} 
            index={(row*colCount)+col} 
            size={cardSize} 
            functions={functions}
          />
        )
      }
    }
    
    return cardHolders;
  },[functions]);

  useEffect(()=>{
    const generator = ()=>setMainDeck(generateMainDeck())
    generator();
    window.addEventListener('resize', generator)
    return ()=> window.removeEventListener('resize', generator)
  },[generateMainDeck]);

  return (
    <ScrollableDiv className={styles.container}>
      <div>
        {mainDeck.map(( array, i ) => (
          <div key={ `main_row_${i}` } className={styles.row}>
            {array}
          </div>
        ))}
      </div>
    </ScrollableDiv>
  )
}

export default MainDeck
