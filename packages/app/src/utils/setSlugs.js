import slugify from 'slugify'

const setSlugs = (sections, parentPath = '') =>
  sections.map(section => {
    const path = `${parentPath}/${slugify(section.title).toLowerCase()}`

    const withPath = {
      path,
    }

    if (section.sections) {
      withPath.sections = setSlugs(section.sections, path)
    }

    return Object.assign({}, section, withPath)
  })

export default setSlugs
