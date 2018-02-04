import React from 'react'
import PropTypes from 'prop-types'

import { getAttributes, getGlobalComponent, getPageSections } from '../../utils'
import { LiveMarkdown, Props, StaticMarkdown } from '../'
import styles from './page.scss'

const getPageSection = (partials, section) => {
  const { StaticMarkdown, LiveMarkdown, Props } = partials

  let tag = section.match(/\{([a-zA-Z]*)\}/)
  const content = section.replace(/\{[a-zA-Z]*\}/, '')

  if (tag) {
    tag = tag[1]

    switch (tag) {
      case 'code':
        return <LiveMarkdown {...{ content }} />
      case 'props':
        const attributes = getAttributes(content)
        const props = getGlobalComponent(attributes.component).propInfo

        return <Props {...{ props }} />
      default:
        return (
          <StaticMarkdown {...{ content: `\`\`\`${tag}\n${content}\`\`\`` }} />
        )
    }
  }

  return <StaticMarkdown {...{ content }} />
}

const Page = ({ content, title, partials }) => {
  const { PageHeader } = partials

  return (
    <div className={styles['page']}>
      <PageHeader {...{ title }} />
      <div className={styles['page-content']}>
        {getPageSections(content).map((section, i) => (
          <div key={i}>{getPageSection(partials, section)}</div>
        ))}
      </div>
    </div>
  )
}

Page.propTypes = {
  content: PropTypes.string,
  partials: PropTypes.shape({
    LiveMarkdown: PropTypes.func.isRequired,
    PageHeader: PropTypes.func.isRequired,
    Props: PropTypes.func.isRequired,
    StaticMarkdown: PropTypes.func.isRequired,
  }).isRequired,
}

Page.defaultProps = {
  content: '',
}

export default Page
