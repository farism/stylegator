import React from 'react'
import PropTypes from 'prop-types'

import styles from './credits.scss'

const Credits = ({ children }) => (
  <div className={styles['credits']}>
    <span>Created with</span>
    <a href="https://farism.github.io/stylegator" target="_blank">
      Stylegator
    </a>
  </div>
)

Credits.propTypes = {}

Credits.defaultProps = {}

export default Credits
