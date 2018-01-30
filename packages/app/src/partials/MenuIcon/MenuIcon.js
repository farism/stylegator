import React from 'react'
import PropTypes from 'prop-types'

const styles = require('./menuIcon.scss')

const MenuIcon = ({ section }) =>
  section.icon ? (
    <span className={styles['menu-icon']}>
      <img src={section.icon} />
    </span>
  ) : null

MenuIcon.propTypes = {}

MenuIcon.defaultProps = {}

export default MenuIcon
