import React from 'react'
import PropTypes from 'prop-types'

import styles from './content.scss'

const Content = ({ children }) => (
  <div className={styles['content']}>
    <div>{children}</div>
  </div>
)

Content.propTypes = {}

Content.defaultProps = {}

export default Content
