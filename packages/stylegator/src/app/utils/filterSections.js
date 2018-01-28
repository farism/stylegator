import fuzzy from 'fuzzy'

module.exports = (filter, sections) =>
  fuzzy
    .filter(filter, sections, {
      pre: '<span class="fuzzy-match">',
      post: '</span>',
      extract: section => section.title,
    })
    .map(match => Object.assign({}, match.original, { title: match.string }))
