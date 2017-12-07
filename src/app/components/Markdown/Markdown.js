import React from 'react'
import PropTypes from 'prop-types'
import highlight from 'highlight.js'
import marked from 'marked'

import styles from './markdown.scss'

marked.setOptions({
  highlight: code => highlight.highlightAuto(code).value,
})

export const CODE_TAG = /^\[(.*)\]/

export const Static = ({ content }) => (
  <article className="markdown-body">
    <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
  </article>
)

const Markdown = ({ content, partials }) => {
  const { code: Code } = partials

  return content.match(CODE_TAG) ? (
    <Code {...{ content }} />
  ) : (
    <Static {...{ content }} />
  )
}

Markdown.propTypes = {
  content: PropTypes.string,
  partials: PropTypes.shape({
    code: PropTypes.func.isRequired,
  }).isRequired,
}

Markdown.defaultProps = {
  content: '',
}

export default Markdown
