import Logic from './Logic'
import styles from './ControlPanel.module.scss'
import Togglebutton from './Components/ToggleButton/Togglebutton'
import { ControlPanelContext } from './Context/Context'
import Panel from './Components/Panel/Panel'

export default function ControlPanel () {

  const { ControlPanelValues } = Logic()
  const { showPanel } = ControlPanelValues

  return (
    <div className={styles.container} style={{ height:showPanel ? '100%' : '0px' }}>
       
      <ControlPanelContext.Provider value={ControlPanelValues}>
        <Panel/>
        <Togglebutton/>
      </ControlPanelContext.Provider>

    </div>
  )
}