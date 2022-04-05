import styles from '../Styles/MiniDeck.module.scss'
import { useCallback,memo } from 'react';
import CardHolder from '../../DeckArea/Components/CardHolder';
import ScrollableDiv from '../../../../utility/CustomScrollDiv/ScrollableDiv';
import { DeckFunctions } from '../../Hooks/DeckStore';

function MiniDeck({functions,deckType,deckLength}:{functions:DeckFunctions,deckType:string,deckLength:number}) {

  const generateDeck = useCallback(()=>{

    const cardHeight = 40;
    const cardWidth =  cardHeight/1.5;
    const cardSize = {width:cardWidth, height:cardHeight};

    const cardHolders:JSX.Element[] = [];

    for (let cell = 0; cell < deckLength; cell++) {
      cardHolders.push(
        <CardHolder 
          key={`mini_${deckType}_card_${cell}`} 
          category={deckType} 
          index={cell} 
          size={cardSize} 
          functions={functions}
        />
      )
    }
    
    return cardHolders;
  },[ deckLength, deckType, functions ]);

  return (
    <ScrollableDiv 
      className={styles.container}
      scrollX={{
        thumbThickness:6,
        thumbColor:'white',
        thumbOpacity:0.7,
        trackPadding:1,
        trackBorder:'0px',
        trackColor:'black',
        scrollBorderRadius:'0px',}}
    >
      {generateDeck()}
    </ScrollableDiv>
  )
}

export default memo(MiniDeck)
