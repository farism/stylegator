import React from 'react'
import PropTypes from 'prop-types'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import styles from './liveMarkdown.scss'

const fixStyleProps = content => content.replace(/style(?!=\{)/g, 'style={{}}')

class LiveMarkdown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
      content: props.content,
      contentEditing: props.content,
    }
  }

  componentDidCatch(error, info) {
    this.setState({
      content: fixStyleProps(this.state.contentEditing),
    })
  }

  render() {
    const { content, expanded } = this.state

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
              <LiveEditor
                onChange={contentEditing => this.setState({ contentEditing })}
              />
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
