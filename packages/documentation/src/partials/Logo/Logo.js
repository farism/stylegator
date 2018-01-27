import React from 'react'
import PropTypes from 'prop-types'

import styles from './logo.scss'
import logo from '../../assets/logo.png'

const Logo = ({ src = logo }) => (
  <a className={styles['logo']} href="#/">
    <img className={styles['image']} src={src} />
  </a>
)

export default Logo
