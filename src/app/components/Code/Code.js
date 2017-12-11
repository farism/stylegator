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

class Code extends React.Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false }
  }

  render() {
    const { content } = this.props
    const { expanded } = this.state

    return (
      <div>
        {isInteractive(content) ? (
          <div className={styles['code']}>
            <LiveProvider code={stripCodeTag(content)}>
              <div
                {...{
                  className: styles['code-editor-toggle'],
                  onClick: () => this.setState({ expanded: !expanded }),
                  title: expanded ? 'Hide Code' : 'Show Code',
                }}
              >
                {expanded ? '</>' : '< >'}
              </div>
              <div className={styles['code-preview']}>
                <LivePreview />
              </div>
              {expanded && (
                <div className={styles['code-editor']}>
                  <LiveEditor />
                </div>
              )}
              <LiveError />
            </LiveProvider>
          </div>
        ) : (
          <Static {...{ content: wrapStaticCode(content) }} />
        )}
      </div>
    )
  }
}

Code.propTypes = {
  content: PropTypes.string,
}

Code.defaultProps = {
  content: '',
}

export default Code
