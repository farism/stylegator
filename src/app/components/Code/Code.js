import React from 'react'
import PropTypes from 'prop-types'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import { CODE_TAG, Static } from '../Markdown'

import styles from './code.scss'

const INTERACTIVE_TAG = /^\[code\]/

const stripCodeTag = content => content.replace(CODE_TAG, '').trim()

const wrapStaticCode = content =>
  `\`\`\`${content.replace(CODE_TAG, '$1\n')}\`\`\``

const isInteractive = content => content.match(INTERACTIVE_TAG)

const Code = ({ content }) => (
  <div className={styles['code']}>
    {isInteractive(content) ? (
      <LiveProvider code={stripCodeTag(content)}>
        <div>
          <LivePreview />
        </div>
        <LiveEditor />
        <LiveError />
      </LiveProvider>
    ) : (
      <Static {...{ content: wrapStaticCode(content) }} />
    )}
  </div>
)

Code.propTypes = {
  content: PropTypes.string,
}

Code.defaultProps = {
  content: '',
}

export default Code
