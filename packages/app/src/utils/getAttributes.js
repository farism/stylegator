import * as R from 'ramda'

export default R.pipe(
  R.split('---'),
  R.ifElse(
    R.pipe(R.length(), R.equals(2)),
    R.pipe(
      R.view(R.lensIndex(0)),
      R.split('\n'),
      R.filter(attr => attr.trim()),
      R.map(attr => attr.split(':')),
      R.reduce(
        (acc, attr) =>
          Object.assign({}, acc, { [attr[0].trim()]: attr[1].trim() }),
        {}
      )
    ),
    () => ({})
  )
)
