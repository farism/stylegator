import React from 'react'
import PropTypes from 'prop-types'
import highlight from 'highlight.js'
import marked from 'marked'

import styles from './staticMarkdown.scss'

marked.setOptions({
  highlight: code => highlight.highlightAuto(code).value,
})

const StaticMarkdown = ({ content }) => (
  <article className="markdown-body">
    <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
  </article>
)

StaticMarkdown.propTypes = {
  content: PropTypes.string,
}

StaticMarkdown.defaultProps = {
  content: '',
}

export default StaticMarkdown
