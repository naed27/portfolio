import { useContext, useState, useEffect } from 'react'
import { delay } from '../../../../../utility/functions';
import { GlobalContext } from '../../../Misc/globalContext'
import styles from '../Styles/MoreOptionsButton.module.scss'

export default function MoreOptionsButton () {

  const {setShowMoreFilters,showMoreFilters} = useContext(GlobalContext);
  const [enableButton, setEnableButton] = useState(true);

  const onClickHandler = () => {
    if(!enableButton) return
    setShowMoreFilters(true)
  }

  useEffect(()=>{
    if(showMoreFilters) return setEnableButton(false);
    const load = async () =>{
      await delay(100);
      setEnableButton(true)
    }
    load();
  },[showMoreFilters])

  return (
    <div className={styles.container} >
      <div className={styles.wrapper} onClick={onClickHandler}>
        {`More Filters >>`}
      </div>
    </div>  
  )
}

