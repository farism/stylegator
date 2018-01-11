import React from 'react'
import PropTypes from 'prop-types'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import styles from './liveMarkdown.scss'

class LiveMarkdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false }
  }

  render() {
    const { content } = this.props
    const { expanded } = this.state

    return (
      <div className={styles['live-markdown']}>
        <LiveProvider code={content}>
          <div
            {...{
              className: styles['live-markdown-editor-toggle'],
              onClick: () => this.setState({ expanded: !expanded }),
              title: expanded ? 'Hide Code' : 'Show Code',
            }}
          >
            {expanded ? '</>' : '< >'}
          </div>
          <div className={styles['live-markdown-preview']}>
            <LivePreview />
          </div>
          {expanded && (
            <div className={styles['live-markdown-editor']}>
              <LiveEditor />
            </div>
          )}
          <LiveError />
        </LiveProvider>
      </div>
    )
  }
}

LiveMarkdown.propTypes = {
  content: PropTypes.string,
}

LiveMarkdown.defaultProps = {
  content: '',
}

export default LiveMarkdown
