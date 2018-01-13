export default content =>
  content
    .replace(/```(.+)\s/g, '```[$1]')
    .split('```')
    .map(str => str.trim())
    .filter(str => str)
