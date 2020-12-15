import React from 'react'
import styles from './style.css'

const DataItem = (props) => {
  const { icon, number, label } = props
  return (
    <div className={styles.root}>
      <img src={icon} className={styles.image}/>
      <div>{typeof number !== 'number' ?  '--' : number}</div>
      <div>{label}</div>
    </div>

  )
}

export default DataItem
