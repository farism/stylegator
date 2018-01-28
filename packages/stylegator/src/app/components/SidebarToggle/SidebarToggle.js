import React from 'react'
import PropTypes from 'prop-types'

import styles from './sidebarToggle.scss'

const SidebarToggle = ({ open, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${styles['toggle']} ${open ? styles['open'] : ''}`}
    >
      <div className={`${styles['bar']} ${styles['top']}`} />
      <div className={`${styles['bar']} ${styles['middle']}`} />
      <div className={`${styles['bar']} ${styles['bottom']}`} />
    </div>
  )
}

SidebarToggle.propTypes = {}

SidebarToggle.defaultProps = {}

export default SidebarToggle
