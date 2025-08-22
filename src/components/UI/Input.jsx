import React from 'react'
import styles from '../../styles/Input.module.css'

const Input = ({...props}) => {
  return (
    <input type="text" className={styles.input} {...props} />
  )
}

export default Input