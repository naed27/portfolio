import { useContext } from 'react'
import { GlobalContext } from '../Misc/globalContext';
const ViewStore = () =>{

  const {
    searchIndex,setSearchIndex,
    selectedCard,setSelectedCard,
  } = useContext(GlobalContext);


  return {
    searchIndex,setSearchIndex,
    selectedCard,setSelectedCard,
  }
}

export default ViewStore;