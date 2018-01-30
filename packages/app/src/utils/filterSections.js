import fuzzy from 'fuzzy'

module.exports = (color, filter, sections) =>
  fuzzy
    .filter(filter, sections, {
      pre: `<span style="font-weight:bold; color:${color}"}>`,
      post: '</span>',
      extract: section => section.title,
    })
    .map(match => Object.assign({}, match.original, { title: match.string }))
