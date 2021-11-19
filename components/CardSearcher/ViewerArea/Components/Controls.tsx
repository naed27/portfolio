import { YGOCard } from '../../Misc/Types';
import styles from '../Styles/Controls.module.scss';
import Controller from './Controller';
import { Dispatch, SetStateAction } from 'react';

interface Props{
  setSelectedCard:Dispatch<SetStateAction<YGOCard | null>>,
  searchIndex:number | null,
  setSearchIndex:Dispatch<SetStateAction<number | null>>,
  searchedCards:YGOCard[],
  card:YGOCard,
}

export default function Controls({props:{setSelectedCard,card}}:{props:Props}){

  return (
    <div className={styles.container}>
      <Controller card={card} deck={'main'}/>
      <Controller card={card} deck={'side'}/>

      <div className={styles.button} onClick={()=>{setSelectedCard(null)}}>
        Back
      </div>
    </div>
  )
}

