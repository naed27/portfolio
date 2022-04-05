import styles from '../Styles/SideDeck.module.css'
import { useCallback } from 'react';
import CardHolder from './CardHolder';
import { DeckFunctions } from '../../Hooks/DeckStore';
import ScrollableDiv from '../../../../utility/CustomScrollDiv/ScrollableDiv';

function SideDeck({functions}:{functions:DeckFunctions}) {

  const generateSideDeck = useCallback(()=>{
    const cardWidth = 47.34;
    const cardHeight = cardWidth*1.5;
    const cardSize = {width:cardWidth, height:cardHeight};
    const cardHolders:JSX.Element[] =[] ;
    for (let i = 0; i < 15; i++) {
      cardHolders.push(<CardHolder key={`side_card_${i}`} category={'side'} index={i} size={cardSize} functions={functions}/>)
    }
    return cardHolders;
  },[functions])

  return (
    <ScrollableDiv className={styles.container}>
      {generateSideDeck()}
    </ScrollableDiv>
  )

}

export default SideDeck
