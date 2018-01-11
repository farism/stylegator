export default content =>
  content
    .split('\n')
    .filter(attr => attr.trim())
    .map(attr => attr.split(':'))
    .reduce(
      (acc, attr) =>
        Object.assign({}, acc, { [attr[0].trim()]: attr[1].trim() }),
      {}
    )
