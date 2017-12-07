import React from 'react'
import PropTypes from 'prop-types'

import styles from './search.scss'

const Search = ({}) => (
  <div className={styles['search']}>
    <input {...{placeholder: 'Search CORE CSS'}}/>
  </div>
)

Search.propTypes = {}

Search.defaultProps = {}

export default Search
