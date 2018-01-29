import React from 'react'
import PropTypes from 'prop-types'

import styles from './pageHeader.scss'

const PageHeader = ({ title, theme }) => (
  <div className={styles['page-header']}>{title}</div>
)

PageHeader.propTypes = {
  title: PropTypes.string,
}

PageHeader.defaultProps = {
  title: '',
}

export default PageHeader
