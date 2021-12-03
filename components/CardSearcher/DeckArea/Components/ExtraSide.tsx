import styles from '../Styles/ExtraDeck.module.css'
import { useCallback} from 'react';
import CardHolder from './CardHolder';
import { DeckFunctions } from '../../Misc/Types';
import ScrollableDiv from '../../../../utility/CustomScrollDiv/ScrollableDiv';

function ExtraDeck({functions}:{functions:DeckFunctions}) {

  
  const generateExtraDeck = useCallback(()=>{
    const cardWidth = 47.34;
    const cardHeight = cardWidth*1.5;
    const cardSize = {width:cardWidth, height:cardHeight};

    const cardHolders:JSX.Element[] =[] ;
    for (let i = 0; i < 15; i++) {
      cardHolders.push(
        <CardHolder key={`extra_card_${i}`} category={'extra'} index={i} size={cardSize} functions={functions}/>
      )
    }
    return cardHolders;
  },[functions])

  return (
    <ScrollableDiv className={styles.container}>
      {generateExtraDeck()}
    </ScrollableDiv>
  )

}

export default ExtraDeck
