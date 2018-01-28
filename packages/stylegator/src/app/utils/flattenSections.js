const flattenSections = sections =>
  sections.reduce(
    (acc, section) =>
      section.sections
        ? acc.concat([section]).concat(flattenSections(section.sections))
        : acc.concat([section]),
    []
  )

export default flattenSections
