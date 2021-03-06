import React from 'react'
import PropTypes from 'prop-types'

import styles from './sidebarToggle.scss'

const SidebarToggle = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles['toggle']}>
      <div className={`${styles['bar']} ${styles['top']}`} />
      <div className={`${styles['bar']} ${styles['middle']}`} />
      <div className={`${styles['bar']} ${styles['bottom']}`} />
    </div>
  )
}

SidebarToggle.propTypes = {}

SidebarToggle.defaultProps = {}

export default SidebarToggle
