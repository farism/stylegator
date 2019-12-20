import React from 'react'
import PropTypes from 'prop-types'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import styles from './liveMarkdown.scss'

class LiveMarkdown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
      content: props.content,
    }
  }

  render() {
    const { attributes, scope } = this.props

    const { content, expanded } = this.state

    return (
      <div className={styles['live-markdown']}>
        <LiveProvider code={content} scope={scope}>
          <div className={styles['live-markdown-preview']}>
            <LivePreview />
          </div>
          {expanded && (
            <div className={styles['live-markdown-editor']}>
              <LiveEditor />
            </div>
          )}
          <LiveError />
          {attributes.interactive === 'true' && (
            <div
              {...{
                className: styles['live-markdown-editor-toggle'],
                onClick: () => this.setState({ expanded: !expanded }),
                title: expanded ? 'Hide Code' : 'Show Code',
              }}
            >
              {expanded ? '</>' : '< >'}
            </div>
          )}
        </LiveProvider>
      </div>
    )
  }
}

LiveMarkdown.propTypes = {
  attributes: PropTypes.shape({
    interactive: PropTypes.string,
  }),
  content: PropTypes.string,
  scope: PropTypes.object,
}

LiveMarkdown.defaultProps = {
  attributes: {
    interactive: 'true',
  },
  content: '',
  scope: {},
}

export default LiveMarkdown
