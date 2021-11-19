import { useContext } from 'react'
import { GlobalContext } from '../Misc/Context';
const ViewStore = () =>{

  const {
    selectedCard,setSelectedCard,
    searchIndex,setSearchIndex
  } = useContext(GlobalContext);


  return {
    selectedCard,setSelectedCard,
    searchIndex,setSearchIndex,
  }
}

export default ViewStore;