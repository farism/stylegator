import React from 'react'
import PropTypes from 'prop-types'

import styles from './page.scss'

const getPageSections = content => {
  return content
    .replace(/```(.+)\s/g, '```[$1]')
    .split('```')
    .map(str => str.trim())
    .filter(str => str)
}

const Page = ({ content, partials }) => {
  const { markdown: Markdown } = partials

  return (
    <div className={styles['page']}>
      {getPageSections(content).map((content, key) => {
        return <Markdown {...{ key, content, partials }} />
      })}
    </div>
  )
}

Page.propTypes = {
  content: PropTypes.string,
  partials: PropTypes.shape({
    markdown: PropTypes.func.isRequired,
  }).isRequired,
}

Page.defaultProps = {
  content: '',
}

export default Page
