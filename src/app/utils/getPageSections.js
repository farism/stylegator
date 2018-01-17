export default content =>
  content
    .replace(/^```(.+)\s/gm, '```{$1}')
    .split(/^```/gm)
    .map(str => str.trim())
    .filter(str => str)
