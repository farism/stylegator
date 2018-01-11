import React from 'react'
import PropTypes from 'prop-types'

import styles from './search.scss'

const Icon = () => (
  <svg width="12px" height="12px" viewBox="0 0 12 12">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-279.000000, -110.000000)">
        <g transform="translate(73.000000, 100.000000)">
          <g transform="translate(204.000000, 8.000000)">
            <g>
              <g transform="translate(2.000000, 2.000000)" stroke="#808080">
                <circle cx="5" cy="5" r="4.5" />
                <path d="M8.5,8.5 L11.5,11.5" stroke-linecap="square" />
              </g>
              <rect x="0" y="0" width="16" height="16" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const Search = ({}) => (
  <div className={styles['search']}>
    <input {...{ placeholder: 'Search CORE CSS' }} />
    <Icon />
  </div>
)

Search.propTypes = {}

Search.defaultProps = {}

export default Search
