import React from 'react'
import PropTypes from 'prop-types'

import { getAttributes, getPageSections } from '../../utils'
import { LiveMarkdown, Props, StaticMarkdown } from '../'
import styles from './page.scss'

const getPageSection = partials => section => {
  const {
    staticMarkdown: StaticMarkdown,
    liveMarkdown: LiveMarkdown,
    props: Props,
  } = partials

  let tag = section.match(/^\[(.*)\]/)
  const content = section.replace(/^\[(.*)\]/, '')

  if (tag) {
    tag = tag[1]

    switch (tag) {
      case 'code':
        return <LiveMarkdown {...{ content }} />
      case 'props':
        return (
          <Props
            {...{
              props: (window[getAttributes(content).component] || {}).propInfo,
            }}
          />
        )
      default:
        return (
          <StaticMarkdown {...{ content: `\`\`\`${tag}\n${content}\`\`\`` }} />
        )
    }
  }

  return <StaticMarkdown {...{ content }} />
}

const Page = ({ content, partials }) => (
  <div className={styles['page']}>
    {getPageSections(content).map(getPageSection(partials))}
  </div>
)

Page.propTypes = {
  content: PropTypes.string,
  partials: PropTypes.shape({
    liveMarkdown: PropTypes.func.isRequired,
    props: PropTypes.func.isRequired,
    staticMarkdown: PropTypes.func.isRequired,
  }).isRequired,
}

Page.defaultProps = {
  content: '',
}

export default Page
