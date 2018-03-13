import React from 'react'
import PropTypes from 'prop-types'

import { getAttributes, getGlobalComponent, getPageSections } from '../../utils'
import { LiveMarkdown, Props, StaticMarkdown } from '../'
import styles from './page.scss'

const getPageSection = (partials, section) => {
  const { StaticMarkdown, LiveMarkdown, Props } = partials

  let tag = section.match(/\{([a-zA-Z]*)\}/)
  const contentWithoutTag = section.replace(/\{[a-zA-Z]*\}/, '')

  if (tag) {
    tag = tag[1]

    switch (tag) {
      case 'code':
        const arr = contentWithoutTag.split('---')
        const content = arr.length === 2 ? arr[1] : arr[0]
        const attrs = arr.length === 2 ? getAttributes(arr[0]) : undefined

        return <LiveMarkdown {...{ content, attributes: attrs }} />
      case 'props':
        const attributes = getAttributes(contentWithoutTag)
        const props = getGlobalComponent(attributes.component).propInfo

        return <Props {...{ props }} />
      default:
        return (
          <StaticMarkdown
            {...{ content: `\`\`\`${tag}\n${contentWithoutTag}\`\`\`` }}
          />
        )
    }
  }

  return <StaticMarkdown {...{ content: contentWithoutTag }} />
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
