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
    const { attributes } = this.props
    const { content, expanded } = this.state
    return (
      <div className={styles['live-markdown']}>
        <div className={styles['tab']}>Tabs</div>
        <div className={styles['tab']}>Tabs</div>
        <div className={styles['tab']}>Tabs</div>
        <LiveProvider code={content}>
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
  attributes: PropTypes.shape({
    interactive: PropTypes.string,
  }),
  content: PropTypes.string,
}

LiveMarkdown.defaultProps = {
  attributes: {
    interactive: 'true',
  },
  content: '',
}

export default LiveMarkdown
