import React from 'react'
import x from '../imgs/X.png'
import styles from './categorychip.module.css'
function Categorychip(props) {
  return (
    <div>
      <div className={styles.categoryBox} style={props.chipBg}>
        <span>{props.title}</span>
        {props.displayX?<img src={x}  onClick={()=>props.fnToRemove(props.title)}/>:''}
      </div>
    </div>
  )
}

export default Categorychip
