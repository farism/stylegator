import React from 'react'
import PropTypes from 'prop-types'

import { getAttributes } from '../../utils'
import { LiveMarkdown, Props, StaticMarkdown } from '../'
import styles from './page.scss'

const stripSectionTag = content => content.replace(/\[(.*)\]/, '')

const getPageSections = content =>
  content
    .replace(/```(.+)\s/g, '```[$1]')
    .split('```')
    .map(str => str.trim())
    .filter(str => str)

const getPageSection = partials => content => {
  const {
    staticMarkdown: StaticMarkdown,
    liveMarkdown: LiveMarkdown,
    props: Props,
  } = partials

  const sectionTag = content.match(/\[(.*)\]/)

  if (sectionTag) {
    switch (sectionTag[1]) {
      case 'html':
        return <StaticMarkdown {...{ content: stripSectionTag(content) }} />
      case 'code':
        return <LiveMarkdown {...{ content: stripSectionTag(content) }} />
      case 'props':
        const component = getAttributes(stripSectionTag(content)).component
        const props = (window[component] || {}).props

        console.log(props)

        return <Props {...{ props }} />
      default:
        return null
    }
  }

  return null
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
