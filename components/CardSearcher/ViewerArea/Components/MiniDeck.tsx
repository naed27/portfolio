import styles from '../Styles/MiniDeck.module.css'
import { useCallback,memo } from 'react';
import CardHolder from '../../DeckArea/Components/CardHolder';
import { DeckFunctions } from '../../Misc/Types';

interface Resetters{
  setShowControllers:React.Dispatch<React.SetStateAction<boolean>>,
  setShowMiniDeck:React.Dispatch<React.SetStateAction<boolean>>
}

function MiniDeck({functions,deckType,deckLength,resetters}:{functions:DeckFunctions,deckType:string,deckLength:number,resetters:Resetters}) {

  const {setShowControllers,setShowMiniDeck} = resetters;

  const reset = useCallback(()=>{
    setShowControllers(false);
    setShowMiniDeck(false);
  },[ setShowControllers,setShowMiniDeck ]);

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
    <div className={styles.container+" "+styles.scrollhost} onClick={reset} >
        {generateDeck()}
    </div>
  )
}

export default memo(MiniDeck)
